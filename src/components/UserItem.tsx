import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid"
import { IUser } from "../types/api"
import IconButton from "./design/IconButton"
import { useState } from "react"
import Modal from "./Modal"
import { api } from "../utils/api"
import { useRevalidator } from "react-router-dom"
import AnchorIconButton from "./design/AnchorIconButton"
import { toast } from "react-toastify"

interface UserItemProps {
	user: IUser
}

export default function UserItem({ user }: UserItemProps) {
	const revalidator = useRevalidator()
	const [showDeleteModal, setShowDeleteModal] = useState(false)

	async function handleDelete() {
		const [_data, error] = await api(`/users/${user.id}`, {
			method: "DELETE",
		})

		if (error) {
			console.error(error)
			toast.error(error?.message)
			return
		}

		setShowDeleteModal(false)
		revalidator.revalidate()
	}

	return (
		<>
			<div className="flex flex-col py-2 px-6 border-fuchsia-700 rounded border-l-4 gap-2 md:flex-row md:items-center">
				<div className="flex flex-col flex-1 ">
					<div className="flex items-center">
						<h2 className="font-medium text-lg">
							{user.name}, <span className="font-normal opacity-80">{user.age}</span>
						</h2>
					</div>
					<p className="text-white/80 mt-2 text-sm">Gênero: {user.gender}</p>
					{user.address.postalCode && (
						<a
							href={`https://www.google.com/maps/search/${user.address.postalCode}`}
							className="text-white/80 mt-2 text-sm transition-colors hover:text-fuchsia-600"
							target="_blank"
							rel="noopener noreferrer"
						>
							{user.address.street} - {user.address.city}, {user.address.state}
						</a>
					)}
				</div>
				<div className="flex items-center gap-x-2 -ml-1.5 md:ml-0">
					<AnchorIconButton to={`/edit/${user.id}`} Icon={PencilSquareIcon} />
					<IconButton
						Icon={TrashIcon}
						className="hover:!text-red-500"
						onClick={() => setShowDeleteModal(true)}
					/>
				</div>
			</div>
			<Modal
				show={showDeleteModal}
				onClose={() => setShowDeleteModal(false)}
				onConfirm={handleDelete}
			/>
		</>
	)
}
