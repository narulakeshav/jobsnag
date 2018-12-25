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
    icon: string;
  }

  interface Option {
    type: string;
    label: string;
  }

  let linksList: Link[] = [];
  let optionList: Option[] = [];

  /**
   * Sets the links within this scope
   * @param {Link[]} links
   */
  const setLinks = (links: Link[]): void => {
    linksList = links;
  };

  /**
   * Sets the options within the job scope
   * @param {Option[]} options
   */
  const setOptions = (options: Option[]): void => {
    optionList = options;
  }

  /**
   * @private getLinkFor
   * Gets the link for a specific site "type"
   * @param {string} type
   */
  const getLinkFor = (type: string): string => {
    const link = linksList.filter((i: Link) => i.type === type);
    return link.length === 1 ? link[0].link : '';
  };

  /**
   * @private getOptionFor
   * Gets the link for a specific site "type"
   * @param {string} type
   */
  const getOptionFor = (type: string): string => {
    let op = optionList[type];
    op = op.replace(`${type}-`, '');
    op = op.replace('-', ' ');
    return op;
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
  const setLinksConfig = (board: string, type: string, name: string): void => {
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
   * Sets the expected option from the selected
   * dropdown.
   *
   * @param {string} selectedOption: string
   * @param {NodeList} sOption: site's select option
   */
  const setOptionItem = (selectedOption: string, sOption: NodeList) => {
    let i = -1;
    Array.from(sOption).forEach((op: Node) => {
      const index = Array.from(sOption).indexOf(op);
      if (op.textContent) {
        const text = op.textContent.toLowerCase();
        if (text === selectedOption) {
          i = index;
        }

        if (i === -1) {
          if (text.includes(selectedOption)) {
            i = index;
          }
        }
      }
    });

    console.log('__AQI__:', sOption[i]);
    return i;
  };

  const setOptionsConfig = (board: string, type: string, name: string): void => {
    const query = (board === 'lever')
      ? `[name="eeo[${name}]"]`
      : ``;
    const selectDOM: any = document.querySelectorAll(query)[0];
    let option = getOptionFor(type);
    console.log('__TYPE__', type, '__OPTION__:', option);
    if (selectDOM && option) {
      const index = setOptionItem(option, selectDOM.childNodes);
      selectDOM.options[index].selected = 'selected';
      selectDOM.style.background = '#fff7d6';
      selectDOM.style.borderColor = '#f4dc94';
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
      // set config for links
      b.links.map(val => setLinksConfig(board, val.type, val.name));
      // set config for options
      // @ts-ignore
      b.options.map(val => setOptionsConfig(board, val.type, val.name));
    });
  };

  // Return
  return {
    fillApp,
    setLinks,
    setOptions,
  };
})();

// Run content script
chrome.runtime.onMessage.addListener(res => {
  if (res) {
    chrome.storage.sync.get(['links', 'options'], data => {
      console.log(data);
      if (data.links) {
        cs.setLinks(data.links);
      }
      if (data.options) {
        cs.setOptions(data.options);
      }

      if (data.links || data.options) {
        cs.fillApp(res.site);
      }
    });
  }
});
