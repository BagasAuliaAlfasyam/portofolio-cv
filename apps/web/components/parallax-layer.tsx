"use client";

import { useEffect, useRef } from "react";
import { cn } from "@repo/ui/lib/utils";

type ParallaxLayerProps = {
  className?: string;
  children?: React.ReactNode;
  speed?: number;
  maxOffset?: number;
};

export function ParallaxLayer({
  className,
  children,
  speed = 0.12,
  maxOffset = 56,
}: ParallaxLayerProps) {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!layer || reduceMotion.matches) {
      return;
    }

    let frameId = 0;

    const update = () => {
      const offset = Math.max(
        -maxOffset,
        Math.min(maxOffset, window.scrollY * speed),
      );

      layer.style.transform = `translate3d(0, ${offset}px, 0)`;
      frameId = 0;
    };

    const requestUpdate = () => {
      if (frameId === 0) {
        frameId = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });

    return () => {
      window.removeEventListener("scroll", requestUpdate);

      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [maxOffset, speed]);

  return (
    <div
      className={cn(
        "will-change-transform",
        !children && "pointer-events-none absolute inset-0",
        className,
      )}
      ref={layerRef}
    >
      {children}
    </div>
  );
}
