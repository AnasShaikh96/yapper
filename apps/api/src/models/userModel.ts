import { eq } from "drizzle-orm"
import { db } from "../db/db"
import { NewUser, User, users } from "../schema/user"
const bcrypt = require('bcrypt')


export const getUserByKeyVal = async <k extends keyof User>(key: k, value: string) => {
    const user = await db.select().from(users).where(eq(users[key], value))
    return user
}


export const getUserByIdService = async (userId: string) => {
    const user = await db.select().from(users).where(eq(users.id, userId))
    return user
}

export const getUsersService = async () => {
    const allUser = await db.select().from(users);
    return allUser
}

export const createUserService = async (user: NewUser) => {

    const { email, username, password } = user;
    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await db.insert(users).values({
        email, username,
        password: hashedPassword
    }).returning()

    return createdUser;
}


export const updateUserByIdService = async (user: User, id: string) => {
    const updatedUser = await db.update(users).set(user).where(eq(users.id, id)).returning();
    return updatedUser
}


export const deleteUserByIdService = async (id: string) => {

    const [deletedUser] = await db.delete(users).where(eq(users.id, id)).returning({
        id: users.id,
        email: users.email,
        username: users.username
    })

    return deletedUser;

} 