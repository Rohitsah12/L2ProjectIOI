# TeacherBatch in the schema

**TeacherBatch** is a **join table** (many-to-many link) between **User (as teacher)** and **Batch**.

---

## Relationship diagram

```
                    College
                        │
         ┌──────────────┼──────────────┐
         │              │              │
         ▼              ▼              ▼
      Batch         User (TEACHER)   User (STUDENT)
         │              │              │
         │              │              │
         │    ┌────────┴────────┐      │
         │    │                 │      │
         ▼    ▼                 ▼      ▼
    ┌─────────────────┐   StudentBatch
    │  TeacherBatch   │
    │  (join table)   │
    └─────────────────┘
```

---

## Detailed diagram (what TeacherBatch is)

```
  User (role = TEACHER)                    Batch
  ┌─────────────────────────┐              ┌─────────────────────────┐
  │ id                      │              │ id                      │
  │ name                    │              │ name                    │
  │ email                   │              │ collegeId  ─────────────┼──► College
  │ collegeId  ─────────────┼──► College   │ ...                    │
  │ teacherEnrollmentId     │              └───────────┬─────────────┘
  │ ...                    │                          │
  └───────────┬────────────┘                          │
              │                                       │
              │  1 teacher can be in many batches      │  1 batch has many teachers
              │                                       │
              ▼                                       ▼
  ┌─────────────────────────────────────────────────────────────────┐
  │                     TeacherBatch (join table)                     │
  │  ┌─────────┐    ┌────────────┐    ┌─────────┐                   │
  │  │ id      │    │ teacherId  │───►│ User.id │  (which teacher)  │
  │  │         │    │ batchId    │───►│ Batch.id│  (which batch)     │
  │  └─────────┘    └────────────┘                                   │
  │                                                                   │
  │  One row = "this teacher is assigned to this batch"                │
  │  @@unique([teacherId, batchId]) = same pair only once              │
  └─────────────────────────────────────────────────────────────────┘
```

---

## In plain words

| Concept | Meaning |
|--------|--------|
| **TeacherBatch** | A table that stores **which teacher is in which batch**. One row = one assignment (teacher X is in batch Y). |
| **teacherId** | References `User.id` (a user with role TEACHER). |
| **batchId** | References `Batch.id`. |
| **Why a separate table?** | Many-to-many: a teacher can be in several batches, and a batch can have several teachers. The join table holds all these links. |
| **@@unique([teacherId, batchId])** | The same teacher cannot be added to the same batch twice. |

---

## Example rows

**User (teachers):**

| id   | name        | role   |
|------|-------------|--------|
| u1   | Dr. Amit    | TEACHER |
| u2   | Prof. Neha  | TEACHER |

**Batch:**

| id   | name     |
|------|----------|
| b1   | SOT23B1   |
| b2   | SOT23B2   |

**TeacherBatch:**

| id  | teacherId | batchId |
|-----|-----------|---------|
| tb1 | u1        | b1      |
| tb2 | u1        | b2      |
| tb3 | u2        | b1      |

Meaning: Dr. Amit (u1) is in SOT23B1 and SOT23B2; Prof. Neha (u2) is in SOT23B1. So **TeacherBatch** is the table that stores these “teacher ↔ batch” links.
