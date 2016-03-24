function initEffects() {
    //effect = new THREE.StereoEffect(renderer);
    //effect = new THREE.OculusRiftEffect(renderer, {worldScale: 100, scale: 0.5});
    //effect = new THREE.AnaglyphEffect(renderer);
    effect = new THREE.CardboardEffect(renderer);
    effect.setSize(window.innerWidth, window.innerHeight);
}
