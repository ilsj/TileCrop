import * as ITHREE from './three-core'; // For THREE JS interfaces
declare const THREE: typeof ITHREE; // For THREE JS (window.THREE)

import { DebugUI } from './DebugUI.js';
import { Shape } from './Shape.js';
import { Tiles } from './Tiles.js';

export class Surface {
    public group: ITHREE.Group = new THREE.Group();

    private _tiles: Tiles;

    private _height: number = 2;
    private _width: number = 4;

    private _material: ITHREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
        color: 0xDDDDDD,
        side: THREE.DoubleSide,
    });
    private _mesh: ITHREE.Mesh;

    public constructor(width: number, height: number) {
        this._width = width;
        this._height = height;

        const shape: ITHREE.ShapeGeometry = Shape.getRectangle(width, height);
        this._createSurface(shape);
        this._createTiles();

        DebugUI.addNumber('Offset X', (value: string) => this._tiles.changeTileOffsetX(value));
        DebugUI.addNumber('Offset Y', (value: string) => this._tiles.changeTileOffsetY(value));
        DebugUI.addDivider();

        DebugUI.addNumber('rotation', (value: string) => this._tiles.rotate(value));
        DebugUI.addDivider();
    }

    public changeShape(shape: ITHREE.ShapeGeometry): void {
        this.group.remove(this._mesh);

        this._createSurface(shape);
    }

    private _createSurface(shape: ITHREE.ShapeGeometry): void {
        this._mesh = new THREE.Mesh(shape, this._material);
        this.group.add(this._mesh);
    }

    private _createTiles(): void {
        this._tiles = new Tiles(this._width, this._height);
        this.group.add(this._tiles.group);
    }
}
