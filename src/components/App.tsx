/**
 * External Dependencies
 */
import * as React from 'react';

/**
 * Internal Dependencies
 */
import AddSite from './AddSite';
import List from './List';
import Field from './Field';
import Empty from './Empty';

/**
 * Interfaces
 */
interface Link {
  type: string;
  link: string;
};

// State
interface iState {
  links: Link[]
};

/**
 * App Component
 * Contains the list of social links
 */
class App extends React.Component<{}, iState> {
  // State
  public state: iState = {
    links: []
  };

  /**
   * Gets the links for chrome storage and sets it
   * as state on mount
   */
  public componentDidMount = () => {
    chrome.storage.sync.get(['links'], (data) => {
      if (data.links) {
        this.setState({
          links: data.links
        });
      }
    });
    this.dataChangeListener();
  }

  /**
   * Event listener triggered when a new item is
   * added to storage
   */
  private dataChangeListener = () => {
    chrome.storage.onChanged.addListener((changes) => {
      this.setState({
        links: changes.links.newValue
      });
    });
  }

  /**
   * Adds a link to the list
   * @param {Link} link
   */
  public addLinkToList = (link: Link) => {
    const { links } = this.state;
    const hasLink = links.filter((x) => x.link === link.link);
    if (hasLink.length === 0) {
      links.push(link);
      chrome.storage.sync.set({ links }, () => {
        this.setState({ links });
      });
    }
  }

  /**
   * Removes the link from list
   * @param {Link} link
   */
  public removeLink = (link: Link) => {
    const { links } = this.state;
    const updatedList = links.filter((item) => item.link !== link.link);
    chrome.storage.sync.set({ links: updatedList }, () => {
      this.setState({ links: updatedList });
    });
  }

  /**
   * Renders a list of all links
   */
  private renderList = () => {
    const { links } = this.state;
    if (links.length > 0) {
      return links.map((social) => (
        <Field
          key={social.type}
          type={social.type}
          link={social.link}
          removeLink={this.removeLink}
        />
      ));
    }

    return <Empty />;
  }

  // Render <App />
  public render() {
    return (
      <div>
        <AddSite addLinkToList={this.addLinkToList} />
        <List>
          {this.renderList()}
        </List>
      </div>
    )
  }
};

// Export
export default App;
