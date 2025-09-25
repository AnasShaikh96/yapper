import { LoginPayload, LoginResponse, RegisterPayload, RegisterResponse } from "./type"

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3333'

const API_BASE = `${API_URL}/api/v1`

async function request<T>(path: string, init?: RequestInit): Promise<T> {
	const response = await fetch(`${API_BASE}${path}`, {
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			...(init?.headers ?? {}),
		},
		...init,
	})

	const isJson = response.headers.get('content-type')?.includes('application/json')
	const data = isJson ? await response.json() : undefined

	if (!response.ok) {
		const message = (data as any)?.message || 'Request failed'
		throw new Error(message)
	}

	return (data as T)
}



export async function login(payload: LoginPayload) {
	return request<LoginResponse>('/login', {
		method: 'POST',
		body: JSON.stringify(payload),
	})
}

export async function register(payload: RegisterPayload) {
	return request<RegisterResponse>('/users', {
		method: 'POST',
		body: JSON.stringify(payload),
	})
}
