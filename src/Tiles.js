import { DebugUI } from './DebugUI.js';
import { DiamondTile, HexagonTile, RectangleTile } from './Tile.js';
export class Tiles {
    constructor(width, height, surfaceGeometry) {
        this.group = new THREE.Group();
        this._rectangleTile = new RectangleTile(Tiles._texture0, 0.2, 0.2);
        this._diamondTile = new DiamondTile(Tiles._texture0, 0.15, 0.3);
        this._hexagonTile = new HexagonTile(Tiles._texture0, 0.2, 0.2 * 0.866);
        surfaceGeometry.computeBoundingBox();
        this._surfaceBoundingBox = surfaceGeometry.boundingBox;
        this._fillRectangleTile(width, height);
        // This only for understanding the task
        DebugUI.addLabel('Tiles opacity');
        DebugUI.addRange(50, (value) => this._tile.setOpacity(value));
        DebugUI.addButton('Rectangle Tile', () => this._fillRectangleTile(width, height));
        DebugUI.addButton('Diamond Tile', () => this._fillDiamondTile(width, height));
        DebugUI.addButton('Hexagon Tile', () => this._fillHexagonTile(width, height));
        DebugUI.addDivider();
        DebugUI.addButton('Texture 0', () => this._tile.setTexture(Tiles._texture0));
        DebugUI.addButton('Texture 1', () => this._tile.setTexture(Tiles._texture1));
        DebugUI.addButton('Texture 2', () => this._tile.setTexture(Tiles._texture2));
        DebugUI.addButton('Texture 3', () => this._tile.setTexture(Tiles._texture3));
        DebugUI.addButton('Texture 4', () => this._tile.setTexture(Tiles._texture4));
        DebugUI.addDivider();
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
    _clear() {
        for (let i = this.group.children.length - 1; i >= 0; i -= 1) {
            this.group.remove(this.group.children[i]);
        }
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
    _fillRectangleTile(width, height) {
        if (this._tile === this._rectangleTile) {
            return;
        }
        this._tile = this._rectangleTile;
        this._clear();
        const columns = Math.ceil(width / this._tile.width);
        const rows = Math.ceil(height / this._tile.height);
        const halfWidth = width / 2;
        const halfHeight = height / 2;
        for (let row = -3; row <= rows + 3; row++) {
            for (let col = -3; col < columns + 3; col++) {
                const positionX = col * this._tile.width - halfWidth;
                const positionY = row * this._tile.height - halfHeight;
                this._cloneTile(positionX, positionY);
            }
        }
    }
    _fillDiamondTile(width, height) {
        if (this._tile === this._diamondTile) {
            return;
        }
        this._tile = this._diamondTile;
        this._clear();
        const columns = Math.ceil(width / this._tile.width);
        const rows = Math.ceil(height / this._tile.height);
        const halfWidth = width / 2;
        const halfHeight = height / 2;
        const halfTileWidth = this._tile.width / 2;
        const halfTileHeight = this._tile.height / 2;
        for (let row = -3; row <= rows + 3; row++) {
            for (let col = -3; col < columns + 3; col++) {
                const positionX = col * this._tile.width - halfWidth;
                const positionY = row * this._tile.height - halfHeight;
                this._cloneTile(positionX, positionY);
                this._cloneTile(positionX + halfTileWidth, positionY + halfTileHeight);
            }
        }
    }
    _fillHexagonTile(width, height) {
        if (this._tile === this._hexagonTile) {
            return;
        }
        this._tile = this._hexagonTile;
        this._clear();
        const hexWidth = this._tile.width * 1.5;
        const columns = Math.ceil(width / hexWidth);
        const rows = Math.ceil(height / this._tile.height);
        const halfWidth = width / 2;
        const halfHeight = height / 2;
        const tileWidth34 = this._tile.width * (3 / 4);
        const halfTileHeight = this._tile.height / 2;
        for (let row = -3; row <= rows + 3; row++) {
            for (let col = -3; col < columns + 3; col++) {
                const positionX = col * hexWidth - halfWidth;
                const positionY = row * this._tile.height - halfHeight;
                this._cloneTile(positionX, positionY);
                this._cloneTile(positionX + tileWidth34, positionY + halfTileHeight);
            }
        }
    }
}
Tiles._loader = new THREE.TextureLoader();
Tiles._texture0 = Tiles._loader.load('texture/0.jpg');
Tiles._texture1 = Tiles._loader.load('texture/1.jpg');
Tiles._texture2 = Tiles._loader.load('texture/2.jpg');
Tiles._texture3 = Tiles._loader.load('texture/3.jpg');
Tiles._texture4 = Tiles._loader.load('texture/4.jpg');
