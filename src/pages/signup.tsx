import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Meta from "../components/meta";

export default function Login() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        setError("");
    }, [email, password]);

    return (
        <div>
            <Meta />
            <Head>
                <title>sign up</title>
            </Head>
            <main>
                <p>
                    Already an account? <a href="/login">Log in!</a>
                </p>
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();

                        const res = await fetch("/api/auth/signup", {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            credentials: "include",
                            body: JSON.stringify({
                                email,
                                password,
                                username,
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
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <input type="submit" value="Sign up" />
                    <p>{error}</p>
                </form>
            </main>
            <style jsx>{`
                div {
                    min-height: 100vh;
                    background-color: var(--clr-grey);
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
