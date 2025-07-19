
import React, { useMemo } from 'react';
import { TubeGeometry, CatmullRomCurve3, Vector3 } from 'three';

function PathTube({ pathPoints, radius = 0.1, tubularSegments = 200, radiusSegments = 8 }) {
  const curve = useMemo(() => {
    const points = pathPoints.map(p => new Vector3(p[0], p[1], p[2]));
    return new CatmullRomCurve3(points);
  }, [pathPoints]);

  const geometry = useMemo(() => {
    return new TubeGeometry(curve, tubularSegments, radius, radiusSegments, false);
  }, [curve, tubularSegments, radius, radiusSegments]);

  return (
    <mesh geometry={geometry}>
      <meshBasicMaterial color={0x00ffff} transparent opacity={0} />
    </mesh>
  );
}

export default PathTube;
