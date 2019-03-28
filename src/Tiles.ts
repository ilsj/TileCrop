import * as ITHREE from './three-core'; // For THREE JS interfaces
declare const THREE: typeof ITHREE; // For THREE JS (window.THREE)

import { DebugUI } from './DebugUI.js';
import { DiamondTile, HexagonTile, RectangleTile } from './Tile.js';

export class Tiles {
    private static _loader: ITHREE.TextureLoader = new THREE.TextureLoader();
    private static _texture0: ITHREE.Texture = Tiles._loader.load('texture/0.jpg');
    private static _texture1: ITHREE.Texture = Tiles._loader.load('texture/1.jpg');
    private static _texture2: ITHREE.Texture = Tiles._loader.load('texture/2.jpg');
    private static _texture3: ITHREE.Texture = Tiles._loader.load('texture/3.jpg');
    private static _texture4: ITHREE.Texture = Tiles._loader.load('texture/4.jpg');

    public group: ITHREE.Group = new THREE.Group();

    private _surfaceBoundingBox: ITHREE.Box3;

    private _tile: RectangleTile | DiamondTile | HexagonTile;
    private _rectangleTile: RectangleTile = new RectangleTile(Tiles._texture0, 0.2, 0.2);
    private _diamondTile: DiamondTile = new DiamondTile(Tiles._texture0, 0.15, 0.3);
    private _hexagonTile: HexagonTile = new HexagonTile(Tiles._texture0, 0.2, 0.2 * 0.866);

    public constructor(width: number, height: number, surfaceGeometry: ITHREE.BufferGeometry | ITHREE.Geometry) {
        surfaceGeometry.computeBoundingBox();
        this._surfaceBoundingBox = surfaceGeometry.boundingBox;

        this._fillRectangleTile(width, height);

         // This only for understanding the task
        DebugUI.addLabel('Tiles opacity');
        DebugUI.addRange(50, (value: string): void => this._tile.setOpacity(value));

        DebugUI.addButton('Rectangle Tile', (): void => this._fillRectangleTile(width, height));
        DebugUI.addButton('Diamond Tile', (): void => this._fillDiamondTile(width, height));
        DebugUI.addButton('Hexagon Tile', (): void => this._fillHexagonTile(width, height));
        DebugUI.addDivider();

        DebugUI.addButton('Texture 0', (): void => this._tile.setTexture(Tiles._texture0));
        DebugUI.addButton('Texture 1', (): void => this._tile.setTexture(Tiles._texture1));
        DebugUI.addButton('Texture 2', (): void => this._tile.setTexture(Tiles._texture2));
        DebugUI.addButton('Texture 3', (): void => this._tile.setTexture(Tiles._texture3));
        DebugUI.addButton('Texture 4', (): void => this._tile.setTexture(Tiles._texture4));
        DebugUI.addDivider();
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

    private _clear(): void {
        for (let i: number = this.group.children.length - 1; i >= 0; i -= 1) {
            this.group.remove(this.group.children[i]);
        }
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

    private _fillRectangleTile(width: number, height: number): void {
        if (this._tile === this._rectangleTile) {
            return;
        }

        this._tile = this._rectangleTile;
        this._clear();

        const columns: number = Math.ceil(width / this._tile.width);
        const rows: number = Math.ceil(height / this._tile.height);

        const halfWidth: number =  width / 2;
        const halfHeight: number =  height / 2;

        for (let row: number = -3; row <= rows + 3; row++) {
            for (let col: number = -3; col < columns + 3; col++) {
                const positionX: number = col * this._tile.width - halfWidth;
                const positionY: number = row * this._tile.height - halfHeight;

                this._cloneTile(positionX, positionY);
            }
        }
    }

    private _fillDiamondTile(width: number, height: number): void {
        if (this._tile === this._diamondTile) {
            return;
        }

        this._tile = this._diamondTile;
        this._clear();

        const columns: number = Math.ceil(width / this._tile.width);
        const rows: number = Math.ceil(height / this._tile.height);

        const halfWidth: number =  width / 2;
        const halfHeight: number =  height / 2;

        const halfTileWidth: number =  this._tile.width / 2;
        const halfTileHeight: number =  this._tile.height / 2;

        for (let row: number = -3; row <= rows + 3; row++) {
            for (let col: number = -3; col < columns + 3; col++) {
                const positionX: number = col * this._tile.width - halfWidth;
                const positionY: number = row * this._tile.height - halfHeight;

                this._cloneTile(positionX, positionY);
                this._cloneTile(positionX + halfTileWidth, positionY + halfTileHeight);
            }
        }
    }

    private _fillHexagonTile(width: number, height: number): void {
        if (this._tile === this._hexagonTile) {
            return;
        }

        this._tile = this._hexagonTile;
        this._clear();

        const hexWidth: number = this._tile.width * 1.5;

        const columns: number = Math.ceil(width / hexWidth);
        const rows: number = Math.ceil(height / this._tile.height);

        const halfWidth: number =  width / 2;
        const halfHeight: number =  height / 2;

        const tileWidth34: number =  this._tile.width * (3 / 4);
        const halfTileHeight: number =  this._tile.height / 2;

        for (let row: number = -3; row <= rows + 3; row++) {
            for (let col: number = -3; col < columns + 3; col++) {
                const positionX: number = col * hexWidth - halfWidth;
                const positionY: number = row * this._tile.height - halfHeight;

                this._cloneTile(positionX, positionY);
                this._cloneTile(positionX + tileWidth34, positionY + halfTileHeight);
            }
        }
    }
}
