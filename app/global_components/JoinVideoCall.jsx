'use client';
import { useRouter } from 'next/navigation';

export default function JoinCallButton({ callLink }) {
  const router = useRouter();

  if (!callLink) return null;

  return (
    <button
      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      onClick={() => router.push(`/call?room=${encodeURIComponent(callLink)}`)}
    >
      Join Video Call
    </button>
  );
}
