export default class Singer {
  constructor() {
    this.wordQueue = [];
    this.currentWord = null;
    setInterval(this.nextWord.bind(this), 1000); // using an interval for now to simulate flow of words
  }

  addToWordQueue(words) {
    this.wordQueue = this.wordQueue.concat(words);
    console.log(this.wordQueue);
  }

  nextWord() {
    if(this.wordQueue.length) {
      this.currentWord = this.wordQueue.shift();
    } else {
      this.currentWord = null;
    }
    console.log(this.currentWord);
  }
}
