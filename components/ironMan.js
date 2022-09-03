
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function IronMan(props) {
  const { nodes, materials } = useGLTF("/mech_m-6k.glb");
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group
            position={[-2.76, 68.31, 7.44]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_4.geometry}
              material={materials.plast}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_5.geometry}
              material={materials.glass}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_6.geometry}
              material={materials.material}
            />
          </group>
          <group
            position={[-2.76, 68.31, 7.44]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_8.geometry}
              material={materials.ground}
            />
          </group>
          <group
            position={[-2.76, 68.31, 7.44]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_10.geometry}
              material={materials["2_-_Default"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_11.geometry}
              material={materials["2_-_Default"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_12.geometry}
              material={materials["2_-_Default"]}
            />
          </group>
          <group
            position={[-2.76, 68.31, 7.44]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_14.geometry}
              material={materials.rivets}
            />
          </group>
          <group
            position={[-2.76, 68.31, 7.44]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_16.geometry}
              material={materials["3_-_Default"]}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/mech_m-6k.glb");
