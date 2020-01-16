const Suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
const SuitsSymbols = ["♠", "♥", "♦", "♣"];
const Values = ["Ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King"];
var PlayerHand = [0], DealerHand = [0];

function cardEval(aCard) {
    switch (aCard) {
        case 'Ace':
            return 11;
        case 'King':
            return 10;
        case 'Queen':
            return 10;
        case 'Jack':
            return 10;
        default:
            return aCard;
    }
}

function symbolizer(Suit) {
    switch (Suit) {
        case 'Spades':
            return SuitsSymbols[0];
        case 'Hearts':
            return SuitsSymbols[1];
        case 'Diamonds':
            return SuitsSymbols[2];
        case 'Clubs':
            return SuitsSymbols[3];
    }
}

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
    console.log('Dealer hand size ' + DealerHand.length);
    DealerHand.unshift(DealerDeck.deck.shift());
    DealerHand[DealerHand.length-1] += cardEval(DealerHand[0].value);
    newCard('#dealersHand',DealerHand[0]);
    console.log('Dealer hand size ' + DealerHand.length);
    console.log(DealerHand[DealerHand.length-1])
    // console.log(deckShuffler(DealerDeck.deck));
}

// Card graphics

function drawSymbols(values, suits) {
    let symbols = symbolizer(suits);
    for ( ; values > 1 ; values--) {
        symbols += symbolizer(suits);
    }
    return symbols
}

function colorizer(suit) {
    switch (suit) {
        case 'Hearts':
        case 'Diamonds':
            return 'danger';
        default:
            return 'dark';
    }
}

function newCard(drawer, title) {
    var cardwhole = $(`
    <div class="col">
        <div class="card drawn-cards" style="width: 10rem">
            <h4 class="card-title">${title.value} <span class="text-${colorizer(title.suit)}">${drawSymbols(cardEval(title.value),title.suit)}</span></h4>
            <div class="card-body"></div>
        </div>
    </div>`
    );
    $(drawer).prepend(cardwhole);
}

// Button adds card to hand

$('#draw-button').click(function () {
    PlayerHand.unshift(DealerDeck.deck.shift());
    PlayerHand[PlayerHand.length-1] += cardEval(PlayerHand[0].value);
    newCard('#playersHand',PlayerHand[0]);
    console.log(PlayerHand);
    console.log(cardEval(PlayerHand[PlayerHand.length-1]));
    bustCheck('player',PlayerHand[PlayerHand.length-1]);
});

;

$('#stand-button').click(function () {
    DealerHand.unshift(DealerDeck.deck.shift());
    DealerHand[DealerHand.length-1] += cardEval(DealerHand[0].value);
    bustCheck('dealer',DealerHand[DealerHand.length-1]);
});


function bustCheck(drawer,sum) {
    switch (drawer) {
        case 'dealer':
            if (sum === 21) {
                console.log('Dealer Blackjack!');
            } else if (sum > 21) {
                console.log('Dealer bust');
            } else if (sum < 17) {
                DealerHand.unshift(DealerDeck.deck.shift());
                DealerHand[DealerHand.length-1] += cardEval(DealerHand[0].value);
                newCard('#dealersHand',DealerHand[0]);
                bustCheck('dealer',DealerHand[DealerHand.length-1]);
            } else {
                console.log(sum);
            }
            break;
        case 'player':
            if (sum === 21) {
                console.log('Blackjack!');
            } else if (sum > 21) {
                $('#draw-button').prop('disabled', true);
                $('#draw-button').html('Bust!');
                console.log('Bust!');
            } else {
                console.log(sum);
            }
            break;
    }
};

/* function handStopper(sum) {
    if (sum > 21) {
        bust();
    }
    else if (sum === 21) {
        blackjack();
    }
    else {
        return;
    }
} */

/* function bust() {
    $('#stand-button').addClass('.disabled');
} */