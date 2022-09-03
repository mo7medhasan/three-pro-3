import { Suspense } from "react";
import Head from "next/head";
import Image from "next/image";
import Three from "../components/Three";
import { Canvas } from "@react-three/fiber";
import Box from "../components/Box";
import { OrbitControls } from "@react-three/drei";
import Sphere from "../components/AnimatedSphere";
import IronMan from "../components/ironMan";
import HeroBackground from "../components/Background";
import { Iphone } from "../components/Iphone";
import { World } from "../components/World";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
        <script src="//cdnjs.cloudflare.com/ajax/libs/stats.js/r11/Stats.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/three.js/r70/three.min.js"></script>
      </Head>

      <main>
        {/* <Three /> */}
        
        <HeroBackground/>
        <Canvas className="canvas">
          <OrbitControls enableZoom={false} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[-2, 5, 2]} intensity={1} />
          <Suspense fallback={null}>
            <World />
          </Suspense>
        </Canvas>
        <Canvas className="canvas">
          <OrbitControls enableZoom={false} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[-2, 5, 2]} intensity={1} />
          <Suspense fallback={null}>
            <Sphere />
          </Suspense>
        </Canvas>
        
        <Canvas className="canvas">
          <OrbitControls enableZoom={false} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[-2, 5, 2]} intensity={1} />
          <Suspense fallback={null}>
            <Iphone />
          </Suspense>
        </Canvas>
      </main>
    </div>
  );
}
