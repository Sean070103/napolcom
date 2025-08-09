import prisma from '../../../../utils/connect'

export async function GET() {
  try {
    const allLetterOrder = await prisma.letterOrders.findMany();

    return new Response(
      JSON.stringify(allLetterOrder),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );

  } catch (e) {
    console.log(`Error at GET /letterOrders`, e);
    return new Response(
      JSON.stringify({ error: "Failed to get letterOrder", details: e }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
