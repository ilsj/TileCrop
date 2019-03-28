import * as ITHREE from './three-core'; // For THREE JS interfaces
declare const THREE: typeof ITHREE; // For THREE JS (window.THREE)

import { DebugUI } from './DebugUI.js';

/* tslint:disable max-classes-per-file */

abstract class Tile {
    public height: number = 0.1;
    public mesh: ITHREE.Mesh;
    public width: number = 0.1;

    private _material: ITHREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
        // color: 0xFF0000,
        // map: Tile._texture0,
        opacity: 0.5,
        side: THREE.DoubleSide,
        transparent: true,
    });

    private _offset: number = 0.01;

    public constructor(texture: ITHREE.Texture, width: number, height: number) {
        this._material.map = texture;
        this.width = width;
        this.height = height;

        this.mesh = new THREE.Mesh(this._getGeometry(), this._material);
        this.mesh.scale.set(width, height, 1);
        this.mesh.position.z = this._offset;
    }

    public clone(): ITHREE.Mesh {
        return this.mesh.clone();
    }

    public setOpacity(value: string): void {
        this._material.opacity = Number(value) / 100 || 0;
    }

    public setTexture(texture: ITHREE.Texture): void {
        if (this._material.map !== texture) {
            this._material.map = texture;
        }
    }

    protected abstract _getGeometry(): ITHREE.BufferGeometry;
}


export class RectangleTile extends Tile {
    /** @override */
    protected _getGeometry(): ITHREE.BufferGeometry {
        return new THREE.PlaneBufferGeometry(1, 1);
    }
}

export class DiamondTile extends Tile {
    /** @override */
    protected  _getGeometry(): ITHREE.BufferGeometry {
        const vertices = new Float32Array([
            0.5, 0, 0,
            0, 0.5, 0,
            -0.5, 0, 0,

            0.5, 0, 0,
            -0.5, 0, 0,
            0, -0.5, 0,
        ]);

        const uvs = new Float32Array([
            1, 0.5,
            0.5, 1,
            0, 0.5,

            1, 0.5,
            0, 0.5,
            0.5, 0,
        ]);

        const geometry: ITHREE.BufferGeometry = new THREE.BufferGeometry();
        geometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
        geometry.addAttribute('uv', new THREE.BufferAttribute(uvs, 2));

        return geometry;
    }
}


export class HexagonTile extends Tile {
    /** @override */
    protected _getGeometry(): ITHREE.BufferGeometry {
        const hexagonVertices: Float32Array = new Float32Array([
            0.5, 0, 0,
            0.25, 0.5, 0,
            -0.25, 0.5, 0,

            0.5, 0, 0,
            -0.25, 0.5, 0,
            -0.5, 0, 0,

            0.5, 0, 0,
            -0.5, 0, 0,
            -0.25, -0.5, 0,

            0.5, 0, 0,
            -0.25, -0.5, 0,
            0.25, -0.5, 0,
        ]);

        const hexagonUvs: Float32Array = new Float32Array([
            1, 0.5,
            0.75, 1,
            0.25, 1,

            1, 0.5,
            0.25, 1,
            0, 0.5,

            1, 0.5,
            0, 0.5,
            0.25, 0,

            1, 0.5,
            0.25, 0,
            0.75, 0,
        ]);

        const geometry: ITHREE.BufferGeometry = new THREE.BufferGeometry();
        geometry.addAttribute('position', new THREE.BufferAttribute(hexagonVertices, 3));
        geometry.addAttribute('uv', new THREE.BufferAttribute(hexagonUvs, 2));

        return geometry;
    }
}
