import express from "express";
import { createUser, deleteUser, getUserById, getUsers, updateUser } from "../controllers/userController";
import { validateBody, validateParams } from "../utils/validate";
import { newUserSchema, userByIdSchema } from "../schema/user";


const router = express.Router();

router.get('/users', getUsers);
router.post('/users', validateBody(newUserSchema), createUser);

router.get('/users/:id', validateParams(userByIdSchema), getUserById);
router.patch('/users/:id', validateParams(userByIdSchema), updateUser);
router.delete('/users/:id', validateParams(userByIdSchema), deleteUser);

export default router