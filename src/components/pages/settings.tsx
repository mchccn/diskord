import debounce from "lodash/debounce";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IUser } from "../../server/database/models/user";

export default function Settings({
    user,
    active,
    setSettings,
}: {
    user: IUser;
    active: boolean;
    setSettings: Dispatch<SetStateAction<boolean>>;
}) {
    const [light, setLight] = useState(user.appearance.isLightTheme);
    const [size, setSize] = useState(user.appearance.fontSize);
    const [compact, setCompact] = useState(user.appearance.isCompactMode);

    const updateAppearance = debounce(async () => {
        await fetch("/api/user/appearance", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                appearance: { isLightTheme: light, fontSize: size, isCompactMode: compact },
            }),
        });
    }, 50);

    useEffect(() => {
        const escape = (e: KeyboardEvent) => (e.code === "Escape" ? setSettings(false) : undefined);

        document.addEventListener("keydown", escape);

        return () => document.removeEventListener("keydown", escape);
    });

    useEffect(() => {
        (async () => {
            updateAppearance();
        })();
    }, [light, size, compact]);

    return (
        <>
            <div className={`settings${active ? " active" : ""}`}>
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
                            <label htmlFor="light">Toggle light theme</label>
                            <input
                                className="checkbox"
                                type="checkbox"
                                name="light"
                                checked={light}
                                onChange={async (e) => setLight(e.target.checked)}
                            />
                            <div className="checkbox-visual">
                                <div></div>
                            </div>
                        </div>
                        <div className="checkbox-container">
                            <label htmlFor="compact">Toggle compact mode</label>
                            <input
                                className="checkbox"
                                type="checkbox"
                                name="compact"
                                checked={compact}
                                onChange={async (e) => setCompact(e.target.checked)}
                            />
                            <div className="checkbox-visual">
                                <div></div>
                            </div>
                        </div>
                        <div className="slider">
                            <label htmlFor="size">Font size: {size}</label>
                            <input
                                type="range"
                                min={12}
                                max={24}
                                name="size"
                                value={size}
                                onChange={(e) => setSize(parseInt(e.target.value) || 16)}
                            />
                        </div>
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

                .slider {
                    display: flex;
                    align-items: center;
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

                    transition: 0.25s transform ease, 0.15s opacity ease;

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
