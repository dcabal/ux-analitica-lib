export const mapData = (pageInfo, trackedData) => {
    return {
        token: pageInfo.uxaToken,
        timeTotal: pageInfo.time,
        path: pageInfo.currentPath,
        html: pageInfo.currentHtml,
        screenSize: pageInfo.screenSize,
        totalClicks: trackedData.totalClicks,
        totalKeyStrokes: trackedData.totalKeyPresses,
        mouseMovements: trackedData.mouseTracking,
        interactions: trackedData.usedElements
    }
}