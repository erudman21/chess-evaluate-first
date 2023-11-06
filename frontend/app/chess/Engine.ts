export type StockfishResponse = {
  evaluation: number;
  continuation: string;
};

export default class Engine {
  stockfish: Worker;
  onMessage: any;
  depth: number;

  constructor(depth: number) {
    this.stockfish = new Worker("./stockfish.js");
    this.onMessage = this.messageHandler;
    this.depth = depth;

    this.init();
  }

  init() {
    this.stockfish.postMessage("uci");
    this.stockfish.postMessage("isready");
  }

  messageHandler(callback: any) {
    return this.stockfish.addEventListener("message", (e) => {
      const re = new RegExp(`depth ${this.depth}`);
      const correctDepth = e.data?.match(re);

      if (correctDepth) {
        const evaluation =
          correctDepth.input.match(/cp\s-?\d+/)[0].split(" ")[1] / 100;

        const continuation = correctDepth.input.split("pv ")[2];

        callback({ evaluation, continuation });
      }
    });
  }

  setDepth = (depth: number) => {
    this.depth = depth;
  };

  evaluatePosition = (fen: any) => {
    this.stockfish.postMessage(`position fen ${fen}`);
    this.stockfish.postMessage(`go depth ${this.depth}`);
  };

  stop = () => {
    this.stockfish.postMessage("stop");
  };

  quit = () => {
    this.stockfish.postMessage("quit");
  };
}
