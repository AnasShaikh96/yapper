import express from "express";
import { createUser, deleteUser, getUserById, getUsers, updateUser } from "../controllers/userController";
import { validateBody, validateParams } from "../utils/validate";
import z from "zod";
import { newUserSchema } from "../schema/user";


export const idParam = z.object({
    id: z.number().positive(),
})

const router = express.Router();

router.get('/users', getUsers);
router.post('/users', validateBody(newUserSchema), createUser);
router.get('/users/:id', validateParams(idParam), getUserById);
router.patch('/users/:id', validateParams(idParam), updateUser);
router.delete('/users/:id', validateParams(idParam), deleteUser);

export default router