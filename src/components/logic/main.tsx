import React, { Dispatch, SetStateAction } from "react";
import { IChannel } from "../../server/database/models/channel";
import { IGuild } from "../../server/database/models/guild";
import { IUser } from "../../server/database/models/user";
import Profile from "../meta/profile";

export default function Main({
    user,
    guild,
    channel,
    setSettings,
}: {
    user: IUser;
    guild: IGuild & { channels: IChannel[] };
    channel: IChannel;
    setSettings: Dispatch<SetStateAction<boolean>>;
}) {
    return (
        <>
            <div className="main">
                <div className="left">
                    <div className="top"></div>
                    <div className="chat">
                        <div className="channels"></div>
                        <Profile
                            username={user.username}
                            tag={user.tag}
                            status={user.status}
                            avatar={user.avatar}
                            setSettings={setSettings}
                        />
                    </div>
                </div>
                <div className="app">
                    <div className="top"></div>
                    <div className="room">
                        <div className="chat">
                            <div className="messages"></div>
                            <div className="form">
                                <textarea placeholder={`Message #${channel.name}`}></textarea>
                            </div>
                        </div>
                        <div className="right"></div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .main {
                    display: flex;

                    flex: 1;
                }

                .left {
                    background-color: var(--clr-even-darker-grey);
                    width: 240px;

                    display: flex;
                    flex-direction: column;
                }

                .channels {
                    flex: 1;
                }

                .app {
                    display: flex;
                    flex-direction: column;

                    flex: 1;
                }

                .top {
                    height: 48px;

                    box-shadow: 0 1px 0 rgba(4, 4, 5, 0.2), 0 1.5px 0 rgba(6, 6, 7, 0.05), 0 2px 0 rgba(4, 4, 5, 0.05);

                    z-index: 10;
                }

                .chat {
                    flex: 1;

                    display: flex;
                    flex-direction: column;
                }

                .messages {
                    flex: 1;
                }

                .form {
                    height: 68px;
                    display: flex;
                    flex-direction: column;
                }

                .form textarea {
                    margin: 0 16px;
                    padding: 12px;
                    border-radius: 8px;
                    resize: none;
                    font-size: 1rem;
                    font-family: var(--ff-secondary);
                    height: 44px;
                    background-color: var(--clr-light-grey);
                    color: var(--clr-light);
                    outline: none;
                    border: none;
                }

                .right {
                    background-color: var(--clr-even-darker-grey);
                    width: 240px;
                }

                .room {
                    flex: 1;

                    display: flex;
                }
            `}</style>
        </>
    );
}
