import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { useTokenRetrieve } from "@/P_Clean Code Abstractions/tanStackQueries";
import { UserIDStore } from "@/STORES/userAuthStore";
import {
  Hand,
  LogOutIcon,
  PersonStandingIcon,
  SettingsIcon,
} from "lucide-react";

export function IntegratedPopover() {
  useTokenRetrieve();
  const UserName = UserIDStore((state) => state.name);
  return (
    <>
      <Button className="my-2 mx-2">
        Hi {UserName} <Hand></Hand>
      </Button>
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
          <div className="flex flex-col items-end space-y-0 mx-4">
            {PopoverOptions.map((item, index) => {
              return (
                <Button key={index} className="w-max m-2">
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

const SignOut = () => {
  return <LogOutIcon />;
};
const PopoverOptions = [
  {
    content: <DarkToggle></DarkToggle>,
  },
  {
    content: <SignOut></SignOut>,
  },
];
