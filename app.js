import * as THREE from 'three';
import { addPass, useCamera, useGui, useRenderSize, useScene, useTick } from './src/render/init.js';
import { SavePass } from 'three/examples/jsm/postprocessing/SavePass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { BlendShader } from 'three/examples/jsm/shaders/BlendShader.js';
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader.js';

const startApp = () => {
  const scene = useScene();
  const { width, height } = useRenderSize();
  const MOTION_BLUR_AMOUNT = 0.725;

  // Lights
  const dirLight = new THREE.DirectionalLight('#ffffff', 1);
  const ambientLight = new THREE.AmbientLight('#ffffff', 0.5);
  scene.add(dirLight, ambientLight);

  // Meshes
  const geometry = new THREE.IcosahedronGeometry(2, 200);
  const material = new THREE.MeshStandardMaterial({ color: 'red' });
  const ico = new THREE.Mesh(geometry, material);
  scene.add(ico);

  // Postprocessing
  const renderTargetParameters = {
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    stencilBuffer: false,
  };

  // Save pass
  const savePass = new SavePass(new THREE.WebGLRenderTarget(width, height, renderTargetParameters));

  // Blend pass
  const blendPass = new ShaderPass(BlendShader, 'tDiffuse1');
  blendPass.uniforms['tDiffuse2'].value = savePass.renderTarget.texture;
  blendPass.uniforms['mixRatio'].value = MOTION_BLUR_AMOUNT;

  // Output pass
  const outputPass = new ShaderPass(CopyShader);
  outputPass.renderToScreen = true;

  // Adding passes to composer
  // addPass(blendPass);
  // addPass(savePass);
  // addPass(outputPass);

  // GUI (commented out as it's not present)
  // const cameraFolder = gui.addFolder('Camera');
  // cameraFolder.add(camera.position, 'z', 0, 10);
  // cameraFolder.open();

  // Animation
  useTick(({ timestamp, timeDiff }) => {
  });
};

export default startApp;
