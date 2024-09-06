import { Link, LinkProps } from "react-router-dom"

interface AnchorButtonProps extends LinkProps {}

export default function AnchorButton({ className = "", ...props }: AnchorButtonProps) {
	return <Link className={`button button-primary ${className}`} {...props} />
}
