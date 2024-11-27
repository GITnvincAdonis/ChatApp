import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { PersonStandingIcon, SettingsIcon } from "lucide-react";

export function IntegratedPopover() {
  return (
    <>
      <Button className="my-2">
        <PersonStandingIcon></PersonStandingIcon>
      </Button>
      <Popover>
        <PopoverTrigger asChild className="m-2">
          <Button className="px-3 border-none rounded-2xl">
            <SettingsIcon></SettingsIcon>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full h-0 border-none p-0 text-center bg-none shadow-none ">
          <div className="flex flex-col space-y-2">
            {PopoverOptions.map((item, index) => {
              return (
                <Button key={index} className="aspect-square m-2">
                  {item.content}
                </Button>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
const DarkToggle = () => {
  const root = document.documentElement;

  return (
    <div className="flex items-center space-x-2 ">
      <Switch
        onClick={() => {
          if (root.classList.contains("dark")) root.classList.remove("dark");
          else if (!root.classList.contains("dark")) root.classList.add("dark");
        }}
      />
      <Label>Dark Mode</Label>
    </div>
  );
};
const PopoverOptions = [
  {
    content: <DarkToggle></DarkToggle>,
  },
];
