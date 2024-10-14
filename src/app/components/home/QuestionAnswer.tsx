import { Question, Alternative } from "./question";
import {
    useRef,
    useEffect,
    useReducer,
    useState,
    Dispatch,
    SetStateAction,
    MutableRefObject,
} from "react";

interface SingleQuestionAnswerProps {
    question: Question;
    grade_array: boolean[];
    set_grade_array: Dispatch<SetStateAction<boolean[]>>;
}
function SingleQuestionAnswer({
    question,
    set_grade_array,
    grade_array,
}: SingleQuestionAnswerProps) {
    const [answered, set_answered] = useState<boolean>(false);
    // const [, forceUpdate] = useReducer((x) => x + 1, 0);

    // const input_ref = useRef<HTMLInputElement[]>([]);
    // const add_input_ref = (el: HTMLInputElement) => {
    //     if (el && !input_ref.current.includes(el)) {
    //         input_ref.current.push(el);
    //     }
    // };

    const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    const [clicked_option, set_clicked_option] = useState<number | null>(null);

    return (
        <div className="pt-5 flex flex-col truncate text-pretty">
            <label className="text-white text-xl space-y-2 mb-3">
                {question.get_title()}
            </label>
            <ul
                role="list"
                className="list-disc marker:stone-700 *:py-1 truncate text-pretty *:text-pretty">
                {question.get_alternative_array().map((alternative, i) => {
                    return (
                        <li>
                            <button
                                disabled={answered}
                                className={`group relative px-3 py-0.5 text-pretty truncate bg-stone-900 ${alternative.correct ? "disabled:bg-green-900" : clicked_option == i ? "disabled:bg-red-900" : "disabled:bg-gray-900"} rounded-md hover:bg-stone-800 transition-all duration:200`}
                                onClick={() => {
                                    set_answered(true);
                                    set_clicked_option(i);

                                    let current_grades = grade_array;
                                    current_grades.push(alternative.correct);
                                    set_grade_array(current_grades);
                                }}>
                                {alphabet[i] + ")"}
                            </button>
                            <label className="text-white ml-4">
                                {alternative.text}
                            </label>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

interface QuestionAnswerProps {
    questions: Question[];
}
export default function QuestionAnswer({ questions }: QuestionAnswerProps) {
    const [grade_array, set_grade_array] = useState<boolean[]>([]);

    return (
        <div className="flex flex-col truncate text-pretty">
            {questions.map((question) => {
                return (
                    <SingleQuestionAnswer
                        grade_array={grade_array}
                        set_grade_array={set_grade_array}
                        question={question}
                    />
                );
            })}
        </div>
    );
}
