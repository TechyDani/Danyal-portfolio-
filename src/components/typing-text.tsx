"use client";

import { useEffect, useState } from "react";

export function TypingText({
  text,
  delay = 0,
  interval = 45,
}: {
  text: string;
  delay?: number;
  interval?: number;
}) {
  const [visibleCharacters, setVisibleCharacters] = useState(0);
  const characters = Array.from(text);

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const characterCount = Array.from(text).length;
    let timer: number | undefined;

    function startTyping() {
      window.clearTimeout(timer);

      if (motionPreference.matches) {
        setVisibleCharacters(characterCount);
        return;
      }

      let revealed = 0;
      setVisibleCharacters(0);

      function typeNextCharacter() {
        revealed += 1;
        setVisibleCharacters(revealed);

        if (revealed < characterCount) {
          timer = window.setTimeout(typeNextCharacter, interval);
        }
      }

      if (characterCount > 0) {
        timer = window.setTimeout(typeNextCharacter, delay);
      }
    }

    startTyping();
    motionPreference.addEventListener("change", startTyping);

    return () => {
      window.clearTimeout(timer);
      motionPreference.removeEventListener("change", startTyping);
    };
  }, [text, delay, interval]);

  return (
    <span className="typing-text" aria-hidden="true">
      <span className="typing-placeholder">{text}</span>
      <span className="typing-content">
        {characters.slice(0, visibleCharacters).join("")}
      </span>
      <noscript>
        <span className="typing-content">{text}</span>
      </noscript>
    </span>
  );
}
