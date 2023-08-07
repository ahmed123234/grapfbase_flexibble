import React from 'react'

type props = {
    type?: string
    title: string
    state: string
    placeholder: string
    isTextArea?: boolean
    setState: (value: string) => void
}
const FormField = ({ title, state, placeholder, setState, type, isTextArea } : props) => {
  return (
    // here is the layout of my copmonent

    <div 
        className='flexStart flex-col w-full gap-4'
    >
        <label className='w-full text-gray-100 title'>{title}</label>
        {isTextArea ? (
            <textarea 
                placeholder={placeholder}
                value={state}
                required
                className='form_field-input'
                onChange={(e) => setState(e.target.value)}
            />
        ): (
            <input type={type || "text"} 
                placeholder={placeholder}
                value={state}
                required
                className='form_field-input'
                onChange={(e) => setState(e.target.value)}
            />
        )}
    </div>
  )
}

export default FormField