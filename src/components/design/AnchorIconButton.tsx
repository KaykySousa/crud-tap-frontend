import { ElementType } from "react"
import { Link, LinkProps } from "react-router-dom"

interface AnchorIconButtonProps extends LinkProps {
	Icon: ElementType
	iconClassName?: string
}

export default function AnchorIconButton({
	Icon,
	iconClassName = "",
	className = "",
	...props
}: AnchorIconButtonProps) {
	return (
		<Link
			className={`p-1.5 rounded-full transition-colors text-white/80 group hover:text-white hover:bg-gray-800/60 ${className}`}
			{...props}
		>
			<Icon className={`h-6 w-6 ${iconClassName}`} />
		</Link>
	)
}
