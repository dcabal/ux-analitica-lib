import { clickableInputs, selectableInputs, writableInputs } from '../constants/input-types';
import * as TAG from '../constants/tags';
import { DATA_ATTR } from '../constants/data-attributes';

export default class PageInfo {
   
    _domElements = {
        clickable: [],
        selectable: [],
        writable: []
    };                          // Array con los elementos interactivos del DOM.

    _uxaToken = null;           // Token del usuario.
    _currentPath = null;        // Path de la página actual.
    _currentHtml = null;        // Html completo de la página.
    _screenSize = null;         // Resolución de pantalla.
    _time = 0;                  // Tiempo de permanencia en la página.

    constructor() {
        this._time = Date.now();
        this._uxaToken = document.currentScript.getAttribute('uxa');
        this._currentPath = window.location.pathname;
        this._currentHtml = document.getElementsByTagName('body')[0].innerHTML;
        this._screenSize = { width: window.innerWidth, height: window.innerHeight };
    }
    
    /**
     * Obtiene los elementos interactivos del DOM para posteriormente inyectar
     * identificadores únicos mediante el parámetro definido en DATA_ATTR.
     */
    setCustomIdentifiers() {
        this._getInteractiveElements();
        this._tagElements();
    }

    /**
     * Calcula el tiempo total que el usuario permanece en la página.
     */
    setTime() {
        this._time = Date.now() - this._time;
    }

    /**
     * Obtiene los elementos interactivos del DOM.
     */
    _getInteractiveElements() {
        this._domElements = this._classifyInteractiveElements({
            buttons: document.getElementsByTagName('button'),
            links: document.getElementsByTagName('a'),
            selects: document.getElementsByTagName('select'),
            textareas: document.getElementsByTagName('textarea'),
            inputs: document.getElementsByTagName('input')
        });
    }

    /**
     * Clasifica los elementos recopilados del DOM en clickables, seleccionables o escribibles.
     * 
     * @param {Object} elements Elementos del DOM clasificados por etiquetas.
     * @returns {Object} clickable, selectable, writable.
     */
    _classifyInteractiveElements(elements) {
        let { clickable, selectable, writable } = this._domElements;
        const inputs = this._classifyInputs(elements.inputs);

        clickable = [...clickable, ...elements.buttons, ...elements.links, ...inputs.clickable];
        selectable = [...selectable, ...elements.selects, ...inputs.selectable];
        writable = [...writable, ...elements.textareas, ...inputs.writable];

        return { clickable, selectable, writable };
    }

    /**
     * Clasifica los inputs según su finalidad.
     * @see dom-enums.js
     * @param {Object[]} inputs Array con los inputs recogidos del DOM.
     * @returns {Object} clickable, selectable, writable.
     */
    _classifyInputs(inputs) {
        let clickable = [], selectable = [], writable = [];

        for (const input of inputs) {
            if (Object.values(clickableInputs).includes(input.type))
                clickable.push(input);
            else if (Object.values(selectableInputs).includes(input.type))
                selectable.push(input);
            else if (Object.values(writableInputs).includes(input.type))
                writable.push(input);
        }

        return { clickable, selectable, writable };
    }

    /**
     * Asigna un valor identificativo a cada elemento seleccionado del DOM
     * en función de su categoría.
     */
    _tagElements() {
        const cnt = {       // Contadores de coincidencias.
            BUTTON: 0,
            A: 0,
            SELECT: 0,
            OPTION: 0,
            TEXTAREA: 0,
            INPUT: {
                SUBMIT: 0,
                BUTTON: 0,
                RESET: 0,
                IMAGE: 0,
                FILE: 0,
                RADIO: 0,
                CHECKBOX: 0,
                TEXT: 0
            }
        };

        for (const [key, val] of Object.entries(this._domElements)) {
            const prefix = TAG[String(key).toUpperCase()];

            for (const element of val) {
                const tagName = element.tagName.toUpperCase();
                const tag = TAG[tagName];

                if (tagName === 'INPUT') {
                    const inputType = element.type.toUpperCase();
                    const inputTypeTag = TAG.INPUT_TYPE[inputType];
                    const inputIdentifier = `${prefix}_${tag}_${inputTypeTag}_${inputTypeTag === 'tx' ? ++cnt.INPUT.TEXT : ++cnt.INPUT[inputType]}`;
                    element.setAttribute(DATA_ATTR, inputIdentifier);
                } else {
                    const identifier = `${prefix}_${tag}_${++cnt[tagName]}`;
                    element.setAttribute(DATA_ATTR, identifier);

                    if (tagName === 'SELECT') {
                        let childTagName;

                        for (const child of element.children) {
                            childTagName = child.tagName.toUpperCase();
                            const childIdentifier = `${prefix}_${tag}_${cnt[tagName]}_${TAG[childTagName]}_${++cnt[childTagName]}`;
                            child.setAttribute(DATA_ATTR, childIdentifier);
                        }
                        cnt[childTagName] = 0;
                    }
                }
            }
        }
    }
}