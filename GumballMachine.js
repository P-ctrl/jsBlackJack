function UpdateHand(cardEval) {
    let totSum = +$('#Hand').html();
    totSum += cardEval;
    $('#Hand').html(totSum);
    if (totSum > 21) {
        alert('BUST!');
    }
}

function cardEval(card) {
    let cardEval = 0;
    if (card < 1) {
        cardEval = 11;
    }
    else if (card >= 10) {
        cardEval = 10;
    }
    else {
        cardEval = card + 1;
    }
    return cardEval;
}

function GetRandomNumber(max) {
    return Math.floor(Math.random() * max)
}

function randomProperty(obj) {
    var keys = Object.keys(obj)
    return obj[keys[keys.length * Math.random() << 0]];
};

function GenerateGumballs() {
    let arr = []
    let numToMake = GetRandomNumber(52)
    for (let i = 0; i < numToMake; ++i) {
        arr.push(new Gumball(randomProperty(Colors),randomProperty(Cards)))
    }
    return arr;
}

class GumballMachine {
    Gumballs = GenerateGumballs();

/*     AllBalls() {
        for (let i = 0; i < this.Gumballs.length; i++) {
            let theBalls = this.Gumballs.shift();
        return theBalls.Color.name;
        }
    } */

    GetGumball() {
        if (this.Gumballs.length > 0) {
            // console.log(this.Gumballs);
            let currBall = this.Gumballs.splice(GetRandomNumber(this.Gumballs.length - 1), 1)[0];
            // console.log(currBall);
            UpdateHand(cardEval(currBall.Card.value));
            return currBall.Card.Card + " of " + currBall.Color.Suit;
        }
        else {
            alert('BUST!');
            return 0;
        }
    }

    DealerCard() {
        let totSum = 0;
        while (totSum < 17) {
            let currBall = this.Gumballs.splice(GetRandomNumber(this.Gumballs.length - 1), 1)[0];
            totSum += cardEval(currBall.Card.value);
        }
        return totSum;
    }

    GetNumberOfGumballsLeft() {
        return this.Gumballs.length;
    }
    //implement GetNumberOfGumballsLeft
}


let myFavoriteGumballMachine = new GumballMachine();

// write functions and code to pull out a gumball here
// the machine is already full of some number of gumballs
// You will need to add constructors and fields in order to expose the data

/* function AllBalls() {
    let theBalls = myFavoriteGumballMachine.AllBalls();
    UpdateUI(theBalls);
} */

function GetGumball() {
    let obtainedGumball = myFavoriteGumballMachine.GetGumball();
    UpdateUI(obtainedGumball)
}

function UpdateUI(gumball) {
    document.getElementById("count").innerHTML = myFavoriteGumballMachine.GetNumberOfGumballsLeft();
    document.getElementById("Your card").innerHTML = JSON.stringify(gumball);
}

function Dealer() {
    let totSum = myFavoriteGumballMachine.DealerCard();
    $('#Dealer').html(totSum);
    if (totSum > 21) {
        alert("Dealer busts!");
    }
    else if (totSum > +$('#Hand').html()) {
        alert("Dealer wins!");
    }
    else {
        alert("You win!");
    }

}

//initialize output values
UpdateUI(null);