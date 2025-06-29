// src/app/login/page.tsx
"use client"; //

import { useState, useEffect } from "react";
import { GalleryVerticalEnd } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession, signIn } from "next-auth/react"; //
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
// Remova: import { SessionProvider } from "next-auth/react"; //

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/user/home";
    const { data: session, status } = useSession(); //

    useEffect(() => {
        // Este useEffect já lida com o redirecionamento após a sessão ser carregada/atualizada
        if (status === "loading") return; //
        if (session && session.user) { //
            console.log("LoginPage: Sessão detectada no useEffect. Redirecionando para", callbackUrl);
            router.push(callbackUrl); //
        }
    }, [session, status, router, callbackUrl]); //

    if (status === "loading") { //
        return <div>Carregando...</div>; //
    }

    // Se a sessão já existe, e não está carregando, não precisa renderizar o formulário
    // O useEffect acima já teria disparado o redirecionamento.
    // Este `if` é mais uma garantia visual caso o redirecionamento demore um micro-momento.
    if (session && session.user) {
        return <div>Você já está logado! Redirecionando...</div>;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const result = await signIn("credentials", {
                redirect: false, //
                email,
                password,
            });

            if (result?.error) { //
                setError("Credenciais inválidas. Por favor, tente novamente."); //
            } else {
                console.log("Login bem-sucedido. useSession agora deve atualizar e disparar o useEffect.");
                // NADA A FAZER AQUI - o useEffect acima vai capturar a atualização da sessão
                // e fazer o redirecionamento.
            }
        } catch {
            setError("Ocorreu um erro. Por favor, tente novamente.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        // Remova o SessionProvider daqui, pois ele já está no layout.tsx via providers.tsx
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <a href="#" className="flex items-center gap-2 font-medium">
                        <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                            <GalleryVerticalEnd className="size-4" />
                        </div>
                        Acme Inc.
                    </a>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <form className={cn("flex flex-col gap-6")} onSubmit={handleSubmit}>
                            <div className="flex flex-col items-center gap-2 text-center">
                                <h1 className="text-2xl font-bold">Faça login na sua conta</h1>
                                <p className="text-muted-foreground text-sm text-balance">
                                    Insira seu email abaixo para fazer login na sua conta
                                </p>
                                {error && <p className="text-red-500 text-sm">{error}</p>}
                            </div>
                            <div className="grid gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="seu.email@exemplo.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Senha</Label>
                                        <a
                                            href="#"
                                            className="ml-auto text-sm underline-offset-4 hover:underline"
                                        >
                                            Esqueceu sua senha?
                                        </a>
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? "Entrando..." : "Login"}
                                </Button>
                                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                                    <span className="bg-background text-muted-foreground relative z-10 px-2">
                                        Ou continue com
                                    </span>
                                </div>
                                <Button variant="outline" className="w-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path
                                            d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    Login com GitHub
                                </Button>
                            </div>
                            <div className="text-center text-sm">
                                Não tem uma conta?{" "}
                                <Link href="/register" className="underline underline-offset-4">
                                    Registre-se
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="bg-muted relative hidden lg:block">
                <Image
                    src="/placeholder.svg"
                    alt="Image"
                    width={1920}
                    height={1080}
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    );
}