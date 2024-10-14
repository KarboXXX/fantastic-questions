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
    private id: string;
    private alternatives: Alternative[];
    private title: string;
    private image_url: string | undefined;
    private hint_text: string | undefined;

    constructor(
        alternatives: Alternative[],
        title: string,
        image_url?: string,
        hint_text?: string,
    ) {
        this.alternatives = alternatives;
        this.title = title.trim();
        this.image_url = image_url;
        this.hint_text = hint_text;

        this.id = uuidv7();
    }

    public get_id(): string {
        return this.id;
    }
    public get_title(): string {
        return this.title;
    }
    public set_title(new_title: string): string {
        this.title = new_title;
        return this.title;
    }
    public get_alternative_array(): Alternative[] {
        return this.alternatives;
    }
    public set_alternative_array(array: Alternative[]): Alternative[] {
        this.alternatives = array;
        return this.alternatives;
    }
    public delete_alternative(alt: Alternative): Alternative[] {
        this.alternatives = this.alternatives.filter((alts) => {
            return alts !== alt;
        });
        return this.alternatives;
    }
    public add_alternative(alt: Alternative): number {
        return this.alternatives.push(alt);
    }
}
