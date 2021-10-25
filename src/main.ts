import { Generator } from "./controller/Generator";
import { Shapes } from "./model/Shapes";
import { UI } from "./view/UI";

const main = () => {
    const model = new Shapes();
    const view = new UI();
    const controller = new Generator(model, view);
    
    controller.run();
}

window.onload = main;