
function GetRandomNumber(max) {
    return Math.floor(Math.random() * max)
}

function randomProperty(obj) {
    var keys = Object.keys(obj)
    return obj[keys[keys.length * Math.random() << 0]];
};

function GenerateGumballs() {
    let arr = []
    let numToMake = GetRandomNumber(10)
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
            return currBall.Card.Card + " of " + currBall.Color.Suit;
        }
        else {
            alert('BUST!');
            return 0;
        }
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
    document.getElementById("Dealer").innerHTML = myFavoriteGumballMachine.GetNumberOfGumballsLeft();
    document.getElementById("Your card").innerHTML = JSON.stringify(gumball);
}

//initialize output values
UpdateUI(null);