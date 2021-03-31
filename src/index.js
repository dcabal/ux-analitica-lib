import pageInfo from './modules/page-info';
import tracker from './modules/tracker';
import ApiService from './modules/api-service';
import { SITE, USER_DATA } from './constants/api';
import { mapData } from './util/util';

init();

function init() {
    const token = document.currentScript.dataset?.uxa;

    checkUxaToken(token)
    .then(_ => {
        pageInfo.setup(token);
        pageInfo.setCustomIdentifiers();
        initEventListeners();
    })
    .catch(error => console.error(error));
}

function checkUxaToken(token) {
    const host = window.location.host;
    return ApiService.get(SITE, { token, host });
}

function initEventListeners() {
    window.addEventListener('unload', ev => {
        ev.preventDefault();
        pageInfo.setTime();
        ApiService.post(USER_DATA, JSON.stringify(mapData(pageInfo.getPageInfo(), tracker.getTrackedData())));
    });
    document.addEventListener('mousemove', ev => tracker.trackMouse(ev));
    document.addEventListener('click', ev => tracker.trackClick(ev));
    document.addEventListener('keydown', ev => tracker.trackKeys(ev));
}
