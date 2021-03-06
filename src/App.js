
// import "./App.css";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber'
import { Environment, useScroll, Scroll, ScrollControls, Text, OrbitControls, ContactShadows, useGLTF, Html, MeshReflectorMaterial} from "@react-three/drei";
import { Suspense, useRef, useEffect, useMemo, useState } from "react";
import gsap from 'gsap'
import * as THREE from 'three'
import WorkSection from "./workSection/WorkSection";
import HeroPage from "./components/HeroPage"

import { EffectComposer, Bloom, Noise, Glitch  } from '@react-three/postprocessing'




//about page
function About() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [-10, 0, -25], fov: 35 }}>
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <Suspense fallback={null}>
        <group rotation={[0, 10, 0]}>
          <Laptop />
          {/* <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} maxAzimuthAngle={Math.PI / 4}  minAzimuthAngle={-Math.PI / 4}/> */}
        </group>
        <Environment preset="city" />
      </Suspense>
      <EffectComposer multisampling={0}>
        <Noise opacity={0.2} />
        <Glitch
          delay={[0.5, 3.5]} // min and max glitch delay
          duration={[0.1, 0.5]} // min and max glitch duration
          strength={[0.3, 1.0]} // min and max glitch strength
          active // turn on/off the effect (switches between "mode" prop and GlitchMode.DISABLED)
          ratio={0.85} // Threshold for strong glitches, 0 - no weak glitches, 1 - no strong glitches.
  />
        <Bloom intensity={0.5} kernelSize={4} luminanceThreshold={0} luminanceSmoothing={0.0} />
      </EffectComposer>
      <ContactShadows rotation-x={Math.PI / 2} position={[0, -4.5, 0]} opacity={1} width={20} height={20} blur={2} far={4.5} />
    </Canvas>
  )
}


function Laptop(props) {
  const group = useRef()
  const { viewport } = useThree()
  // Load model
  const { nodes, materials } = useGLTF('/mac-draco.glb')
  // Make it float
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, Math.cos(t / 2) / 10 + 0.25, 0.1)
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, Math.sin(t / 4) / 10, 0.1)
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, Math.sin(t / 4) / 20, 0.1)
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, (-5 + Math.sin(t)) / 5, 0.1)
  })
  // The jsx graph was auto-generated by: https://github.com/pmndrs/gltfjsx
  return (
    <group ref={group} {...props} dispose={null} >
      <group rotation-x={-0.425} position={[0, -0.04, 0.41]}>
        <group position={[0, 2.96, -0.13]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh material={materials.aluminium} geometry={nodes['Cube008'].geometry} />
          <mesh material={materials['matte.001']} geometry={nodes['Cube008_1'].geometry} />
          <mesh geometry={nodes['Cube008_2'].geometry}>
            {/* Drei's HTML component can now "hide behind" canvas geometry */}
            <Html className="content" rotation-x={-Math.PI / 2} position={[0, 0.05, -0.09]} transform occlude>
              <HeroPage />
            </Html>
          </mesh>
        </group>
      </group>
      <mesh material={materials.keys} geometry={nodes.keyboard.geometry} position={[1.79, 0, 3.45]} />
      <group position={[0, -0.1, 3.39]}>
        <mesh material={materials.aluminium} geometry={nodes['Cube002'].geometry} />
        <mesh material={materials.trackpad} geometry={nodes['Cube002_1'].geometry} />
      </group>
      <mesh material={materials.touchbar} geometry={nodes.touchbar.geometry} position={[0, -0.03, 1.2]} />
    </group>
  )
}

// home page

// first section
function Swarm({ count }) {
  const mesh = useRef()
  const scroll = useScroll()
  const swarmRef = useRef()
  const { viewport, mouse } = useThree()

  const dummy = useMemo(() => new THREE.Object3D(), [])
  // Generate some random positions, speed factors and timings
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100
      const factor = 20 + Math.random() * 100
      const speed = 0.01 + Math.random() / 200
      const xFactor = -50 + Math.random() * 100
      const yFactor = -50 + Math.random() * 100
      const zFactor = -50 + Math.random() * 100
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 })
    }
    return temp
  }, [count])
  // The innards of this hook will run every frame
  useFrame((state) => {
    // Run through the randomized data to calculate some movement
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle
      // There is no sense or reason to any of this, just messing around with trigonometric functions
      t = particle.t += speed / 2
      const a = Math.cos(t) + Math.sin(t * 1) / 10
      const b = Math.sin(t) + Math.cos(t * 2) / 10
      const s = Math.cos(t)
      particle.mx += mouse.x * viewport.width * particle.mx * 0.01
      particle.my += mouse.y * viewport.height * particle.my * 0.01
      // Update the dummy object
      dummy.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      )
      dummy.scale.set(s, s, s)
      dummy.rotation.set(s * 5, s * 5, s * 5)
      dummy.updateMatrix()
      // And apply the matrix to the instanced item
      mesh.current.setMatrixAt(i, dummy.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  })
  const circleRef = useRef()
  useFrame(() => (circleRef.current.rotation.y += 0.009))

  useFrame(() => (swarmRef.current.rotation.y = scroll.offset * 2))

  return (
    <group ref={swarmRef}>
      <group ref={circleRef}>
        <mesh>
          <sphereBufferGeometry args={[2, 9, 9]} />
          <meshStandardMaterial wireframe />
        </mesh>
      </group>
      <instancedMesh ref={mesh} args={[null, null, count]}>
        <sphereBufferGeometry args={[1, 1, 2]} />
        <meshStandardMaterial wireframe />
      </instancedMesh>
    </group>
  )
}


function Rig({ v = new THREE.Vector3() }) {
  return useFrame((state) => {
    state.camera.position.lerp(v.set(state.mouse.x / 2, state.mouse.y / 2, 10), 0.05)
  })
}


function Caption({ children }) {
  const scroll = useScroll()
  const ref = useRef()
  const { width } = useThree((state) => state.viewport)
  useFrame(() => (ref.current.rotation.y = scroll.offset * 3))
  return (
    <group>
    <Text ref={ref}
      position={[0, 0, -8]}
      lineHeight={0.8}
      font="/OurFriendElectric-BWr8d.ttf"
      fontSize={width / 7}
      // material-toneMapped={false}
      color="red"
      anchorX="center"
      anchorY="middle">
      {children}
    </Text>
    </group>
  )
}

const Info = () => {
  const { width } = useThree((state) => state.viewport)
  const scroll = useScroll()
  const ref = useRef()
  const xRef = useRef()
  const MinusxRef = useRef()
  const LastSectionref = useRef()
  useFrame(() => (ref.current.position.y = scroll.offset * 25))
  useFrame(() => (LastSectionref.current.position.y = -scroll.offset * 30,xRef.current.position.x = scroll.offset * 20, MinusxRef.current.position.x = -scroll.offset * 20))
  return (
    <>
    <group ref={ref}>
    <Text
      position={[0, -10, 1]}
      lineHeight={0.8}
      font="/OurFriendElectric-BWr8d.ttf"
      fontSize={width / 20}
      // material-toneMapped={false}
      color="#6C757D"
      anchorX="center"
      anchorY="middle">
       Since 2000
    </Text>
    <Text
      position={[0, -13, 1]}
      lineHeight={0.8}
      font="/OurFriendElectric-BWr8d.ttf"
      fontSize={width / 20}
      // material-toneMapped={false}
      color="#6C757D"
      anchorX="center"
      anchorY="middle">
       100% Remote
    </Text>
    <Text
      position={[0, -16, 1]}
      lineHeight={0.8}
      font="/OurFriendElectric-BWr8d.ttf"
      fontSize={width / 20}
      // material-toneMapped={false}
      color="#6C757D"
      anchorX="center"
      anchorY="middle">
       50+ Partner Company
    </Text>
    </group>
    {/* last section */}
    <group ref={LastSectionref}>
    <Text
      position={[0, 30, 1]}
      lineHeight={0.8}
      font="/OurFriendElectric-BWr8d.ttf"
      fontSize={width / 70}
      // material-toneMapped={false}
      color="#F48C06"
      anchorX="center"
      anchorY="middle">
       Our teams of technologists, strategists and designers deliver powerful digital experiences. 
    </Text>
    <Text
      position={[0, 29, 1]}
      lineHeight={0.8}
      font="/OurFriendElectric-BWr8d.ttf"
      fontSize={width / 70}
      // material-toneMapped={false}
      color="#F48C06"
      anchorX="center"
      anchorY="middle">
        We specialize in 11 industries in 40+ countries, delivering innovative solutions to our 
    </Text>
    <Text
      position={[0, 28, 1]}
      lineHeight={0.8}
      font="/OurFriendElectric-BWr8d.ttf"
      fontSize={width / 70}
      // material-toneMapped={false}
      color="#F48C06"
      anchorX="center"
      anchorY="middle">
       customers??? most challenging problems. The numbers speak for themselves.
    </Text>
    </group>
    {/* horizontal enrty */}
    <group ref={xRef}>
    <Text
      position={[-25, -4, 1]}
      lineHeight={0.8}
      font="/OurFriendElectric-BWr8d.ttf"
      fontSize={width / 80}
      // material-toneMapped={false}
      color="#F48C06"
      anchorX="center"
      anchorY="middle">
       Creative problem-solving for designing
    </Text>
    <Text
      position={[-26, -4.5, 1]}
      lineHeight={0.8}
      font="/OurFriendElectric-BWr8d.ttf"
      fontSize={width / 80}
      // material-toneMapped={false}
      color="#F48C06"
      anchorX="center"
      anchorY="middle">
       and developing great brands 
    </Text>

    </group>
    <group ref={MinusxRef}>
    <Text
      position={[26, -4, 1]}
      lineHeight={0.8}
      font="/OurFriendElectric-BWr8d.ttf"
      fontSize={width / 80}
      // material-toneMapped={false}
      color="#F48C06"
      anchorX="center"
      anchorY="middle">
      Build meaningful long-term partnerships and 
    </Text>
    <Text
      position={[26, -4.5, 1]}
      lineHeight={0.8}
      font="/OurFriendElectric-BWr8d.ttf"
      fontSize={width / 80}
      // material-toneMapped={false}
      color="#F48C06"
      anchorX="center"
      anchorY="middle">
      deliver the best experience of digital services. 
    </Text>

    </group>
    </>
  )
}

function Home() {
  let timeline = gsap.timeline();
  //load animation 
  let Main = useRef(null)
  const ref = useRef()

  useEffect(()=> {
    timeline.from(Main,{
        delay: 1.4,
        duration: 1.2,
        opacity: 0,
        y: 100
    })
})
  
  

  return (
  <div className="App">
    <div className="field">
		  <div className="scroll"></div>
	  </div>
    <Canvas camera={{ fov: 75, position: [0, 0, 7] }}>
      <Rig />
      <color attach="background" args={['#010101']} />
      <pointLight intensity={1} color="red" />
      <spotLight intensity={0.5} position={[70, 70, 70]} penumbra={1} color="lightblue" />
      <ScrollControls pages={3}>
      <Caption>{`Engeneer\nThe\nFuture\ns.`}</Caption>
      <Info />
      <Swarm count={200} />
      <Scroll html style={{ width: '100%' }}>
        <WorkSection />
      </Scroll>
      </ScrollControls>
      <EffectComposer multisampling={0}>
        <Noise opacity={0.2} />
        <Bloom intensity={1.5} kernelSize={2} luminanceThreshold={0} luminanceSmoothing={0.3} />
        <Bloom intensity={1.5} kernelSize={4} luminanceThreshold={0} luminanceSmoothing={0.0} />
      </EffectComposer>
    </Canvas>
  </div>
  )
}



function App() {
  let timeline = gsap.timeline();
  return (

    <Router>
    <div className="App">
      <Header timeline= {timeline}/>
      <div className="container">
        <div className="wrapper">
          <div className="home">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
        </Switch>
      </div>
      </div>
      </div>
    </div>
    </Router>
  );
}

export default App;
