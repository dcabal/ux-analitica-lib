import PageInfo from './modules/page-info';
import Tracker from './modules/tracker';
import ApiService from './modules/api-service';
import { OWNER, USER_DATA } from './constants/api';
import { mapData } from './util/util';

let pageInfo, tracker;
init();


async function init() {
    const valid = await checkUxaToken();
    if (valid) {
        pageInfo = new PageInfo();
        tracker = new Tracker();
        pageInfo.setCustomIdentifiers();
        initEventListeners();
    }
}

async function checkUxaToken() {
    const token = document.currentScript.dataset?.uxa;
    const host = window.location.host;
    return await ApiService.get(OWNER, { token, host });
}

function initEventListeners() {
    window.addEventListener('unload', async _ => {
        pageInfo.setTime();
        await ApiService.post(USER_DATA, mapData(pageInfo.getPageInfo(), tracker.getTrackedData()));
    });
    document.addEventListener('mousemove', ev => tracker.trackMouse(ev));
    document.addEventListener('click', ev => tracker.trackClick(ev));
    document.addEventListener('keydown', ev => tracker.trackTabs(ev));
}
