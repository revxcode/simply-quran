"use client"

import { useEffect, useState } from "react";

interface FontFamily {
  fontSize: number;
  fontFamily: string;
}

interface Murottal {
  reciter: string;
}

interface Settings {
  arabicStyle: FontFamily;
  latinStyle: FontFamily;
  murottal: Murottal;
}

const saveSettingsToLocalStorage = (settings: Settings) => {
  if (typeof window !== "undefined") {  // Check if it's running in the browser
    localStorage.setItem("settings", JSON.stringify(settings));
  }
}

export default function useSettings() {
  const [setting, setSetting] = useState<Settings>(null as any);

  const defaultSettings: Settings = {
    arabicStyle: {
      fontSize: 20,
      fontFamily: "Amiri",
    },
    latinStyle: {
      fontSize: 20,
      fontFamily: "Amiri",
    },
    murottal: {
      reciter: "default",
    },
  };

  // Load settings from localStorage after the component has mounted
  useEffect(() => {
    if (typeof window !== "undefined") {  // Ensure it's running on the client-side
      const savedSettings = localStorage.getItem("settings");
      if (savedSettings) {
        setSetting(JSON.parse(savedSettings));
      } else {
        setSetting(defaultSettings); // Set default if no saved settings are found
      }
    }
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    if (setting) {
      saveSettingsToLocalStorage(setting);
    }
  }, [setting]);

  return {
    setting,
    setSetting,
  };
}
