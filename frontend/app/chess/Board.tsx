import BoardRow from "./BoardRow";

const Board = () => {
  const rows = new Array(8).fill(new Array(8).fill(1));

  return (
    <div className="outline outline-1 mt-36">
      {rows.map((row, rowIndex) => (
        <BoardRow row={row} rowIndex={rowIndex} key={rowIndex} />
      ))}
    </div>
  );
};

export default Board;
