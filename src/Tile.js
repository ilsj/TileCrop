import { DebugUI } from './DebugUI.js';
export class Tile {
    constructor(width, height) {
        this.height = 0.1;
        this.width = 0.1;
        this._material = new THREE.MeshBasicMaterial({
            // color: 0xFF0000,
            map: Tile._texture0,
            opacity: 0.5,
            side: THREE.DoubleSide,
            transparent: true,
        });
        this._offset = 0.01;
        this.width = width;
        this.height = height;
        const geometry = new THREE.PlaneBufferGeometry(width, height);
        this.mesh = new THREE.Mesh(geometry, this._material);
        this.mesh.position.z = this._offset;
        // This only for understanding the task
        DebugUI.addLabel('Tiles opacity');
        DebugUI.addRange(50, (value) => this._material.opacity = Number(value) / 100 || 0);
        DebugUI.addButton('Texture 0', () => this._setTexture(Tile._texture0));
        DebugUI.addButton('Texture 1', () => this._setTexture(Tile._texture1));
        DebugUI.addButton('Texture 2', () => this._setTexture(Tile._texture2));
        DebugUI.addButton('Texture 3', () => this._setTexture(Tile._texture3));
        DebugUI.addButton('Texture 4', () => this._setTexture(Tile._texture4));
        DebugUI.addDivider();
    }
    clone() {
        return this.mesh.clone();
    }
    _setTexture(texture) {
        if (this._material.map !== texture) {
            this._material.map = texture;
        }
    }
}
Tile._loader = new THREE.TextureLoader();
Tile._texture0 = Tile._loader.load('texture/0.jpg');
Tile._texture1 = Tile._loader.load('texture/1.jpg');
Tile._texture2 = Tile._loader.load('texture/2.jpg');
Tile._texture3 = Tile._loader.load('texture/3.jpg');
Tile._texture4 = Tile._loader.load('texture/4.jpg');
