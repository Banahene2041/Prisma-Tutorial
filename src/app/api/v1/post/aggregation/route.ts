import prisma from "@/lib/prisma";

export async function GET() {
  const aggregations = await prisma.post.aggregate({
    // where:{
    //     published: true,
    // },
    _sum: {
      likeNum: true,
    },
    _avg: {
      likeNum: true,
    },
    _count: {
      id: true,
    },
    _max: {
      likeNum: true,
    },
    _min: {
      likeNum: true,
    },
  });

  return new Response(JSON.stringify(aggregations), {
    status: 200,
  });
}
