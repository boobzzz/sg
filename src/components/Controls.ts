export class Controls {
    private _decrItemsBtn;
    private _incrItemsBtn;
    private _decrGravityBtn;
    private _incrGravityBtn;
    private _itemsValueInput;
    private _gravityValueInput;

    constructor() {
        this._decrItemsBtn = document.querySelector("#decr-items");
        this._incrItemsBtn = document.querySelector("#incr-items");
        this._decrGravityBtn = document.querySelector("#decr-gravity");
        this._incrGravityBtn = document.querySelector("#incr-gravity");
        this._itemsValueInput = document.querySelector(".ctrl-items input");
        this._gravityValueInput = document.querySelector(".ctrl-gravity input");

        this.refreshUI("0", "1");
    }

    get decrItemsBtn() {
        return this._decrItemsBtn;
    }

    get incrItemsBtn() {
        return this._incrItemsBtn;
    }

    get decrGravityBtn() {
        return this._decrGravityBtn;
    }

    get incrGravityBtn() {
        return this._incrGravityBtn;
    }

    private toggleDisableBtn(condition: boolean, btn: Element | null) {
        if (condition) {
            btn?.setAttribute("disabled", "true");
        } else {
            btn?.removeAttribute("disabled");
        }
    }

    refreshUI(items: string, gravity: string) {
        this._itemsValueInput?.setAttribute("value", items);
        this._gravityValueInput?.setAttribute("value", gravity);

        this.toggleDisableBtn(items === "0", this._decrItemsBtn);
        this.toggleDisableBtn(items === "10", this._incrItemsBtn);
        this.toggleDisableBtn(gravity === "1", this._decrGravityBtn);
        this.toggleDisableBtn(gravity === "10", this._incrGravityBtn);
    }

    decreaseItems(handler: () => void) {
        this._decrItemsBtn?.addEventListener("click", handler);
    }

    increaseItems(handler: () => void) {
        this._incrItemsBtn?.addEventListener("click", handler);
    }

    decreaseGravity(handler: () => void) {
        this._decrGravityBtn?.addEventListener("click", handler);
    }

    increaseGravity(handler: () => void) {
        this._incrGravityBtn?.addEventListener("click", handler);
    }
}