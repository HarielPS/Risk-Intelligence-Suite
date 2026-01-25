"use client";

import { useEffect, useState } from "react";

export function useAtTop(threshold = 0) {
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      setAtTop(window.scrollY <= threshold);
    };

    onScroll(); // estado inicial
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return atTop;
}
