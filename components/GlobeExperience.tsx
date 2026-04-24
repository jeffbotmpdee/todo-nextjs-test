"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const EARTH_RADIUS = 1.16;

function createEarthTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return new THREE.CanvasTexture(canvas);
  }

  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, "#102d5c");
  gradient.addColorStop(0.45, "#1b5f9e");
  gradient.addColorStop(1, "#0a1e3d");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 14000; i += 1) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const alpha = Math.random() * 0.08;
    const lightness = 35 + Math.random() * 30;
    ctx.fillStyle = `hsla(196, 70%, ${lightness}%, ${alpha})`;
    ctx.fillRect(x, y, 2, 2);
  }

  const continents = [
    { x: 0.18, y: 0.28, rx: 0.14, ry: 0.21, rot: -0.28 },
    { x: 0.31, y: 0.66, rx: 0.09, ry: 0.18, rot: 0.24 },
    { x: 0.53, y: 0.34, rx: 0.18, ry: 0.18, rot: 0.18 },
    { x: 0.69, y: 0.56, rx: 0.2, ry: 0.24, rot: -0.2 },
    { x: 0.83, y: 0.24, rx: 0.09, ry: 0.08, rot: -0.4 },
    { x: 0.77, y: 0.79, rx: 0.07, ry: 0.05, rot: 0.2 },
  ];

  continents.forEach(({ x, y, rx, ry, rot }) => {
    ctx.save();
    ctx.translate(x * canvas.width, y * canvas.height);
    ctx.rotate(rot);

    const body = ctx.createRadialGradient(0, 0, 10, 0, 0, rx * canvas.width);
    body.addColorStop(0, "#76d08b");
    body.addColorStop(0.55, "#4e9b63");
    body.addColorStop(1, "#284c34");
    ctx.fillStyle = body;
    ctx.beginPath();
    ctx.ellipse(0, 0, rx * canvas.width, ry * canvas.height, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.globalAlpha = 0.24;
    for (let i = 0; i < 26; i += 1) {
      ctx.fillStyle = i % 3 === 0 ? "#e8f59a" : "#31563b";
      ctx.beginPath();
      ctx.ellipse(
        (Math.random() - 0.5) * rx * canvas.width * 1.1,
        (Math.random() - 0.5) * ry * canvas.height * 1.1,
        rx * canvas.width * (0.12 + Math.random() * 0.2),
        ry * canvas.height * (0.08 + Math.random() * 0.16),
        Math.random() * Math.PI,
        0,
        Math.PI * 2,
      );
      ctx.fill();
    }

    ctx.restore();
  });

  for (let i = 0; i < 1000; i += 1) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const glow = ctx.createRadialGradient(x, y, 0, x, y, 8 + Math.random() * 18);
    glow.addColorStop(0, "rgba(255,255,255,0.08)");
    glow.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(x, y, 6 + Math.random() * 10, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

function createCloudTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return new THREE.CanvasTexture(canvas);
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 1200; i += 1) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const width = 30 + Math.random() * 120;
    const height = 10 + Math.random() * 35;
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, width);
    gradient.addColorStop(0, `rgba(255,255,255,${0.18 + Math.random() * 0.16})`);
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(Math.random() * Math.PI);
    ctx.scale(1, height / width);
    ctx.beginPath();
    ctx.arc(0, 0, width, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

function createStars() {
  const geometry = new THREE.BufferGeometry();
  const count = 3500;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i += 1) {
    const radius = 18 + Math.random() * 22;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.cos(phi);
    positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

    const tint = 0.7 + Math.random() * 0.3;
    colors[i * 3] = tint;
    colors[i * 3 + 1] = tint;
    colors[i * 3 + 2] = 1;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.08,
    transparent: true,
    opacity: 0.95,
    depthWrite: false,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  });

  return new THREE.Points(geometry, material);
}

export function GlobeExperience() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;

    if (!mount) {
      return;
    }

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2("#020617", 0.02);

    const camera = new THREE.PerspectiveCamera(42, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 0.25, 3.35);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.rotateSpeed = 0.55;
    controls.zoomSpeed = 0.6;
    controls.minDistance = 2.7;
    controls.maxDistance = 4.1;
    controls.minPolarAngle = Math.PI * 0.3;
    controls.maxPolarAngle = Math.PI * 0.7;

    const stars = createStars();
    scene.add(stars);

    const earthGroup = new THREE.Group();
    scene.add(earthGroup);

    const earth = new THREE.Mesh(
      new THREE.SphereGeometry(EARTH_RADIUS, 128, 128),
      new THREE.MeshStandardMaterial({
        map: createEarthTexture(),
        roughness: 0.92,
        metalness: 0.05,
      }),
    );
    earthGroup.add(earth);

    const clouds = new THREE.Mesh(
      new THREE.SphereGeometry(EARTH_RADIUS * 1.012, 96, 96),
      new THREE.MeshPhongMaterial({
        map: createCloudTexture(),
        transparent: true,
        opacity: 0.38,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    earthGroup.add(clouds);

    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(EARTH_RADIUS * 1.12, 96, 96),
      new THREE.ShaderMaterial({
        uniforms: {
          glowColor: { value: new THREE.Color("#5eead4") },
          viewVector: { value: camera.position },
        },
        vertexShader: `
          uniform vec3 viewVector;
          varying float intensity;
          void main() {
            vec3 vNormal = normalize(normalMatrix * normal);
            vec3 vNormel = normalize(normalMatrix * viewVector);
            intensity = pow(0.75 - dot(vNormal, vNormel), 4.0);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 glowColor;
          varying float intensity;
          void main() {
            gl_FragColor = vec4(glowColor * intensity, intensity * 0.75);
          }
        `,
        side: THREE.BackSide,
        transparent: true,
        blending: THREE.AdditiveBlending,
      }),
    );
    earthGroup.add(atmosphere);

    const rimLight = new THREE.DirectionalLight("#67e8f9", 2.8);
    rimLight.position.set(-5, 2, 4);
    scene.add(rimLight);

    const sunLight = new THREE.DirectionalLight("#ffffff", 1.9);
    sunLight.position.set(3, 1.2, 5);
    scene.add(sunLight);

    const fillLight = new THREE.PointLight("#1d4ed8", 18, 30, 2);
    fillLight.position.set(-4, -2, -3);
    scene.add(fillLight);

    const ambient = new THREE.AmbientLight("#93c5fd", 0.55);
    scene.add(ambient);

    let animationFrame = 0;
    const clock = new THREE.Clock();

    const handleResize = () => {
      if (!mount) {
        return;
      }

      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      animationFrame = window.requestAnimationFrame(animate);

      earth.rotation.y += 0.0009;
      clouds.rotation.y += 0.00125;
      stars.rotation.y = elapsed * 0.01;
      stars.rotation.x = Math.sin(elapsed * 0.08) * 0.08;
      earthGroup.rotation.z = Math.sin(elapsed * 0.15) * 0.04;
      earthGroup.position.y = Math.sin(elapsed * 0.4) * 0.04;
      atmosphere.material.uniforms.viewVector.value = camera.position;

      controls.update();
      renderer.render(scene, camera);
    };

    animate();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.cancelAnimationFrame(animationFrame);
      controls.dispose();
      renderer.dispose();
      scene.traverse((object) => {
        if (!(object instanceof THREE.Mesh || object instanceof THREE.Points)) {
          return;
        }

        object.geometry.dispose();

        if (Array.isArray(object.material)) {
          object.material.forEach((material) => material.dispose());
        } else {
          object.material.dispose();
        }
      });
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="relative flex h-[58vh] w-full max-w-6xl items-center justify-center sm:h-[64vh] lg:h-[72vh]">
      <div className="absolute inset-0 rounded-[2.5rem] bg-[radial-gradient(circle_at_center,rgba(30,41,59,0.14),rgba(2,6,23,0))] blur-2xl" />
      <div className="pointer-events-none absolute inset-x-8 bottom-6 z-20 mx-auto max-w-md rounded-full border border-white/10 bg-slate-950/35 px-4 py-3 text-center text-[10px] uppercase tracking-[0.32em] text-slate-300/90 backdrop-blur-md sm:bottom-10 sm:text-xs">
        Orbital drift engaged
      </div>
      <div
        ref={mountRef}
        className="relative z-10 h-full w-full rounded-[2.5rem] border border-white/8 bg-transparent shadow-[0_0_80px_rgba(14,165,233,0.12)]"
      />
    </div>
  );
}
