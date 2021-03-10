import { Dispatch, SetStateAction, useRef, useState } from "react";

export default function Join({ active, setActive }: { active: boolean; setActive: Dispatch<SetStateAction<boolean>> }) {
    const p = useRef<HTMLDivElement | null>(null);

    const [inv, setInv] = useState("");
    const [name, setName] = useState("");

    return (
        <>
            <div
                className={`modal${active ? " active-modal" : ""}`}
                //@ts-ignore
                onClick={(e) => (e.target !== p.current && !p.current?.contains(e.target) ? setActive(false) : undefined)}
            >
                <div className="popup" ref={p}>
                    <div>
                        <h2>Create a server</h2>
                        <p>Your server is where you and your friends hang out. Make yours and start talking.</p>
                        <div className="flex">
                            <span>Server name</span>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <button
                            style={{
                                opacity: name ? "1" : "0",
                                pointerEvents: name ? "auto" : "none",
                            }}
                        >
                            Create
                        </button>
                    </div>
                    <div>
                        <h4>Have an invite already? Join a server.</h4>
                        <div className="flex">
                            <span>Server invite</span>
                            <input type="text" value={inv} onChange={(e) => setInv(e.target.value)} />
                        </div>
                        <button
                            style={{
                                opacity: inv ? "1" : "0",
                                pointerEvents: inv ? "auto" : "none",
                            }}
                        >
                            Join
                        </button>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .modal {
                    position: fixed;

                    top: 0;
                    left: 0;
                    bottom: 0;
                    right: 0;

                    background-color: rgba(0, 0, 0, 0.5);

                    display: grid;
                    place-items: center;

                    z-index: 1000;

                    opacity: 0;
                    pointer-events: none;

                    transition: 0.15s opacity ease;
                }

                .popup {
                    width: 500px;
                    height: 350px;

                    padding: 1rem;

                    color: var(--clr-black);
                    background-color: var(--clr-light);

                    border-radius: 16px;

                    transform: scale(0.9);

                    transition: 0.15s transform ease;

                    text-align: center;

                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }

                .active-modal {
                    opacity: 1;
                    pointer-events: auto;
                }

                .active-modal .popup {
                    transform: scale(1);
                }

                .modal p {
                    max-width: 350px;

                    margin: 0.5rem auto;

                    font-size: 0.9rem;

                    color: var(--clr-lighter-grey);
                }

                .modal h4 {
                    margin: 0.5rem 0;
                }

                .popup > div {
                    padding: 0.5rem;
                    margin-bottom: 1rem;
                }

                .popup input {
                    padding: 6px;
                    background-color: var(--clr-even-lighter-grey);
                    border: none;
                    outline: none;
                    border-radius: 2px;
                }

                .popup button {
                    cursor: pointer;
                    padding: 0.5rem 0.1rem;
                    margin: 0.5rem;
                    color: var(--clr-light);
                    background-color: var(--clr-discord);
                    border: none;
                    border-radius: 4px;
                    width: 60px;

                    filter: brightness(1);

                    transition: 0.15s filter ease;
                }

                .popup button:hover {
                    filter: brightness(0.95);
                }

                .flex {
                    margin: 0 auto;
                    display: flex;
                    justify-content: center;
                }

                .flex span {
                    margin-right: 0.5rem;
                    color: var(--clr-grey);
                }
            `}</style>
        </>
    );
}
