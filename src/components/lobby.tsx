import { Dispatch, SetStateAction } from "react";
import { IUser } from "../server/database/models/user";

export default function Lobby({ user, setSettings }: { user: IUser; setSettings: Dispatch<SetStateAction<boolean>> }) {
    return (
        <>
            <div className="lobby">
                <div className="profile">
                    <div>
                        <img src={user.avatar} alt="" />
                    </div>
                    <h4>
                        {user.username}#{user.tag}
                    </h4>
                    <a onClick={() => setSettings(true)} className="settings">
                        Settings
                    </a>
                </div>
            </div>
            <style jsx>{`
                .lobby {
                    flex: 1;

                    max-height: 100vh;

                    overflow-y: scroll;
                }

                .profile {
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    height: 150px;

                    padding: 16px;

                    text-align: center;
                }

                .profile img {
                    width: 64px;
                    height: 64px;
                    object-fit: cover;

                    border-radius: 50%;
                }

                .profile h4 {
                    margin: 1rem;
                }

                .settings:hover {
                    text-decoration: none;
                }
            `}</style>
        </>
    );
}
