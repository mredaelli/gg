export type UUID = string;

export interface GameInit {
    id: UUID,
    userId: string,
    number: number,
}
export interface Game extends GameInit {
    created_at: Date,
    modified_at: Date,
    tries: number
}
