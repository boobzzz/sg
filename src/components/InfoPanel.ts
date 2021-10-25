export class InfoPanel {
    private _totalItems;
    private _areaOccupied;

    constructor() {
        this._totalItems = document.querySelector("#current-shapes");
        this._areaOccupied = document.querySelector("#occupied-area");

        this.refreshUI("0", "0");
    }

    refreshUI(items: string, area: string) {
        this._totalItems!.textContent = items;
        this._areaOccupied!.textContent = `${area} px^2`;
    }
}