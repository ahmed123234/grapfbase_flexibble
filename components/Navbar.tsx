import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { NavLinks } from '@/constant'
import AuthProviders from './AuthProviders'
import { getCurrentUser } from '@/lib/session'
import { signOut } from 'next-auth/react'
import { ProfileMenu } from '.';

const Navbar = async () => {
    const session = await getCurrentUser();
    
  return (
    <nav className='flexBetween navbar'>
        <div className="flex-1 flexStart gap-10">
            <Link href='/'>
                <Image 
                    src='/logo.svg'
                    alt='Logo of the website'
                    width={115}
                    height={43}
                />
            </Link>
            <ul className='xl:flex hidden text-sm gap-7'>
                {NavLinks.map(link => 
                    <Link href={link.href} key={link.key}>{link.text}</Link>    
                )}
            </ul>
        </div>
        <div className="flexCenter gap-4">
            {session?.user ? 
            <>
                <ProfileMenu session={session} />
                
                <Link href='/create-project'>Share Work</Link>
                
            </> 
            :
            <AuthProviders />

        }
        </div>
    </nav>
  )
}

export default Navbar