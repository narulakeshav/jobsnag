/**
 * External Dependencies
 */
import * as React from 'react';

/**
 * Internal Dependencies
 */
import {
  Wrapper,
  TextLabel,
  ConfirmBtn,
  DropdownOption,
} from './styles';

/**
 * Local Variables
 */
interface Data {
  links: Link[]
};

interface Link {
  type: string;
  link: string;
  icon: string;
};

interface iProps {
  addLinkToList: Function;
}

interface iState {
  value: string;
  link: string;
  type: string;
  icon: string;
  showBtn: boolean;
  links: Link[]
};

// Dropdown Options
const DROPDOWN = [
  { type: 'facebook', label: 'Facebook' },
  { type: 'twitter', label: 'Twitter' },
  { type: 'linkedin', label: 'LinkedIn' },
  { type: 'github', label: 'GitHub' },
  { type: 'portfolio', label: 'Portfolio/Blog' },
  { type: 'other', label: 'Other' },
];

/**
 * Input Component
 */
class Input extends React.PureComponent<iProps, iState> {
  state = {
    value: '',
    link: '',
    type: '',
    icon: '',
    showBtn: false,
    links: [],
  };

  /**
   * Sets a default state behavior on mount. This parses
   * the current tab's url and automatically select site's
   * type and update state.
   *
   * @param {Link[]} links: list of links
   */
  private setMountState = (links: Link[]): void => {
    chrome.tabs.query({ active: true }, (tab: Object) => {
      const url = this.formatURL(tab[0].url);
      const link = links.filter((x: Link) => x.link === url);
      if (link.length === 0) {
        this.setState({
          value: 'Add this link as...',
          link: url,
          icon: tab[0].favIconUrl,
          type: this.getSiteType(url, links),
          showBtn: true,
        });
      } else {
        this.setState({
          value: 'This link already exists...',
          showBtn: false,
        });
      }
    });
  }

  /**
   * Grab the current url and focus on it to easily
   * let user add the link.
   */
  public componentDidMount = () => {
    chrome.storage.sync.get(['links'], (data: Data) => {
      this.setState({ links: data.links });
      this.setMountState(data.links);
    });

    this.dataChangeListener();
  }

  /**
   * Event listener triggered when a new item is
   * added to storage
   */
  private dataChangeListener = () => {
    chrome.storage.onChanged.addListener((changes) => {
      this.setState({ links: changes.links.newValue });
      this.setMountState(changes.links.newValue);
    });
  }

  /**
   * Returns true If the select dropdown has options
   * remaining. This is determined by how many of
   * the items from the dropdown already have a link
   * attached to them.
   */
  private dropdownOptions = () => {
    const typeExists = this.state.links.map((x: Link) => x.type);
    const updatedList = DROPDOWN.filter((item) => {
      return typeExists.indexOf(item.type) === -1;
    });

    return {
      exists: updatedList.length > 0,
      list: updatedList
    };
  }

  /**
   * Selects one of the site type options on
   * select option click
   *
   * @param {SyntheticEvent} e
   */
  private onOptionSelect = (e: React.SyntheticEvent<HTMLSelectElement>) => {
    const { value } = e.currentTarget;
    if (value) {
      this.setState({
        type: value
      });
    }
  }

  /**
   * Gets the site type. If it's a social link (either
   * twitter, linkedin, facebook, or github), it is
   * automatically selected. If links already contains
   * "portfolio" link, other is selected. Else, default
   * is portfolio.
   *
   * @param {string} url: page url
   * @param {Link[]} links: list of links
   */
  private getSiteType = (url: string, links: Link[]): string => {
    const portfolioAlreadyAdded = links.filter((x) => x.type === 'portfolio');
    const type = (portfolioAlreadyAdded.length > 0)
      ? 'other'
      : this.getURLType(url);

    switch (type) {
      case 'twitter':
      case 'linkedin':
      case 'facebook':
      case 'github':
        return type;
      case 'other':
        return 'other';
      default:
        return 'portfolio';
    }
  }

  /**
   * Gets the url type. ex: jobs.lever.co => lever
   * @param {string} url: url string
   */
  private getURLType = (url: string) => {
    const link = new URL(url);
    let host = link.hostname.replace('www.', '');
    return host.split('.')[0];
  }

  /**
   * Formats the url string
   * @param {string} url
   */
  private formatURL = (url: string) => {
    const link = new URL(url);
    const host = link.hostname.replace('www.', '');
    return `${link.protocol}//${host}${link.pathname}`;
  }

  /**
   * Adds the website to the list of links
   * stored (using Chrome .storage API)
   */
  private onAddClick = (): void => {
    const { link, type, icon } = this.state;
    const { addLinkToList } = this.props;

    if (this.dropdownOptions().exists) {
      addLinkToList({ type, link, icon });

      // Show "Link was Added"
      this.setState({
        link: '',
        value: 'Link was added!',
        showBtn: false
      });
    }
  }

  /**
   * Renders the dropdown select option if the
   * current site hasn't already been added.
   */
  public renderDropdown = () => {
    if (this.state.showBtn) {
      const dropdown = this.dropdownOptions();
      return (dropdown.exists)
        ?  (
          <DropdownOption onChange={this.onOptionSelect} value={this.state.type}>
            {dropdown.list.map(item => (
              <option key={item.label} value={item.type}>{item.label}</option>
            ))}
          </DropdownOption>
        )
        : <DropdownOption><option>--</option></DropdownOption>
    } else {
      return null;
    }
  }

  /**
   * Renders the "Add" button if the current
   * link hasn't been already added
   */
  public renderBtn = () => (
    (this.state.showBtn)
      ? <ConfirmBtn onClick={this.onAddClick}>Add</ConfirmBtn>
      : ''
  );

  // Render <Input />
  public render() {
    return (
      <Wrapper showBtn={this.state.showBtn} disabled={this.state.link === ''}>
        <TextLabel>{this.state.value}</TextLabel>
        {this.renderDropdown()}
        {this.renderBtn()}
      </Wrapper>
    );
  }
}

// Export
export default Input;
