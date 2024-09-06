import { CakeIcon, MapPinIcon, UserIcon, UsersIcon } from "@heroicons/react/24/solid"
import Input from "../../components/design/Input"
import Button from "../../components/design/Button"
import { FormEvent } from "react"
import { api } from "../../utils/api"
import { Link, useLoaderData, useNavigate } from "react-router-dom"
import { IUser } from "../../types/api"
import { toast } from "react-toastify"

export default function EditUser() {
	const navigate = useNavigate()
	const { user } = useLoaderData() as { user: IUser | null }

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()

		const formData = new FormData(e.currentTarget)

		const [data, error] = await api(`/users/${user?.id}`, {
			method: "PATCH",
			body: JSON.stringify(Object.fromEntries(formData)),
		})

		if (error || !data) {
			console.error(error)
			toast.error(error?.message)
			return
		}

		navigate("/")
	}

	return (
		<div className="w-full min-h-screen relative overflow-hidden background text-white">
			<div className="w-full min-h-screen max-w-lg mx-auto px-6 flex flex-col justify-center">
				<Link
					to="/"
					className="text-white/80 self-start mb-2 transition-colors hover:text-fuchsia-600"
				>
					voltar
				</Link>
				<h1 className="text-2xl mb-8 font-medium">
					editar usuário<span className="text-fuchsia-600 text-3xl ml-1">.</span>
				</h1>
				<form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
					<Input Icon={UserIcon} name="name" label="nome" defaultValue={user?.name} required />
					<div className="flex gap-4">
						<Input
							Icon={CakeIcon}
							name="age"
							label="idade"
							min={0}
							max={150}
							type="number"
							defaultValue={user?.age}
							required
						/>
						<Input
							Icon={UsersIcon}
							name="gender"
							label="gênero"
							defaultValue={user?.gender}
							required
						/>
					</div>
					<Input
						Icon={MapPinIcon}
						name="cep"
						label="cep"
						maxLength={9}
						placeholder="00000-000"
						pattern="^\d{5}-?\d{3}$"
						defaultValue={user?.address.postalCode}
						required
					/>

					<Button type="submit" className="mt-4">
						editar
					</Button>
				</form>
			</div>
		</div>
	)
}
