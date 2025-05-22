'use client';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from "@/app/context.js/AuthContext";

export default function CallPage() {
  const user = useAuth();
  const jitsiRef = useRef(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const room = searchParams.get('room');
  const [apiLoaded, setApiLoaded] = useState(false);

  // Load the Jitsi Meet API script
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.JitsiMeetExternalAPI) {
      const script = document.createElement('script');
      script.src = 'https://8x8.vc/external_api.js';
      script.async = true;
      script.onload = () => setApiLoaded(true);
      document.body.appendChild(script);
    } else {
      setApiLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!apiLoaded || !room || !jitsiRef.current || typeof window === 'undefined') return;

    const domain = '8x8.vc';
    const roomName = `vpaas-magic-cookie-efe2f503600142648e6c94bc182bdf82/${room}`;

    const api = new window.JitsiMeetExternalAPI(domain, {
      roomName,
      parentNode: jitsiRef.current,
      width: '100%',
      height: 600,
      userInfo: {
        displayName: user.user.role,
      },
      configOverwrite: {
        startWithAudioMuted: true,
        startWithVideoMuted: false,
      },
      interfaceConfigOverwrite: {
        SHOW_JITSI_WATERMARK: false,
      },
    });

    api.addEventListener('readyToClose', async () => {
  try {
    await fetch('/api/appointment/status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ callLink: room }), // room === callLink
    });
  } catch (err) {
    console.error('Error updating appointment status:', err);
  } finally {
    router.push('/');
  }
});


    return () => api.dispose();
  }, [apiLoaded, room]);

  if (!room) {
    return <div className="text-center text-red-500 mt-10">Missing room parameter.</div>;
  }

  return (
    <div className="p-4 mt-20">
      <div ref={jitsiRef} className="w-full rounded-xl shadow-lg overflow-hidden" />
    </div>
  );
}
