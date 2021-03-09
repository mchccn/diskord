import { ObjectId } from "mongodb";
import { GetServerSideProps } from "next";
import Head from "next/head";
import io from "socket.io-client";
import Meta from "../components/meta/meta";
import Root from "../components/root";
import guilds from "../server/database/models/guild";
import { IUser } from "../server/database/models/user";

// ! fix scrolling

export default function DiskordApp({ user, guilds }: { user: IUser; guilds: { name: string; icon: string; id: string }[] }) {
    const socket = io("ws://localhost:3000");

    socket.on("connect", () => {
        console.log("socket.io connected");

        socket.emit("verify", user._id, user.password);

        socket.on("invalid", () => {
            console.log("Invalid credentials.");
        });

        socket.on("verified", () => {});
    });

    return (
        <div>
            <Meta isLightTheme={user.appearance.isLightTheme} />
            <Head>
                <title>diskord</title>
            </Head>
            <Root user={user} guilds={guilds} />
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    return {
        props: {
            //@ts-ignore
            user: JSON.parse(JSON.stringify(ctx.req.user)),
            guilds: await guilds.find({
                _id: {
                    //@ts-ignore
                    $in: ctx.req.user.guilds.map((id) => ObjectId(id)),
                },
            }),
        },
    };
};
