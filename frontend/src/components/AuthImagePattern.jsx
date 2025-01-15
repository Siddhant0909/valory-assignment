import { Canvas } from "@react-three/fiber";
import { Environment, Grid, OrbitControls } from "@react-three/drei";
import Model from "./Model.jsx";

const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="items-center justify-center hidden lg:flex bg-base-200">
      <div className="relative w-full h-screen text-center">
        <div className="w-full h-full cursor-grab">
          <Canvas
            camera={{
              position: [2, 0, 5],
              fov: 45,
            }}
          >
            <ambientLight intensity={1} />
            <directionalLight position={[3, 3, 3]} intensity={1} />

            <Model />
            <OrbitControls enableZoom={false} enablePan={false} />
            <Environment preset="city" />
          </Canvas>
        </div>
        <div className="absolute left-0 right-0 bottom-10">
          <div className="m-auto">
            <h2 className="mb-4 text-3xl font-bold">Welcome to Valory</h2>
            <p className="text-base-content/60">
              Step Into the Ultimate Arena Where Athletes Share Stories, Skills,
              and Success.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthImagePattern;
