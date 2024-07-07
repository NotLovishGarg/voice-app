// src/components/VoiceControl.js

import React, { useState, useEffect } from 'react';
import './VoiceControl.css'; // Import custom CSS for VoiceControl styling

const VoiceControl = ({ processCommand }) => {
  const [listening, setListening] = useState(false);
  const [spokenText, setSpokenText] = useState('');

  useEffect(() => {
    let recognition = null;

    const startListening = () => {
      recognition = new window.webkitSpeechRecognition();
      recognition.lang = 'en-IN';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = function (event) {
        const transcript = event.results[0][0].transcript;
        setSpokenText(transcript);
        processCommand(transcript);
      };

      recognition.onerror = function (event) {
        console.error(event.error);
        setListening(false);
      };

      recognition.onend = function () {
        setListening(false);
      };

      recognition.start();
      setListening(true);
    };

    const stopListening = () => {
      if (recognition) {
        recognition.stop();
        setListening(false);
      }
    };

    startListening();

    return () => {
      stopListening();
    };
  }, [processCommand]);

  return (
    <div className="voice-control">
      <div className="voice-control-text">
        {listening ? 'Listening...' : 'Voice recognition stopped.'}
      </div>
      <div className="spoken-text">{spokenText}</div>
      <button className="toggle-button" onClick={() => setListening(!listening)}>
        {listening ? 'Stop Listening' : 'Start Listening'}
      </button>
    </div>
  );
};

export default VoiceControl;
