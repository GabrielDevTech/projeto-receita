import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    const pathname = request.nextUrl.pathname;

    // 1. Lógica para PROTEGER rotas restritas (ex: /user/*)
    // Se a rota começa com /user E NÃO HÁ TOKEN, redireciona para login.
    if (pathname.startsWith("/user") && !token) {
        console.log(`Middleware: Protegendo /user - Sem token. Redirecionando para /login?callbackUrl=${pathname}`);
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(loginUrl);
    }

    // 2. Lógica para REDIRECIONAR usuários logados de páginas públicas (ex: /login, /register, /)
    // Se o usuário está logado (possui token) E está tentando acessar /login ou /register
    // ou a página inicial (se ela for pública e você quer redirecionar para uma área logada).
    if (token) {
        if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
            console.log(`Middleware: Usuário logado em ${pathname}. Redirecionando para /user/home.`);
            return NextResponse.redirect(new URL("/user/home", request.url));
        }
        // Descomente e ajuste esta parte se você quiser que a rota "/" redirecione
        // para /user/home QUANDO O USUÁRIO ESTIVER LOGADO.
        // if (pathname === "/") {
        //     console.log(`Middleware: Usuário logado na raiz. Redirecionando para /user/home.`);
        //     return NextResponse.redirect(new URL("/user/home", request.url));
        // }
    }

    // Se nenhuma das condições acima foi atendida, permite a requisição seguir.
    console.log(`Middleware: Permitindo acesso a ${pathname}. Token: ${token ? 'presente' : 'ausente'}`);
    return NextResponse.next();
}

export const config = {
    // Aplica o middleware a todas as rotas que começam com /user e à rota raiz "/"
    // E também às rotas /login e /register para a lógica de redirecionamento de logados.
    matcher: ["/user/:path*", "/", "/login", "/register"],
};