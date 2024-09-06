import { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	loading?: boolean
}

export default function Button({
	loading,
	disabled,
	children,
	type = "button",
	className = "",
	...props
}: ButtonProps) {
	return (
		<button
			type={type}
			className={`button button-primary ${className}`}
			disabled={disabled || loading}
			{...props}
		>
			{!loading ? (
				children
			) : (
				<div className="flex justify-center items-center gap-x-2">
					<div className="w-6 h-6 border-2 border-fuchsia-200 border-t-transparent rounded-full animate-spin"></div>
				</div>
			)}
		</button>
	)
}
