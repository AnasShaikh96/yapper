import { eq } from "drizzle-orm"
import { db } from "../db/db"
import { Note, notes } from "../schema/user"
import { ApiError } from "../utils/ApiError";



export const getNotesByIdService = async (noteId: string) => {
    const note = await db.select().from(notes).where(eq(notes.id, noteId));
    if (note.length === 0) throw new ApiError(404, 'Notes with given ID does not exists');
    return note
}


export const getAllNotesService = async (userId: string) => {
    const allNote = await db.select().from(notes).where(eq(notes.userId, userId));
    return allNote;
}


export const createNoteService = async (userId: string, note: Note) => {
    const createNote = await db.insert(notes).values({
        ...note,
        userId: userId
    }).returning();

    return createNote
}

export const updateNoteService = async (userId: string, id: string, note: Note) => {
    const updateNote = await db.update(notes).set(note).where(eq(notes.id, id)).returning();
    return updateNote
}


export const deleteNoteService = async (userId: string, id: string) => {
    const deleteNote = await db.delete(notes).where(eq(notes.id, id)).returning({
        id: notes.id
    })
    return deleteNote;
}