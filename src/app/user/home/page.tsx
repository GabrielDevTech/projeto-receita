// src/app/user/home/page.tsx
"use client"; //

import { useSession } from "next-auth/react"; //
import { useRouter } from "next/navigation"; //
import { useEffect } from "react"; //
// Remova: import SessionWrapper from "@/components/SessionWrapper"; //

export default function HomePage() {
    const { data: session, status } = useSession(); //
    const router = useRouter(); //

    useEffect(() => {
        if (status === "loading") return; //
        if (!session || !session.user) { //
            console.log("HomePage: Sem sessão, redirecionando para /login");
            router.push("/login"); //
        } else {
            console.log("HomePage: Sessão válida:", session.user.email);
        }
    }, [session, status, router]); //

    if (status === "loading") { //
        return <div>Carregando...</div>; //
    }

    if (!session || !session.user) { //
        // Se a sessão não é válida (e não está carregando), o useEffect já tentou redirecionar.
        // Retorne null para não renderizar nada enquanto espera o redirecionamento.
        return null; //
    }

    return (
        // Remova o SessionWrapper daqui
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <h1 className="text-3xl font-bold mb-6">Bem-vindo, {session.user.name || session.user.email || "Usuário"}!</h1> {/* */}
            <p className="text-lg mb-8">Esta é a sua página inicial. Aqui você pode gerenciar suas receitas e perfil.</p> {/* */}
            <div className="flex gap-4">
                <button
                    onClick={() => router.push("/user/recipes")}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Minhas Receitas
                </button>
                <button
                    onClick={() => router.push("/user/profile")}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    Meu Perfil
                </button>
            </div>
        </div>
    );
}