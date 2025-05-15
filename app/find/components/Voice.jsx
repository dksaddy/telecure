"use client";

import { useState, useEffect } from "react";

export default function SpeechToText({ setSelectedCategory }) {
  const [finalText, setFinalText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [fullTranscript, setFullTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);

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
    <div className="mt-19">
      <h2 className="text-xl font-bold mb-4">Symptom Checker</h2>

      <div className="flex gap-2 mb-4">
        <button
          onClick={toggleListening}
          className={`px-4 py-2 rounded text-white flex-1 ${
            isListening
              ? "bg-red-600 hover:bg-red-700"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {isListening ? "শোনা বন্ধ করুন" : "শুরু করুন"}
        </button>

        <button
          onClick={handleFindDoctor}
          disabled={isLoading}
          className="px-4 py-2 rounded text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 flex-1"
        >
          {isLoading ? "অপেক্ষা করুন..." : "ডাক্তার খুঁজুন"}
        </button>
      </div>

      <div className="mt-4">
        <label className="block text-gray-700 font-bold mb-2">আপনার বলা:</label>
        <textarea
          value={finalText + interimTranscript}
          onChange={handleTextChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="এখনো কিছু বলা হয়নি"
          rows={4}
        />
        {isListening && interimTranscript && (
          <p className="text-gray-500 mt-1">
            লাইভ ট্রান্সক্রিপশন: {interimTranscript}
          </p>
        )}
      </div>

      {apiResponse && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <h3 className="font-bold text-blue-800">
            পরামর্শক বিশেষজ্ঞ: {apiResponse.specialization}
          </h3>

          {/* Show Possible Diseases */}
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
  );
}
