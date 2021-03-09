import { ObjectId } from "mongodb";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import Meta from "../components/meta/meta";
import Root from "../components/root";
import guilds from "../server/database/models/guild";
import { IUser } from "../server/database/models/user";

// ! fix scrolling

export default function DiskordApp({ user, guilds }: { user: IUser; guilds: { name: string; icon: string; id: string }[] }) {
    const [userState, setUserState] = useState(user);
    const [socket, setSocket] = useState<undefined | typeof Socket>(undefined);

    useEffect(() => {
        const socket = io("ws://localhost:3000");

        socket.on("connect", () => {
            console.log("socket.io connected");

            socket.emit("verify", user._id, user.password, "", "");

            socket.on("invalid", () => {
                console.log("Invalid credentials.");
            });

            socket.on("verified", () => {
                console.log("Valid credentials.");
            });

            socket.on("appearanceUpdate", (appearance: IUser["appearance"]) => {
                //@ts-ignore
                setUserState({ ...user, appearance });
            });

            socket.on("disconnect", () => {
                console.log("socket.io disconnected");
            });
        });

        setSocket(socket);
    }, []);

    return (
        <div>
            <Meta isLightTheme={userState.appearance.isLightTheme} />
            <Head>
                <title>diskord</title>
            </Head>
            <Root user={userState} guilds={guilds} />
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
