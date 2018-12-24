/**
 * @name background.ts
 * @desc runs in the background and triggers the
 * content script if the user is on either
 * of the urls (job boards).
 */
const bg = (function () {
  const url = [
    { hostSuffix: 'jobs.lever.co' },
    { hostSuffix: 'boards.greenhouse.io' }
  ];

  /**
   * @private isFillingApp
   * Returns true if a user is applying to app.
   * Also returns the site/board
   *
   * @param {string} url
   */
  const isFillingApp = (url: string): Object => {
    // Greenhouse
    if (url.includes('boards.greenhouse.io')) {
      return {
        isApp: url.endsWith('#app'),
        type: 'greenhouse'
      };
    }

    // Lever
    if (url.includes('jobs.lever.co')) {
      return {
        isApp: url.endsWith('apply'),
        type: 'lever'
      };
    }
    return false;
  };

  // Return run() as a public method on background
  return {
    isFilling: isFillingApp,
    url
  };
})();

/**
 * @function chromeHandler
 * When a new page is being navigated to,
 * add a listener on the sites that match the
 * urls (hostSuffix).
 */
chrome.webNavigation.onCompleted.addListener(() => {
  chrome.tabs.query({ active: true }, tabs => {
    if (tabs.length > 0) {
      const tab: any = tabs[0];
      const site: any = bg.isFilling(tab.url);
      if (site.isApp) {
        chrome.tabs.sendMessage(tab.id, { site: site.type });
      }
    }
  });
}, {
  url: bg.url
});
