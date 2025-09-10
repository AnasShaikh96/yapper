import express from "express";
import { createUser, deleteUser, getUserById, getUsers, loginUser, updateUser } from "../controllers/userController";
import { validateBody, validateParams } from "../utils/validate";
import { newUserSchema, userByIdSchema } from "../schema/user";
import { verifyToken } from "../utils/auth";


const router = express.Router();

router.get('/users', verifyToken, getUsers);
router.post('/users', validateBody(newUserSchema), createUser);

router.post('/login', loginUser)


// router.get('/users/:id', validateParams(userByIdSchema), getUserById);
router.patch('/users/:id', validateParams(userByIdSchema), updateUser);
router.delete('/users/:id', validateParams(userByIdSchema), deleteUser);

export default router