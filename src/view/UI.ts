import { Controls } from "../components/Controls";
import { InfoPanel } from "../components/InfoPanel";
import { Scene } from "../components/Scene";

export class UI {
    private _info: InfoPanel;
    private _scene: Scene;
    private _controls: Controls;

    constructor() {
        this._info = new InfoPanel();
        this._scene = new Scene();
        this._controls = new Controls();
    }

    get info() {
        return this._info;
    }

    get scene() {
        return this._scene;
    }

    get controls() {
        return this._controls;
    }
}