import prisma from "@/lib/prisma";

export async function GET() {
  const posts = await prisma.post.findMany({
    where: {
      OR: [
        {
          title: {
            contains: "youtube",
            mode:"insensitive",
          },
        },
        {
          title: {
            contains: "twitter",
            mode:"insensitive",
          },
        },
      ],
      AND: {
        published: true,
      },
    },
  });
  return new Response(JSON.stringify(posts), { status: 200 });
}
