import { useGLTF, OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import {
    InstancedRigidBodies,
    CylinderCollider,
    BallCollider,
    CuboidCollider,
    Debug,
    RigidBody,
    Physics,
} from "@react-three/rapier";
import { useMemo, useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Experience() {
    const cube = useRef();
    const cubes = useRef();
    const twister = useRef();
    const [hitSound] = useState(() => new Audio("./hit.mp3"));
    const hamburger = useGLTF("./hamburger.glb");
    const cubesCount = 100;
    const cubeTransforms = useMemo(() => {
        const positions = [];
        const rotations = [];
        const scales = [];

        for (let i = 0; i < cubesCount; i++) {
            positions.push([
                (Math.random() - 0.5) * 8,
                6 + i * 0.2,
                (Math.random() - 0.5) * 8,
            ]);
            rotations.push([Math.random(), Math.random(), Math.random()]);

            const scale = 0.2 + Math.random() * 0.8;
            scales.push([scale, scale, scale]);
        }

        return { positions, rotations, scales };
    }, []);

    // useEffect(() => {
    //     for (let i = 0; i < cubesCount; i++) {
    //         const matrix = new THREE.Matrix4();
    //         matrix.compose(
    //             new THREE.Vector3(i * 2, 0, 0),
    //             new THREE.Quaternion(),
    //             new THREE.Vector3(1, 1, 1)
    //         );
    //         cubes.current.setMatrixAt(i, matrix);
    //     }
    // }, []);

    const collisionEnter = () => {
        console.log("collision!");
        // hitSound.currentTime = 0;
        // hitSound.volume = Math.random();
        // hitSound.play();
    };

    const cubeJump = () => {
        const mass = cube.current.mass();
        cube.current.applyImpulse({ x: 0, y: 5 * mass, z: 0 });
        cube.current.applyTorqueImpulse({ x: 0, y: 1, z: 0 });
    };

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        const eulerRotation = new THREE.Euler(0, time * 3, 0);
        const quaternionRotation = new THREE.Quaternion();
        quaternionRotation.setFromEuler(eulerRotation);
        twister.current.setNextKinematicRotation(quaternionRotation);
        const angle = time * 0.5;
        const x = Math.cos(angle) * 2;
        const z = Math.sin(angle) * 2;
        twister.current.setNextKinematicTranslation({ x: x, y: -0.8, z: z });
    });

    return (
        <>
            <Perf position="top-left" />

            <OrbitControls makeDefault />

            <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
            <ambientLight intensity={0.5} />

            <Physics gravity={[0, -9.81, 0]}>
                <Debug />

                <RigidBody type="fixed">
                    <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, 5.5]} />
                    <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, -5.5]} />
                    <CuboidCollider args={[0.5, 2, 5]} position={[5.5, 1, 0]} />
                    <CuboidCollider args={[0.5, 2, 5]} position={[-5.5, 1, 0]} />
                </RigidBody>

                <RigidBody position={[0, 4, 0]} colliders={false}>
                    <primitive object={hamburger.scene} scale={0.25} />
                    <CylinderCollider args={[0.5, 1.25]} />
                </RigidBody>

                <RigidBody colliders="ball" position={[-1.5, 2, 0]} friction={0}>
                    <mesh castShadow>
                        <sphereGeometry />
                        <meshStandardMaterial color="orange" />
                    </mesh>
                </RigidBody>
                <RigidBody
                    ref={cube}
                    position={[1.5, 2, 0]}
                    gravityScale={1}
                    restitution={0}
                    friction={0.7}
                    colliders={false}
                    onCollisionEnter={collisionEnter}
                >
                    <CuboidCollider mass={2} args={[0.5, 0.5, 0.5]} />
                    <mesh castShadow onClick={cubeJump}>
                        <boxGeometry />
                        <meshStandardMaterial color="mediumpurple" />
                    </mesh>
                </RigidBody>
                <RigidBody
                    ref={twister}
                    position={[0, -0.8, 0]}
                    friction={0}
                    type="kinematicPosition"
                >
                    <mesh castShadow scale={[0.4, 0.4, 3]}>
                        <boxGeometry />
                        <meshStandardMaterial color="red" />
                    </mesh>
                </RigidBody>
                {/* <RigidBody */}
                {/*     colliders={false} */}
                {/*     position={[0, 1, 0]} */}
                {/*     rotation={[Math.PI * 0.1, 0, 0]} */}
                {/* > */}
                {/*     <BallCollider args={[1.5]} /> */}
                {/**/}
                {/* <CuboidCollider args={[1.5, 1.5, 0.5]} /> */}
                {/* <CuboidCollider */}
                {/*     args={[0.25, 1, 0.25]} */}
                {/*     position={[0, 0, 1]} */}
                {/*     rotation={[-Math.PI * 0.35, 0, 0]} */}
                {/* /> */}
                {/*     <mesh castShadow> */}
                {/*         <torusGeometry args={[1, 0.5, 16, 32]} /> */}
                {/*         <meshStandardMaterial color="mediumpurple" /> */}
                {/*     </mesh> */}
                {/* </RigidBody> */}
                <RigidBody type="fixed">
                    <mesh receiveShadow position-y={-1.25}>
                        <boxGeometry args={[10, 0.5, 10]} />
                        <meshStandardMaterial color="greenyellow" />
                    </mesh>
                </RigidBody>

                <InstancedRigidBodies
                    positions={cubeTransforms.positions}
                    rotations={cubeTransforms.rotations}
                    scales={cubeTransforms.scales}
                >
                    <instancedMesh
                        ref={cubes}
                        args={[null, null, cubesCount]}
                        castShadow
                        receiveShadow
                    >
                        <boxGeometry />
                        <meshStandardMaterial color="tomato" />
                    </instancedMesh>
                </InstancedRigidBodies>
            </Physics>
        </>
    );
}
