/**
 * @TODO: Refactor by using a design pattern.
 * Either prototypal or module pattern
 */

interface Link {
  type: string;
  link: string;
}

/**
 * Gets the link for a specific site "type"
 *
 * @param {string} type
 * @param {Link[]} links
 */
const getLinkFor = (type: string, links: Link[]): string => {
  const items = links.filter(x => x.type === type);
  return items.length === 1 ? items[0].link : '';
};

/**
 * Finds the inputs and set their values for Lever
 * Job Board
 *
 * @param {string} type
 * @param {string} name
 * @param {Link[]} links
 */
const setWithLever = (type: string, name: string, links: Link[]) => {
  const link = getLinkFor(type, links);
  const query = `[name="urls[${name}]"]`;
  const input: any = document.querySelectorAll(query)[0];
  if (input && link) {
    input.value = link;
    input.style.background = '#FFE470';
    input.style.borderColor = '#FDBF00';
  }
};

/**
 * Finds the inputs and set their values for Lever
 * Job Board
 *
 * @param {string} type
 * @param {string} name
 * @param {Link[]} links
 */
const setWithGreenhouse = (type: string, name: string, links: Link[]) => {
  const link = getLinkFor(type, links);
  const query = `[autocomplete="custom-question-${name}"]`;
  const input: any = document.querySelectorAll(query)[0];
  if (input && link) {
    input.value = link;
    input.style.background = '#FFE470';
    input.style.borderColor = '#FDBF00';
  }
};

/**
 * Fill the input fields for these site types
 * @param {string} board
 * @param {Link[]} links
 */
const fillApp = (board: string, links: Link[]) => {
  if (board === 'lever') {
    setWithLever('linkedin', 'LinkedIn', links);
    setWithLever('twitter', 'Twitter', links);
    setWithLever('github', 'GitHub', links);
    setWithLever('portfolio', 'Portfolio', links);
    setWithLever('other', 'Other', links);
  } else if (board === 'greenhouse') {
    setWithGreenhouse('linkedin', 'linkedin-profile', links);
    setWithGreenhouse('narulakeshav', 'website', links);
  }
};

/**
 * Add a listener which is triggered by the background
 * script.
 */
chrome.runtime.onMessage.addListener(res => {
  if (res) {
    chrome.storage.sync.get(['links'], data => {
      fillApp(res.site, data.links);
    });
  }
});
