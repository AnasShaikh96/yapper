import express from "express";
import { createUser, deleteUser, getUsers, loginUser, updateUser, updateUserPassword, verifyUserEmail, verifyUserToken } from "../controllers/userController";
import { validateBody } from "../utils/validate";
import { newUserSchema, resetPasswordSchema, verifyTokenSchema, verifyUserSchema } from "../schema/user";
import { verifyToken } from "../utils/auth";
import { verifyRefreshToken } from "../middleware/refresh";


const router = express.Router();

router.get('/users', verifyToken, getUsers);
router.post('/users', validateBody(newUserSchema), createUser);

router.post('/login', loginUser)

router.post('/verify-user', validateBody(verifyUserSchema), verifyUserEmail)
router.post('/verify-token', validateBody(verifyTokenSchema), verifyUserToken)

router.post('/reset-password', validateBody(resetPasswordSchema), updateUserPassword)

router.patch('/users', verifyToken, updateUser);
router.delete('/users', verifyToken, deleteUser);

// refresh access token using refresh token cookie
router.post('/refresh-token', verifyRefreshToken, (req, res) => {
  const tokens = (req as any).rotatedTokens
  return res.status(200).json({ status: 200, message: 'Token refreshed', ...(tokens ?? {}) })
});

export default router