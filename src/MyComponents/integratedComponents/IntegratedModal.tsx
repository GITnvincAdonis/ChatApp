import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function IntegratedModal(props: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  trigger: any;
  header: string;
  tagline: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  modalContent: any;
}) {
  const { trigger, header, tagline, modalContent } = props;
  return (
    <div>
      {" "}
      <Dialog>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px] text-black bg-white">
          <DialogHeader>
            <DialogTitle className="text-center ">{header}</DialogTitle>
            <DialogDescription className="text-center">
              {tagline}
            </DialogDescription>
          </DialogHeader>
          {modalContent}
        </DialogContent>
      </Dialog>
    </div>
  );
}


