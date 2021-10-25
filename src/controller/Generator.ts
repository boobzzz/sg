import { Shapes } from "../model/Shapes";
import { UI } from "../view/UI";
import { InfoPanel } from "../components/InfoPanel";
import { Dimentions, Scene } from "../components/Scene";

export class Generator {
    private _info: InfoPanel;
    private _scene: Scene;
    private _shapes: Shapes;

    constructor(shapes: Shapes, ui: UI) {
        // shapes
        this._shapes = shapes;

        // info panel
        this._info = ui.info;

        // scene
        this._scene = ui.scene;

        this._scene.onSceneClick((e) => {
            const { x, y } = e.data.global;
            const shape = this._shapes.generateShape(x, y);
            
            this._shapes.generatedShapes.push(shape);
        });

        // controls
        const controls = ui.controls;
        
        const refreshControlsUI = () => {
            controls.refreshUI(
                this._shapes.shapesPerSec.toString(),
                this._shapes.gravity.toString()
            );
        }
                
        controls.decreaseItems(() => {
            this._shapes.shapesPerSec--;
            refreshControlsUI();
        });
        controls.increaseItems(() => {
            this._shapes.shapesPerSec++;
            refreshControlsUI();
        });
        controls.decreaseGravity(() => {
            this._shapes.gravity--;
            refreshControlsUI();
        });
        controls.increaseGravity(() => {
            this._shapes.gravity++;
            refreshControlsUI();
        });
    }

    private update(shouldGenerate: boolean) {
        const shapesPerSec = this._shapes.shapesPerSec;
        const generatedShapes = this._shapes.generatedShapes;

        this._info.refreshUI(
            this._scene.getCurrentShapes(),
            this._scene.getTotalShapesArea()
        );

        if (shapesPerSec > 0 && shouldGenerate) {
            this._shapes.onGenerated();
            this._scene.addToScene(generatedShapes);
        }

        if (generatedShapes.length > 0) {
            this._scene.addToScene(generatedShapes);
        }

        generatedShapes.forEach(shape => {
            const x = shape.x;
            const y = shape.y + this._shapes.gravity;
            
            // shapes falling down, with the gravity value taken into account
            shape.setTransform(x, y);

            // remove shapes, that get outside the visible area
            if (y > Dimentions.CH + 150) {
                this._scene.removeFromScene(shape);
                generatedShapes.splice(generatedShapes.indexOf(shape), 1);
            }
        });
    }

    run() {
        const ticker = this._scene.app.ticker;
        const FPS = Math.round(ticker.FPS);

        let sec = 0;
        let shouldGenerate = false;

        ticker.add((delta) => {
            sec += delta;
            shouldGenerate = Math.floor(sec) % FPS === 0 ? true : false;
            this.update(shouldGenerate);
        });
    }
}