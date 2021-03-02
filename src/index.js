import PageInfo from './modules/page-info';
import Tracker from './modules/tracker';
import ApiService from './modules/api-service';
import { OWNER, USER_DATA } from './constants/api';
import { mapData } from './util/util';

let pageInfo, tracker;
init();


function init() {
    const token = document.currentScript.dataset?.uxa;

    checkUxaToken(token)
    .then(_ => {
        pageInfo = new PageInfo();
        tracker = new Tracker(token);
        pageInfo.setCustomIdentifiers();
        initEventListeners();
    })
    .catch(error => console.error(error?.error));
}

function checkUxaToken(token) {
    const host = window.location.host;
    return ApiService.get(OWNER, { token, host });
}

function initEventListeners() {
    // window.addEventListener('unload', async _ => {
    //     pageInfo.setTime();
    //     await ApiService.post(USER_DATA, mapData(pageInfo.getPageInfo(), tracker.getTrackedData()));
    // });
    document.addEventListener('mousemove', ev => tracker.trackMouse(ev));
    document.addEventListener('click', ev => tracker.trackClick(ev));
    document.addEventListener('keydown', ev => tracker.trackKeys(ev));
    const links = document.getElementsByTagName('button');
    for (const link of links) {
        link.addEventListener('click', ev => {
            pageInfo.setTime();
            ApiService.post(USER_DATA, JSON.stringify(mapData(pageInfo.getPageInfo(), tracker.getTrackedData())))
        })
    }
}
