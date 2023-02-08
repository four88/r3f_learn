import {
    useMatcapTexture,
    Center,
    Text3D,
    OrbitControls,
} from "@react-three/drei";
import { Perf } from "r3f-perf";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32);
const material = new THREE.MeshMatcapMaterial();

export default function Experience() {
    const [matcapTexture] = useMatcapTexture("7A7A7A_D9D9D9_BCBCBC_B4B4B4", 256);
    // const [torusGeometry, setTorusGeometry] = useState();
    // const [material, setMaterial] = useState();
    // const donutsGroup = useRef();
    const donuts = useRef([]);

    useEffect(() => {
        matcapTexture.encoding = THREE.sRGBEncoding;
        matcapTexture.needsUpdate = true;

        material.matcap = matcapTexture;
        material.needsUpdate = true;
    }, []);

    useFrame((state, delta) => {
        // for (const donut of donutsGroup.current.children) {
        //     donut.rotation.y += delta * 0.2;
        // }

        for (const donut of donuts.current) {
            donut.rotation.y += delta * 0.2;
        }
    });

    return (
        <>
            <Perf position="top-left" />
            <OrbitControls makeDefault />
            <Center>
                <Text3D
                    font="./fonts/helvetiker_regular.typeface.json"
                    size={0.75}
                    height={0.2}
                    curveSegments={12}
                    bevelEnabled
                    bevelThickness={0.02}
                    bevelSize={0.02}
                    bevelOffset={0}
                    bevelSegments={5}
                    material={material}
                >
                    Hello R3F
                </Text3D>
            </Center>

            {/* <torusGeometry args={[1, 0.6, 16, 32]} ref={setTorusGeometry} /> */}
            {/* <meshMatcapMaterial matcap={matcapTexture} ref={setMaterial} /> */}

            {/* <group ref={donutsGroup}> */}
            {[...Array(100)].map((value, index) => (
                <mesh
                    ref={(element) => (donuts.current[index] = element)}
                    key={index}
                    geometry={torusGeometry}
                    material={material}
                    position={[
                        (Math.random() - 0.5) * 10,
                        (Math.random() - 0.5) * 10,
                        (Math.random() - 0.5) * 10,
                    ]}
                    scale={0.2 + Math.random() * 0.2}
                    rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
                ></mesh>
            ))}
            {/* </group> */}
        </>
    );
}
