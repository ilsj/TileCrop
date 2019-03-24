import { Tile } from './Tile.js';
export class Tiles {
    constructor(width, height) {
        this.group = new THREE.Group();
        const tile = new Tile(0.2, 0.2);
        this._fill(tile, width, height);
    }
    changeTileOffsetX(offset) {
        this.group.position.x = (Number(offset) || 0) / 10;
    }
    changeTileOffsetY(offset) {
        this.group.position.y = (Number(offset) || 0) / 10;
    }
    rotate(offset) {
        this.group.rotation.z = (Number(offset) || 0) / 180 * Math.PI;
    }
    _fill(tile, width, height) {
        const columns = Math.ceil(width / tile.width);
        const rows = Math.ceil(height / tile.height);
        for (let row = -3; row <= rows + 3; row++) {
            for (let col = -3; col < columns + 3; col++) {
                const nextMesh = tile.clone();
                nextMesh.position.x = col * tile.width - width / 2;
                nextMesh.position.y = row * tile.height - height / 2;
                this.group.add(nextMesh);
            }
        }
    }
}
