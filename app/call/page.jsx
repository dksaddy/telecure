'use client';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from "@/app/context.js/AuthContext";
import Modal from './components/Modal.jsx';
import CheckPrescription from './components/CheckPrescription';
import AddPrescription from './components/AddPrescription';
import LoadingModal from '../global_components/LoadingModal';

export default function CallPage() {
  const { user } = useAuth();
  const jitsiRef = useRef(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const room = searchParams.get('room');
  const [apiLoaded, setApiLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prescriptionData, setPrescriptionData] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
        displayName: user?.name,
      },
      configOverwrite: {
        startWithAudioMuted: true,
        startWithVideoMuted: true,
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
          body: JSON.stringify({ callLink: room }),
        });
      } catch (err) {
        console.error('Error updating appointment status:', err);
      } finally {
        router.push('/');
      }
    });

    return () => api.dispose();
  }, [apiLoaded, room]);


  useEffect(() => {
    if (!room) return;

    const fetchPrescriptionData = async () => {
      try {
        const res = await fetch('/api/prescription/initial', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ callLink: room })
        });

        const data = await res.json();
        setPrescriptionData(data);
      } catch (err) {
        console.error('Failed to fetch prescription:', err);
      }
    };

    fetchPrescriptionData();
  }, [room]);


  console.log('Prescription Data:', prescriptionData);

  if (!apiLoaded) {
    return <LoadingModal />;
  }
  if (!room) {
    return <div className="text-center text-red-500 mt-10">Missing room parameter.</div>;
  }
  if (!user) {
    return <div className="text-center text-red-500 mt-50">User not authenticated.</div>;
  }

  return (
    <div className="p-4 mt-17">
      <div ref={jitsiRef} className="w-full rounded-xl shadow-lg overflow-hidden" />

      <button
        className='fixed top-25 left-5 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition-colors'
        onClick={openModal}
      >
        {user?.role === "patient" ? "Check Prescription" : "Add Prescription"}
      </button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {user?.role === "patient" ? (
          <CheckPrescription data={prescriptionData} />
        ) : (
          <AddPrescription data={prescriptionData} />
        )}
      </Modal>

    </div>
  );
}
