export default class Singer {
  constructor() {
    this.wordQueue = [];
    console.log("singer initialised");
  }

  addToWordQueue(words) {
    this.wordQueue = this.wordQueue.concat(words);
    console.log(this.wordQueue);
  }
}
