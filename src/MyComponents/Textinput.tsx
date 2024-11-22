import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function TextInput() {
  return (
    <>
      <div className="flex space-x-3">
        <Input
          className="shadow-md w-full outline"
          placeholder="Send message to ..."
        ></Input>
        <Button>Send Message</Button>
      </div>
    </>
  );
}
