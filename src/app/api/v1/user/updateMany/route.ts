import prisma from "@/lib/prisma";

export async function PUT() {
  const updatedUsers = await prisma.user.updateMany({
    where: {
      name: {
        contains: "e",
      },
    },
    data: {
      name: "Updated Many",
    },
  });

  return new Response(JSON.stringify({ updatedUsers }), {
    status: 200,
  });
}
