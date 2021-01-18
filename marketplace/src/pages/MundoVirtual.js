import React from "react";
import Unity, { UnityContext } from "react-unity-webgl";

const unityContext = new UnityContext({
  loaderUrl: "../unity/Build/UnityLoader.js",
  dataUrl: "../unity/Build/react-test.data",
  frameworkUrl: "../unity/Build/react-test.wasm",
  codeUrl: "../unity/Build/react-test.wasm",
});
 
const MundoVirtual = () => {
  return <Unity unityContext={unityContext} />;
};

export default MundoVirtual;