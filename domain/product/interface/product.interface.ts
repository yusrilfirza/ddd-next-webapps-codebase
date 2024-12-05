export interface PokemonResponse {
    count: number;
    next: string;
    previous: string | null;
    results: object[];
}