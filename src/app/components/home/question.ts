import { v7 as uuidv7 } from "uuid";

export interface Alternative {
    id: string;
    text: string;
    correct: boolean;
}

export function create_alternative(
    text: string,
    correct?: boolean,
): Alternative {
    if (correct === undefined) correct = false;
    return { id: uuidv7(), text, correct };
}

export class Question {
    private alternatives: Map<number, Alternative>;
    private title: string;
    private image_url: string | undefined;
    private hint_text: string | undefined;

    constructor(
        alternatives: Map<number, Alternative>,
        title: string,
        image_url?: string,
        hint_text?: string,
    ) {
        this.alternatives = alternatives;
        this.title = title.trim();
        this.image_url = image_url;
        this.hint_text = hint_text;
    }
}
