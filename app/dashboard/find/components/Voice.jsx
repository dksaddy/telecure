"use client";

import { useState, useEffect } from "react";
import { IconButton, Button } from "@mui/material";
import { Mic, X, Search } from "lucide-react";
import Backdrop from "@mui/material/Backdrop";
import SoundVisualizer from "@/app/global_components/SoundVisualizer";
import useFilterStore from "@/app/store/useFilterStore";

export default function SpeechToText() {
  const [finalText, setFinalText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [fullTranscript, setFullTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const { setSelectedCategory } = useFilterStore();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      if (SpeechRecognition) {
        const recog = new SpeechRecognition();
        recog.lang = "bn-BD";
        recog.continuous = true;
        recog.interimResults = true;

        recog.onresult = (event) => {
          let interim = "";
          let final = "";

          for (let i = event.resultIndex; i < event.results.length; ++i) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              final += transcript + " ";
            } else {
              interim += transcript;
            }
          }

          setInterimTranscript(interim);
          if (final) {
            setFullTranscript((prev) => prev + final);
            setFinalText((prev) => prev + final);
          }
        };

        recog.onerror = (event) => {
          console.error("Speech recognition error:", event.error);
          setIsListening(false);
        };

        recog.onend = () => {
          if (isListening) {
            recognition.start();
          }
        };

        setRecognition(recog);
      } else {
        alert("Speech Recognition not supported in this browser.");
      }
    }
  }, []);

  const toggleListening = () => {
    if (!recognition) return;

    if (!isListening) {
      setFinalText("");
      setFullTranscript("");
      setInterimTranscript("");
      recognition.start();
      setIsListening(true);
    } else {
      recognition.stop();
      setIsListening(false);
      setFinalText((prev) => prev + interimTranscript);
      setInterimTranscript("");
    }
  };

  const handleTextChange = (e) => {
    setFinalText(e.target.value);
  };

  const handleFindDoctor = async () => {
    if (!finalText.trim()) {
      alert("Please speak or type your symptoms first");
      return;
    }

    setIsLoading(true);
    setApiResponse("");

    try {
      const response = await fetch("http://localhost:3000/api/symtom", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          symptoms: finalText,
          language: "bn-BD",
        }),
      });

      const data = await response.json();
      console.log("API Response:", data);
      setApiResponse(data);
      setSelectedCategory(data.specialization);
    } catch (error) {
      console.error("Error sending data to backend:", error);
      setApiResponse("Failed to connect to the server");
    } finally {
      setIsLoading(false);
    }
  };

  console.log("Final Text:", apiResponse);

  return (
    <div>
      <h2 className="text-2xl text-gray-500 mb-4">Symptom Checker</h2>

      <div className="grid grid-cols-8 gap-4 mb-4">
        <Backdrop open={isListening} className="z-50">
          <div className="flex items-center p-10 bg-white flex-col justify-center rounded-xl">
            <SoundVisualizer></SoundVisualizer>

            <h1 className="text-4xl mt-5 text-black ">Listening...</h1>
            <div className="mt-5">
              <Button
                variant="contained"
                color="error"
                className="w-10 h-15 "
                onClick={toggleListening}
                sx={{ borderRadius: "50%" }}
              >
                <X size={24} />
              </Button>
            </div>
          </div>
        </Backdrop>
        <div className="col-span-8">
          <textarea
            value={finalText + interimTranscript}
            onChange={handleTextChange}
            className="w-full  px-3 py-2 border  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nothin has said yet"
            rows={4}
          />
        </div>
        <div className="w-full p-5 col-span-4 rounded-[10px] flex items-center flex-col justify-center  bg-blue-100">
          <IconButton size="large" onClick={toggleListening}>
            <Mic size={36} />
          </IconButton>
        </div>
        <div className="bg-primary col-span-4 rounded-[10px] flex items-center justify-center">
          <IconButton
            onClick={handleFindDoctor}
            disabled={isLoading}
            sx={{
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
              "& .MuiTouchRipple-root .MuiTouchRipple-rippleVisible": {
                color: "white",
              },
            }}
          >
            <Search size={36} color="white" />
          </IconButton>
        </div>

        {apiResponse && (
          <div className=" p-3 bg-blue-50 col-span-4 h-full rounded-lg">
            <h3 className="font-bold text-blue-800">
              পরামর্শক বিশেষজ্ঞ: {apiResponse.specialization}
            </h3>

            {apiResponse.possibleDiseases?.length > 0 && (
              <div className="mt-2">
                <h4 className="font-semibold text-gray-700 mb-1">
                  সম্ভাব্য রোগসমূহ:
                </h4>
                <ul className="list-disc list-inside text-gray-800">
                  {apiResponse.possibleDiseases.map((disease, index) => (
                    <li key={index}>
                      {disease.english} - {disease.bengali}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Show Doctors */}
            {apiResponse.doctors?.length > 0 ? (
              <div className="mt-3">
                <h4 className="font-semibold text-gray-700 mb-1">
                  সুপারিশকৃত ডাক্তারগণ:
                </h4>
                <ul className="list-disc list-inside text-blue-600">
                  {apiResponse.doctors.map((doc) => (
                    <li key={doc._id}>
                      {doc.firstName} {doc.lastName} -{" "}
                      {doc.specialization.join(", ")}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-red-500 mt-2">
                এই বিশেষজ্ঞের কোনো ডাক্তার খুঁজে পাওয়া যায়নি।
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
