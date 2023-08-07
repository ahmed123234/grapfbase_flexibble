import Image from "next/image"
import { MouseEventHandler } from "react"

type props = {
    title: string
    type?: 'button' | 'submit'
    leftIcon?: string | null
    rightIcon?: string | null
    isSubmitting?: boolean
    handleClick?: MouseEventHandler
    bgColor?: string
    textColor?: string
}

const Button = ({ title, type, leftIcon, rightIcon, isSubmitting, bgColor, textColor, handleClick }: props ) => {
  return (
    <button
        type={type || 'button'}
        disabled={isSubmitting}
        className={`flexCenter gap-3 px-4 py-3 rounded-xl text-sm font-medium max-md:w-full
            ${isSubmitting ? 'bg-black/50' : bgColor || 'bg-primary-purple'}
         ${textColor|| 'text-white'}`}
        onClick={handleClick}
    >
        {leftIcon && <Image src={leftIcon} width={14} height={14} alt="left arrow" />}
        {title}
        {rightIcon && <Image src={rightIcon} width={14} height={14} alt="right arrow" />}
    </button>
  )
}

export default Button