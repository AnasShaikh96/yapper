import type { Request, Response } from "express"
import { createUserService, deleteUserByIdService, getUserByIdService, getUserByKeyVal, updateUserByIdService } from "../models/userModel"
import { sendResponse } from "../utils/response";
import status from "http-status";
import catchAsync from "../utils/catchAsync";
import { ApiError } from "../utils/ApiError";
import { generateToken } from "../utils/auth";
import { config } from "../utils/config";
const bcrypt = require('bcrypt');



export const loginUser = catchAsync(async (req: Request, res: Response) => {

    const { email, password } = req.body;


    const user = await getUserByKeyVal('email', email);

    if (user.length === 0) throw new ApiError(404, 'User with email does not exists');

    const storedUser = user[0];
    const comparePassword = await bcrypt.compare(password, storedUser.password);

    if (!comparePassword) throw new ApiError(400, 'Password does not match!');

    const { accessToken, refreshToken } = generateToken(storedUser);
    

    res.status(200)
        .cookie('accessToken', accessToken, config.cookieOptions)
        .cookie('refreshToken', refreshToken, config.cookieOptions)
        .json({
            status: 200,
            message: 'User Logged in Successfully!',
            data: user,
            accessToken,
            refreshToken
        })
})


export const getUserById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const user = await getUserByIdService(id);

    if (user.length === 0) throw new ApiError(404, 'User with given ID cannot be found!')

    sendResponse(res, 200, status[status.FOUND], user)
})


export const getUsers = catchAsync(async (req: Request, res: Response) => {

    const loggedInUser = req.user;
    const user = await getUserByIdService(loggedInUser.id)
    sendResponse(res, 200, status[status.FOUND], user)
})


export const createUser = catchAsync(async (req: Request, res: Response) => {
    const user = req.body;

    const checkUserMail = await getUserByKeyVal('email', user.email);

    if (checkUserMail.length !== 0) {
        throw new ApiError(400, 'Email already exists',)
    }

    const checkUserName = await getUserByKeyVal('username', user.username);

    if (checkUserName.length !== 0) {
        throw new ApiError(400, 'Username is already taken')
    }

    const newUser = await createUserService(user);
    sendResponse(res, status.CREATED, status[status.CREATED], newUser)
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

    if (!user) throw new ApiError(404, 'User with given ID cannot be found!')

    sendResponse(res, 200, status[200], user)
})