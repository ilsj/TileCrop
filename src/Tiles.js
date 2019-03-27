import { Tile } from './Tile.js';
export class Tiles {
    constructor(width, height, surfaceGeometry) {
        this.group = new THREE.Group();
        this._tile = new Tile(0.2, 0.2);
        surfaceGeometry.computeBoundingBox();
        this._surfaceBoundingBox = surfaceGeometry.boundingBox;
        this._fill(width, height);
        // this.group.visible = false; // This only for understanding the task
        // DebugUI.addButton('Show/Hide Tiles', () => this.group.visible = !this.group.visible);
        // DebugUI.addDivider();
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
    _cloneTile(positionX, positionY) {
        const tileOverSurface = positionX - this._tile.width / 2 > this._surfaceBoundingBox.max.x
            || positionX + this._tile.width / 2 < this._surfaceBoundingBox.min.x
            || positionY - this._tile.height / 2 > this._surfaceBoundingBox.max.y
            || positionY + this._tile.height / 2 < this._surfaceBoundingBox.min.y;
        if (tileOverSurface) {
            return;
        }
        const nextMesh = this._tile.clone();
        nextMesh.position.x = positionX;
        nextMesh.position.y = positionY;
        // // Your tile crop code here
        // const tileNeedsCrop:boolean =
        // if (tileNeedsCrop) {
        //     nextMesh = this._cropTile(nextMesh);
        // }
        this.group.add(nextMesh);
    }
    /**
     * Tile Crop method
     */
    _cropTile(tile) {
        /**
         * Your tile crop code here
         */
        return tile;
    }
    _fill(width, height) {
        const columns = Math.ceil(width / this._tile.width);
        const rows = Math.ceil(height / this._tile.height);
        for (let row = -3; row <= rows + 3; row++) {
            for (let col = -3; col < columns + 3; col++) {
                const positionX = col * this._tile.width - width / 2;
                const positionY = row * this._tile.height - height / 2;
                this._cloneTile(positionX, positionY);
            }
        }
    }
}
