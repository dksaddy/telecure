// components/BookButton.js
"use client";
import { useRouter } from "next/navigation";

export default function BookButton() {
  const router = useRouter();
  
  const handleClick = () => {
    router.push("/appointment?mydoc=6801d6e09abade27caa69466");
  };

  return (
    <button 
      onClick={handleClick}
      className="px-4 py-2 bg-blue-500 text-white rounded mt-30"
    >
      Book Appointment
    </button>
  );
}