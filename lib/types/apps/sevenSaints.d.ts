import { Plugin } from 'yunzai';
export declare class sevenSaints extends Plugin {
    constructor();
    deckIndex(): Promise<void>;
    deck(id: any): Promise<void>;
    deck_list(id?: number): Promise<void>;
    deck_cards(id?: number): Promise<void>;
}
