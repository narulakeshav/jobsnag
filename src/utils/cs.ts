/**
 * Internal Dependencies
 */
import JobBoard from './boards';

/**
 * @name cs.ts
 * @desc cs or content script that runs within the context
 * of the DOM and auto-fills fields on the job applications
 * including LinkedIn, Twitter, GitHub, etc.
 */
const cs = (function() {
  // Interface
  interface Link {
    type: string;
    link: string;
  }

  let linksList: Link[] = [];

  /**
   * Sets the links within this scope
   * @param {Link[]} links
   */
  const setLinks = (links: Link[]): void => {
    linksList = links;
  };

  /**
   * @private getLinksFor
   * Gets the link for a specific site "type"
   * @param {string} type
   */
  const getLinkFor = (type: string): string => {
    const link = linksList.filter((i: Link) => i.type === type);
    return link.length === 1 ? link[0].link : '';
  };

  /**
   * @private setConfig
   * Maps the social site type to input fields on the
   * job boards.
   *
   * @param {string} board
   * @param {string} type
   * @param {string} name
   */
  const setConfig = (board: string, type: string, name: string): void => {
    const query = (board === 'greenhouse')
      ? `[autocomplete="custom-question-${name}"]`
      : `[name="urls[${name}]"]`;

    const link = getLinkFor(type);
    const input: any = document.querySelectorAll(query)[0];
    if (input && link) {
      input.value = link;
      input.style.background = '#fff7d6';
      input.style.borderColor = '#f4dc94';
    }
  }

  /**
   * @private fillApp
   * Fill the input fields for the current board
   * @param {string} board
   */
  const fillApp = (board: string) => {
    const currentBoard = JobBoard.filter((b) => b.name === board);
    currentBoard.map((b) => {
      b.links.map((val) => setConfig(board, val.type, val.name));
    });
  };

  // Return
  return {
    fillApp,
    setLinks,
  };
})();

// Run content script
chrome.runtime.onMessage.addListener(res => {
  if (res) {
    chrome.storage.sync.get(['links'], data => {
      cs.setLinks(data.links);
      cs.fillApp(res.site);
    });
  }
});
