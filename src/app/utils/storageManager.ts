import { Question } from "../components/home/question";

interface JSONQuestion {
    alternatives: [
        {
            id: string;
            text: string;
            correct: boolean;
        },
    ];
    title: string;
    id: string;
}

const encoder = new TextEncoder();
export function saveLocalQuestions(
    localStorage: Storage,
    questions: Question[],
): string {
    let textedQuestionArray: string = JSON.stringify(questions);
    localStorage.setItem("questions", textedQuestionArray);
    return textedQuestionArray;
}

export function retreiveLocalQuestions(localStorage: Storage): Question[] {
    const stored = localStorage.getItem("questions");
    if (!stored || stored == "") return [];

    try {
        const questionsParsedObject: JSONQuestion[] = JSON.parse(stored);
        console.log(questionsParsedObject);
        let questions: Question[] = questionsParsedObject.flatMap((v, _i) => {
            return new Question(v.alternatives, v.title);
        });
        return questions;
    } catch (e) {
        console.error(e);
        return [];
    }
}
