/* tslint:disable max-classes-per-file */
class Tile {
    constructor(texture, width, height) {
        this.height = 0.1;
        this.width = 0.1;
        this._material = new THREE.MeshBasicMaterial({
            // color: 0xFF0000,
            // map: Tile._texture0,
            opacity: 0.5,
            side: THREE.DoubleSide,
            transparent: true,
        });
        this._offset = 0.01;
        this._material.map = texture;
        this.width = width;
        this.height = height;
        this.mesh = new THREE.Mesh(this._getGeometry(), this._material);
        this.mesh.scale.set(width, height, 1);
        this.mesh.position.z = this._offset;
    }
    clone() {
        return this.mesh.clone();
    }
    setOpacity(value) {
        this._material.opacity = Number(value) / 100 || 0;
    }
    setTexture(texture) {
        if (this._material.map !== texture) {
            this._material.map = texture;
        }
    }
}
export class RectangleTile extends Tile {
    /** @override */
    _getGeometry() {
        return new THREE.PlaneBufferGeometry(1, 1);
    }
}
export class DiamondTile extends Tile {
    /** @override */
    _getGeometry() {
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
        const geometry = new THREE.BufferGeometry();
        geometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
        geometry.addAttribute('uv', new THREE.BufferAttribute(uvs, 2));
        return geometry;
    }
}
export class HexagonTile extends Tile {
    /** @override */
    _getGeometry() {
        const hexagonVertices = new Float32Array([
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
        const hexagonUvs = new Float32Array([
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
        const geometry = new THREE.BufferGeometry();
        geometry.addAttribute('position', new THREE.BufferAttribute(hexagonVertices, 3));
        geometry.addAttribute('uv', new THREE.BufferAttribute(hexagonUvs, 2));
        return geometry;
    }
}
