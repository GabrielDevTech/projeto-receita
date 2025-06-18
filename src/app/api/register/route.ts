import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"


const prisma = new PrismaClient()

export async function POST(req: Request) {
    try {
        // Tenta ler o corpo da requisição
        let body = {};
        const contentType = req.headers.get('content-type') || '';

        if (contentType.includes('application/json')) {
            try {
                body = await req.json();
            } catch {
                return NextResponse.json({ error: "Corpo da requisição JSON inválido" }, { status: 400 });
            }
        } else if (contentType.includes('application/x-www-form-urlencoded')) {
            const text = await req.text();
            const params = new URLSearchParams(text);
            body = {
                name: params.get('name') || '',
                email: params.get('email') || '',
                password: params.get('password') || ''
            };
        } else {
            return NextResponse.json({ error: "Tipo de conteúdo não suportado" }, { status: 400 });
        }

        const { name, email, password } = body;

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
