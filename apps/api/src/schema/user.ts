import type { InferSelectModel } from 'drizzle-orm';
import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { createSelectSchema } from 'drizzle-zod';
import { email, z } from 'zod';
import { notes } from './notes';


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

export const verifyUserSchema = z.object({
  body: selectUserSchema.pick({
    email: true,
  })
})

export const loginSchema = z.object({
  body: selectUserSchema.pick({
    email: true,
    password: true,
  }),
});


const updateUserSchema = z.object({
  body: selectUserSchema
    .pick({
      name: true,
      email: true,
      password: true,
    })
    .partial(),
});


export const verifyTokenSchema = z.object({
  body: selectUserSchema.pick({
    email: true
  }).extend({
    token: z.string().or(z.number()).nonoptional()
  })
})


export const resetPasswordSchema = z.object({
  body: selectUserSchema.pick({
    email: true,
    password: true
  })
})



export type User = InferSelectModel<typeof users>;
export type NewUser = z.infer<typeof newUserSchema>['body']
export type UpdateUser = z.infer<typeof updateUserSchema>['body'];
