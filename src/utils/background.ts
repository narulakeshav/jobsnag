/**
 * Returns true if a user is applying to app.
 * Also returns the site/board
 *
 * @param {string} url
 */
const isFillingApp = (url: string): Object => {
  if (url.includes('boards.greenhouse.io')) {
    return { isApp: url.endsWith('#app'), type: 'greenhouse' };
  }
  if (url.includes('jobs.lever.co')) {
    return { isApp: url.endsWith('apply'), type: 'lever' };
  }
  return false;
};

/**
 * Chrome webNavigation.
 * When a new page is being navigated to,
 * add a listener on the sites that match the
 * urls (hostSuffix).
 */
chrome.webNavigation.onCompleted.addListener(
  () => {
    chrome.tabs.query({ active: true }, tabs => {
      if (tabs.length > 0) {
        const tab: any = tabs[0];
        const site: any = isFillingApp(tab.url);
        if (site.isApp) {
          chrome.tabs.sendMessage(tab.id, { site: site.type });
        }
      }
    });
  },
  {
    url: [
      { hostSuffix: 'jobs.lever.co' },
      { hostSuffix: 'boards.greenhouse.io' },
    ],
  },
);
