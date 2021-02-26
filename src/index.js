import PageInfo from './modules/page-info';
import Tracker from './modules/tracker';

let pageInfo, tracker;
init();

function init() {
    pageInfo = new PageInfo();
    tracker = new Tracker();
    pageInfo.setCustomIdentifiers();
    initEventListeners();
    
}

function initEventListeners() {
    window.addEventListener('beforeunload', _ => pageInfo.setTime());
    document.addEventListener('mousemove', ev => tracker.trackMouse(ev));
    document.addEventListener('click', ev => tracker.trackClick(ev));
    document.addEventListener('keydown', ev => tracker.trackTabs(ev)); 
}
