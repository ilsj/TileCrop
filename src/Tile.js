import { DebugUI } from './DebugUI.js';
export class Tile {
    constructor(width, height) {
        this.height = 0.1;
        this.width = 0.1;
        this._material = new THREE.MeshBasicMaterial({
            // color: 0xFF0000,
            map: Tile._texture0,
            side: THREE.DoubleSide,
        });
        this._offset = 0.01;
        this.width = width;
        this.height = height;
        const geometry = new THREE.PlaneBufferGeometry(width, height);
        this.mesh = new THREE.Mesh(geometry, this._material);
        this.mesh.position.z = this._offset;
        DebugUI.addButton('Texture 0', () => this._material.map = Tile._texture0);
        DebugUI.addButton('Texture 1', () => this._material.map = Tile._texture1);
        DebugUI.addButton('Texture 2', () => this._material.map = Tile._texture2);
        DebugUI.addButton('Texture 3', () => this._material.map = Tile._texture3);
        DebugUI.addButton('Texture 4', () => this._material.map = Tile._texture4);
        DebugUI.addDivider();
    }
    clone() {
        return this.mesh.clone();
    }
}
Tile._loader = new THREE.TextureLoader();
Tile._texture0 = Tile._loader.load('texture/0.jpg');
Tile._texture1 = Tile._loader.load('texture/1.jpg');
Tile._texture2 = Tile._loader.load('texture/2.jpg');
Tile._texture3 = Tile._loader.load('texture/3.jpg');
Tile._texture4 = Tile._loader.load('texture/4.jpg');
