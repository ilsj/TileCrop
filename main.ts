import * as ITHREE from './src/three-core'; // For THREE JS interfaces
declare const THREE: typeof ITHREE; // For THREE JS (window.THREE)

import { DebugUI } from './src/DebugUI.js';
import { Shape } from './src/Shape.js';
import { Surface } from './src/Surface.js';
import { View } from './src/View.js';

DebugUI.create();

const div: HTMLElement = document.getElementById('container');
const view: View = new View(div, 3, true);

const surface: Surface = new Surface(4, 2);
view.add(surface.group);

view.startAnimation();

DebugUI.addButton('Shape 0', () => surface.changeShape(Shape.getRectangle(4, 2)));
DebugUI.addButton('Shape 1', () => surface.changeShape(Shape.getRectangleWithHole(4, 2)));
DebugUI.addButton('Shape 2', () => surface.changeShape(Shape.getRectangleWithChamfer(4, 2)));
DebugUI.addButton('Shape 3', () => surface.changeShape(Shape.getRectangleWithDoorAndHoles(4, 2)));
DebugUI.addButton('Shape 4', () => surface.changeShape(Shape.getRectangleWithChamferAndHoles(4, 2)));
DebugUI.addDivider();
