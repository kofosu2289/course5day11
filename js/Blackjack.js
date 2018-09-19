class Blackjack {
  constructor(appID) {
    this.app = document.getElementById(appID);
    // These 2 arrays will only be available within our constructor
    let values = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King'];
    let faceValues = ['Jack', 'Queen', 'King'];
    let suits = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
    this.deck = [];
    // Step 1: Make and shuffle deck of cards

    // Loop through all suits
    for (let i = 0; i < suits.length; i++) {
      // Create all the cards for that suit
      for (let j = 0; j < values.length; j++) {
        // Each card has a value, as well as a file name
        let numVal;
        if (values[j].length === 3) {
          //if (values[j] === 'Ace') {
          numVal = 11;
        } else if (values[j].length > 3) {
          //   } else if (faceValues.includes(values[j])) {
          numVal = 10;
        } else {
          numVal = values[j];
        }
        let card = {
          numVal: numVal,
          cardValue: values[j],
          fileName: `${values[j]}-of-${suits[i]}.png`
        };
        //console.log(card);
        this.deck.push(card);
      }
    }
    this.deck = [
      // Create 6 copies of the deck using the spread operator.
      // As a reminder, the spread operator functions similarly to .concat in this example
      ...this.deck,
      ...this.deck,
      ...this.deck,
      ...this.deck,
      ...this.deck,
      ...this.deck
    ];
    // Sort takes a callback, and if the value negative it means the item on the left should be further left in the array
    // If the value is positive, the item should be further right in the array
    // Because we're returning a random number between -.5 and .5 the result should end up chaotic/random
    this.deck.sort((a, b) => 0.5 - Math.random());
    // let numOperations = 0; // Count how many times cards have been swapped
    // this.deck.sort((a, b) => {
    //   let randVal = 0.5 - Math.random();
    //   console.log(randVal);
    //   numOperations++;
    //   return randVal;
    // });
    // console.log(numOperations);

    console.log(this.deck);

    // App div

    // Header
    this.header = document.createElement('header');
    // insertBefore: Inserts the first parameter(an HTML element) before the second parameter(another HTML element)
    document.body.insertBefore(this.header, document.body.firstChild);

    // Buttons - DEAL/HIT/STAND
    this.btnDeal = document.createElement('button');
    this.btnDeal.innerHTML = 'DEAL';
    this.btnDeal.addEventListener('click', this.deal.bind(this));
    // bind is a way to redefine the meaning of the 'this' keyword within a method. if we do not bind 'this' onto the event listener, 'this' will be the button inside the method. If we bind 'this', it will be the blackjack object.
    this.header.appendChild(this.btnDeal);

    this.btnHit = document.createElement('button');
    this.btnHit.innerHTML = 'HIT';
    this.btnHit.addEventListener('click', this.hit.bind(this));
    this.header.appendChild(this.btnHit);

    this.btnStand = document.createElement('button');
    this.btnStand.innerHTML = 'STAND';
    this.btnStand.addEventListener('click', this.stand.bind(this));
    this.header.appendChild(this.btnStand);
    // Divs for the header

    // Divs for card boxes on table
  }
  // By default 'this' would refer to the element that called this method
  // Because we bound 'this' in the constructor to the blackjack object, 'this' will be the blackjack object
  deal() {
    console.log(this);
  }
  hit() {}
  stand() {}
}
