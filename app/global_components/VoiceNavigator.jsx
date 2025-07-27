"use client";
import { useRouter } from "next/navigation";
import VoiceInput from "./VoiceInput";

export default function VoiceNavigator() {
  const router = useRouter();

  const handleTranscribe = async (text) => {
    try {
      const res = await fetch(
        "https://telecure-nlu-final.onrender.com/predict",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        }
      );
      console.log("Sending text:", text);

      const data = await res.json();
      const route = data.url;
      const responseText = data.response;

      // Optional: Voice feedback for intent recognition
      if ("speechSynthesis" in window && responseText) {
        const utterance = new SpeechSynthesisUtterance(responseText);
        utterance.lang = "bn-BD"; // Bengali voice (if available)
        speechSynthesis.speak(utterance);
      }

      if (route) {
        router.push(route);
      } else {
        alert("ভয়েস কমান্ড বুঝা যায়নি!");
      }
    } catch (error) {
      console.error("Voice intent error:", error);
      alert("সার্ভারে সমস্যা হয়েছে। দয়া করে পরে চেষ্টা করুন!");
    }
  };

  return (
    <div className="fixed bottom-6 left-0 right-0 flex justify-center items-center z-50">
      <VoiceInput onTranscribe={handleTranscribe} />
    </div>
  );
}
