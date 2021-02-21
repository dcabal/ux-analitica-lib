/* Tipos de elementos según su uso */
export const CLICKABLE = 'c';
export const SELECTABLE = 's';
export const WRITABLE = 'w';

/* Elementos por etiqueta y tipo */
export const BUTTON = 'btn';
export const A = 'lnk';
export const SELECT = 'slc';
export const OPTION = 'opt';
export const TEXTAREA = 'txt';
export const INPUT = 'ipt';
export const INPUT_TYPE = Object.freeze({
    SUBMIT: 'sm',
    BUTTON: 'bt',
    RESET: 'rs',
    IMAGE: 'im',
    FILE: 'fl',
    RADIO: 'rd',
    CHECKBOX: 'ck',
    TEXT: 'tx',
    NUMBER: 'tx',
    EMAIL: 'tx',
    SEARCH: 'tx',
    TEL: 'tx',
    URL: 'tx',
    PASSWORD: 'tx'
});