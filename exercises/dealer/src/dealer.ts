/**
 * Shuffle an array in place
 * @param a Array to shuffle
 */
function shuffleArray(a: any[]) {
  // Iterate over the array
  for (let i = a.length; i; i--) {
    // Get next index
    let j = Math.floor(Math.random() * i);
    // Swap positions
    [a[i - 1], a[j]] = [a[j], a[i - 1]];
  }
}

export enum Suit {
  Clubs,
  Diamonds,
  Hearts,
  Spades
};

export enum CardNumber {
  Ace, Two, Three, Four, Five,
  Six, Seven, Eight, Nine, Ten,
  Jack, Queen, King
};

export type Card = [Suit, CardNumber];

export class Dealer {
  cards: Card[] = new Array()
  constructor() {
    this.setupDeck();
    this.shuffle();
  }
  setupDeck() {
    for (let i = 0; i < Object.keys(CardNumber).length / 2; i++) {
      for (let j = 0; j < Object.keys(Suit).length / 2; j++) {
        this.cards.push([j, i]);
      }
    }
  }
  getLength() {
    return this.cards.length;
  }
  shuffle() {
    shuffleArray(this.cards);
  }
  dealHand(numCards = 5) {
    if (numCards > this.getLength())  throw new Error('Not enough cards left!');
    if (numCards < 0) throw new Error('You have to give me your cards now');
    return this.cards.splice(this.cards.length - numCards, numCards);
  }
  readCard(card: Card) {
    return `${CardNumber[card[1]]} of ${Suit[card[0]]}`
  }
}
