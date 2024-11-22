import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function TextInput() {
  return (
    <>
      <div className="flex justify-center px-20 space-x-1">
        <Input
          className=" w-[30rem] outline outline-1 text-sm"
          placeholder="Send message to ..."
        ></Input>
        <Button className="">
          <h1 className="text-sm">Send Message</h1>
        </Button>
      </div>
    </>
  );
}
