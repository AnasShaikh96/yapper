import type { InferSelectModel } from 'drizzle-orm';
import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { users } from './user';



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



const selectedNotesSchema = createSelectSchema(notes, {
    title: z.string().optional()
});

export const newNotesSchema = z.object({
    body: selectedNotesSchema.pick({
        content: true,
        title: true
    })
})


export type Note = InferSelectModel<typeof notes>
