"use client";
import { navLinks } from "@/app/data/navLinks";
import { MenuIcon, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function Navbar() {
    const [openMobileMenu, setOpenMobileMenu] = useState(false);

    useEffect(() => {
        if (openMobileMenu) {
            document.body.classList.add("max-md:overflow-hidden");
        } else {
            document.body.classList.remove("max-md:overflow-hidden");
        }
    }, [openMobileMenu]);

    return (
        <nav className={` flex items-center justify-between fixed z-50 top-0 w-full px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-slate-200 bg-white/40 ${openMobileMenu ? 'bg-white/80' : 'backdrop-blur'}`}>
            <a href="" className="">
                <Image className=" w-32 md:w-50 lg:w-60 h-auto shrink-0" src="/assets/logo/largo/inbursa_logo_largo_azulFuerte.svg" alt="Logo" width={200} height={60}/>
            </a>
            <div className="hidden items-center md:gap-8 lg:gap-9 md:flex lg:pl-20">
                {navLinks.map((link) => (
                    <Link key={link.name} href={link.href} className="hover:text-indigo-600">
                        {link.name}
                    </Link>
                ))}
            </div>
            {/* Mobile menu */}
            <div className={` fixed inset-0 flex flex-col items-center justify-center gap-6 text-lg font-medium bg-white/40 backdrop-blur-md md:hidden transition duration-300 ${openMobileMenu ? "translate-x-0" : "-translate-x-full"}`}>
                {navLinks.map((link) => (
                    <Link key={link.name} href={link.href} 
                    className="
                        hover:text-primary
                        hover:border border-indigo-600
                        px-4 py-2
                        rounded-md
                        transition-colors
                        cursor-pointer"
                    >
                        {link.name}
                    </Link>
                ))}
                <Link
                    href="/registrarse"
                    className="
                        hover:text-primary
                        px-4 py-2
                        rounded-md
                        transition-colors
                        cursor-pointer
                        bg-secondary
                        hover:bg-secondary-hover
                        border
                    "
                    >
                    Registrarse
                </Link>
                <Link
                    href="/login"
                    className="
                        text-background
                        px-4 py-2
                        rounded-md
                        transition-colors
                        cursor-pointer
                        bg-primary
                        hover:bg-primary-hover
                        border
                    "
                    >
                    Iniciar sesión
                </Link>
                <button className="cursor-pointer aspect-square size-10 p-1 items-center justify-center bg-primary hover:bg-primary-hover transition text-white rounded-md flex" onClick={() => setOpenMobileMenu(false)}>
                    <XIcon />
                </button>
            </div>
            <div className="flex items-center gap-4">
                <Link href="/registrarse" className="cursor-pointer hidden md:block hover:bg-slate-100 transition px-4 py-2 border border-focus rounded-md">
                    Registrarse
                </Link>
                <Link href="/login" className="cursor-pointer hidden md:block px-4 py-2 bg-focus hover:bg-focus-hover transition text-white rounded-md">
                    Iniciar sesión
                </Link>
                <button onClick={() => setOpenMobileMenu(!openMobileMenu)} className="md:hidden">
                    <MenuIcon size={26} className="active:scale-90 transition cursor-pointer" />
                </button>
            </div>

            <div>

            </div>
        </nav>
    );
}