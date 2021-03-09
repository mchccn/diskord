import { Dispatch, SetStateAction, useEffect, useState } from "react";

// ! Add modal pop up to edit status

export default function Profile({
    username,
    tag,
    status,
    avatar,
    setSettings,
}: {
    username: string;
    tag: string;
    status: string;
    avatar: string;
    setSettings: Dispatch<SetStateAction<boolean>>;
}) {
    const streaks = [
        "Copied!",
        "Double Copy!",
        "Triple Copy!",
        "Dominating!!",
        "Rampage!!",
        "Mega Copy!!",
        "Unstoppable!!",
        "Wicked Sick!!",
        "Monster Copy!!!",
        "GODLIKE!!!",
        "BEYOND GODLIKE!!!",
    ];

    const [index, setIndex] = useState(0);
    const [streak, setStreak] = useState(false);
    const [copiedMessage, setCopiedMessage] = useState(streaks[index]);
    const [copied, setCopied] = useState(false);
    const [lose, setLose] = useState(0);
    const [reset, setReset] = useState(0);
    const [set, setSet] = useState(0);
    const [can, setCan] = useState(true);
    const [shake, setShake] = useState("");

    useEffect(() => {
        setSet(
            //@ts-ignore
            setTimeout(() => {
                setCopiedMessage(streaks[index]);
            }, 150)
        );
    }, [index]);

    useEffect(() => {
        setShake("");
        setTimeout(() => {
            setShake(copiedMessage.toUpperCase() === copiedMessage ? "shake" : "");
        }, 8);
    }, [copiedMessage]);

    const showCopyMessage = () => {
        if (streak && can) {
            setIndex((index + 1) % streaks.length);
            clearTimeout(set);
        } else if (!can) {
            setIndex(0);
            clearTimeout(set);
        }

        setCopied(false);

        setTimeout(() => {
            clearTimeout(reset);

            setTimeout(() => {
                setCopied(true);

                //@ts-ignore
                setReset(setTimeout(() => setCopied(false), 1000));
            }, 4);

            setStreak(true);

            clearTimeout(lose);

            setLose(
                //@ts-ignore
                setTimeout(() => {
                    setStreak(false);
                    setIndex(0);
                }, 1500)
            );

            setCan(false);
        }, 150);
    };

    return (
        <>
            <div className="profile" onMouseOut={() => setCan(true)}>
                <img className="pfp" src={avatar} alt="" />
                <div
                    className="name tooltip-top"
                    onClick={() => {
                        navigator.clipboard.writeText(`${username}#${tag}`);
                        showCopyMessage();
                    }}
                >
                    <span className="username">{username}</span>
                    {status ? (
                        <div className="roll">
                            <span className="status">​</span>
                            <span className="status show">{status.length > 19 ? status.slice(0, 19) + "..." : status}</span>
                            <span className="status hide">#{tag}</span>
                        </div>
                    ) : (
                        <span className="status">#{tag}</span>
                    )}
                    <div
                        className={`tooltiptext-top ${
                            copiedMessage.toUpperCase() === copiedMessage ? "red" : "green"
                        }-tooltiptext`}
                        style={{
                            opacity: copied ? "1" : "0",
                        }}
                    >
                        <span className={shake}>{copiedMessage}</span>
                    </div>
                </div>
                <a className="settings" onClick={() => setSettings(true)}>
                    <svg width="20" height="20" viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M19.738 10H22V14H19.739C19.498 14.931 19.1 15.798 18.565 16.564L20 18L18 20L16.565 18.564C15.797 19.099 14.932 19.498 14 19.738V22H10V19.738C9.069 19.498 8.203 19.099 7.436 18.564L6 20L4 18L5.436 16.564C4.901 15.799 4.502 14.932 4.262 14H2V10H4.262C4.502 9.068 4.9 8.202 5.436 7.436L4 6L6 4L7.436 5.436C8.202 4.9 9.068 4.502 10 4.262V2H14V4.261C14.932 4.502 15.797 4.9 16.565 5.435L18 3.999L20 5.999L18.564 7.436C19.099 8.202 19.498 9.069 19.738 10ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                        ></path>
                    </svg>
                </a>
            </div>
            <style jsx>{`
                .profile {
                    height: 52px;
                    background-color: var(--clr-darkest-grey);

                    display: flex;
                    align-items: center;

                    padding: 0px 8px;
                }

                .profile img {
                    object-fit: cover;
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    cursor: pointer;
                    transition: 0.15s opacity ease;
                    user-select: none;
                }

                .profile img:hover {
                    opacity: 0.8;
                }

                .name {
                    cursor: pointer;

                    display: flex;
                    flex-direction: column;

                    margin-left: 8px;

                    flex: 1;
                }

                .name .username {
                    font-weight: 900;
                    font-size: 0.9rem;
                    font-family: var(--ff-secondary);
                }

                .name .status {
                    font-size: 0.75rem;
                    color: var(--clr-lightest-grey);
                    font-family: var(--ff-secondary);
                    margin-top: -2px;
                    user-select: none;
                }

                .profile:hover .roll .show {
                    transform: translateY(-100%);
                }

                .profile:hover .roll .hide {
                    transform: translateY(-100%);
                }

                .roll {
                    position: relative;

                    overflow: hidden;

                    height: 14px;
                }

                .roll .show {
                    position: absolute;

                    top: 0;
                    left: 0;

                    width: 100%;

                    transform: translateY(0);
                    transition: 0.15s transform ease-out;
                }

                .roll .hide {
                    position: absolute;
                    top: 100%;
                    transform: translateY(0);
                    transition: 0.15s transform ease-out;
                }

                .settings {
                    width: 32px;
                    height: 32px;

                    display: grid;
                    place-items: center;

                    color: var(--clr-lightest-grey);

                    margin-top: -2px;

                    border-radius: 2px;
                }

                .settings:hover {
                    background-color: var(--clr-dark-grey);
                }

                .shake {
                    animation: 0.25s 4 shake linear forwards;
                }

                @keyframes shake {
                    0% {
                        transform: translate(0, 0);
                    }

                    10% {
                        transform: translate(2px, 6px);
                    }

                    20% {
                        transform: translate(-1px, 2px);
                    }

                    30% {
                        transform: translate(3px, -4px);
                    }

                    40% {
                        transform: translate(5px, -2px);
                    }

                    50% {
                        transform: translateX(1px, 3px);
                    }

                    60% {
                        transform: translate(-4px, 6px);
                    }

                    70% {
                        transform: translate(1px, -1px);
                    }

                    80% {
                        transform: translate(-3px, 3px);
                    }

                    90% {
                        transform: translate(-5px, 1px);
                    }

                    100% {
                        transform: translate(0, 0);
                    }
                }
            `}</style>
        </>
    );
}
