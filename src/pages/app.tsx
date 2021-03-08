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
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    return {
        props: {},
    };
};
