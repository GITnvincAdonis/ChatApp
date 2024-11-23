export function ProtagBubble() {
  return (
    <>
      <div className="flex items-center space-x-2 m-1 min-w-[30%] max-w-[60%] h-full p-1">
        <h1 className="w-full bg-black text-secondary shadow-md border text-justify font-mono font-semibold rounded-xl p-3">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae totam
        </h1>
        <div className="bg-primary  border rounded-full aspect-square h-[3rem]"></div>
      </div>
    </>
  );
}
export function AntagBubble() {
  return (
    <>
      <div className="flex items-center space-x-2 m-1 min-w-[30%] max-w-[60%] h-full p-1">
        <div className="  border bg-slate-800 rounded-full aspect-square h-[3rem]"></div>
        <h1 className="w-full  border text-justify shadow-md outline-dashed rounded-xl font-mono font-semibold p-3">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae totam
        </h1>
      </div>
    </>
  );
}
