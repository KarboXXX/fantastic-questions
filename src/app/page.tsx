"use client";

import { useState, useRef, useReducer } from "react";
import QuestionEditor from "./components/home/QuestionEditor";
import { Question, Alternative } from "./components/home/question";
import QuestionAnswer from "./components/home/QuestionAnswer";

export default function Home() {
    // const [, forceUpdate] = useReducer((x) => x + 1, 0);

    const [editing, set_edit_mode] = useState(false);
    const [questions, set_questions] = useState<Question[]>([]);
    const [spinning, set_spinning] = useState(false);
    const [times_emptied, set_empty_state] = useState<number>(0);

    return (
        <div className="dark">
            <div className="w-full h-9 bg-stone-900 drop-shadow-xl flex flex-row justify-center content-center items-center rounded-b-md">
                <button
                    className={`transition duration-200 rounded-lg px-3 py-1.5 mx-5 w-24 content-center items-center justify-center`}
                    style={{
                        backgroundColor: editing
                            ? "rgb(20 83 45)"
                            : "rgb(41 37 36)",
                        transition: "background-color 0.7s ease",
                        animation: "pulse 1s infinite",
                    }}
                    onClick={() => {
                        set_edit_mode(!editing);
                    }}>
                    {editing ? "Visualizar" : "Editar"}
                </button>
                {editing ? (
                    ""
                ) : (
                    <button
                        className="group relative"
                        onClick={() => {
                            set_empty_state(times_emptied + 1);
                            set_spinning(true);

                            setTimeout(() => {
                                set_spinning(false);
                            }, 1000);
                        }}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className={`size-5 group-hover:rotate-45 ${spinning ? "animate-refresh" : ""} transition duration-400`}>
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                            />
                        </svg>
                    </button>
                )}
            </div>
            <div className="mx-2 p-0.5 h-screen">
                {editing ? (
                    <QuestionEditor
                        questions={questions}
                        set_questions={set_questions}
                    />
                ) : (
                    <QuestionAnswer key={times_emptied} questions={questions} />
                )}
            </div>
        </div>
    );
}
