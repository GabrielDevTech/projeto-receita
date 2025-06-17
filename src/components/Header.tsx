"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Header() {
    const { data: session } = useSession();

    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <nav className="flex items-center gap-6">
                    <Link href="/" className="text-xl font-bold text-indigo-600">
                        Site de Receitas
                    </Link>
                    <Link href="/" className="text-gray-700 hover:text-indigo-600">
                        Início
                    </Link>
                </nav>
                <div>
                    {session ? (
                        <div className="flex items-center gap-4">
                            <span className="text-gray-700 font-medium">
                                {session.user?.name || session.user?.email || "Usuário"}
                            </span>
                            <Link href="/api/auth/signout" className="text-sm text-red-600 hover:text-red-800">
                                Sair
                            </Link>
                        </div>
                    ) : (
                        <Link href="/login" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}
