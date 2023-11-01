import Square from "./Square";

const Board = () => {
  const board = [
    ...Array(64)
      .fill(null)
      .map((_, i) => <Square index={i} key={i} />),
  ];

  return (
    <div className="outline outline-1 flex flex-wrap w-board mr-10 aspect-square">
      {board}
    </div>
  );
};

export default Board;
