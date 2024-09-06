import { ExclamationTriangleIcon } from "@heroicons/react/24/solid"
import Button from "./design/Button"

interface ModalProps {
	show: boolean
	onClose?: () => void
	onConfirm?: () => void
}

export default function Modal({ show, onClose, onConfirm }: ModalProps) {
	if (!show) return null

	return (
		<div
			className="fixed bg-gray-950/40 top-0 left-0 min-h-screen w-full z-50 flex justify-center items-end p-4 backdrop-blur-[2px] min-[480px]:items-center"
			onClick={onClose}
		>
			<div
				className="flex flex-col bg-gray-900 shadow w-full rounded min-[480px]:max-w-lg"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="flex flex-col items-center p-6 text-center min-[480px]:text-start">
					<div className="flex flex-col items-center gap-6 min-[480px]:items-start min-[480px]:flex-row">
						<ExclamationTriangleIcon className="h-6 w-6 box-content text-fuchsia-600 bg-gray-950 p-3 rounded-full flex-shrink-0" />
						<div className="flex flex-col">
							<h1 className="text-xl font-medium">
								excluir usuário<span className="text-fuchsia-600 text-2xl">.</span>
							</h1>
							<p className="text-white/80 mt-2 text-sm">
								você tem certeza que deseja excluir este usuário? esta ação não pode ser
								desfeita.
							</p>
						</div>
					</div>
					<div className="w-full mt-6 flex flex-col gap-2 min-[480px]:flex-row-reverse">
						<Button className="!py-2 !text-base" onClick={onConfirm}>
							excluir
						</Button>
						<Button className="!button-outline-primary !py-2 !text-base" onClick={onClose}>
							cancelar
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}
