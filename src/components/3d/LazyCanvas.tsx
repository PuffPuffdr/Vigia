"use client";

import dynamic from "next/dynamic";
import { Suspense, type ReactNode } from "react";
import { useInViewport } from "@/lib/hooks/useInViewport";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import type { ProductKind } from "./ProductModel";

const Viewer3D = dynamic(() => import("./Viewer3D"), { ssr: false });

interface LazyCanvasProps {
  kind?: ProductKind;
  modelUrl?: string;
  accent?: string;
  className?: string;
  /** Shown before the canvas enters the viewport, and while it loads. */
  fallback: ReactNode;
}

export default function LazyCanvas({
  kind,
  modelUrl,
  accent,
  className,
  fallback,
}: LazyCanvasProps) {
  const [ref, isVisible] = useInViewport<HTMLDivElement>();
  const reducedMotion = useReducedMotion();

  return (
    <div ref={ref} className={className}>
      {isVisible ? (
        <Suspense fallback={fallback}>
          <Viewer3D
            kind={kind}
            modelUrl={modelUrl}
            accent={accent}
            autoRotate={!reducedMotion}
          />
        </Suspense>
      ) : (
        fallback
      )}
    </div>
  );
}
