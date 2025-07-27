"use client";
import { useEffect, useRef } from "react";

export default function VoiceInput({ onTranscribe }) {
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = "bn-BD";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onTranscribe(transcript);
    };

    recognitionRef.current = recognition;
  }, [onTranscribe]);

  const handleListen = () => {
    recognitionRef.current?.start();
  };

  return (
    <button
      onClick={handleListen}
      className="bg-indigo-600 text-white px-4 py-4 rounded-full shadow hover:scale-105 transition"
      aria-label="Start voice recognition"
    >
      🎙️ কথা বলুন
    </button>
  );
}
