import React, { useEffect, useRef } from 'react';

/**
 * WebGL breathing gradient (@firecms/neat) — dark-adapted.
 * Canvas sits behind everything; a darkening stack keeps content readable.
 * yOffset follows scroll so the gradient morphs across all sections.
 */
export const NeatBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let gradient: { destroy: () => void; yOffset: number } | null = null;
    let disposed = false;

    const onScroll = () => {
      if (gradient) gradient.yOffset = window.scrollY * 0.6;
    };

    const initGradient = async () => {
      const { NeatGradient } = await import('@firecms/neat');
      if (disposed || !canvasRef.current) return;

      gradient = new NeatGradient({
        ref: canvasRef.current,
        colors: [
          { color: '#091322', enabled: true },
          { color: '#0a1a2f', enabled: true },
          { color: '#091628', enabled: true },
          { color: '#10142d', enabled: true },
          { color: '#070c18', enabled: false },
          { color: '#081220', enabled: false },
        ],
        speed: 0.8,
        horizontalPressure: 2,
        verticalPressure: 3,
        waveFrequencyX: 1.5,
        waveFrequencyY: 1.5,
        waveAmplitude: 3,
        shadows: 15,
        highlights: 2,
        colorBrightness: 0.35,
        colorSaturation: 2,
        colorBlending: 8,
        wireframe: false,
        antialias: false,
        backgroundColor: '#07090e',
        backgroundAlpha: 1,
        grainScale: 0,
        grainSparsity: 0,
        grainIntensity: 0,
        grainSpeed: 0,
        resolution: 0.75,
        yOffset: 0,
        yOffsetWaveMultiplier: 0.5,
        yOffsetColorMultiplier: 0.5,
        yOffsetFlowMultiplier: 0.5,
        flowDistortionA: 0.2,
        flowDistortionB: 1.5,
        flowScale: 2.0,
        flowEase: 0.53,
        flowEnabled: false,
        domainWarpEnabled: false,
        domainWarpIntensity: 0,
        domainWarpScale: 3,
        vignetteIntensity: 0.7,
        vignetteRadius: 0.8,
        flatShading: true,
        cameraLock: true,
        cameraZoom: 1,
      });

      window.addEventListener('scroll', onScroll, { passive: true });
    };

    const timer = setTimeout(() => {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => initGradient());
      } else {
        initGradient();
      }
    }, 50);

    return () => {
      disposed = true;
      clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
      gradient?.destroy();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full" />

      {/* Darkening stack — unified dark matte with subtle ambient glow */}
      <div className="absolute inset-0 bg-[#07090e]/50"></div>
      <div className="absolute inset-0 cyber-base opacity-30"></div>
      <div className="absolute inset-0 bg-accent-grid opacity-35"></div>
      <div className="absolute inset-0 bg-vignette opacity-80"></div>
    </div>
  );
};
