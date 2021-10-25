import { Application, Graphics } from "pixi.js";

export enum Dimentions {
    CW = 640, // canvas width
    CH = 480, // canvas height
}

const config = {
    width: Dimentions.CW,
    height: Dimentions.CH,
    backgroundAlpha: 0.15,
    antialias: true,
};

export class Scene {
    private _app: Application;

    constructor() {
        this._app = new Application(config);

        this._app.stage.interactive = true;
        this._app.stage.hitArea = this._app.renderer.screen;

        const container = document.querySelector(".scene");
        container?.append(this._app.view);
    }

    get app() {
        return this._app;
    }

    addToScene(objList: Graphics[]) {
        objList.forEach(obj => {
            this._app.stage.addChild(obj);
        });
    }

    removeFromScene(obj: Graphics) {
        this._app.stage.removeChild(obj);
    }

    clearScene() {
        this._app.stage.removeChildren();
    }

    onSceneClick(handler: (e: any) => void) {
        this._app.stage.on("click", handler);
    }

    getCurrentShapes() {
        return this._app.stage.children.length.toString();
    }

    getTotalShapesArea() {
        let totalArea = 0;

        this._app.stage.children.forEach(shape => {
            const shapeBounds = shape.getBounds();
            const shapeArea = shapeBounds.width * shapeBounds.height;
            totalArea += shapeArea;
        });

        return totalArea.toFixed();
    }
}