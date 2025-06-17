"use client";

import { PrismaClient } from "@prisma/client";
import Link from "next/link";

const prisma = new PrismaClient();

async function getRecipes() {
  try {
    const recipes = await prisma.recipe.findMany({
      include: {
        user: {
          select: { name: true },
        },
      },
      orderBy: {
        createdAt: 'desc', // Ordena por data de criação, do mais recente ao mais antigo
      },
    });
    return recipes;
  } catch (error) {
    console.error("Erro ao buscar receitas:", error);
    return [];
  } finally {
    await prisma.$disconnect();
  }
}

export default async function Home() {
  const recipes = await getRecipes();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <nav className="flex items-center gap-6">
            <Link href="/" className="text-xl font-bold text-indigo-600">Site de Receitas</Link>
            <Link href="/" className="text-gray-700 hover:text-indigo-600">Início</Link>
          </nav>
          <div>
            <Link href="/login" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Login</Link>
          </div>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6 text-center">Bem-vindo ao Site de Receitas</h1>
        <p className="text-lg mb-8 text-center">Descubra e compartilhe as melhores receitas com a nossa comunidade.</p>
        {recipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="bg-white rounded-lg shadow-md p-4">
                <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
                <p className="text-gray-600">{recipe.ingredients}</p>
                <p className="text-sm text-gray-500 mt-2">Por: {recipe.user?.name || "Desconhecido"}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">Nenhuma receita encontrada. Comece adicionando a sua!</p>
        )}
      </main>
      <footer className="bg-gray-100 py-4 text-center text-gray-600">
        <p>&copy; 2025 Site de Receitas. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
