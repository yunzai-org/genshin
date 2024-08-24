import { Plugin } from 'yunzai';
export declare class sevenSaints extends Plugin {
    constructor();
    get button(): import("icqq/lib/message/elements.js").ButtonElem;
    deckIndex(): Promise<void>;
    deck(id: any): Promise<void>;
    deck_list(id?: number): Promise<void>;
    deck_cards(id?: number): Promise<void>;
}
