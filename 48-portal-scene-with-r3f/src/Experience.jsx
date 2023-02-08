import {
    shaderMaterial,
    Sparkles,
    Center,
    useTexture,
    useGLTF,
    OrbitControls,
} from "@react-three/drei";
import portalVertexShader from "./shaders/portal/vertex.glsl";
import portalFragmentShader from "./shaders/portal/fragment.glsl";
import * as THREE from "three";
import { useFrame, extend } from "@react-three/fiber";
import { useRef } from "react";

const PortalMaterial = shaderMaterial(
    {
        uTime: 0,
        uColorStart: new THREE.Color("#ffffff"),
        uColorEnd: new THREE.Color("#000000"),
    },
    portalVertexShader,
    portalFragmentShader
);

// for convert it to R3F tag
extend({ PortalMaterial });

export default function Experience() {
    const { nodes } = useGLTF("./model/portal.glb");
    // console.log(model.nodes);

    const bakedTexture = useTexture("./model/baked.jpg");
    bakedTexture.flipY = false;

    const portalMaterial = useRef();

    useFrame((state, delta) => {
        portalMaterial.current.uTime += delta;
    });

    return (
        <>
            <OrbitControls makeDefault />
            <color args={["#030202"]} attach={"background"} />

            <Center>
                <mesh
                    geometry={nodes.baked.geometry}
                    position={[1.69, 0.13, -1.11]}
                    rotation={[0.54, -0.7, 1.92]}
                >
                    <meshBasicMaterial map={bakedTexture} />
                </mesh>

                <mesh
                    geometry={nodes.poleLightA.geometry}
                    position={nodes.poleLightA.position}
                >
                    <meshBasicMaterial color="#ffffe5" />
                </mesh>

                <mesh
                    geometry={nodes.poleLightB.geometry}
                    position={nodes.poleLightB.position}
                >
                    <meshBasicMaterial color="#ffffe5" />
                </mesh>

                <mesh
                    geometry={nodes.portalLight.geometry}
                    position={nodes.portalLight.position}
                    rotation={nodes.portalLight.rotation}
                    scale={0.66}
                >
                    <portalMaterial ref={portalMaterial} />
                </mesh>

                <Sparkles
                    size={6}
                    scale={[4, 1, 3]}
                    position-y={1}
                    speed={0.3}
                    count={40}
                />
            </Center>
        </>
    );
}
