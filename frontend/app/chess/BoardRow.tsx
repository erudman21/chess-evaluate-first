import Square from "./Square";

const BoardRow = ({ row, rowIndex }: any) => {
  return (
    <div className="flex w-96 h-12">
      {row.map((square: any, index: any) => (
        <Square key={index} rowIndex={rowIndex} index={index} />
      ))}
    </div>
  );
};

export default BoardRow;
