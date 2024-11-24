import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

const Users = [
  { name: "Raveon Adonis", label: "Raveon Adonis" }, // {
  //   value: "next.js",
  //   label: "Next.js",
  // },
  // {
  //   value: "sveltekit",
  //   label: "SvelteKit",
  // },
  // {
  //   value: "nuxt.js",
  //   label: "Nuxt.js",
  // },
  // {
  //   value: "remix",
  //   label: "Remix",
  // },
  // {
  //   value: "astro",
  //   label: "Astro",
  // },
];

export function SearchBox() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between"
        >
          {value
            ? Users.find((User) => User.name === value)?.label
            : "Select User Profile..."}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search User profile..." className="h-9" />
          <CommandList>
            <CommandEmpty>No User found.</CommandEmpty>
            <CommandGroup>
              {Users.map((User) => (
                <CommandItem
                  key={User.name}
                  value={User.name}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {User.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === User.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
