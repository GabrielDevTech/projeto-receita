import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"


const prisma = new PrismaClient()

export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json()

        if (!name || !email || !password) {
            return NextResponse.json({ error: "Nome, email e senha são obrigatórios" }, { status: 400 })
        }

        // Verificar se o email já está registrado
        const existingUser = await prisma.user.findUnique({
            where: { email }
        })

        if (existingUser) {
            return NextResponse.json({ error: "Email já registrado" }, { status: 409 })
        }

        // Criptografar a senha
        const hashedPassword = await bcrypt.hash(password, 10)

        // Criar o novo usuário
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })

        // Autenticar o usuário após o registro (opcional)
        // Aqui você pode implementar a lógica para criar uma sessão ou retornar um token

        return NextResponse.json({ message: "Usuário registrado com sucesso", user: { id: user.id, name: user.name, email: user.email } }, { status: 201 })
    } catch (error) {
        console.error("Erro ao registrar usuário:", error)
        return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
    } finally {
        await prisma.$disconnect()
    }
}
