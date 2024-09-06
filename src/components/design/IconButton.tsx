import { ButtonHTMLAttributes, ElementType } from "react"

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	Icon: ElementType
	iconClassName?: string
}

export default function IconButton({
	Icon,
	iconClassName = "",
	type = "button",
	className = "",
	...props
}: IconButtonProps) {
	return (
		<button
			type={type}
			className={`p-1.5 rounded-full transition-colors text-white/80 group hover:text-white hover:bg-gray-800/60 ${className}`}
			{...props}
		>
			<Icon className={`h-6 w-6 ${iconClassName}`} />
		</button>
	)
}
