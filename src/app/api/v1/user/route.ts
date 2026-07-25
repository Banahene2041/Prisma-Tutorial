import prisma from "@/lib/prisma";

export async function GET() {
  // const users = await prisma.user.findMany({
  //   where: {
  //     OR: [
  //       {
  //         id: {
  //           not: {
  //             gt: 2,
  //           },
  //         },
  //         name:{
  //           startsWith: "G",
  //         }
  //       },
  //     ],
  //   },
  // });
  const users = await prisma.user.findMany({
    where: {
      posts: {
        some: {
          published: true,
        },
      },
    },
  });
  return new Response(JSON.stringify(users), {
    status: 200,
  });
}
