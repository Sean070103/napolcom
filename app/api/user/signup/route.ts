import prisma from '../../../../utils/connect'
import bcrypt from 'bcryptjs';

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

    const hashedPassword = await bcrypt.hash(password, 15);
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
      },
    });
  
      return new Response(JSON.stringify(createUser), {
      status: 201, // Use 201 for resource creation
      headers: { "Content-Type": "application/json" },
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