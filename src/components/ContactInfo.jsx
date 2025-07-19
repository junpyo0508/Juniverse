
import React from 'react';
import { Text, Billboard } from '@react-three/drei';

function ContactInfo(props) {
  return (
    <Billboard {...props}>
      <Text
        position={[0, 0.5, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Contact Me
      </Text>
      <Text
        position={[0, 0, 0]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Email: junpyo508@ajou.ac.kr
      </Text>
      <Text
        position={[0, -0.5, 0]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        GitHub: github.com/junpyo0508
      </Text>
    </Billboard>
  );
}

export default ContactInfo;
