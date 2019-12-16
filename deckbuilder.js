// A class for making a card with a suit and value

class Card {
    constructor (suit, value) {
    this.suit = suit;
    this.value = value;
    }
}

// A class that makes a number of decks where each has one of each unique card in it

class Decks {
    constructor() {
        this.deck = [];
    }
    createDeck(Decks, Suits, Values) {
        for (let i = Decks; i > 0; i--) {
            for (let suit of Suits) {
                for (let value of Values) {
                    this.deck.push(new Card(suit, value));
                }
            }
        }
        return this.deck;
    }
}