import * as ITHREE from './three-core'; // For THREE JS interfaces
declare const THREE: typeof ITHREE; // For THREE JS (window.THREE)

import { Tile } from './Tile.js';

export class Tiles {
    public group: ITHREE.Group = new THREE.Group();

    public constructor(width: number, height: number) {
        const tile: Tile = new Tile(0.2, 0.2);

        this._fill(tile, width, height);
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

    private _fill(tile: Tile, width: number, height: number): void {
        const columns: number = Math.ceil(width / tile.width);
        const rows: number = Math.ceil(height / tile.height);

        for (let row: number = -3; row <= rows + 3; row++) {
            for (let col: number = -3; col < columns + 3; col++) {
                const nextMesh: ITHREE.Mesh = tile.clone();
                nextMesh.position.x = col * tile.width - width / 2;
                nextMesh.position.y = row * tile.height - height / 2;
                this.group.add(nextMesh);
            }
        }
    }
}
