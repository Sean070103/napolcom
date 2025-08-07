import { signToken } from '@/lib/auth'; 
import { serialize } from 'cookie';
import prisma from '../../../../utils/connect'
import bcrypt from 'bcryptjs';


export async function POST(req: Request) {
 
  const body = await req.json();

 const {
  username,
  password
 } = body
 try {
  const findUsername = await  prisma.users.findFirst({
   where: {
    username
   }
  })
  if (!findUsername) {
    return new Response(
      JSON.stringify( "no username found"),
      {
        status: 404,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
     const comparedPass = await bcrypt.compare(password, findUsername.password);
   if (!comparedPass) {
    return new Response(
      JSON.stringify( "incorrect password"),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
   }
    // Generate JWT
      const token = signToken({ id: findUsername.id, username: findUsername.username, role: findUsername.role });
   return new Response(
    JSON.stringify("successfully signin!"),
    {
     status: 201,
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
    }
  );

  
 } catch (e) {
  console.error("Error creating employee:", e);

    return new Response(
      JSON.stringify({ error: "Failed to signin", details: e }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
 }
}