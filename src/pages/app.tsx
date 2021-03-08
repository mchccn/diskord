import { GetServerSideProps } from "next";
import Head from "next/head";
import Meta from "../components/meta";

export default function DiskordApp() {
    return (
        <div>
            <Meta />
            <Head>
                <title>diskord app</title>
            </Head>
            <div className="app">
                <div className="servers"></div>
            </div>
            <style jsx>{`
                .app {
                    display: flex;
                }

                .servers {
                    background-color: var(--clr-dark);
                }
            `}</style>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    return {
        props: {},
    };
};
