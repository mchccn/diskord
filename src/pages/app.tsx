import { ObjectId } from "mongodb";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Lobby from "../components/lobby";
import Main from "../components/main";
import Meta from "../components/meta";
import Servers from "../components/servers";
import Settings from "../components/settings";
import { IChannel } from "../server/database/models/channel";
import guilds, { IGuild } from "../server/database/models/guild";
import { IUser } from "../server/database/models/user";

// ! fix scrolling

export default function DiskordApp({ user, guilds }: { user: IUser; guilds: { name: string; icon: string; id: string }[] }) {
    const [currentGuildId, setCurrentGuildId] = useState("");
    const [currentChannelId, setCurrentChannelId] = useState("");
    const [currentGuild, setCurrentGuild] = useState<(IGuild & { channels: IChannel[] }) | undefined>(undefined);
    const [currentChannel, setCurrentChannel] = useState<IChannel | undefined>(undefined);
    const [settings, setSettings] = useState(false);

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
            <div className={`root${settings ? " inactive" : ""}`}>
                <Servers guilds={guilds} setGuild={setCurrentGuildId} setChannel={setCurrentChannelId} />
                {!currentGuild || !currentChannel ? (
                    <Lobby user={user} setSettings={setSettings} />
                ) : (
                    <Main user={user} guild={currentGuild} channel={currentChannel} setSettings={setSettings} />
                )}
            </div>
            <Settings user={user} active={settings} setSettings={setSettings} />
            <style jsx>{`
                .root {
                    min-height: 100vh;
                    display: flex;

                    opacity: 1;

                    transform: scale(1);

                    transition: 0.15s transform ease, 0.15s opacity ease;
                }

                .inactive {
                    opacity: 0;

                    transform: scale(0.9);
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
