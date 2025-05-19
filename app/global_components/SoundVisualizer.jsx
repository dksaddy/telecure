import React from "react";
import "./SoundVisualizer.css"; // We'll add keyframes in this CSS file

const SoundVisualizer = () => {
  return (
    <div className="flex justify-center items-center ">
      <div className="flex justify-between h-16 w-[calc((8px+4px)*5)]">
        <div className="w-2 bg-primary rounded-lg animate-quiet origin-bottom"></div>
        <div className="w-2 bg-primary rounded-lg animate-normal origin-bottom"></div>
        <div className="w-2 bg-primary rounded-lg animate-quiet origin-bottom"></div>
        <div className="w-2 bg-primary rounded-lg animate-loud origin-bottom"></div>
        <div className="w-2 bg-primary rounded-lg animate-quiet origin-bottom"></div>
      </div>
    </div>
  );
};

export default SoundVisualizer;
