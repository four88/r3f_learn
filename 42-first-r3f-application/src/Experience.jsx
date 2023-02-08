import { useThree, extend, useFrame } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useRef } from "react";
import CustomObject from "./CustomObject";

extend({ OrbitControls: OrbitControls });

export default function Experience() {
  const { camera, gl } = useThree();
  const cubeRef = useRef();
  const groupRef = useRef();

  //state: contains information about our THREE environmet
  //ex. camera, scene, renderer
  //delta: contain the time spent since the last frame in seconds
  //for control framerate
  useFrame((state, delta) => {
    // console.log("tick");
    cubeRef.current.rotation.y += delta;
    // groupRef.current.rotation.y += delta;

    // animate camera
    // console.log(state.camera)
    // const angle = state.clock.elapsedTime;
    // console.log(angle);
    // state.camera.position.x = Math.sin(angle) * 8;
    // state.camera.position.z = Math.cos(angle) * 8;
    // state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <orbitControls args={[camera, gl.domElement]} />
      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.4} />

      <group ref={groupRef}>
        <mesh
          ref={cubeRef}
          position-x={2}
          scale={1.5}
          rotation-y={Math.PI * 0.25}
        >
          <boxGeometry />
          <meshStandardMaterial color="mediumpurple" wireframe={false} />
        </mesh>

        <mesh position-x={-2} scale={1} rotation-y={Math.PI * 0.25}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" wireframe={false} />
        </mesh>
      </group>

      <mesh position-y={-1} scale={10} rotation-x={-Math.PI * 0.5}>
        <planeGeometry />
        <meshStandardMaterial color="greenYellow" wireframe={false} />
      </mesh>

      <CustomObject />
    </>
  );
}
