"use client";
import { useEffect, useRef, useState } from "react";
import SoundVisualizer from "./SoundVisualizer";

export default function VoiceInput({ onTranscribe }) {
  const recognitionRef = useRef(null);
  const [listening, setListening] = useState(false);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = "bn-BD";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onTranscribe(transcript);
    };

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.onerror = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;
  }, [onTranscribe]);

  const handleListen = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
    }
  };

  return (
    <>
      <button
        onClick={handleListen}
        className="bg-indigo-600 text-white px-4 py-4 rounded-full shadow hover:scale-105 transition"
        aria-label="Start voice recognition"
      >
        🎙️ কথা বলুন
      </button>

      {listening && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-80 flex flex-col items-center justify-center z-50"
          style={{
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          }}
          aria-live="assertive"
          aria-label="Sound Visualizer Overlay"
        >
          <SoundVisualizer />
          <h1 className="text-white mt-4 text-2xl font-semibold">
            কোথায় যেতে চান?
          </h1>
        </div>
      )}
    </>
  );
}
