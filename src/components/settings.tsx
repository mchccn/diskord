import { Dispatch, SetStateAction, useEffect } from "react";
import { IUser } from "../server/database/models/user";

export default function Settings({
    user,
    active,
    setSettings,
}: {
    user: IUser;
    active: boolean;
    setSettings: Dispatch<SetStateAction<boolean>>;
}) {
    useEffect(() => {
        const escape = (e: KeyboardEvent) => (e.code === "Escape" ? setSettings(false) : undefined);

        document.addEventListener("keydown", escape);

        return () => document.removeEventListener("keydown", escape);
    });

    return (
        <>
            {/* <div className={`settings${active ? " active" : ""}`}> */}
            <div className="settings active">
                <div>
                    <div className="top">
                        <div className="profile">
                            <div className="display">
                                <div>
                                    <img src={user.avatar} alt="" />
                                </div>
                                <h4>
                                    {user.username}#{user.tag}
                                </h4>
                            </div>
                        </div>
                        <div className="close">
                            <a onClick={() => setSettings(false)}>
                                <span>✕</span>
                            </a>
                            <p>esc</p>
                        </div>
                    </div>
                    <div className="middle">
                        <div className="checkbox-container">
                            <label htmlFor="toggle1">Toggle light theme</label>
                            <input className="checkbox" type="checkbox" name="toggle1" />
                            <div className="checkbox-visual">
                                <div></div>
                            </div>
                        </div>
                        <div className="checkbox-container">
                            <label htmlFor="toggle1">Toggle compact mode</label>
                            <input className="checkbox" type="checkbox" name="toggle1" />
                            <div className="checkbox-visual">
                                <div></div>
                            </div>
                        </div>
                        {/* Add slider for font size */}
                    </div>
                </div>
            </div>
            <style jsx>{`
                .settings > div {
                    position: relative;

                    min-width: 800px;
                    min-height: 800px;
                }

                .top {
                    display: flex;
                }

                .profile {
                    display: flex;
                    flex-direction: column;

                    flex: 1;

                    height: 300px;

                    padding: 16px;

                    text-align: center;

                    border-radius: 8px;

                    background-color: var(--clr-darkest-grey);
                }

                .display {
                    display: flex;
                    align-items: center;
                }

                .display img {
                    width: 64px;
                    height: 64px;
                    object-fit: cover;

                    border-radius: 50%;
                }

                .display h4 {
                    margin: 1rem;
                }
            `}</style>
            <style jsx>{`
                .close {
                    width: 32px;
                    height: 48px;

                    margin-left: 12px;
                }

                .close a {
                    font-size: 1rem;

                    color: var(--clr-lightest-grey);

                    width: 32px;
                    height: 32px;

                    display: grid;
                    place-items: center;

                    border: 1px solid var(--clr-lightest-grey);
                    border-radius: 50%;
                }

                .close a:hover {
                    background-color: var(--clr-light-grey);

                    text-decoration: none;
                }

                .close p {
                    text-align: center;
                    color: var(--clr-lightest-grey);
                }
            `}</style>
            <style jsx>{`
                .settings {
                    position: absolute;

                    background-color: var(--clr-dark-grey);

                    top: 0;
                    left: 0;

                    width: 100vw;
                    height: 100vh;

                    transform: scale(1.1);

                    opacity: 0;

                    pointer-events: none;

                    transition: 0.15s transform ease, 0.15s opacity ease;

                    display: grid;
                    place-items: center;
                }

                .active {
                    opacity: 1;

                    transform: scale(1);

                    pointer-events: auto;
                }
            `}</style>
        </>
    );
}
