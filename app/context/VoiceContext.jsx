// app/context/VoiceContext.jsx
import { createContext, useContext, useState } from 'react';

export const VoiceContext = createContext();

export const VoiceProvider = ({ children }) => {
  const [lastIntent, setLastIntent] = useState(null);

  return (
    <VoiceContext.Provider value={{ lastIntent, setLastIntent }}>
      {children}
    </VoiceContext.Provider>
  );
};

export const useVoice = () => useContext(VoiceContext);
