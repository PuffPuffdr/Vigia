"use client";

import dynamic from "next/dynamic";
import { Suspense, type ReactNode } from "react";
import { useInViewport } from "@/lib/hooks/useInViewport";
import { useIsMobile } from "@/lib/hooks/useIsMobile";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import type { ProductKind } from "./ProductModel";

const Viewer3D = dynamic(() => import("./Viewer3D"), { ssr: false });

interface LazyCanvasProps {
  kind?: ProductKind;
  modelUrl?: string;
  accent?: string;
  className?: string;
  /** Static render shown on mobile, before the canvas enters the viewport, and while it loads. */
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
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();

  const shouldRender3D = isVisible && !isMobile;

  return (
    <div ref={ref} className={className}>
      {shouldRender3D ? (
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
