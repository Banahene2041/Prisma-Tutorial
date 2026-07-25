import prisma from "@/lib/prisma";

// single user with multiple posts and categories
// export async function POST(request: Request) {
//   const { name, email } = await request.json();

//   const user = await prisma.user.create({
//     data: {
//       name,
//       email,
//       posts: {
//         create: [
//           {
//             title: "Crush Course of Prisma",
//             published: true,
//             content:
//               "This is a crush course of Prisma, you will learn how to use Prisma to create a database and connect to it.",
//             categories: {
//               connectOrCreate: [
//                 {
//                   where: { id: 1 },
//                   create: { name: "Prisma" },
//                 },
//                 {
//                   where: { id: 2 },
//                   create: { name: "Databases" }
//                 },
//               ],
//             },
//           },
//         ],
//       },
//     },
//   });

//   return new Response(JSON.stringify({ user }), {
//     status: 200,
//   });
// }

// multiple users with multiple posts and categories
export async function POST() {
  const users = await prisma.user.createMany({
    data: [
      {
        name: "Enoch Agyemang",
        email: "enochagyema@gmail.com",
      },
      {
        name: "John Doe",
        email: "john.doe@example.com",
      },
      {
        name: "Jane Doe",
        email: "jane.doe@example.com",
      },
    ],
    skipDuplicates: true,
  });

  return new Response(JSON.stringify({ users }), {
    status: 200,
  });
}
