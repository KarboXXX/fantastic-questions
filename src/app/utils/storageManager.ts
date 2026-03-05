import { Question } from "../components/home/question";

const LOCAL_KEY = "questions";

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

export function saveLocalQuestions(
    localStorage: Storage,
    questions: Question[],
): string {
    const textedQuestionArray: string = JSON.stringify(questions);
    localStorage.setItem(LOCAL_KEY, textedQuestionArray);
    return textedQuestionArray;
}

export function retreiveLocalQuestions(localStorage: Storage): Question[] {
    const stored = localStorage.getItem(LOCAL_KEY);
    if (!stored || stored == "") return [];

    return parseQuestionsJSON(stored);
}

export function parseQuestionsJSON(stored: string | null): Question[] {
    if (!stored) return [];
    try {
        const questionsParsedObject: JSONQuestion[] = JSON.parse(stored);
        console.log(questionsParsedObject);
        const questions: Question[] = questionsParsedObject.flatMap((v) => {
            return new Question(v.alternatives, v.title);
        });
        return questions;
    } catch (e) {
        console.error(e);
        return [];
    }
}
