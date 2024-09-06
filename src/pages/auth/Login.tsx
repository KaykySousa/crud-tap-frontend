import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/solid"
import Input from "../../components/design/Input"
import Button from "../../components/design/Button"
import { FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"
import { api } from "../../utils/api"
import { toast } from "react-toastify"

export default function Login() {
	const [_cookies, setCookie] = useCookies(["tap.token"])
	const navigate = useNavigate()

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()

		const formData = new FormData(e.currentTarget)

		const [data, error] = await api<{ token: string }>("/auth/login", {
			method: "POST",
			body: JSON.stringify(Object.fromEntries(formData)),
		})

		if (error || !data) {
			console.error(error)
			toast.error(error?.message)
			return
		}

		const { token } = data

		setCookie("tap.token", token, {
			path: "/",
			maxAge: 60 * 60 * 24 * 30, // 30 days
		})

		navigate("/")
	}

	return (
		<div className="w-full min-h-screen relative overflow-hidden background text-white">
			<div className="w-full min-h-screen max-w-lg mx-auto px-6 flex flex-col justify-center">
				<h1 className="text-2xl mb-8 font-medium">
					bem-vindo<span className="text-fuchsia-600 text-3xl ml-1">!</span>
				</h1>
				<form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
					<Input Icon={EnvelopeIcon} name="email" label="e-mail" type="email" />
					<Input
						Icon={LockClosedIcon}
						name="password"
						label="senha"
						type="password"
						togglePassword
					/>

					<Button type="submit" className="mt-4">
						entrar
					</Button>
				</form>
				<Link
					to="/register"
					className="text-sm mt-5 py-1 self-start font-medium transition-opacity opacity-80 hover:opacity-100"
				>
					ainda não tem uma conta? <span className="text-fuchsia-600">cadastre-se!</span>
				</Link>
			</div>
		</div>
	)
}
