/**
 * External Dependencies
 */
import * as React from 'react';

/**
 * Internal Dependencies
 */
import { InputItem } from './styles';

/**
 * Local Variables
 */
interface Link {
  type: string;
  link: string;
};

// Props
interface iProps {
  list: Link[];
  addLinkToList: Function;
}

// State
interface iState {
  value: string;
  placeholder: string;
};

/**
 * Input Component
 */
class Input extends React.PureComponent<iProps, iState> {
  // State
  public state: iState = {
    value: '',
    placeholder: 'Add a link'
  };

  // Ref
  inputItem: HTMLInputElement;

  /**
   * Grab the current url and focus on it to easily
   * let user add the link.
   * @TODO: allow for "blog" (website/portfolio alias)
   */
  public componentDidMount = () => {
    chrome.tabs.query({ active: true }, (tab: Object) => {
      const hasLink = this.props.list.filter((x) => x.link === tab[0].url);
      if (hasLink.length === 0) {
        this.setState({
          value: tab[0].url
        }, () => {
          this.inputItem.focus();
          this.inputItem.select();
        });
      } else {
        this.setState({
          placeholder: 'This link already exists...'
        });
      }
    });
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
   * Map component state to input value. If user presses
   * enter, then add link to list
   * @param {SyntheticEvent} e
   */
  private onInputChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    // @ts-ignore-start
    if (e.key === 'Enter') {
    // @ts-ignore-end
      const serializedLink: Link = {
        type: this.getURLType(value),
        link: this.formatURL(value)
      };
      this.props.addLinkToList(serializedLink);
      this.inputItem.blur();
      this.setState({ value: '' });
    } else {
      this.setState({ value });
    }
  }

  // Render <Input />
  public render() {
    return (
      <InputItem
        innerRef={(item: HTMLInputElement) => this.inputItem = item}
        type="text"
        value={this.state.value}
        placeholder={this.state.placeholder}
        onKeyUp={this.onInputChange}
        onChange={this.onInputChange}
      />
    )
  }
}

// Export
export default Input;
