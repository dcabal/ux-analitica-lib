class Tracker {
    
    mouseTracking = [];             // Coordenadas x e y del movimiento del ratón.
    totalKeyPresses = 0;            // Pulsaciones totales de teclado.
    totalClicks = 0;                // Clicks totales en el documento.

    currentMouseMovement = 0;       // Movimiento del ratón antes de interactuar con un elemento.
    currentTabPresses = 0;          // Pulsaciones de la tecla 'tab' antes de interactuar con un elemento.

    usedElements = [];              // Elementos sobre los que el usuario interactúa.
    currentTrackedElement = null;   // Elemento sobre el que se está interacturando.


    /**
     * Registra el movimiento del ratón.
     * @param {Event} ev Evento registrado.
     */
    trackMouse(ev) {
        this.currentMouseMovement++;
        this.mouseTracking.push({x: ev.x, y: ev.y});
    }

    /**
     * Registra las pulsaciones de teclado. Se guardan las pulsaciones de tabulador
     * antes de poner el foco en un elemento de formulario en el que el usuario
     * escribe o puede seleccionar mediante la barra espaciadora (radiobuttons, checkboxes).
     * @param {Event} ev Evento registrado.
     */
    trackKeys(ev) {
        this.totalKeyPresses++;
        
        /* Tabulación */
        if (ev.keyCode === 9) {
            this.currentTabPresses++;
        
        /* Números, letras y espacios */
        } else if ((ev.keyCode >= 48 && ev.keyCode <= 57) || 
                    (ev.keyCode >= 96 && ev.keyCode <= 105) ||
                    (ev.keyCode >= 65 && ev.keyCode <= 90) ||
                    ev.keyCode === 32) {
            if (this.currentTrackedElement !== ev.target?.dataset?.uxa) {
                this.currentTrackedElement = ev.target?.dataset?.uxa;
                this.usedElements.push({
                    trackedElement: ev.target?.dataset?.uxa,
                    html: ev.target?.outerHTML,
                    mouseMovementBefore: 0,
                    tabPressesBefore: this.currentTabPresses
                });
                this.currentMouseMovement = 0;
                this.currentTabPresses = 0;
            }
        }
    }

    /**
     * Registra los clicks del usuario. Se guardan el movimiento del ratón del 
     * usuario antes de hacer click en un elemento. 
     * @param {Event} ev Evento capturado.
     */
    trackClick(ev) {
        this.usedElements.push({
            trackedElement: ev.target?.dataset?.uxa,
            html: ev.target?.outerHTML,
            mouseMovementBefore: this.currentMouseMovement,
            tabPressesBefore: 0
        });
        this.totalClicks++;
        this.currentMouseMovement = 0;
        this.currentTabPresses = 0;
    }

    /**
     * Devuelve los datos de uso registrados.
     */
    getTrackedData() {
        return {
            mouseTracking: this.mouseTracking,
            totalKeyPresses: this.totalKeyPresses,
            totalClicks: this.totalClicks,
            usedElements: this.usedElements
        }
    }
}

let tracker;
export default tracker = new Tracker();