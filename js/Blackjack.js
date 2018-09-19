class Blackjack {
  constructor(appID) {
    this.app = document.getElementById(appID);
    // These 2 arrays will only be available within our constructor
    let values = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King'];
    let faceValues = ['Jack', 'Queen', 'King'];
    let suits = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
    this.deck = [];

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

    // Buttons

    // Divs for the header

    // Divs for card boxes on table

    //this.app.innerHTML = `Hello from the Blackjack Class!`;
  }
  // Step 1: Make and shuffle deck of cards
}
