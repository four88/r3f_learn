import "./style.css";
import { ACESFilmicToneMapping, sRGBEncoding } from "three";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";

const root = ReactDOM.createRoot(document.querySelector("#root"));

const cameraSettings = {
        fov: 45,
        // zoom: 100,
        near: 0.1,
        far: 200,
        position: [3, 2, 6],
};
root.render(
        <>
                <Canvas
                        gl={{
                                antialias: true,
                                toneMapping: ACESFilmicToneMapping,
                                outputEncoding: sRGBEncoding,
                        }}
                        camera={cameraSettings}
                >
                        <Experience />
                </Canvas>
        </>
);
