const Suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
const Values = ["Ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King"];
var PlayerHand = [], DealerHand = [];

/* function cardEval(aCard) {
    let cardEval = 0;
    if (aCard < 1) {
        cardEval = 11;
    }
    else if (aCard >= 10) {
        cardEval = 10;
    }
    else {
        cardEval = aCard + 1;
    }
    return cardEval;
} */

// Function let's you shuffle arrays

let deckShuffler = function (arr) {
    let deckSpot,
        movedCard;

    for (let i = arr.length - 1; i > 0; i--) {
        deckSpot = Math.floor(Math.random() * (i + 1));
        movedCard = arr[i];
        arr[i] = arr[deckSpot];
        arr[deckSpot] = movedCard;
    }
    return arr;
}

// A class for making a card with a suit and value

class Card {
    constructor(suit, value) {
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
        return deckShuffler(this.deck);
    }
}

let DealerDeck = new Decks;

// Function for the button that constructs the intial deck

function spawnDecks() {
    DealerDeck.createDeck($('#nofdecks').val(), Suits, Values);
    console.log(DealerDeck.deck)
    $('#h1-jumbo').addClass('d-none');
    $('#p-jumbo').addClass('d-none');
    $('#hr-jumbo').addClass('d-none');
    newCard('#dealersHand',DealerDeck.deck.shift());
    // console.log(deckShuffler(DealerDeck.deck));
}

// Card graphics

function newCard(drawer, title) {
    var cardwhole = $(`
    <div class="col">
        <div class="card drawn-cards" style="width: 10rem">
            <h4 class="card-title">${title.value} of ${title.suit}</h4>
            <div class="card-body"></div>
        </div>
    </div>`
    );
    $(drawer).prepend(cardwhole);
}

// Button adds card to hand

$('#draw-button').click(function () {
    newCard('#playersHand',DealerDeck.deck.shift());
});

function handStopper(sum) {
    if (sum > 21) {
        bust();
    }
    else if (sum === 21) {
        blackjack();
    }
    else {
        return;
    }
}

function bust() {
    $('#stand-button').addClass('.disabled');
    
}