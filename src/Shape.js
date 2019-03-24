export class Shape {
    static getDiamondGeometry() {
        if (Shape._diamondGeometry) {
            return Shape._diamondGeometry;
        }
        Shape._diamondGeometry = new THREE.BufferGeometry();
        const vertices = new Float32Array([
            0.5, 0, 0,
            0, 0.5, 0,
            -0.5, 0, 0,
            0.5, 0, 0,
            -0.5, 0, 0,
            0, -0.5, 0,
        ]);
        Shape._diamondGeometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
        const uvs = new Float32Array([
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
    static getRectangle(width, height) {
        const points = Shape.scale(Shape._rectangleVertices, width, height);
        const shape = new THREE.Shape(points);
        return new THREE.ShapeGeometry(shape);
    }
    static getRectangleWithChamfer(width, height) {
        const points = Shape.scale(Shape._rectangleChamferVertices, width, height);
        const shape = new THREE.Shape(points);
        return new THREE.ShapeGeometry(shape);
    }
    static getRectangleWithChamferAndHoles(width, height) {
        const points = Shape.scale(Shape._rectangleChamferVertices, width, height);
        const shape = new THREE.Shape(points);
        const holeLeft = new THREE.Path(Shape._holeLeft);
        shape.holes.push(holeLeft);
        const holeRight = new THREE.Path(Shape._holeRight);
        shape.holes.push(holeRight);
        return new THREE.ShapeGeometry(shape);
    }
    static getRectangleWithDoorAndHoles(width, height) {
        const points = Shape.scale(Shape._rectangleDoorVertices, width, height);
        const shape = new THREE.Shape(points);
        const holeLeft = new THREE.Path(Shape._holeLeft);
        shape.holes.push(holeLeft);
        const holeRight = new THREE.Path(Shape._holeRight);
        shape.holes.push(holeRight);
        return new THREE.ShapeGeometry(shape);
    }
    static getRectangleWithHole(width, height) {
        const points = Shape.scale(Shape._rectangleVertices, width, height);
        const shape = new THREE.Shape(points);
        const hole = new THREE.Path(Shape._hole);
        shape.holes.push(hole);
        return new THREE.ShapeGeometry(shape);
    }
    static scale(points, width, height) {
        return points.map((point) => new THREE.Vector2(width / 2, height / 2).multiply(point));
    }
}
// private static _rectangleGeometry: ITHREE.BufferGeometry;
Shape._hole = [
    new THREE.Vector2(-0.5, -0.5),
    new THREE.Vector2(0.5, -0.5),
    new THREE.Vector2(0.5, 0.5),
    new THREE.Vector2(-0.5, 0.5),
];
Shape._holeLeft = [
    new THREE.Vector2(-0.5, -0.5),
    new THREE.Vector2(-1.5, -0.5),
    new THREE.Vector2(-1.5, 0.5),
    new THREE.Vector2(-0.5, 0.5),
];
Shape._holeRight = [
    new THREE.Vector2(0.5, -0.5),
    new THREE.Vector2(1.5, -0.5),
    new THREE.Vector2(1.5, 0.5),
    new THREE.Vector2(0.5, 0.5),
];
Shape._rectangleChamferVertices = [
    new THREE.Vector2(-1, -0.8),
    new THREE.Vector2(-0.8, -1),
    new THREE.Vector2(0.8, -1),
    new THREE.Vector2(1, -0.8),
    new THREE.Vector2(1, 0.8),
    new THREE.Vector2(0.8, 1),
    new THREE.Vector2(-0.8, 1),
    new THREE.Vector2(-1, 0.8),
];
Shape._rectangleDoorVertices = [
    new THREE.Vector2(-1, -1),
    new THREE.Vector2(-0.2, -1),
    new THREE.Vector2(-0.2, 0.5),
    new THREE.Vector2(0.2, 0.5),
    new THREE.Vector2(0.2, -1),
    new THREE.Vector2(1, -1),
    new THREE.Vector2(1, 1),
    new THREE.Vector2(-1, 1),
];
Shape._rectangleVertices = [
    new THREE.Vector2(-1, -1),
    new THREE.Vector2(1, -1),
    new THREE.Vector2(1, 1),
    new THREE.Vector2(-1, 1),
];
