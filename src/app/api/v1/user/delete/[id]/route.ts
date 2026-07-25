import prisma from "@/lib/prisma";

// interface Body {
//   name: string;
//   email: string;
// }

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  // const body: Body = await request.json();

  const deletedUser = await prisma.user.delete({
    where: {
      id: parseInt(id),
    },
  });

  return new Response(JSON.stringify({ deletedUser }), {
    status: 200,
  });
}
