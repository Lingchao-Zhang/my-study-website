'use client'

import { NavLinks } from "@/constants"
import Image from "next/image"
import Link from "next/link"
import ProfileMenu from "./ProfileMenu"
import AuthProvider from "./AuthProvider"
import { useSearchParams } from "next/navigation"
import { createQueryString } from "@/utils"

const NavBar = () => {
    const sessionParams = useSearchParams().get('session')
    const userSession = sessionParams ? JSON.parse(sessionParams) : {}
    
    return(
        <nav className="flexBetween navbar">
            <div className="flex-1 flexStart gap-10">
                <Link href={`/?${createQueryString('session', JSON.stringify(userSession))}`}>
                    <Image 
                      src="/logo.svg"
                      width={115}
                      height={43}
                      alt="logo"
                    />
                </Link>
                <ul className="xl:flex hidden text-small gap-7">
                    {
                        NavLinks.map((navLink) => 
                        <Link key={navLink.key} href={navLink.href}>{navLink.text}</Link>
                        )
                    }
                </ul>
            </div>
            <div className="flexCenter gap-4">
                {
                    userSession.user 
                    ? 
                    <ProfileMenu session={userSession} />
                    :
                    <AuthProvider />
                }
            </div>
        </nav>
    )
}

export default NavBar