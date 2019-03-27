import * as ITHREE from './three-core'; // For THREE JS interfaces
declare const THREE: typeof ITHREE; // For THREE JS (window.THREE)

import { Tile } from './Tile.js';

export class Tiles {
    public group: ITHREE.Group = new THREE.Group();

    private _surfaceBoundingBox: ITHREE.Box3;
    private _tile: Tile = new Tile(0.2, 0.2);

    public constructor(width: number, height: number, surfaceGeometry: ITHREE.BufferGeometry | ITHREE.Geometry) {
        surfaceGeometry.computeBoundingBox();
        this._surfaceBoundingBox = surfaceGeometry.boundingBox;

        this._fill(width, height);

        // this.group.visible = false; // This only for understanding the task
        // DebugUI.addButton('Show/Hide Tiles', () => this.group.visible = !this.group.visible);
        // DebugUI.addDivider();
    }

    public changeTileOffsetX(offset: string): void {
        this.group.position.x = (Number(offset) || 0) / 10;
    }

    public changeTileOffsetY(offset: string): void {
        this.group.position.y = (Number(offset) || 0) / 10;
    }

    public rotate(offset: string): void {
        this.group.rotation.z = (Number(offset) || 0) / 180 * Math.PI;
    }

    private _cloneTile(positionX: number, positionY: number): void {
        const tileOverSurface: boolean =
            positionX - this._tile.width / 2 > this._surfaceBoundingBox.max.x
            || positionX + this._tile.width / 2 < this._surfaceBoundingBox.min.x
            || positionY - this._tile.height / 2 > this._surfaceBoundingBox.max.y
            || positionY + this._tile.height / 2 < this._surfaceBoundingBox.min.y;

        if (tileOverSurface) {
            return;
        }

        const nextMesh: ITHREE.Mesh = this._tile.clone();
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
    private _cropTile(tile: ITHREE.Mesh): ITHREE.Mesh {
        /**
         * Your tile crop code here
         */

        return tile;
    }

    private _fill(width: number, height: number): void {
        const columns: number = Math.ceil(width / this._tile.width);
        const rows: number = Math.ceil(height / this._tile.height);

        for (let row: number = -3; row <= rows + 3; row++) {
            for (let col: number = -3; col < columns + 3; col++) {
                const positionX: number = col * this._tile.width - width / 2;
                const positionY: number = row * this._tile.height - height / 2;

                this._cloneTile(positionX, positionY);
            }
        }
    }
}
