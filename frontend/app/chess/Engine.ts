export type StockfishResponse = {
  bestMove: string;
  posEval: string;
};

export default class Engine {
  stockfish: Worker;
  onMessage: any;

  constructor() {
    this.stockfish = new Worker("./stockfish.js");
    this.onMessage = (callback: any) => {
      this.stockfish.addEventListener("message", (e) => {
        console.log(e);
        const bestMove = e.data?.match(/bestmove\s+(\S+)/)?.[1];
        const posEval = e.data.match(/cp\s+(\S+)/)?.[1];

        callback({ bestMove, posEval });
      });
    };

    this.init();
  }

  init() {
    this.stockfish.postMessage("uci");
    this.stockfish.postMessage("isready");
  }

  evaluatePosition = (fen: any, depth: number = 12) => {
    this.stockfish.postMessage(`position fen ${fen}`);
    this.stockfish.postMessage(`go depth ${depth}`);
  };

  stop = () => {
    this.stockfish.postMessage("stop"); // Run when changing positions
  };

  quit = () => {
    this.stockfish.postMessage("quit"); // Good to run this before unmounting.
  };
}
