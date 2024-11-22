import AutoScroll from "embla-carousel-auto-scroll";
import { motion } from "framer-motion";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRef } from "react";
import { SendHorizonalIcon } from "lucide-react";

export function PlayCarousel(props: { direction: "backward" | "forward" }) {
  const { direction } = props;
  const plugin = useRef(
    AutoScroll({ speed: 4, stopOnInteraction: true, direction: "backward" })
  );

  return (
    <Carousel
      opts={{ loop: true, containScroll: "trimSnaps" }}
      plugins={[plugin.current]}
      className="w-[150%] "
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <motion.div
        animate={direction == "backward" ? { rotate: 0 } : { rotate:180 }}
        className=""
      >
        <CarouselContent className="space-y-20 ">
          {Array.from({ length: 6 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="flex p-1 items-center justify-center">
                <SendHorizonalIcon size={50}></SendHorizonalIcon>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </motion.div>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
