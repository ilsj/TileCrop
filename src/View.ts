import { OrbitControls } from './OrbitControls.js';
import * as ITHREE from './three-core'; // For THREE JS interfaces
declare const THREE: typeof ITHREE; // For THREE JS (window.THREE)

export class View {
    public canvas: HTMLCanvasElement;

    protected _camera: ITHREE.PerspectiveCamera;
    protected _controls: OrbitControls;
    protected _renderer: ITHREE.WebGLRenderer;
    protected _scene: ITHREE.Scene;

    private _animationEnabled: boolean = false;

    public constructor(container: HTMLElement, viewDistance: number = 5, useControls: boolean = false) {
        this._createRenderer(container);
        this._createScene();
        this._createCamera(viewDistance);

        if (useControls) {
            this._createControls();
        }

        window.addEventListener('resize', () => this._onWindowResize(), false);
    }

    public add(mesh: ITHREE.Mesh | ITHREE.Group): void {
        this._scene.add(mesh);
    }

    public remove(mesh: ITHREE.Mesh | ITHREE.Group): void {
        this._scene.remove(mesh);
    }

    public render(): void {
        if (this._animationEnabled) {
            return;
        }

        this._render();
    }

    public startAnimation(): void {
        this._animationEnabled = true;
        this._renderer.setAnimationLoop(() => this._render());
    }

    public stopAnimation(): void {
        this._animationEnabled = false;
        this._renderer.setAnimationLoop(null);
    }

    protected _createCamera(viewDistance: number): void {
        this._camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
        this._camera.position.z = viewDistance;
    }

    protected _createControls(): void {
        this._controls = new OrbitControls(this._camera, this.canvas);
    }

    protected _createRenderer(container: HTMLElement): void {
        this._renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
        this._renderer.setPixelRatio(window.devicePixelRatio);
        this._renderer.setSize(window.innerWidth, window.innerHeight);
        this._renderer.setClearColor(0x333333);
        container.appendChild(this._renderer.domElement);
        this.canvas = this._renderer.domElement;
    }

    protected _createScene(): void {
        this._scene = new THREE.Scene();
    }

    protected _onWindowResize(): void {
        this._camera.aspect = window.innerWidth / window.innerHeight;
        this._camera.updateProjectionMatrix();
        this._renderer.setSize(window.innerWidth, window.innerHeight);
        this.render();
    }

    protected _render(): void {
        this._renderer.render(this._scene, this._camera);
    }
}
