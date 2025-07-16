import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  image: text(),
  username: text().notNull(),
  email: text().notNull().unique(),
  password: text().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export const postsTable = pgTable("posts", {
  id: uuid().primaryKey().defaultRandom(),
  title: text().notNull(),
  content: text().notNull(),
  image: text(),
  userId: uuid().references(() => usersTable.id),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});
