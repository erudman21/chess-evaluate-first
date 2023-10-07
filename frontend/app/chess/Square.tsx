const Square = ({ index, rowIndex }: any) => {
  const color = ((index % 8) + rowIndex) % 2 == 0 ? "rose-50" : "black";

  return <div className={`flex-auto bg-${color}`}> </div>;
};

export default Square;
