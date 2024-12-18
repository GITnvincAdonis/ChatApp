export function ProtagBubble(props: { textContent: string; sentDate: string }) {
  const { textContent, sentDate } = props;
  const date = new Date(sentDate);
  return (
    <>
      <div className="flex items-center space-x-2 m-1 min-w-[30%] max-w-[60%] h-full p-1">
        <h1 className="w-full bg-foreground text-secondary lg:text-md text-xs shadow-md border text-justify font-mono font-semibold rounded-xl p-3">
          {textContent}
          <div className="text-xs text-end">{`${date.toLocaleString()}`}</div>
        </h1>
        <div className="bg-primary  border rounded-full aspect-square lg:h-[3rem] h-[2rem]"></div>
      </div>
    </>
  );
}
export function AntagBubble(props: { textContent: string; sentDate: string }) {
  const { textContent, sentDate } = props;
  const date = new Date(sentDate);
  return (
    <>
      <div className="flex items-center space-x-2 m-1 min-w-[30%] max-w-[60%] h-full p-1">
        <div className="  border bg-slate-800 rounded-full aspect-square lg:h-[3rem] h-[2rem]"></div>
        <h1 className="w-full  border text-justify shadow-md lg:text-md text-xs outline-dashed outline-1 rounded-xl font-mono font-semibold p-3">
          {textContent}
          <div className="text-xs text-end">{`${date.toLocaleString()}`}</div>
        </h1>
      </div>
    </>
  );
}
