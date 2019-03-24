import * as ITHREE from './three-core'; // For THREE JS interfaces
declare const THREE: typeof ITHREE; // For THREE JS (window.THREE)

import { DebugUI } from './DebugUI.js';

export class Tile {
    private static _loader: ITHREE.TextureLoader = new THREE.TextureLoader();
    private static _texture0: ITHREE.Texture = Tile._loader.load('texture/0.jpg');
    private static _texture1: ITHREE.Texture = Tile._loader.load('texture/1.jpg');
    private static _texture2: ITHREE.Texture = Tile._loader.load('texture/2.jpg');
    private static _texture3: ITHREE.Texture = Tile._loader.load('texture/3.jpg');
    private static _texture4: ITHREE.Texture = Tile._loader.load('texture/4.jpg');

    public height: number = 0.1;
    public mesh: ITHREE.Mesh;
    public width: number = 0.1;

    private _material: ITHREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
        // color: 0xFF0000,
        map: Tile._texture0,
        side: THREE.DoubleSide,
    });

    private _offset: number = 0.01;

    public constructor(width: number, height: number) {
        this.width = width;
        this.height = height;

        const geometry: ITHREE.BufferGeometry = new THREE.PlaneBufferGeometry(width, height);

        this.mesh = new THREE.Mesh(geometry, this._material);
        this.mesh.position.z = this._offset;

        DebugUI.addButton('Texture 0', () => this._material.map = Tile._texture0);
        DebugUI.addButton('Texture 1', () => this._material.map = Tile._texture1);
        DebugUI.addButton('Texture 2', () => this._material.map = Tile._texture2);
        DebugUI.addButton('Texture 3', () => this._material.map = Tile._texture3);
        DebugUI.addButton('Texture 4', () => this._material.map = Tile._texture4);
        DebugUI.addDivider();
    }

    public clone(): ITHREE.Mesh {
        return this.mesh.clone();
    }
}