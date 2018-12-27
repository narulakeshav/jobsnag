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
  };

  /**
   * Gets the link for a specific site "type"
   * @param {string} type
   */
  const getLinkFor = (type: string): string => {
    const link = linksList.filter((i: Link) => i.type === type);
    return link.length === 1 ? link[0].link : '';
  };

  /**
   * Gets the link for a specific site "type"
   * @param {string} type
   */
  const getOptionFor = (board: string, type: string): string => {
    let op = optionList[type].replace(`${type}-`, '');
    op = op.replace('-', ' ');

    // On greenhouse, change "decline" to "wish" on vet/disability
    if (board === 'greenhouse') {
      if ((type === 'veteran' || type === 'disability') && op === 'decline') {
        return 'wish';
      }
      if (type === 'veteran') {
        if (op !== '' && op !== 'wish' && !op.includes('not')) {
          return 'identify';
        }
      }
    }
    return op;
  };

  /**
   * Gets the selector based on the board and
   * the type.
   *
   * @param {string} board
   * @param {string} type: options || links
   * @param {string} name: race|gender|veteran
   */
  const getSelector = (board: string, type: string, name: string): string => {
    if (board === 'greenhouse') {
      return type === 'links'
        ? `[autocomplete="custom-question-${name}"]`
        : `[name="job_application[${name}]"]`;
    }
    return type === 'links'
      ? `[name="urls[${name}]"]`
      : `[name="eeo[${name}]"]`;
  };

  /**
   * Maps the social site type to input fields on the
   * job boards.
   *
   * @param {string} board
   * @param {string} type
   * @param {string} name
   */
  const setLinksConfig = (board: string, type: string, name: string): void => {
    const selector: string = getSelector(board, 'links', name);
    const input: any = document.querySelectorAll(selector)[0];
    const link: string = getLinkFor(type);

    if (input && link) {
      input.value = link;
      input.style.background = '#fff7d6';
      input.style.borderColor = '#f4dc94';
    }
  };

  /**
   * Filters Select to only return children with <option> tagName
   * @param {NodeList} selectList
   */
  const filterSelectList = (selectList: NodeList): Array<Object> =>
    Array.from(selectList).filter(
      (op: HTMLOptionElement) => op.tagName === 'OPTION', // push only <option>
    );

  /**
   * Sets the expected option from the selected
   * dropdown.
   *
   * @param {string} selectedOption: string
   * @param {NodeList} sOption: site's select option
   */
  const setOptionItem = (
    board: string,
    selectedOption: string,
    sOption: NodeList,
  ): number => {
    const list: Array<Object> = filterSelectList(sOption);
    let i = -1;
    // Find the matching <option> within <select>
    list.map((op: HTMLOptionElement) => {
      if (i === -1) {
        if (op.textContent && op.tagName === 'OPTION') {
          const text = op.textContent.toLowerCase();
          if (text === selectedOption || text.includes(selectedOption)) {
            i = list.indexOf(op); // current index
          }
        }
      }
    });

    return i;
  };

  /**
   * Sets greenhouse configuration to update fields
   *
   * @param {number} id
   * @param {string} type
   * @param {string} option
   * @param {HTMLSelectElement} selectDOM
   * @param {number} index
   */
  const greenhouseConfig = (
    id: number,
    type: string,
    option: string,
    selectDOM: HTMLSelectElement,
    index: number,
  ): void => {
    let i = id;
    const sponsorItem = document.querySelector(
      '#s2id_job_application_answers_attributes_3_boolean_value',
    );
    const educationItem = document.querySelector('#education_section');
    if (sponsorItem) {
      i += 1;
    }
    if (educationItem) {
      i += 3;
    }
    // @ts-ignore
    const field: HTMLSpanElement = document.querySelectorAll('.select2-chosen')[
      i
    ];
    // @ts-ignore
    const parent: HTMLAnchorElement = field.parentNode;
    field.textContent = selectDOM[index].textContent;
    field.style.background = '#fff7d6';
    // Update parent bg
    parent.style.background = '#fff7d6';
    parent.style.borderColor = '#f4dc94';
    // @ts-ignore
    parent.lastChild.style.background = '#fff7d6';

    // Show the "race" list if "no" is selected for hispanic
    if (type === 'hispanic' && option === 'no') {
      // @ts-ignore
      const raceDOM: HTMLDivElement = document.querySelector(
        '#race_dropdown_container',
      );
      raceDOM.style.display = 'block';
    }
  };

  /**
   * Sets the configurations for user's option preference
   *
   * @param {string} board
   * @param {string} type
   * @param {string} name
   * @param {number} id
   */
  const setOptionsConfig = (
    board: string,
    type: string,
    name: string,
    id: number,
  ): void => {
    const selector = getSelector(board, 'options', name);
    const selectDOM: any = document.querySelector(selector);
    const option = getOptionFor(board, type);

    if (selectDOM && option) {
      // get index of option to select in SELECT
      const index = setOptionItem(board, option, selectDOM.childNodes);
      selectDOM.options[index].setAttribute('selected', 'selected');
      selectDOM.style.background = '#fff7d6';
      selectDOM.style.borderColor = '#f4dc94';

      if (board === 'greenhouse') {
        greenhouseConfig(id, type, option, selectDOM, index);
      }
    }
  };

  /**
   * Fill the input fields for the current board
   * @param {string} board
   */
  const fillApp = (board: string): void => {
    const currentBoard = JobBoard.filter(b => b.name === board);
    currentBoard.map(b => {
      b.links.map(val => setLinksConfig(board, val.type, val.name));
      // @ts-ignore
      b.options.map(val => setOptionsConfig(board, val.type, val.name, val.id));
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
      if (data.links) cs.setLinks(data.links);
      if (data.options) cs.setOptions(data.options);
      if (data.links || data.options) cs.fillApp(res.site);
    });
  }
});
