# Prisma schema – quick reference (write your own in VS Code)

Your schema file is `prisma/schema.prisma`. It describes your database: tables (models), columns (fields), and links between tables (relations).

---

## 1. Top block: generator + datasource

```prisma
generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
}

datasource db {
  provider = "postgresql"
}
```

- **generator** = where and how the Prisma client is generated. Don’t change unless you move the app.
- **datasource** = which database. `provider = "postgresql"` for Neon/Postgres. The URL lives in `prisma.config.ts` / `.env`, not here (Prisma 7).

---

## 2. Enums = fixed list of values

Use when a field can only be one of a few options.

```prisma
enum Role {
  STUDENT
  TEACHER
}
```

In a model you use it like: `role Role @default(STUDENT)`.

---

## 3. Model = one table

Each **model** becomes one **table** in the database. The model name is PascalCase; the table name is often lowercase (you can set it with `@@map("table_name")`).

### Field types (column types)

| Prisma type   | Meaning in DB        | Example                    |
|---------------|----------------------|----------------------------|
| `String`      | text/varchar         | names, emails, IDs         |
| `Int`         | integer              | counts, ranks              |
| `Boolean`     | true/false           | `isActive Boolean`         |
| `DateTime`    | timestamp            | `createdAt DateTime`       |
| `String?`     | optional (nullable)  | `teacherEnrollmentId String?` |

### Common field attributes

| Attribute           | Meaning |
|---------------------|--------|
| `@id`               | Primary key (unique identifier for the row). |
| `@default(cuid())`  | Auto-generate a unique ID. |
| `@default(now())`   | Default = current time (for `DateTime`). |
| `@default(0)`       | Default number. |
| `@unique`           | No two rows can have the same value. |
| `@map("column_name")` | Real column name in DB (e.g. `password_hash`). |

Example:

```prisma
model College {
  id           String  @id @default(cuid())
  name         String
  email        String  @unique
  passwordHash String  @map("password_hash")

  batches Batch[]
  users   User[]

  @@map("college")
}
```

- **Relations** like `batches Batch[]` = “this college has many batches”. They don’t create a column; they define the “other side” of a link. The actual foreign key is on the other model (e.g. `Batch.collegeId`).
- **@@map("college")** = table name in PostgreSQL is `college`.

---

## 4. Relations (links between tables)

**One-to-many (e.g. one College, many Batches):**

- On the “one” side: `batches Batch[]`
- On the “many” side you need the **foreign key** + the relation:

```prisma
model Batch {
  id        String @id @default(cuid())
  name      String
  collegeId String @map("college_id")

  college College @relation(fields: [collegeId], references: [id])
  // ...
}
```

- `collegeId` = the column that stores the link (foreign key).
- `@relation(fields: [collegeId], references: [id])` = “this field points to `College.id`”.

**Many-to-many (e.g. teachers and batches):** use a join table.

```prisma
model TeacherBatch {
  id        String @id @default(cuid())
  teacherId String @map("teacher_id")
  batchId   String @map("batch_id")

  teacher User  @relation(fields: [teacherId], references: [id])
  batch   Batch @relation(fields: [batchId], references: [id])

  @@unique([teacherId, batchId])
}
```

- `@@unique([teacherId, batchId])` = one row per (teacher, batch) pair.

**Two relations from same model (e.g. User → Topic as “creator” and “assigner”):** use a **relation name**:

```prisma
model User {
  topicsCreated Topic[] @relation("UserTopicsCreated", ...)
}

model Topic {
  createdBy String @map("created_by")
  creator   User   @relation("UserTopicsCreated", fields: [createdBy], references: [id])
}
```

---

## 5. Indexes (optional, for speed)

```prisma
@@index([collegeId])
@@index([role])
```

Use when you often filter or sort by that column (e.g. “all users in this college”, “all students”).

---

## 6. After you edit the schema

1. **Generate the client** (so your code can use the new/updated models):
   ```bash
   npx prisma generate
   ```
2. **Apply to the database** (create/update tables):
   - First time or simple dev: `npx prisma db push`
   - With migration history: `npx prisma migrate dev --name describe_change`

---

## 7. What’s in your schema right now

- **In use:** College, Batch, User, TeacherBatch, StudentBatch, Topic, Subtopic, Platform, Problem, ProblemAssignment, ProblemStatus, StudentPlatformAccount.
- **Not in schema yet:** Ranking (add when you build leaderboards).

You can add a new model at the bottom of `schema.prisma`, then run `prisma generate` and `prisma db push` (or migrate).
