export default class Tracker {
    
    _mouseTracking = [];             // Coordenadas x e y del movimiento del ratón.
    _totalKeyPresses = 0;            // Pulsaciones totales de teclado.
    _totalClicks = 0;                // Clicks totales en el documento.

    _currentMouseMovement = 0;      // Movimiento del ratón antes de interactuar con un elemento.
    _currentTabPresses = 0;         // Pulsaciones de la tecla 'tab' antes de interactuar con un elemento.

    _usedElements = [];             // Elementos sobre los que el usuario interactúa.


    /**
     * Registra el movimiento del ratón.
     * @param {Event} ev Evento registrado.
     */
    trackMouse(ev) {
        this._currentMouseMovement++;
        this._mouseTracking.push({x: ev.x, y: ev.y});
    }

    /**
     * Registra las pulsaciones de teclado. Se guardan las pulsaciones de tabulador
     * antes de poner el foco en un elemento de formulario en el que el usuario
     * escribe o puede seleccionar mediante la barra espaciadora (radiobuttons, checkboxes).
     * @param {Event} ev Evento registrado.
     */
    trackKeys(ev) {
        
        /* Tabulación */
        if (ev.keyCode === 9) {
            this._currentTabPresses++;
        
        /* Números, letras y espacios */
        } else if ((ev.keyCode >= 48 && ev.keyCode <= 57) || 
                    (ev.keyCode >= 96 && ev.keyCode <= 105) ||
                    (ev.keyCode >= 65 && ev.keyCode <= 90) ||
                    ev.keyCode === 32) {
            this._usedElements.push({
                trackedElement: ev.target?.dataset?.uxa,
                element: ev.target,
                mouseMovementBefore: null,
                tabPressesBefore: this._currentTabPresses
            });
        }
        this._currentMouseMovement = 0;
        this._currentTabPresses = 0;
    }

    trackClick(ev) {
        this._usedElements.push({
            trackedElement: ev.target?.dataset?.uxa,
            element: ev.target,
            mouseMovementBefore: this._currentMouseMovement,
            tabPressesBefore: null
        });
        this._currentMouseMovement = 0;
        this._currentTabPresses = 0;
    }
}