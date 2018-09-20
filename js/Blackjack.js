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

    // keep track of the value of all aces played
    this.playerAceScore = 0;
    this.dealerAceScore = 0;

    this.playerCardBox.innerHTML = '';
    this.dealerCardBox.innerHTML = '';

    this.playerScoreBox.innerHTML = 'Player: 0';
    this.dealerScoreBox.innerHTML = 'Dealer: 0';

    this.messageBox.innerHTML = '';

    this.btnHit.disabled = false;
    this.btnStand.disabled = false;
    this.btnHit.style.opacity = '1';
    this.btnStand.style.opacity = '1';

    this.myMoney -= 10;
    this.moneyBox.innerHTML = '$' + this.myMoney;

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

      // keep separate score of player aces
      if (this.playerHand[0].cardValue == 'Ace') {
        this.playerAceScore += 11;
      }
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

      // keep separate score of player aces
      if (this.dealerHand[0].cardValue == 'Ace') {
        this.dealerAceScore += 11;
      }
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

      // keep separate score of player aces
      if (this.playerHand[1].cardValue == 'Ace') {
        this.playerAceScore += 11;
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
      // keep separate score of player aces
      if (this.dealerHand[1].cardValue == 'Ace') {
        this.dealerAceScore += 11;
      }
    }, 4000); // Dealer second card

    setTimeout(() => {
      /*
        If player won, give $15
        If dealer won, lose $10
        If both won, do not change

      */

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
            this.messageBox.innerHTML = 'DEALER HAS BLACKJACK!<br/>YOU LOSE!';
          }
        }
      } else {
        this.messageBox.innerHTML = 'HIT OR STAND';
      }
    }, 4500);
  }
  hit() {
    console.log('in hit');
    // Add another card for the player
    // pop from array and store in players hand
    // let hitCard = this.deck.pop(); // Alternate way to store the card
    this.playerHand.push(this.deck.pop());
    this.hitCard = this.playerHand[this.playerHand.length - 1];

    // create new image for that card
    let cardPic = new Image();
    cardPic.src = 'images/cards350px/' + this.hitCard.fileName; // Add the most recent card's fileName
    // add image to the box
    this.playerCardBox.appendChild(cardPic);
    console.log(cardPic);

    // add cardvalue to the score
    // If the current card is an Ace:
    if (this.hitCard.cardValue === 'Ace') {
      // Check current score for player
      if (this.playerScore < 11) {
        // Make the ace worth 11
        this.playerScore += 11;
        this.playerAceScore += 11;
      } else {
        // Make the ace worth 1
        this.playerScore++;
        this.playerAceScore++;
      }
    } else {
      this.playerScore += this.hitCard.numVal;
    }
    // Update player score box
    this.playerScoreBox.innerHTML = 'Player: ' + this.playerScore;

    // What if the player busts?
    if (this.playerScore > 21) {
      if (this.playerAceScore >= 11) {
        // They have a high-value ace, so lets save them by reducing it
        this.playerAceScore -= 10;
        this.playerScore -= 10;
        this.playerScoreBox.innerHTML = 'Player: ' + this.playerScore;
      } else {
        // they have no ace, so they lose
        this.messageBox.innerHTML = 'BUSTED!<br/>YOU LOSE';

        // Disable buttons
        this.btnHit.disabled = 'true';
        this.btnHit.style.opacity = '0.7';
        this.btnStand.disabled = 'true';
        this.btnStand.style.opacity = '0.7';
      }
    }
    //this.playerScore = 21; // Test functionality
    // See if they won
    if (this.playerScore === 21) {
      // The player has won, disable the buttons and have the dealer play out their hand
      // Disable buttons
      this.btnHit.disabled = 'true';
      this.btnHit.style.opacity = '0.7';
      this.btnStand.disabled = 'true';
      this.btnStand.style.opacity = '0.7';

      // Tell the player they have 21, so the dealer will take their turn
      this.messageBox.innerHTML = `YOU HAVE 21!<br/>DEALER'S TURN!`;

      setTimeout(() => {
        this.stand();
      }, 1000);
    }
  }
  stand() {
    // Disable buttons
    this.btnHit.disabled = 'true';
    this.btnHit.style.opacity = '0.7';
    this.btnStand.disabled = 'true';
    this.btnStand.style.opacity = '0.7';

    // Flip the hole card
    setTimeout(() => {
      // start by revealing the hole card and displaying the 'true' dealer score
      this.dealerCardBox.children[1].src =
        'images/cards350px/' + this.dealerHand[1].fileName;
      this.dealerScoreBox.innerHTML = 'Dealer: ' + this.dealerScore;
    }, 1250);

    setTimeout(() => {
      // If the dealer should grab another card, make them
      if (
        this.dealerScore < 17 ||
        (this.dealerScore == 17 && this.dealerAceScore >= 11)
      ) {
        this.dealerCard = this.deck.pop(); // dealer's new card obj
        let cardPic = new Image(); // make a card image
        cardPic.src = 'images/cards350px/' + this.dealerCard.fileName;

        // output the card pic to the dealer card box
        this.dealerCardBox.appendChild(cardPic);

        this.dealerScore += this.dealerCard.numVal;
      }

      if (
        this.dealerScore < 17 ||
        (this.dealerScore == 17 && this.dealerAceScore >= 11)
      ) {
        this.stand();
      }
    }, 2500); // setTimeout
  }

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
