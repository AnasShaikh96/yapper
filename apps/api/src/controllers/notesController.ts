import { createNoteService, deleteNoteService, getAllNotesService, getNotesByIdService, updateNoteService } from "../models/notesModel";
import { ApiError } from "../utils/ApiError";
import catchAsync from "../utils/catchAsync";
import type { Request, Response } from 'express'

export const createNote = catchAsync(async (req: Request, res: Response) => {

    const note = req.body
    const { userId } = req.cookies

    const result = await createNoteService(userId, note);
    return result
})

export const getAllNotes = catchAsync(async (req: Request, res: Response) => {
    const { userId } = req.cookies;
    const result = await getAllNotesService(userId);
    return result
})


export const getNoteById = catchAsync(async (req: Request, res: Response) => {
    const { noteId } = req.params;
    const result = await getNotesByIdService(noteId);
    if (result.length === 0) throw new ApiError(404, 'Note not found!')
    return result
})



export const updateNoteById = catchAsync(async (req: Request, res: Response) => {
    const { noteId } = req.params;
    const userId = req.cookies;
    const note = req.body
    const result = await updateNoteService(userId, noteId, note);
    if (result.length === 0) throw new ApiError(404, 'Note not found!')
    return result
})


export const deleteNoteById = catchAsync(async (req: Request, res: Response) => {
    const { noteId } = req.params;
    const userId = req.cookies

    const result = await deleteNoteService(userId, noteId);
    if (result.length === 0) throw new ApiError(404, 'Note not found!')
    return result
})