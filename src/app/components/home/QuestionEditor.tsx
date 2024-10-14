import {
    useState,
    useRef,
    createRef,
    LegacyRef,
    useReducer,
    MutableRefObject,
    Dispatch,
    SetStateAction,
    Component,
} from "react";
import DraggableList from "react-draggable-list";
import { Question, create_alternative } from "./question";
import { Alternative } from "./question";

interface QuestionEditorProps {
    questions: Question[];
    set_questions: Dispatch<SetStateAction<Question[]>>;
}
export default function QuestionEditor({
    questions,
    set_questions,
}: QuestionEditorProps) {
    const title_ref = useRef<HTMLTextAreaElement | null>(null);
    const container = useRef<HTMLDivElement | null>(null);
    const [correct_options, set_correct_options] = useState<boolean[]>([]);

    const [, forceUpdate] = useReducer((x) => x + 1, 0);

    const question_container_refs = useRef<HTMLDivElement[]>([]);
    const add_question_container_ref = (el: HTMLDivElement) => {
        if (el && !question_container_refs.current.includes(el)) {
            question_container_refs.current.push(el);
        }
    };

    const input_references: MutableRefObject<HTMLInputElement | null>[] = [];
    input_references.push(useRef(null));
    input_references.push(useRef(null));
    input_references.push(useRef(null));
    input_references.push(useRef(null));
    input_references.push(useRef(null));

    interface AlternativeInputProps {
        input_reference: LegacyRef<HTMLInputElement>;
        id: number;
    }
    function AlternativeInput({ input_reference, id }: AlternativeInputProps) {
        const [correct, set_correct] = useState(false);

        return (
            <label className="relative flex flex-row w-4/6 items-center my-1.5">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 ">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.39 48.39 0 0 1-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 0 1-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 0 0-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 0 1-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 0 0 .657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 0 0 5.427-.63 48.05 48.05 0 0 0 .582-4.717.532.532 0 0 0-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 0 0 .658-.663 48.422 48.422 0 0 0-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 0 1-.61-.58v0Z"
                    />
                </svg>
                <input
                    type="text"
                    autoComplete="false"
                    placeholder="Texto da alternativa"
                    ref={input_reference}
                    className="bg-stone-900 block border-0 border-neutral-700 focus:border-b-2 focus:outline-none py-1 px-2 mx-1.5 rounded-md text-white w-full"
                />
                <div
                    title="Marcar/desmarcar como resposta correta"
                    className="group relative">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill={`${correct ? "currentColor" : "none"}`}
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        onClick={() => {
                            set_correct(!correct);
                            var current = correct_options;
                            current[id] = !current[id];
                            set_correct_options(current);
                        }}
                        className="size-6 cursor-pointer group-hover:-rotate-12 transition-all duration-200">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                        />
                    </svg>
                </div>
            </label>
        );
    }

    interface SingleQuestionAlternativesEditorProps {
        item: Alternative;
        itemSelected: number;
        dragHandleProps: object;
    }
    class SingleQuestionAlternativesEditor extends Component<SingleQuestionAlternativesEditorProps> {
        render() {
            const { item, dragHandleProps, itemSelected } = this.props;
            return (
                <div className="flex flex-row block relative justify-center items-center content-center">
                    <div className="group cursor-move" {...dragHandleProps}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                            />
                        </svg>
                    </div>
                    <div className="group relative">
                        <input
                            className="ml-1.5 text-white ml-1 px-1 py-0.5 bg-transparent outline-none"
                            defaultValue={item.text}
                            onChange={(t) => {
                                item.text = t.target.value;
                            }}
                        />
                    </div>
                    <div className="group relative">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill={`${item.correct ? "currentColor" : "none"}`}
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            onClick={() => {
                                item.correct = !item.correct;
                                this.forceUpdate();
                            }}
                            className="size-6 cursor-pointer group-hover:-rotate-12 transition-all duration-200">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                            />
                        </svg>
                    </div>
                </div>
            );
        }
    }

    interface SingleQuestionEditorProps {
        item: Question;
        itemSelected: number;
        dragHandleProps: object;
    }
    interface SingleQuestionEditorState {
        editing_alternatives: boolean;
        alternatives: Alternative[];
    }
    class SingleQuestionEditor extends Component<
        SingleQuestionEditorProps,
        SingleQuestionEditorState
    > {
        state = {
            editing_alternatives: false,
            alternatives: this.props.item.get_alternative_array(),
        } as SingleQuestionEditorState;

        render() {
            const { item, itemSelected, dragHandleProps } = this.props;
            const { editing_alternatives } = this.state;

            return (
                <div>
                    <div className="flex flex-row my-1 justify-center items-center content-center">
                        <div
                            title="Alterar ordem"
                            className="cursor-move block relative"
                            {...dragHandleProps}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                />
                            </svg>
                        </div>
                        <label className="block relative flex flex-row items-center content-center justify-center mx-1.5">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-5 fill-none">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                />
                            </svg>
                            <input
                                className="ml-1.5 text-white ml-1 px-1 py-0.5 bg-transparent outline-none"
                                defaultValue={item.get_title()}
                                onChange={(t) => {
                                    item.set_title(t.target.value);
                                }}
                            />
                        </label>
                        <div
                            className="group relative mr-1 cursor-pointer"
                            onClick={() => {
                                this.setState({
                                    editing_alternatives: !editing_alternatives,
                                });
                            }}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke={`${editing_alternatives ? "#15803d" : "currentColor"}`}
                                className="size-6">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M8.242 5.992h12m-12 6.003H20.24m-12 5.999h12M4.117 7.495v-3.75H2.99m1.125 3.75H2.99m1.125 0H5.24m-1.92 2.577a1.125 1.125 0 1 1 1.591 1.59l-1.83 1.83h2.16M2.99 15.745h1.125a1.125 1.125 0 0 1 0 2.25H3.74m0-.002h.375a1.125 1.125 0 0 1 0 2.25H2.99"
                                />
                            </svg>
                        </div>
                        <div
                            className="cursor-pointer group block relative"
                            onClick={() => {
                                let newlist = questions.filter((question) => {
                                    return question !== item;
                                });
                                set_questions(newlist);
                            }}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6 fill-none group-hover:fill-red-700 transition-all duration-200 group-hover:rotate-12">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                />
                            </svg>
                        </div>
                    </div>
                    {editing_alternatives ? (
                        <div
                            ref={add_question_container_ref}
                            id={item.get_id()}
                            className="relative flex flex-col">
                            <DraggableList<
                                Alternative,
                                void,
                                SingleQuestionAlternativesEditor
                            >
                                template={SingleQuestionAlternativesEditor}
                                itemKey={(alternative) => {
                                    return alternative.id;
                                }}
                                list={item.get_alternative_array()}
                                onMoveEnd={(array) => {
                                    item.set_alternative_array([
                                        ...array.values(),
                                    ]);
                                    this.forceUpdate();
                                }}
                                container={() => {
                                    return question_container_refs.current.find(
                                        (div) => {
                                            return div.id == item.get_id();
                                        },
                                    );
                                }}
                            />
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            );
        }
    }

    return (
        <div className="flex flex-col justify-center items-center content-center">
            <label className="relative block flex flex-row w-4/6 items-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5 block my-2">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                    />
                </svg>

                <textarea
                    placeholder="Título da questão"
                    ref={title_ref}
                    autoComplete="false"
                    className="bg-stone-900 block border-0 border-neutral-700 focus:border-b-2 focus:outline-none py-1 px-2 mx-1.5 rounded-md text-white w-full"
                />
            </label>
            {input_references.map((reference, id) => {
                return (
                    <AlternativeInput
                        id={id}
                        input_reference={reference}
                        key={id}
                    />
                );
            })}
            <button
                onClick={() => {
                    var alternatives: Alternative[] = [];
                    input_references.forEach((reference, id) => {
                        if (reference.current === null) return;
                        alternatives.push(
                            create_alternative(
                                reference.current.value,
                                correct_options[id],
                            ),
                        );
                        reference.current.value = "";
                    });
                    var question = new Question(
                        alternatives,
                        title_ref.current!.value,
                    );
                    title_ref.current!.value = "";
                    set_correct_options(
                        correct_options.map(() => {
                            return false;
                        }),
                    );

                    let current_questions = questions;
                    current_questions.push(question);
                    set_questions(current_questions);
                    forceUpdate();
                }}
                className="block flex flex-row px-2 bg-stone-900 my-1.5 rounded-lg py-1 px-2 transition duration-200 hover:bg-stone-800">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 block">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                </svg>
                <label className="block ml-3 cursor-pointer">
                    Criar questão
                </label>
            </button>
            <div
                ref={container}
                className="flex flex-col justify-center content-center items-center">
                <DraggableList<Question, void, SingleQuestionEditor>
                    itemKey={(element) => {
                        return element.get_id();
                    }}
                    template={SingleQuestionEditor}
                    list={questions}
                    onMoveEnd={(list) => {
                        set_questions([...list.values()]);
                    }}
                    container={() => container.current}
                />
            </div>
        </div>
    );
}
