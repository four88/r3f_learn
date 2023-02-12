import { OrbitControls } from "@react-three/drei";
import Lights from "./Lights.jsx";
import { Level } from "./Level.jsx";
import { Physics, Debug } from "@react-three/rapier";
import Player from "./Player";
import useGame from "./stores/useGame.jsx";
import Effect from "./Effect.jsx";

export default function Experience() {
  const blocksCount = useGame((state) => state.blocksCount);
  const blocksSeed = useGame((state) => state.blocksSeed);
  console.log(blocksSeed);
  return (
    <>
      <color args={["#252731"]} attach="background" />
      {/* <OrbitControls makeDefault /> */}

      <Physics>
        {/* <Debug /> */}
        <Lights />
        <Level count={blocksCount} seed={blocksSeed} />
        <Player />
      </Physics>
      <Effect />
    </>
  );
}
