"use client";
import { useCallback, useRef, ReactNode } from "react";
import { useRouter} from 'next/navigation'
import Image from "next/image";

const Modal = ({ children }: { children: ReactNode} ) => {
    // create som kind of overlay
  const overlay = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const router = useRouter(); 

  const handleDismiss = useCallback(() => {
    router.push('/')
  }, [router])

  const handleClick = useCallback((e: React.MouseEvent) => {
    if(e.target == overlay.current && handleDismiss) {
        handleDismiss()
    }
  }, [handleDismiss, overlay])


  return (
    <div ref={overlay} className="modal" onClick={handleClick}>

        <button type="button" onClick={handleDismiss}
            className="absolute top-4 right-8"
        >
            <Image src='/close.svg' width={17} height={17} alt="close modal" />
        </button>

        <div ref={wrapper} className="modal_wrapper">
            {children}
        </div>
    </div>
  )
}

export default Modal