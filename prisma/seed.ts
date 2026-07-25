import { PrismaClient, Prisma } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Alice",
    email: "alice@prisma.io",
    role: "ADMIN",
    posts: {
      create: [
        {
          title: "Getting started with Prisma",
          content: "A practical introduction to schemas, migrations, and Prisma Client.",
          published: true,
          likeNum: 42,
        },
        {
          title: "Designing reliable database schemas",
          content: "Lessons learned from modelling relationships in PostgreSQL.",
          published: true,
          likeNum: 28,
        },
        {
          title: "Draft: Database indexing tips",
          content: "Notes on choosing useful indexes without over-indexing.",
          likeNum: 7,
        },
      ],
    },
  },
  {
    name: "Bob",
    email: "bob@prisma.io",
    posts: {
      create: [
        {
          title: "Building APIs with Next.js",
          content: "How route handlers and Prisma work together in the App Router.",
          published: true,
          likeNum: 35,
        },
        {
          title: "Error handling in route handlers",
          content: "Patterns for returning useful and consistent API errors.",
          published: true,
          likeNum: 19,
        },
      ],
    },
  },
  {
    name: "Carla",
    email: "carla@prisma.io",
    posts: {
      create: [
        {
          title: "Understanding one-to-one relations",
          content: "A walkthrough of users and profiles using Prisma relations.",
          published: true,
          likeNum: 24,
        },
        {
          title: "Nested writes with Prisma Client",
          content: "Create related records safely in a single query.",
          likeNum: 11,
        },
      ],
    },
  },
  {
    name: "Daniel",
    email: "daniel@prisma.io",
    role: "ADMIN",
    posts: {
      create: [
        {
          title: "Seeding a development database",
          content: "Create realistic, repeatable data for local development.",
          published: true,
          likeNum: 31,
        },
        {
          title: "PostgreSQL with Docker Compose",
          content: "Run PostgreSQL and Adminer locally with persistent storage.",
          published: true,
          likeNum: 47,
        },
        {
          title: "Planning database migrations",
          content: "Keep schema changes safe and reviewable across environments.",
          likeNum: 9,
        },
      ],
    },
  },
  {
    name: "Elena",
    email: "elena@prisma.io",
    posts: {
      create: [
        {
          title: "Filtering and sorting records",
          content: "Compose useful where and orderBy clauses with Prisma Client.",
          published: true,
          likeNum: 18,
        },
        {
          title: "Cursor-based pagination",
          content: "Paginate large datasets efficiently and consistently.",
          published: true,
          likeNum: 22,
        },
      ],
    },
  },
  {
    name: "Farah",
    email: "farah@prisma.io",
    posts: {
      create: [
        {
          title: "Testing data access code",
          content: "Strategies for testing queries against a development database.",
          published: true,
          likeNum: 16,
        },
        {
          title: "Transactions in Prisma",
          content: "Use transactions when multiple writes must succeed together.",
          likeNum: 13,
        },
      ],
    },
  },
  {
    name: "George",
    email: "george@prisma.io",
    posts: {
      create: [
        {
          title: "Modelling many-to-many relationships",
          content: "Choose between implicit and explicit relation tables.",
          published: true,
          likeNum: 38,
        },
        {
          title: "Querying related records",
          content: "Use include and select to shape relation query results.",
          published: true,
          likeNum: 26,
        },
      ],
    },
  },
  {
    name: "Hannah",
    email: "hannah@prisma.io",
    posts: {
      create: [
        {
          title: "Deploying a Prisma application",
          content: "A checklist for environment variables, migrations, and builds.",
          published: true,
          likeNum: 29,
        },
        {
          title: "Connection pooling basics",
          content: "Why applications reuse database connections under load.",
          likeNum: 8,
        },
      ],
    },
  },
];

export async function main() {
  for (const user of userData) {
    const { posts, ...userFields } = user;

    await prisma.user.upsert({
      where: { email: user.email },
      update: {
        ...userFields,
        posts: {
          deleteMany: {},
          ...posts,
        },
      },
      create: user,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });