"use client";
import { Menu } from "@headlessui/react"
import Image from "next/image"

type props = {
    title: string
    state: string
    filters: Array<string>
    setState: (value: string) => void 

}
const CustomMenu = ({title, state, filters, setState}: props) => {
  return (
    <div
        className="flexStart flex-col w-full gap-7 relative"
    >
       <label htmlFor={title} className="w-full text-gray-100">{title}</label>
       <Menu as='div' className='self-start relative'>
            <div>
                <Menu.Button className="flexCenter custom_menu-btn">
                    {state || "Select a category"}
                    <Image  src='/arrow-down.svg' alt="arrow down" width={10} height={5}/>
                </Menu.Button>
            </div>
            <Menu.Items className='flexStart custom_menu-items'>
                {filters.map(filter => (
                    <Menu.Item key={filter}>
                        <button
                            type="button"
                            value={filter}
                            className='custom_menu-item'
                            // we use currentTarget because we use button inside the menu item and not just a regular input
                            onClick={(e) => setState(e.currentTarget.value)}
                        >
                            {filter}
                        </button>
                    </Menu.Item>
                ))}
            </Menu.Items>
       </Menu>
    </div>
  )
}

export default CustomMenu