"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * Reports true once the element has entered the viewport, then disconnects.
 * Used to defer mounting heavy 3D canvases until they're actually visible.
 */
export function useInViewport<T extends HTMLElement>(
  rootMargin = "200px"
): [RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return [ref, isVisible];
}
