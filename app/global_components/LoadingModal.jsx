import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Modal = () => {
  return (
    <AnimatePresence>
      <motion.div
        className="bg-[#00000070] absolute h-screen w-screen flex justify-center items-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="p-10 bg-background rounded-[15px]"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="border-[6px] border-primary border-t-background animate-spin rounded-full h-25 w-25"></div>
          <h5 className="text-2xl font-semibold text-center mt-4">Loading</h5>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Modal;
