import * as THREE from "three";
import { useEffect, useRef, useMemo } from "react";

export default function CustomObject() {
  const verticeCount = 10 * 3;
  const geometryRef = useRef();

  // useMemo use like catch we don't have to recalculated every time that something change
  const positions = useMemo(() => {
    const positions = new Float32Array(verticeCount * 3);

    for (let i = 0; i < verticeCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 3;
    }

    return positions;
  }, []);

  useEffect(() => {
    geometryRef.current.computeVertexNormals();
  }, [positions]);

  return (
    <>
      <mesh>
        <bufferGeometry ref={geometryRef}>
          <bufferAttribute
            attach="attributes-position"
            count={verticeCount}
            itemSize={3}
            array={positions}
          />
        </bufferGeometry>
        <meshStandardMaterial color="red" side={THREE.DoubleSide} />
      </mesh>
    </>
  );
}
