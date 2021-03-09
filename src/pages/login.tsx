import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Meta from "../components/meta";

export default function Login() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        setError("");
    }, [email, password]);

    return (
        <div>
            <Meta />
            <Head>
                <title>log in</title>
            </Head>
            <main>
                <p>
                    Don't have an account? <a href="/signup">Sign up!</a>
                </p>
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();

                        const res = await fetch("/api/auth/login", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            credentials: "include",
                            body: JSON.stringify({
                                email,
                                password,
                            }),
                        });

                        if (res.ok) return router.push("/app");

                        try {
                            const json = await res.json();

                            if (json.message) setError(json.message);
                        } catch {}

                        return;
                    }}
                >
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <input type="submit" value="Log In" />
                    <p>{error}</p>
                </form>
            </main>
            <style jsx>{`
                div {
                    min-height: 100vh;
                    background-color: var(--clr-dark-grey);
                    display: grid;
                    place-items: center;
                    text-align: center;
                }

                form {
                    display: flex;
                    flex-direction: column;
                }
            `}</style>
        </div>
    );
}
