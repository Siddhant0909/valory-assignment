import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Center, ContactShadows, Resize, useGLTF } from "@react-three/drei";

const Model = () => {
  const { scene } = useGLTF("model.glb");
  const modelRef = useRef();

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y -= 0.005;
    }
  });

  return (
    <>
      <group className="model" position={[0, 0.1, 0]}>
        <Resize scale={3}>
          <Center>
            <primitive object={scene} ref={modelRef} />
          </Center>
        </Resize>
      </group>

      <ContactShadows
        position={[0, 1, 0]}
        opacity={0.75}
        blur={1.5}
        far={20}
        scale={3.15}
        resolution={1024}
        color={"#747bff"}
      />
    </>
  );
};

export default Model;
