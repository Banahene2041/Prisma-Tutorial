import prisma from "@/lib/prisma";

// size of page = 10

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pgnum = +(searchParams.get("pgnum") ?? 0);
  const pgsize = +(searchParams.get("pgsize") ?? 10);

  const posts = await prisma.post.findMany({
    skip: (pgnum - 1) * pgsize,
    take: pgsize,
  });

  return new Response(JSON.stringify(posts), {
    status: 200,
  });
}
