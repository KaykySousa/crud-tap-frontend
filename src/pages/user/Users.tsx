import { useLoaderData } from "react-router-dom"
import UserItem from "../../components/UserItem"
import { IUser } from "../../types/api"
import AnchorButton from "../../components/design/AnchorButton"
import IconButton from "../../components/design/IconButton"
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/solid"
import { useCookies } from "react-cookie"

export default function Users() {
	const { users } = useLoaderData() as { users: IUser[] | null }
	const [_cookies, _setCookie, removeCookie] = useCookies(["tap.token"])

	function logout() {
		removeCookie("tap.token", {
			path: "/",
		})
	}

	return (
		<div className="w-full min-h-screen relative overflow-hidden background text-white">
			<div className="w-full min-h-screen max-w-2xl mx-auto py-12 flex flex-col">
				<header className="flex items-center mb-8 px-6">
					<h1 className="text-2xl font-medium flex-1">
						usuários<span className="text-fuchsia-600 text-3xl">.</span>
					</h1>
					<AnchorButton to="/new" className="mr-2">
						novo usuário
					</AnchorButton>
					<IconButton Icon={ArrowLeftStartOnRectangleIcon} onClick={logout} />
				</header>
				<main className="px-6 grid grid-flow-row gap-y-4">
					{users && users.map((user) => <UserItem key={`user_${user.id}`} user={user} />)}
				</main>
			</div>
		</div>
	)
}
