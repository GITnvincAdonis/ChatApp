import { motion } from "framer-motion";
import "./LoaderStyles.css";
export default function Loader() {
  return (
    <>
      <motion.div
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 1 }}
        style={{ zIndex: 100 }}
        className=" fixed h-full w-full bg-background  flex items-center justify-center rounded-lg"
      >
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </motion.div>
    </>
  );
}
