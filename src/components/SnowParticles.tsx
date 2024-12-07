import { memo, useCallback } from "react";
import type { Container, Engine } from "tsparticles-engine";
import Particles from "@tsparticles/react";
import { loadFull } from "tsparticles";

export const SnowParticles = memo(function SnowParticles() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      className="absolute inset-0 pointer-events-none z-20"
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: false,
        fpsLimit: 60,
        particles: {
          number: {
            value: 50,
            density: {
              enable: true,
              area: 800
            }
          },
          color: {
            value: "#ffffff"
          },
          opacity: {
            value: 0.5
          },
          size: {
            value: { min: 1, max: 2 }
          },
          move: {
            enable: true,
            speed: 1,
            direction: "bottom",
            straight: false
          }
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "repulse"
            }
          },
          modes: {
            repulse: {
              distance: 100,
              duration: 0.4
            }
          }
        },
        detectRetina: true
      }}
    />
  );
});