import prisma from "@/lib/prisma";

export async function GET() {
  const posts = await prisma.post.findFirstOrThrow();
  return new Response(JSON.stringify(posts), { status: 200 });
}
