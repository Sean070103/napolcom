import prisma from '../../../../utils/connect'
import bcrypt from 'bcryptjs';
import { signToken } from '@/lib/auth'; 
import { serialize } from 'cookie';

export async function POST(req: Request) {

     const body = await req.json();

 const {
      name,
      username,
      password,
      address,
      gender,
      birthday,
      gsis,
      philhealth,
      pagibig,
      role,
    } = body;
 
 try {

  if (!name || !username || !password || !address || !gender || !birthday || !gsis || !philhealth || !pagibig) {
    return new Response(
      JSON.stringify("fill out nesisary details"),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

    const hashedPassword = await bcrypt.hash(password, 12);
    // Create a new employee
    const createUser = await prisma.users.create({
      data: {
       name,
       username,
       password:hashedPassword,
       address,
       gender,
       birthday,
       gsis,
       philhealth,
       pagibig,
       role
      },
    });
  
  // Generate JWT
    const token = signToken({ id: createUser.id, username: createUser.username, role: createUser.role });
  
      return new Response(JSON.stringify(createUser), {
      status: 201, // Use 201 for resource creation
       headers: {
        "Content-Type": "application/json",
        'Set-Cookie': serialize('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          path: '/',
          maxAge: 60 * 60 * 24 * 7, // 7 days
        }),
       },
    });

  
 } catch (e) {
   console.error("Error creating employee:", e);

    return new Response(
      JSON.stringify({ error: "Failed to create employee", details: e }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
 }
}