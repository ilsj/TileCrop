import { OrbitControls } from './OrbitControls.js';
export class View {
    constructor(container, viewDistance = 5, useControls = false) {
        this._animationEnabled = false;
        this._createRenderer(container);
        this._createScene();
        this._createCamera(viewDistance);
        if (useControls) {
            this._createControls();
        }
        window.addEventListener('resize', () => this._onWindowResize(), false);
    }
    add(mesh) {
        this._scene.add(mesh);
    }
    remove(mesh) {
        this._scene.remove(mesh);
    }
    render() {
        if (this._animationEnabled) {
            return;
        }
        this._render();
    }
    startAnimation() {
        this._animationEnabled = true;
        this._renderer.setAnimationLoop(() => this._render());
    }
    stopAnimation() {
        this._animationEnabled = false;
        this._renderer.setAnimationLoop(null);
    }
    _createCamera(viewDistance) {
        this._camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
        this._camera.position.z = viewDistance;
    }
    _createControls() {
        this._controls = new OrbitControls(this._camera, this.canvas);
    }
    _createRenderer(container) {
        this._renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
        this._renderer.setPixelRatio(window.devicePixelRatio);
        this._renderer.setSize(window.innerWidth, window.innerHeight);
        this._renderer.setClearColor(0x333333);
        container.appendChild(this._renderer.domElement);
        this.canvas = this._renderer.domElement;
    }
    _createScene() {
        this._scene = new THREE.Scene();
    }
    _onWindowResize() {
        this._camera.aspect = window.innerWidth / window.innerHeight;
        this._camera.updateProjectionMatrix();
        this._renderer.setSize(window.innerWidth, window.innerHeight);
        this.render();
    }
    _render() {
        this._renderer.render(this._scene, this._camera);
    }
}
