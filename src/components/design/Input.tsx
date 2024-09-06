import { ElementType, InputHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string
	Icon?: ElementType
	togglePassword?: boolean
}

export default function Input({ label, Icon, togglePassword, type = "text", ...props }: InputProps) {
	return (
		<label className="flex flex-col">
			{label && <span className="text-white font-medium mb-1.5">{label}</span>}
			<div className="flex flex-col justify-center relative">
				<input
					type={type}
					className={`rounded-md w-full shadow-sm py-3 px-3 bg-gray-900/80 border-gray-700 text-white focus:border-fuchsia-700 !ring-fuchsia-700 transition-colors peer ${
						Icon ? "pl-11" : ""
					}`}
					{...props}
				/>
				{Icon && (
					<Icon className="absolute h-6 w-6 text-gray-500/60 left-3 pointer-events-none peer-focus:text-fuchsia-700 transition-colors" />
				)}
			</div>
		</label>
	)
}
