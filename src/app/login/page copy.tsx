import { redirect } from "next/navigation";

export default function LoginPage() {
    async function handleSubmit(formData: FormData) {
        "use server";

        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const res = await fetch("/api/auth/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (res.ok) {
            redirect("/dashboard");
        } else {
            // Handle error
            console.error("Login failed");
        }
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center py-2">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <h1 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Login
                    </h1>
                    <h2 className="mt-2 text-center text-sm text-gray-600">
                        Entre com sua conta para gerenciar suas receitas
                    </h2>
                </div>

                <form className="mt-8 space-y-6" action={handleSubmit}>
                    <div className="-space-y-px rounded-md shadow-sm">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="Email address"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Entrar
                        </button>
                    </div>
                </form>

                <div className="text-sm text-center">
                    <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Não tem uma conta? Registre-se
                    </a>
                </div>
            </div>
        </div>
    );
}
