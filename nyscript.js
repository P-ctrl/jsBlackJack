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
        this.deck = [0];
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

// Function for the button that constructs the initial deck

function spawnDecks() {
/*     DealerDeck.deck = [0];
    PlayerHand = [0];
    DealerHand = [0]; */
    restartGame();
    DealerDeck.createDeck($('#nofdecks').val(), Suits, Values);
    dDrawCard();
    pDrawCard();
    pDrawCard();
    $('#dealersSum').html(DealerHand[DealerHand.length - 1] + '.');
    bustCheck('player', PlayerHand[PlayerHand.length - 1]);
    $('#button-jumbo').html('Restart');
    console.log(DealerDeck.deck);
}

function restartGame() {
    if (DealerDeck.deck != 0) {
    DealerDeck.deck = [0];
    PlayerHand = [0];
    DealerHand = [0];
    $('.cardsInPlay').remove('.cardsInPlay');
    $('#draw-button').prop('disabled', false);
    $('#draw-button').html('Hit');
    } else {
        $('#h1-jumbo').addClass('d-none');
        $('#p-jumbo').addClass('d-none');
        $('#hr-jumbo').addClass('d-none');
        $('#gameState').removeClass('d-none');
    }
}

function dDrawCard() {
    DealerHand.unshift(DealerDeck.deck.shift());
    DealerHand[DealerHand.length - 1] += cardEval(DealerHand[0].value);
    newCard('#dealersHand', DealerHand[0]);
}

function pDrawCard() {
    PlayerHand.unshift(DealerDeck.deck.shift());
    PlayerHand[PlayerHand.length - 1] += cardEval(PlayerHand[0].value);
    newCard('#playersHand', PlayerHand[0]);
}

// Card graphics

function drawSymbols(values, suits) {
    let symbols = symbolizer(suits);
    for (; values > 1; values--) {
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

// Function that creates divs and stuff for playing cards

/* function newCard(drawer, title) {
    var cardwhole = $(`
    <div class="col text-${colorizer(title.suit)}">
        <div class="card drawn-cards" style="width: 10rem">
            <h4 class="card-header">${title.value} ${symbolizer(title.suit)}</h4>
            <div class="card-body">${drawSymbols(cardEval(title.value),title.suit)}</div>
            <h4 class="card-footer text-right">${symbolizer(title.suit)} ${title.value}</h4>
        </div>
    </div>`
    );
    $(drawer).prepend(cardwhole);
} */

/* function findArt(title) {
    return uniCard["title.value" of "title.suit"];
} */

function newCard(drawer, title) {
    uniArt = $(`<span class="cardsInPlay text-${colorizer(title.suit)}">&#x${uniCard[title.value + ' OF ' + title.suit]};</span>`);
    $(drawer).prepend(uniArt);
}

// Button adds card to hand

$('#draw-button').click(function () {
    pDrawCard();
    console.log(PlayerHand);
    console.log(cardEval(PlayerHand[PlayerHand.length - 1]));
    bustCheck('player', PlayerHand[PlayerHand.length - 1]);
});

$('#stand-button').click(function () {
    /* DealerHand.unshift(DealerDeck.deck.shift());
    DealerHand[DealerHand.length-1] += cardEval(DealerHand[0].value); */
    bustCheck('dealer', DealerHand[DealerHand.length - 1]);
});

function bustCheck(drawer, sum) {
    switch (drawer) {
        case 'dealer':
            if (sum === 21) {
                $('#dealersSum').html('Blackjack!');
            } else if (sum > 21) {
                $('#dealersSum').html('busted.');
            } else if (sum < 17) {
                DealerHand.unshift(DealerDeck.deck.shift());
                DealerHand[DealerHand.length - 1] += cardEval(DealerHand[0].value);
                newCard('#dealersHand', DealerHand[0]);
                bustCheck('dealer', DealerHand[DealerHand.length - 1]);
            } else {
                $('#dealersSum').html(DealerHand[DealerHand.length - 1] + '.');
            }
            break;
        case 'player':
            if (sum === 21) {
                $('#playerSum').html('Blackjack!');
            } else if (sum > 21) {
                $('#draw-button').prop('disabled', true);
                $('#draw-button').html('Bust!');
                $('#playerSum').html('busted.');
            } else {
                $('#playerSum').html(PlayerHand[PlayerHand.length - 1] + '.');
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

function whoWon() {

}

/* function centeredText(string, fontSize, color) {
    var i = string.length;
    i = i*fontSize*0.62;
    if (i > canvas.width) {
      i = canvas.width;
    }
    ctx.fillStyle = "RGBA(255, 255, 255, 0.8)";
    ctx.fillRect(canvas.width / 2 - i / 2,canvas.height / 2 - (fontSize * 1.5) / 2, i, (fontSize * 1.5) );
    ctx.font = fontSize.toString() + "px monospace";
    ctx.fillStyle = color;
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";

    ctx.fillText(string, canvas.width / 2, canvas.height / 2);
} */