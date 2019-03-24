import { DebugUI } from './DebugUI.js';
import { Shape } from './Shape.js';
import { Tiles } from './Tiles.js';
export class Surface {
    constructor(width, height) {
        this.group = new THREE.Group();
        this._height = 2;
        this._width = 4;
        this._material = new THREE.MeshBasicMaterial({
            color: 0xDDDDDD,
            side: THREE.DoubleSide,
        });
        this._width = width;
        this._height = height;
        const shape = Shape.getRectangle(width, height);
        this._createSurface(shape);
        this._createTiles();
        DebugUI.addNumber('Offset X', (value) => this._tiles.changeTileOffsetX(value));
        DebugUI.addNumber('Offset Y', (value) => this._tiles.changeTileOffsetY(value));
        DebugUI.addDivider();
        DebugUI.addNumber('rotation', (value) => this._tiles.rotate(value));
        DebugUI.addDivider();
    }
    changeShape(shape) {
        this.group.remove(this._mesh);
        this._createSurface(shape);
    }
    _createSurface(shape) {
        this._mesh = new THREE.Mesh(shape, this._material);
        this.group.add(this._mesh);
    }
    _createTiles() {
        this._tiles = new Tiles(this._width, this._height);
        this.group.add(this._tiles.group);
    }
}
