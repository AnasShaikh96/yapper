import { EditorState } from "lexical";

export interface YapObject {
    id: number,
    value: string,
    title: string,
    content: string | EditorState
}

export type LoginPayload = {
    email: string
    password: string
}

export type LoginResponse = {
    status: number
    message: string
    data?: unknown
    accessToken?: string
    refreshToken?: string
}


export type RegisterPayload = {
    username: string
    email: string
    password: string
}

export type RegisterResponse = {
    status: number
    message: string
    data?: unknown
}

export type VerifyUserPayload = {
    email: string
}

export type VerifyUserResponse = {
    status: number
    message: string
}

export type ResetPasswordPayload = {
    email: string
    password: string
}

export type ResetPasswordResponse = {
    status: number
    message: string
}
