class Blackjack {
  constructor(appID) {
    this.app = document.getElementById(appID);
    // These 2 arrays will only be available within our constructor
    let values = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King'];
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
          numVal = 11;
        } else if (values[j].length > 3) {
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

    console.log(this.deck);

    this.buildDOM();

    this.playerScore = 0;
    this.dealerScore = 0;
    this.playerHand = [];
    this.dealerHand = [];
    this.soft17 = false; // Used for making the dealer play another card at 17 with an ace that counts for 11
    this.myMoney = 500;
  }

  // By default 'this' would refer to the element that called this method
  // Because we bound 'this' in the constructor to the blackjack object, 'this' will be the blackjack object
  deal() {
    // Set up a new hand of blackjack
    this.playerHand = []; // Clear out hands
    this.dealerHand = [];

    this.playerScore = 0;
    this.dealerScore = 0;

    this.playerCardBox.innerHTML = '';
    this.dealerCardBox.innerHTML = '';

    this.playerScoreBox.innerHTML = 'Player: 0';
    this.dealerScoreBox.innerHTML = 'Dealer: 0';

    setTimeout(() => {
      // Add card to player hand

      this.playerHand.push(this.deck.pop());

      // Add image to playerBox
      let cardPic = new Image();
      cardPic.src = 'images/cards350px/' + this.playerHand[0].fileName;
      this.playerCardBox.appendChild(cardPic);

      // Add value to playerScore
      this.playerScore += this.playerHand[0].numVal;
      this.playerScoreBox.innerHTML = 'Player: ' + this.playerScore;
      console.log(this.playerHand);
    }, 1000); // Player first card

    setTimeout(() => {
      this.dealerHand.push(this.deck.pop());
      // Add image to dealerBox
      let cardPic = new Image();
      cardPic.src = 'images/cards350px/' + this.dealerHand[0].fileName;
      this.dealerCardBox.appendChild(cardPic);

      // Add value to dealerScore
      this.dealerScore += this.dealerHand[0].numVal;
      this.dealerScoreBox.innerHTML = 'Dealer: ' + this.dealerHand[0].cardValue;
      console.log(this.dealerHand);
    }, 2000); // Dealer first card

    setTimeout(() => {
      // Add card to player hand

      this.playerHand.push(this.deck.pop());

      // Add image to playerBox
      let cardPic = new Image();
      cardPic.src = 'images/cards350px/' + this.playerHand[1].fileName;
      this.playerCardBox.appendChild(cardPic);

      // Add value to playerScore
      this.playerScore += this.playerHand[1].numVal;
      this.playerScoreBox.innerHTML = 'Player: ' + this.playerScore;
      console.log(this.playerHand);

      // Deal with Aces
      if (this.playerScore === 22) {
        this.playerScore -= 10;
        this.playerScoreBox.innerHTML = 'Player: ' + this.playerScore;
      }
    }, 3000); // Player second card

    setTimeout(() => {
      this.dealerHand.push(this.deck.pop());
      // Add image to dealerBox
      let cardPic = new Image();
      cardPic.src = 'images/cards350px/0-Back-of-Card-Red.png';
      this.dealerCardBox.appendChild(cardPic);

      // Add value to
      this.dealerScore += this.dealerHand[1].numVal;

      if (this.dealerScore === 22) {
        this.dealerScore -= 10;
        this.dealerScoreBox.innerHTML = '';
      }
    }, 4000); // Dealer second card

    setTimeout(() => {
      /*
        If player won, give $15
        If dealer won, lose $10
        If both won, do not change

      */
      this.dealerScore = 21;
      this.playerScore = 21;
      if (this.playerScore == 21 || this.dealerScore == 21) {
        // Disable buttons to force them to click 'deal' to continue
        this.btnHit.disabled = 'true';
        this.btnHit.style.opacity = '0.7';

        this.btnStand.disabled = 'true';
        this.btnStand.style.opacity = '0.7';

        let flippedCard = this.dealerCardBox.children[1];
        flippedCard.src = 'images/cards350px/' + this.dealerHand[1].fileName;

        if (this.playerScore === 21 && this.dealerScore === 21) {
          // Declare PUSH and flip over the second card
          this.messageBox.innerHTML = 'BLACKJACK PUSH';
        } else {
          // If only player won
          if (this.playerScore === 21) {
            // Increase $$$ for win
            this.myMoney += 15;
            this.moneyBox.innerHTML = '$' + this.myMoney;
            // Declare blackjack for the player
            this.messageBox.innerHTML = 'BLACKJACK!<br/>YOU WIN!';
          }
          // If only dealer won
          else if (this.dealerScore === 21) {
            this.myMoney -= 10;
            this.moneyBox.innerHTML = '$' + this.myMoney;
            this.messageBox.innerHTML = 'DEALER HAS BLACKJACK!<br/>YOU LOSE!';
          }
        }
      }
    }, 4500);

    // what we should have at the end:
    /*
      2 cards for the dealer
      2 card for the player
      All cards should be displayed
      The dealer's face up card should be in his box 
      The player's cards should be tallied
      Let the player know if they won, or if they need to choose hit/stand
    */
  }
  hit() {}
  stand() {}

  buildDOM() {
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

    // Divs for the header - Score, feedback and money boxes
    this.messageBox = document.createElement('div');
    this.messageBox.className = 'scoreBox';
    // override the styling
    this.messageBox.style.cssText =
      'width: 200px; background-color: transparent; color:white; border: 0; font-size: 1.3rem;';
    this.header.appendChild(this.messageBox);

    this.playerScoreBox = document.createElement('div');
    this.playerScoreBox.innerHTML = 'Player: ';
    this.header.appendChild(this.playerScoreBox);

    this.dealerScoreBox = document.createElement('div');
    this.dealerScoreBox.innerHTML = 'Dealer: ';
    this.header.appendChild(this.dealerScoreBox);

    this.moneyBox = document.createElement('div');
    this.moneyBox.innerHTML = '$500';
    this.header.appendChild(this.moneyBox);

    // Divs for card boxes on table
    this.dealerCardBox = document.createElement('div');
    this.app.appendChild(this.dealerCardBox);
    this.playerCardBox = document.createElement('div');
    this.app.appendChild(this.playerCardBox);
  }
}
