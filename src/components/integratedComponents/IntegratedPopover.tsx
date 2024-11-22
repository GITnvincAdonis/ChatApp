import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CircleAlertIcon, SettingsIcon } from "lucide-react";

export function IntegratedPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild className="m-2">
        <Button className="px-3 border-none rounded-2xl">
          <SettingsIcon></SettingsIcon>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full h-0 border-none p-0 text-center bg-none shadow-none ">
        <div className="flex flex-col space-y-2">
          {Array.from({ length: 3 }).map(() => {
            return (
              <>
                <Button className="aspect-square">
                  <CircleAlertIcon></CircleAlertIcon>
                </Button>
              </>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
