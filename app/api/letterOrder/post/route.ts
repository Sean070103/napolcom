// app/api/upload/route.ts (App Router)
import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3 from "@/lib/s3";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import prisma from "@/utils/connect";

// ✅ Ensures this runs in the Node.js runtime (required for Buffer, JWT, etc.)
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded", details: "File not found in form data" },
        { status: 400 }
      );
    }

    // ✅ Get cookies and extract token
    const token = (await cookies()).get("token")?.value;

    console.log("Cookies in request:", (await cookies()).getAll());

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized: no token found" },
        { status: 401 }
      );
    }

    // ✅ Verify JWT
    let userId: string;
    try {
      const decoded = verifyToken(token); // { id, username, role, ... }
      console.log("JWT decoded payload:", decoded);
      userId = decoded.id;
    } catch (err) {
      return NextResponse.json(
        { error: "Invalid token", details: "Token verification failed" },
        { status: 401 }
      );
    }

    // ✅ Upload file to S3
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${Date.now()}-${file.name}`;

    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET!,
        Key: fileName,
        Body: buffer,
        ContentType: file.type,
      })
    );

    const fileUrl = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

    // ✅ Save file URL to DB
    const uploadedLetterOrder = await prisma.letterOrders.create({
      data: {
        userId,
        content: fileUrl,
      },
    });

    return NextResponse.json(uploadedLetterOrder.userId, {
      status: 201,
    });
  } catch (error) {
    console.error("Upload Error:", error);

    return NextResponse.json(
      { error: "Upload failed", details: String(error) },
      { status: 500 }
    );
  }
}
