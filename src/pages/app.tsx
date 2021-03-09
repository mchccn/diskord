import { ObjectId } from "mongodb";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Documentation from "../components/docs";
import Main from "../components/main";
import Meta from "../components/meta";
import Servers from "../components/servers";
import { IChannel } from "../server/database/models/channel";
import guilds, { IGuild } from "../server/database/models/guild";
import { IUser } from "../server/database/models/user";

// ! fix scrolling

export default function DiskordApp({ user, guilds }: { user: IUser; guilds: { name: string; icon: string; id: string }[] }) {
    const [currentGuildId, setCurrentGuildId] = useState("");
    const [currentChannelId, setCurrentChannelId] = useState("");
    const [currentGuild, setCurrentGuild] = useState<(IGuild & { channels: IChannel[] }) | undefined>(undefined);
    const [currentChannel, setCurrentChannel] = useState<IChannel | undefined>(undefined);

    useEffect(() => {
        (async () => {
            if (currentGuildId) {
                const res = await fetch(`/api/get/guilds/${currentGuildId}`);

                const guild = await res.json();

                const channels = await (await fetch(`/api/get/guilds/${currentGuildId}/channels`)).json();

                if (guild) setCurrentGuild(guild ? { ...guild, channels } : undefined);
            } else setCurrentGuild(undefined);
        })();
    }, [currentGuildId]);

    useEffect(() => {
        (async () => {
            if (currentChannelId) {
                const res = await fetch(`/api/get/channels/${currentChannelId}`);

                const channel = await res.json();

                if (channel) setCurrentChannel(channel ?? undefined);
            } else setCurrentChannel(undefined);
        })();
    }, [currentChannelId]);

    return (
        <div>
            <Meta />
            <Head>
                <title>diskord</title>
            </Head>
            <div className="root">
                <Servers guilds={guilds} setGuild={setCurrentGuildId} setChannel={setCurrentChannelId} />
                {!currentGuild || !currentChannel ? (
                    <Documentation />
                ) : (
                    <Main user={user} guild={currentGuild} channel={currentChannel} />
                )}
            </div>
            <style jsx>{`
                .root {
                    min-height: 100vh;
                    display: flex;
                }
            `}</style>
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
