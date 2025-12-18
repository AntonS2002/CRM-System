import styles from './IconButton.module.scss'
import type {MouseEventHandler, ReactNode} from "react";

interface IconButtonProps {
    children: ReactNode,
    onClick?: MouseEventHandler<HTMLButtonElement>,
    variant?: 'primary' | 'secondary'
}


export const IconButton = ({onClick, children, variant, ...props  }: IconButtonProps) => {

    return (
        <button className={`${styles.iconButton} ${styles[`iconButton--${variant}`]}`}
                onClick={onClick}
                {...props}>{children}</button>
    )
}
