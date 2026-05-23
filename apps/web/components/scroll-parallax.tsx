"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@repo/ui/lib/utils";

type ScrollParallaxProps = {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  id?: string;
  maxOffset?: number;
  reveal?: boolean;
};

export function ScrollParallax({
  children,
  className,
  direction = "up",
  id,
  maxOffset = 44,
  reveal = false,
}: ScrollParallaxProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) {
      return;
    }

    let frameId = 0;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let isRunning = false;

    const measure = () => {
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const rawProgress =
        (viewportHeight - rect.top) / (viewportHeight + rect.height);
      const progress = Math.max(0, Math.min(1, rawProgress));
      const centeredProgress = (progress - 0.5) * 2;
      const offset = centeredProgress * maxOffset;
      const x =
        direction === "left" ? -offset : direction === "right" ? offset : 0;
      const y =
        direction === "up" ? -offset : direction === "down" ? offset : 0;

      targetX = x;
      targetY = y;
      element.dataset.parallaxProgress = progress.toFixed(2);

      if (reveal) {
        element.style.opacity = String(
          Math.max(0.88, 1 - Math.abs(centeredProgress) * 0.12),
        );
      }
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      element.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;

      if (
        Math.abs(targetX - currentX) > 0.1 ||
        Math.abs(targetY - currentY) > 0.1
      ) {
        frameId = window.requestAnimationFrame(animate);
        return;
      }

      currentX = targetX;
      currentY = targetY;
      element.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;
      frameId = 0;
      isRunning = false;
    };

    const requestUpdate = () => {
      measure();

      if (!isRunning) {
        isRunning = true;
        frameId = window.requestAnimationFrame(animate);
      }
    };

    measure();
    currentX = targetX;
    currentY = targetY;
    element.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    window.addEventListener("wheel", requestUpdate, { passive: true });
    window.addEventListener("touchmove", requestUpdate, { passive: true });

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      window.removeEventListener("wheel", requestUpdate);
      window.removeEventListener("touchmove", requestUpdate);

      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [direction, maxOffset, reveal]);

  return (
    <div
      className={cn(
        "scroll-parallax opacity-100 will-change-transform",
        className,
      )}
      data-parallax="true"
      data-parallax-direction={direction}
      id={id}
      ref={elementRef}
    >
      {children}
    </div>
  );
}
