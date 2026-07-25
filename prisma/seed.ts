import { PrismaClient, Prisma } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const users = [
  { name: "Alice", email: "alice@prisma.io", role: "ADMIN" as const },
  { name: "Bob", email: "bob@prisma.io", role: "USER" as const },
  { name: "Carla", email: "carla@prisma.io", role: "USER" as const },
  { name: "Daniel", email: "daniel@prisma.io", role: "ADMIN" as const },
  { name: "Elena", email: "elena@prisma.io", role: "USER" as const },
  { name: "Farah", email: "farah@prisma.io", role: "USER" as const },
  { name: "George", email: "george@prisma.io", role: "USER" as const },
  { name: "Hannah", email: "hannah@prisma.io", role: "USER" as const },
];

const postTopics = [
  "Getting started with Prisma",
  "Designing reliable database schemas",
  "Database indexing tips",
  "Building APIs with Next.js",
  "Error handling in route handlers",
  "Understanding one-to-one relations",
  "Nested writes with Prisma Client",
  "Seeding a development database",
  "PostgreSQL with Docker Compose",
  "Planning database migrations",
  "Filtering and sorting records",
  "Cursor-based pagination",
  "Testing data access code",
  "Transactions in Prisma",
  "Modelling many-to-many relationships",
  "Querying related records",
  "Deploying a Prisma application",
  "Connection pooling basics",
  "Using select and include",
  "Aggregating likes and counts",
  "Grouping posts by author",
  "Ordering query results",
  "Soft deletes vs hard deletes",
  "Unique constraints that matter",
  "Composite indexes in practice",
  "Working with enums in Prisma",
  "Cascade delete strategies",
  "Optimistic updates for likes",
  "Validating API request bodies",
  "Writing reusable query helpers",
  "Debugging slow SQL queries",
  "Choosing between findMany and groupBy",
  "Pagination for admin dashboards",
  "Storing markdown content safely",
  "Draft vs published workflows",
  "Role-based access for authors",
  "Seed data for local demos",
  "Migrating without downtime",
  "Prisma Client singleton patterns",
  "Driver adapters in Prisma 7",
  "Environment variables for databases",
  "Adminer for inspecting tables",
  "Naming conventions for models",
  "Mapping database column names",
  "Default values that reduce bugs",
  "Timestamps and updatedAt fields",
  "Counting related records",
  "Average likes by category",
  "Finding top posts by engagement",
  "Searching posts by title",
  "Partial unique indexes",
  "Batch creating posts",
  "Upserting users during seed",
  "Cleaning up orphaned profiles",
  "Schema drift troubleshooting",
  "Resetting a development database",
  "Writing migration-friendly changes",
  "Using $transaction for multi-writes",
  "Selecting only needed fields",
  "Avoiding N+1 relation queries",
  "Caching expensive aggregates",
  "Rate limiting write endpoints",
  "Logging database errors clearly",
  "Handling missing records",
  "Building author profile pages",
  "Sorting drafts separately",
  "Publishing scheduled content",
  "Measuring post engagement",
  "Exporting posts as JSON",
  "Importing sample blog content",
];

function buildPostsForUser(userIndex: number): Prisma.PostCreateWithoutAuthorInput[] {
  const postsPerUser = Math.floor(postTopics.length / users.length);
  const remainder = postTopics.length % users.length;
  const start = userIndex * postsPerUser + Math.min(userIndex, remainder);
  const count = postsPerUser + (userIndex < remainder ? 1 : 0);

  return postTopics.slice(start, start + count).map((topic, offset) => {
    const postNumber = start + offset + 1;
    const published = postNumber % 5 !== 0;

    return {
      title: `${topic} #${postNumber}`,
      content: `${topic}. Sample post ${postNumber} for local development and query practice.`,
      published,
      likeNum: ((postNumber * 7) % 50) + (published ? 5 : 0),
    };
  });
}

const userData: Prisma.UserCreateInput[] = users.map((user, index) => ({
  name: user.name,
  email: user.email,
  role: user.role,
  posts: {
    create: buildPostsForUser(index),
  },
}));

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

  const postCount = await prisma.post.count();
  console.log(`Seeded ${users.length} users and ${postCount} posts`);
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
