import * as ITHREE from './three-core'; // For THREE JS interfaces
declare const THREE: typeof ITHREE; // For THREE JS (window.THREE)

export class Shape {
    public static getDiamondGeometry(): ITHREE.BufferGeometry {
        if (Shape._diamondGeometry) {
            return Shape._diamondGeometry;
        }

        Shape._diamondGeometry = new THREE.BufferGeometry();
        const vertices: Float32Array = new Float32Array([
            0.5, 0, 0,
            0, 0.5, 0,
            -0.5, 0, 0,

            0.5, 0, 0,
            -0.5, 0, 0,
            0, -0.5, 0,
        ]);
        Shape._diamondGeometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));

        const uvs: Float32Array = new Float32Array([
            1, 0.5,
            0.5, 1,
            0, 0.5,

            1, 0.5,
            0, 0.5,
            0.5, 0,
        ]);
        Shape._diamondGeometry.addAttribute('uv', new THREE.BufferAttribute(uvs, 2));

        return Shape._diamondGeometry;
    }

    // public static getRectangleGeometry(): ITHREE.BufferGeometry {
    //     if (Shape._rectangleGeometry) {
    //         return Shape._rectangleGeometry;
    //     }

    //     Shape._rectangleGeometry = new THREE.BufferGeometry();
    //     const vertices: Float32Array = new Float32Array([
    //         1, 0, 0,
    //         0, 1, 0,
    //         -1, 0, 0,

    //         1, 0, 0,
    //         -1, 0, 0,
    //         0, -1, 0,
    //     ]);
    //     Shape._rectangleGeometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));

    //     const uvs: Float32Array = new Float32Array([
    //         1, 1,
    //         1, 1,
    //         0, 1,

    //         1, 1,
    //         0, 1,
    //         1, 0,
    //     ]);
    //     Shape._rectangleGeometry.addAttribute('uv', new THREE.BufferAttribute(uvs, 2));

    //     return Shape._rectangleGeometry;
    // }

    public static getRectangle(width: number, height: number): ITHREE.ShapeGeometry {
        const points: ITHREE.Vector2[] = Shape.scale(Shape._rectangleVertices, width, height);
        const shape: ITHREE.Shape = new THREE.Shape(points);

        return new THREE.ShapeGeometry(shape);
    }

    public static getRectangleWithChamfer(width: number, height: number): ITHREE.ShapeGeometry {
        const points: ITHREE.Vector2[] = Shape.scale(Shape._rectangleChamferVertices, width, height);
        const shape: ITHREE.Shape = new THREE.Shape(points);

        return new THREE.ShapeGeometry(shape);
    }

    public static getRectangleWithChamferAndHoles(width: number, height: number): ITHREE.ShapeGeometry {
        const points: ITHREE.Vector2[] = Shape.scale(Shape._rectangleChamferVertices, width, height);
        const shape: ITHREE.Shape = new THREE.Shape(points);

        const holeLeft: ITHREE.Path = new THREE.Path(Shape._holeLeft);
        shape.holes.push(holeLeft);

        const holeRight: ITHREE.Path = new THREE.Path(Shape._holeRight);
        shape.holes.push(holeRight);

        return new THREE.ShapeGeometry(shape);
    }

    public static getRectangleWithDoorAndHoles(width: number, height: number): ITHREE.ShapeGeometry {
        const points: ITHREE.Vector2[] = Shape.scale(Shape._rectangleDoorVertices, width, height);
        const shape: ITHREE.Shape = new THREE.Shape(points);

        const holeLeft: ITHREE.Path = new THREE.Path(Shape._holeLeft);
        shape.holes.push(holeLeft);

        const holeRight: ITHREE.Path = new THREE.Path(Shape._holeRight);
        shape.holes.push(holeRight);

        return new THREE.ShapeGeometry(shape);
    }

    public static getRectangleWithHole(width: number, height: number): ITHREE.ShapeGeometry {
        const points: ITHREE.Vector2[] = Shape.scale(Shape._rectangleVertices, width, height);
        const shape: ITHREE.Shape = new THREE.Shape(points);

        const hole: ITHREE.Path = new THREE.Path(Shape._hole);
        shape.holes.push(hole);

        return new THREE.ShapeGeometry(shape);
    }

    public static scale(points: ITHREE.Vector2[], width: number, height: number): ITHREE.Vector2[] {
        return points.map((point: ITHREE.Vector2) =>
            new THREE.Vector2(width / 2, height / 2).multiply(point));
    }

    private static _diamondGeometry: ITHREE.BufferGeometry;
    // private static _rectangleGeometry: ITHREE.BufferGeometry;

    private static _hole: ITHREE.Vector2[] = [
        new THREE.Vector2(-0.5, -0.5),
        new THREE.Vector2(0.5, -0.5),
        new THREE.Vector2(0.5, 0.5),
        new THREE.Vector2(-0.5, 0.5),
    ];

    private static _holeLeft: ITHREE.Vector2[] = [
        new THREE.Vector2(-0.5, -0.5),
        new THREE.Vector2(-1.5, -0.5),
        new THREE.Vector2(-1.5, 0.5),
        new THREE.Vector2(-0.5, 0.5),
    ];

    private static _holeRight: ITHREE.Vector2[] = [
        new THREE.Vector2(0.5, -0.5),
        new THREE.Vector2(1.5, -0.5),
        new THREE.Vector2(1.5, 0.5),
        new THREE.Vector2(0.5, 0.5),
    ];

    private static _rectangleChamferVertices: ITHREE.Vector2[] = [
        new THREE.Vector2(-1, -0.8),
        new THREE.Vector2(-0.8, -1),
        new THREE.Vector2(0.8, -1),
        new THREE.Vector2(1, -0.8),
        new THREE.Vector2(1, 0.8),
        new THREE.Vector2(0.8, 1),
        new THREE.Vector2(-0.8, 1),
        new THREE.Vector2(-1, 0.8),
    ];

    private static _rectangleDoorVertices: ITHREE.Vector2[] = [
        new THREE.Vector2(-1, -1),

        new THREE.Vector2(-0.2, -1),
        new THREE.Vector2(-0.2, 0.5),
        new THREE.Vector2(0.2, 0.5),
        new THREE.Vector2(0.2, -1),

        new THREE.Vector2(1, -1),
        new THREE.Vector2(1, 1),
        new THREE.Vector2(-1, 1),
    ];

    private static _rectangleVertices: ITHREE.Vector2[] = [
        new THREE.Vector2(-1, -1),
        new THREE.Vector2(1, -1),
        new THREE.Vector2(1, 1),
        new THREE.Vector2(-1, 1),
    ];
}
