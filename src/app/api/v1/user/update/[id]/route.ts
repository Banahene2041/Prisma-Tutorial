import prisma from "@/lib/prisma";


interface Body {
  name: string;
  email: string;
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body: Body = await request.json();
  const updatedUser = await prisma.user.update({
    where: {
      id: +id,
    },
    data: body,
  });

  return new Response(JSON.stringify({ updatedUser }), {
    status: 200,
  });
}
