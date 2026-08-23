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

    (async () => {
      const { NeatGradient } = await import('@firecms/neat');
      if (disposed || !canvasRef.current) return;

      gradient = new NeatGradient({
        ref: canvasRef.current,
        colors: [
          { color: '#FF5373', enabled: true },
          { color: '#FFC858', enabled: true },
          { color: '#17E7FF', enabled: true },
          { color: '#6D3BFF', enabled: true },
          { color: '#f5e1e5', enabled: false },
          { color: '#A8E6CF', enabled: false },
        ],
        speed: 1.5,
        horizontalPressure: 2,
        verticalPressure: 5,
        waveFrequencyX: 2,
        waveFrequencyY: 2,
        waveAmplitude: 5,
        shadows: 12,
        highlights: 5,
        colorBrightness: 0.85,
        colorSaturation: 8,
        colorBlending: 6,
        wireframe: false,
        antialias: false,
        backgroundColor: '#050505',
        backgroundAlpha: 1,
        grainScale: 0,
        grainSparsity: 0,
        grainIntensity: 0,
        grainSpeed: 0,
        resolution: 0.75,
        yOffset: 0,
        yOffsetWaveMultiplier: 3.5,
        yOffsetColorMultiplier: 3.5,
        yOffsetFlowMultiplier: 3.5,
        flowDistortionA: 0.4,
        flowDistortionB: 3,
        flowScale: 3.3,
        flowEase: 0.53,
        flowEnabled: false,
        domainWarpEnabled: false,
        domainWarpIntensity: 0,
        domainWarpScale: 3,
        vignetteIntensity: 0.6,
        vignetteRadius: 0.8,
        flatShading: true,
        cameraLock: true,
        cameraZoom: 1,
      });

      window.addEventListener('scroll', onScroll, { passive: true });
    })();

    return () => {
      disposed = true;
      window.removeEventListener('scroll', onScroll);
      gradient?.destroy();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full" />

      {/* Darkening stack — adjusted so vivid hues and grid animation shine through */}
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="absolute inset-0 cyber-base opacity-40"></div>
      <div className="absolute inset-0 bg-accent-grid opacity-60"></div>
      <div className="absolute inset-0 bg-vignette opacity-70"></div>
    </div>
  );
};
