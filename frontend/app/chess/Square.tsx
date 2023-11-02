"use client";

const Square = ({ index, piece }: any) => {
  const col = Math.floor(index / 8) + 1;
  const row = Math.floor(index % 8) + 1;
  const color = "bg-" + ((col + row) % 2 == 0 ? "rose-50" : "black");

  return (
    <div
      className={`${color} flex flex-square justify-center items-center p-2`}
    >
      {/* <div>SQUARE</div> */}
    </div>
  );
};

export default Square;
