import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const { name, email } = await request.json();

  const user = await prisma.user.create({
    data: {
      name,
      email,
    },
  });

  return new Response(JSON.stringify({ user }), {
    status: 200,
  });
}
