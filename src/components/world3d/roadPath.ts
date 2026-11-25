import * as THREE from "three";

export const HIGHWAY_POINTS = [
  new THREE.Vector3(0, 0, 48),
  new THREE.Vector3(-8, 0, 26),
  new THREE.Vector3(6, 0, 4),
  new THREE.Vector3(-6, 0, -20),
  new THREE.Vector3(8, 0, -44),
  new THREE.Vector3(0, 0, -68),
];

export const roadCurve = new THREE.CatmullRomCurve3(
  HIGHWAY_POINTS,
  false,
  "catmullrom",
  0.5
);

export const STOP_PROGRESS = [0.04, 0.26, 0.5, 0.74, 0.94] as const;
