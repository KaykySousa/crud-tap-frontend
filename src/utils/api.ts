import { Cookies } from "react-cookie"

type Result<T> = Promise<[T] | [undefined, Error]>

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function api<T = any>(url: string, options: RequestInit = {}): Result<T> {
	const cookie = new Cookies()
	const token = cookie.get("tap.token")

	let data: T | undefined
	let error: Error | undefined

	try {
		const res = await fetch(`${API_BASE_URL}${url}`, {
			...options,
			headers: {
				"Content-Type": "application/json",
				Authorization: `${token}`,
				...options.headers,
			},
		})

		try {
			data = await res.json()
		} catch (e) {
			data = undefined
		}

		if (!res.ok) {
			if ((data as any)?.message) {
				error = new Error((data as any)?.message)
			} else {
				error = new Error("An error occurred")
			}
		}
	} catch (e) {
		if (e instanceof Error) {
			error = e
		}
	}

	if (error) {
		return [undefined, error]
	}

	return [data!]
}
