"use client";

import { GalleryVerticalEnd } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import SessionWrapper from "@/components/SessionWrapper"

export default function RegisterPage() {
    return (
        <SessionWrapper>
            <div className="grid min-h-svh lg:grid-cols-2">
                <div className="flex flex-col gap-4 p-6 md:p-10">
                    <div className="flex justify-center gap-2 md:justify-start">
                        <Link href="/" className="flex items-center gap-2 font-medium">
                            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                                <GalleryVerticalEnd className="size-4" />
                            </div>
                            Site de Receitas
                        </Link>
                    </div>
                    <div className="flex flex-1 items-center justify-center">
                        <div className="w-full max-w-xs">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-2xl">Criar Conta</CardTitle>
                                    <CardDescription>Registre-se para compartilhar suas receitas.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form action="/api/register" method="POST" className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Nome</Label>
                                            <Input id="name" name="name" placeholder="Seu nome" required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input id="email" name="email" type="email" placeholder="seu.email@exemplo.com" required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="password">Senha</Label>
                                            <Input id="password" name="password" type="password" required />
                                        </div>
                                        <Button type="submit" className="w-full">Registrar</Button>
                                    </form>
                                </CardContent>
                                <CardFooter className="flex justify-center">
                                    <p className="text-sm text-muted-foreground">
                                        Já tem uma conta? <Link href="/login" className="text-primary hover:underline">Faça login</Link>
                                    </p>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                </div>
                <div className="bg-muted relative hidden lg:block">
                    <Image
                        src="/placeholder.svg"
                        alt="Imagem de fundo"
                        width={1920}
                        height={1080}
                        className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                    />
                </div>
            </div>
        </SessionWrapper>
    )
}
