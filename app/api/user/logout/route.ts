import { serialize } from 'cookie';


export function GET() {
 return new Response(JSON.stringify({ message: 'Logged out' }), {
  status: 200,
  headers: {
    'Content-Type': 'application/json',
    'Set-Cookie': serialize('token', '', {
      httpOnly: true,
      path: '/',
      maxAge: 0,
    }),
  },
});

}
