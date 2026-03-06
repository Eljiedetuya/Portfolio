// Subtle tech-network particles for hero
particlesJS("particles-js", {
  particles: {
    number: {
      value: 55,
      density: { enable: true, value_area: 1100 }
    },
    color: { value: ["#00eaff", "#39ff88"] },
    shape: { type: "circle" },
    opacity: {
      value: 0.35,
      random: false,
      anim: { enable: true, speed: 0.6, opacity_min: 0.12, sync: false }
    },
    size: {
      value: 2.4,
      random: true,
      anim: { enable: true, speed: 1.4, size_min: 0.6, sync: false }
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#00eaff",
      opacity: 0.18,
      width: 1.1
    },
    move: {
      enable: true,
      speed: 0.6,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
      attract: { enable: false, rotateX: 600, rotateY: 1200 }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: false },
      onclick: { enable: false },
      resize: true
    }
  },
  retina_detect: true
});
