import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function CustTooltip(props: { content: any; hoverContent: any }) {
  const { content, hoverContent } = props;
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0.6} defaultOpen>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent side="right"> {hoverContent}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
