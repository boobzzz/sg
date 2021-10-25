import { Graphics, Point } from "pixi.js";

import { randomize } from "../utils/utils";
import { Dimentions } from "../components/Scene";

export class Shapes {
    private _shapesPerSec: number;
    private _gravity: number;
    private _generatedShapes: Graphics[];
    private _shapes;

    constructor() {
        this._shapesPerSec = 0;
        this._gravity = 1;
        this._generatedShapes = [];

        const circle = new Circle();
        const elipse = new Elipse();
        const triangle = new Triangle();
        const rectangle = new Rectangle();
        const pentagon = new Pentagon();
        const hexagon = new Hexagon();

        this._shapes = [circle, elipse, triangle, rectangle, pentagon, hexagon];
    }

    get shapesPerSec() {
        return this._shapesPerSec;
    }

    set shapesPerSec(value: number) {
        this._shapesPerSec = value;
    }
    
    get gravity() {
        return this._gravity;
    }

    set gravity(value: number) {
        this._gravity = value;
    }

    get generatedShapes() {
        return this._generatedShapes;
    }

    private getRandomColor() {
        const hex = "0123456789abcdef";
        let color = "0x";

        for (let i = 0; i < 6; i++) {
            color += hex[randomize(hex.length)];
        }

        return parseInt(color);
    }

    private getRandomShape() {
        return this._shapes[randomize(this._shapes.length)];
    }

    private removeShapeHandler(shape: Graphics, color: number) {
        const generatedShapes = this._generatedShapes;
        
        generatedShapes.forEach(gs => {
            if (gs.name === shape.name) {
                gs.tint = color;
            }
        });
        generatedShapes.splice(generatedShapes.indexOf(shape), 1);
        shape.destroy();
    }

    generateShape(x?: number, y?: number) {
        const _x = x ? x : randomize(Dimentions.CW - 50);
        const _y = y ? y : -100;
        const color = this.getRandomColor();
        const shape = this.getRandomShape();

        const generated = shape.generate(_x, _y, color);
        generated.interactive = true;
        generated.on("click", (e) => {
            e.stopPropagation();
            this.removeShapeHandler(generated, color);
        });

        return generated;
    }

    onGenerated() {
        if (this._shapesPerSec === 0) return;

        for (let i = 0; i < this._shapesPerSec; i++) {
            const generated = this.generateShape();

            this._generatedShapes.push(generated);
        }
    }
}


interface Shape {
    generate: (x: number, y: number, color: number) => Graphics;
}

class Circle implements Shape {
    generate(x: number, y: number, color: number) {
        const circle = new Graphics();

        circle.name = "circle";
        circle
            .beginFill(color)
            .drawCircle(x, y, 50)
            .endFill();

        return circle;
    }
}

class Elipse implements Shape {
    generate(x: number, y: number, color: number) {
        const elipse = new Graphics();

        elipse.name = "elipse";
        elipse
            .beginFill(color)
            .drawEllipse(x, y, 75, 50)
            .endFill();

        return elipse;
    }
}

class Triangle implements Shape {
    generate(x: number, y: number, color: number) {
        const triangle = new Graphics();
        const triangleWidth = 100;
        const triangleHeight = (Math.sqrt(3) / 2) * triangleWidth;
        const triangleParams = [
            new Point(0, 0),
            new Point(triangleWidth, 0),
            new Point(triangleWidth / 2, triangleHeight)
        ];

        triangle.name = "triangle";
        triangle
            .beginFill(color)
            .drawPolygon(triangleParams)
            .setTransform(x, y)
            .endFill();

        return triangle;
    }
}

class Rectangle implements Shape {
    generate(x: number, y: number, color: number) {
        const rectangle = new Graphics();
        const rectWidth = 100;
        const recrHeight = rectWidth;
        
        rectangle.name = "rectangle";
        rectangle
            .beginFill(color)
            .drawRect(x, y, rectWidth, recrHeight)
            .endFill();

        return rectangle;
    }
}

class Pentagon implements Shape {
    generate(x: number, y: number, color: number) {
        const pentagon = new Graphics();
        const pentaWidth = 80;
        const pentaParams = [
            new Point(0, 0),
            new Point(pentaWidth, 0),
            new Point(pentaWidth + pentaWidth / 2, pentaWidth / 2),
            new Point(pentaWidth, pentaWidth),
            new Point(0, pentaWidth)
        ];

        pentagon.name = "pentagon";
        pentagon
            .beginFill(color)
            .drawPolygon(pentaParams)
            .setTransform(x, y)
            .endFill();

        return pentagon;
    }
}

class Hexagon implements Shape {
    generate(x: number, y: number, color: number) {
        const hexagon = new Graphics();
        const hexRadius = 60;
        const hexHeight = hexRadius * Math.sqrt(3);

        hexagon.name = "hexagon";
        hexagon
            .beginFill(color)
            .drawPolygon([
                new Point(-hexRadius, 0),
                new Point(-hexRadius / 2, hexHeight / 2),
                new Point(hexRadius / 2, hexHeight / 2),
                new Point(hexRadius, 0),
                new Point(hexRadius / 2, -hexHeight / 2),
                new Point(-hexRadius / 2, -hexHeight / 2),
            ])
            .setTransform(x, y)
            .endFill();

        return hexagon;
    }
}