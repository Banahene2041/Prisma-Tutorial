import prisma from "@/lib/prisma";

export async function GET() {
  const orderedPosts = await prisma.post.findMany({
    orderBy: {
        likeNum: "asc",
    }
  })

  return new Response(JSON.stringify(orderedPosts), {
    status: 200,
  });
}
