import type { Request, Response } from "express"
import { createUserService, deleteUserByIdService, getUserByIdService, getUsersService, updateUserByIdService } from "../models/userModel"
import { sendResponse } from "../utils/response";
import status from "http-status";
import catchAsync from "../utils/catchAsync";


export const getUserById = catchAsync(async (req:Request, res: Response) => {
    const { id } = req.params
    const user = await getUserByIdService(id);
    sendResponse(res, 200, status[status.FOUND], user)
})


export const getUsers = catchAsync(async (req: Request, res: Response) => {
    const user = await getUsersService();
    sendResponse(res, 200, status[status.FOUND], user)
})


export const createUser = catchAsync(async (req: Request, res: Response) => {


    const user = req.body    
    const newUser = await createUserService(user);
    sendResponse(res, status.CREATED, status[status.CREATED], newUser.rows[0])
})

export const updateUser = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = req.body;

    const updateUser = await updateUserByIdService(user, id);
    sendResponse(res, 200, status[200], updateUser)
})

export const deleteUser = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const user = await deleteUserByIdService(id);
    sendResponse(res, 200, status[200], user)
})