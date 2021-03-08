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
            <div className="root">
                <div className="servers"></div>
                <div className="main">
                    <div className="left">
                        <div className="top"></div>
                        <div className="channels"></div>
                    </div>
                    <div className="app">
                        <div className="top"></div>
                        <div className="room">
                            <div className="chat">
                                <div className="messages"></div>
                                <div className="form">
                                    <textarea placeholder="Message #some-chat"></textarea>
                                </div>
                            </div>
                            <div className="right"></div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .root {
                    min-height: 100vh;
                    display: flex;
                }

                .servers {
                    background-color: var(--clr-dark);
                    width: 72px;
                }

                .main {
                    display: flex;

                    flex: 1;
                }

                .left {
                    background-color: var(--clr-dark-grey);
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
                    background-color: var(--clr-lighter-grey);
                    color: var(--clr-light);
                    outline: none;
                    border: none;
                }

                .right {
                    background-color: var(--clr-dark-grey);
                    width: 240px;
                }

                .room {
                    flex: 1;

                    display: flex;
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
