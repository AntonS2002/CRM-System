import styles from './IconButton.module.scss'
import type {MouseEventHandler, ReactNode} from "react";

interface IconButtonProps {
    children: ReactNode,
    onClick?: MouseEventHandler<HTMLButtonElement>,
    variant?: 'primary' | 'secondary',
    type?: 'button' | 'submit'
}


export const IconButton = ({onClick, children, variant = 'primary', ...props  }: IconButtonProps) => {

    return (
        <button className={`${styles.iconButton} ${styles[`iconButton--${variant}`]}`}
                onClick={onClick}
                {...props}>{children}</button>
    )
}
