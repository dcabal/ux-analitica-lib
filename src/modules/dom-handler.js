import { clickableInputs, selectableInputs, writableInputs } from '../constants/input-types';
import * as TAG from '../constants/tags';
import { DATA_ATTR } from '../constants/data-attributes';

export default class DomHandler {
   
    domElements = {
        clickable: [],
        selectable: [],
        writable: []
    };               // Array con los elementos interactivos del DOM.
    
    /**
     * Obtiene los elementos interactivos del DOM para posteriormente inyectar
     * identificadores únicos mediante el parámetro definido en DATA_ATTR.
     */
    setCustomIdentifiers() {
        this._getInteractiveElements();
        this._tagElements();
    }

    /**
     * Obtiene los elementos interactivos del DOM.
     */
    _getInteractiveElements() {
        const buttons = document.getElementsByTagName('button');
        const links = document.getElementsByTagName('a');
        const selects = document.getElementsByTagName('select');
        const textareas = document.getElementsByTagName('textarea');
        const inputs = document.getElementsByTagName('input');

        const interactiveElements = { buttons, links, selects, textareas, inputs };
        this.domElements = this._classifyInteractiveElements(interactiveElements);
    }

    /**
     * Clasifica los elementos recopilados del DOM en clickables, seleccionables o escribibles.
     * 
     * @param {Object} elements Elementos del DOM clasificados por etiquetas.
     * @returns {Object} clickable, selectable, writable.
     */
    _classifyInteractiveElements(elements) {
        let { clickable, selectable, writable } = this.domElements;
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

        for (const [key, val] of Object.entries(this.domElements)) {
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