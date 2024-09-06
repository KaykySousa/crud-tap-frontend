import { ReactNode, StrictMode } from "react"
import { createRoot } from "react-dom/client"

import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"

import "react-toastify/dist/ReactToastify.min.css"

import "./index.css"
import Login from "./pages/auth/Login.tsx"
import Register from "./pages/auth/Register.tsx"
import Users from "./pages/user/Users.tsx"
import CreateUser from "./pages/user/CreateUser.tsx"
import { api } from "./utils/api.ts"
import { IUser } from "./types/api.ts"
import EditUser from "./pages/user/EditUser.tsx"
import { useCookies } from "react-cookie"
import { toast, ToastContainer } from "react-toastify"

async function getUsers() {
	const [data, error] = await api<IUser>("/users")

	if (error || !data) {
		console.error(error)
		toast.error(error?.message)
		return {
			users: null,
		}
	}

	return {
		users: data,
	}
}

async function getUser({ params }: any) {
	const [data, error] = await api<IUser>(`/users/${params.id}`)

	if (error || !data) {
		console.error(error)
		toast.error(error?.message)
		return {
			users: null,
		}
	}

	return {
		user: data,
	}
}

const router = createBrowserRouter([
	{
		path: "/login",
		element: (
			<PublicRoute>
				<Login />
			</PublicRoute>
		),
	},
	{
		path: "/register",
		element: (
			<PublicRoute>
				<Register />
			</PublicRoute>
		),
	},
	{
		path: "/",
		loader: getUsers,
		element: (
			<PrivateRoute>
				<Users />
			</PrivateRoute>
		),
	},
	{
		path: "/new",
		element: (
			<PrivateRoute>
				<CreateUser />
			</PrivateRoute>
		),
	},
	{
		path: "/edit/:id",
		loader: getUser,
		element: (
			<PrivateRoute>
				<EditUser />
			</PrivateRoute>
		),
	},
])

function PrivateRoute({ children }: { children: ReactNode }) {
	const [cookies] = useCookies(["tap.token"])

	const token = cookies["tap.token"]

	if (!token) {
		return <Navigate to="/login" />
	}
	return children
}

function PublicRoute({ children }: { children: ReactNode }) {
	const [cookies] = useCookies(["tap.token"])

	const token = cookies["tap.token"]

	if (token) {
		return <Navigate to="/" />
	}
	return children
}

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<RouterProvider router={router} />
		<ToastContainer
			position="top-right"
			autoClose={5000}
			hideProgressBar={false}
			newestOnTop={false}
			closeOnClick
			rtl={false}
			pauseOnFocusLoss
			draggable
			pauseOnHover
			theme="colored"
		/>
	</StrictMode>
)
