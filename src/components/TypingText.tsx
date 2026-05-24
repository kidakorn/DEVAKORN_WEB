"use client";

import { useState, useEffect } from "react";

interface TypingTextProps {
  strings: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  delayBetween?: number;
  className?: string;
}

export default function TypingText({
  strings,
  typeSpeed = 100,
  deleteSpeed = 50,
  delayBetween = 2000,
  className = "",
}: TypingTextProps) {
  const [text, setText] = useState("");
  const [stringIndex, setStringIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const currentString = strings[stringIndex];

    if (isDeleting) {
      if (text === "") {
        setIsDeleting(false);
        setStringIndex((prev) => (prev + 1) % strings.length);
        timeout = setTimeout(() => {}, typeSpeed);
      } else {
        timeout = setTimeout(() => {
          setText(currentString.substring(0, text.length - 1));
        }, deleteSpeed);
      }
    } else {
      if (text === currentString) {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, delayBetween);
      } else {
        timeout = setTimeout(() => {
          setText(currentString.substring(0, text.length + 1));
        }, typeSpeed);
      }
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, stringIndex, strings, typeSpeed, deleteSpeed, delayBetween]);

  return (
    <span className={`border-r-[3px] border-[var(--color-primary-red)] pr-1 animate-pulse ${className}`}>
      {text}
    </span>
  );
}
