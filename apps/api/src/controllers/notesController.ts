import { createNoteService, deleteNoteService, getAllNotesService, getNotesByIdService, updateNoteService } from "../models/notesModel";
import { ApiError } from "../utils/ApiError";
import catchAsync from "../utils/catchAsync";
import type { Request, Response } from 'express'
import { sendResponse } from "../utils/response";

export const createNote = catchAsync(async (req: Request, res: Response) => {

    const note = req.body
    const { userId } = req.query

    if (userId === undefined || typeof userId !== 'string') throw new ApiError(404, 'User Id not provided');
    const result = await createNoteService(userId, note);

    sendResponse(res, 201, "Notes created successfully", result)
})

export const getAllNotes = catchAsync(async (req: Request, res: Response) => {
    const { userId } = req.query;
    if (userId === undefined || typeof userId !== 'string') throw new ApiError(404, 'User Id not provided');

    const result = await getAllNotesService(userId);
    sendResponse(res, 200, "Notes fetched successfully", result)
})


export const getNoteById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    console.log("note printint", req.params)

    const result = await getNotesByIdService(id);

    if (result.length === 0) throw new ApiError(404, 'Note not found!')
    sendResponse(res, 200, "Notes fetched successfully", result)
})



export const updateNoteById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { userId } = req.query;
    const note = req.body
    if (userId === undefined || typeof userId !== 'string') throw new ApiError(404, 'User Id not provided');

    const result = await updateNoteService(userId, id, note);
    if (result.length === 0) throw new ApiError(404, 'Note not found!')
    sendResponse(res, 200, "Notes updated successfully", result)

})


export const deleteNoteById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { userId } = req.query

    if (userId === undefined || typeof userId !== 'string') throw new ApiError(404, 'User Id not provided');

    const result = await deleteNoteService(userId, id);
    if (result.length === 0) throw new ApiError(404, 'Note not found!')
    sendResponse(res, 200, "Notes deleted successfully", result)
})