import type { InferSelectModel } from 'drizzle-orm';
import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';


export const users = pgTable('users', {
  id: uuid('id').notNull().primaryKey().defaultRandom(),
  username: varchar('username', { length: 255 }).notNull().unique(),
  password: text('password').notNull(),
  email: text('email').unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});


export const usersRelation = relations(users, ({ many }) => ({
  notes: many(notes)
}))


export const notes = pgTable('notes', {
  id: uuid('id').notNull().primaryKey().defaultRandom(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  content: text('content'),
  title: varchar('title', { length: 255 }),
  userId: uuid('user_id').notNull().references(() => users.id)
})

export const notesRelation = relations(notes, ({ one }) => ({
  user: one(users, {
    fields: [notes.userId],
    references: [users.id]
  })
}))

export const selectUserSchema = createSelectSchema(users, {
  email: schema => schema.regex(/^([\w.%-]+@[a-z0-9.-]+\.[a-z]{2,6})*$/i, { error: 'Invalid Email' })
})

export const newUserSchema = z.object({
  body: selectUserSchema.pick({
    email: true,
    username: true,
    password: true
  })
})


export const userByIdSchema = z.object({
  body: selectUserSchema.pick({
    id: true
  })
})


const selectedNotesSchema = createSelectSchema(notes);

export const newNotesSchema = z.object({
  body: selectedNotesSchema.pick({
    content: true,
  })
})

// export const newUserSchema = z.object({
//   ...(selectUserSchema.pick({
//      email: true,
//      username: true,
//      password: true
//    }))
//  })


// console.log("parse test", newUserSchema.parse({email:'sometgin', username:'hhh', password:'123434'}))

// export const selectUserSchema = createSelectSchema(users, {
//   email: schema => schema.regex(/^([\w.%-]+@[a-z0-9.-]+\.[a-z]{2,6})*$/i)
// });

// export const verifyUserSchema = z.object({
//   query: selectUserSchema.pick({
//     email: true,
//     code: true,
//   }),
// });

// export const deleteUserSchema = z.object({
//   body: selectUserSchema.pick({
//     email: true,
//   }),
// });

// export const loginSchema = z.object({
//   body: selectUserSchema.pick({
//     email: true,
//     password: true,
//   }),
// });

// export const addUserSchema = z.object({
//   body: selectUserSchema.pick({
//     name: true,
//     email: true,
//     password: true,
//   }),
// });

const updateUserSchema = z.object({
  body: selectUserSchema
    .pick({
      name: true,
      email: true,
      password: true,
    })
    .partial(),
});

// export const newUserSchema = z.object({
//   body: selectUserSchema.pick({
//     name: true,
//     email: true,
//     password: true,
//   }),
// });

export type User = InferSelectModel<typeof users>;
export type Note = InferSelectModel<typeof notes>
export type NewUser = z.infer<typeof newUserSchema>['body']
// export type NewUser = z.infer<typeof newUserSchema>['body'];
export type UpdateUser = z.infer<typeof updateUserSchema>['body'];
