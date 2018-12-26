/**
 * @name options.tsx
 * @desc Renders a list of selectable options about
 * Veteran Status, Disability, Gender, Race, etc.
 *
 * External Dependencies
 */
import * as React from 'react';

/**
 * Internal Dependencies
 */
import {
  OptionsWrapper,
  OptionsToggle,
  ToggleBtn,
  ToggleTitle,
  ToggleSubtitle,
  OptionsCollapsable,
  FormGroup,
  Label,
  BtnWrapper,
  SelectBtn,
  SelectOption,
} from './styles';

/**
 * Local Variables
 */
const RACE = [
  { value: 'race-indian', label: 'American Indian/Alaska Native' },
  { value: 'race-asian', label: 'Asian' },
  { value: 'race-black', label: 'Black/African American' },
  { value: 'race-hispanic', label: 'Hispanic/Latino' },
  { value: 'race-white', label: 'White' },
  { value: 'race-islander', label: 'Native Hawaiian/Pacific Islander' },
  { value: 'race-more', label: '2+ Races' },
  { value: 'race-identify', label: 'Decline' },
];

const INFO = {
  gender: [
    { value: 'gender-male', label: 'Male' },
    { value: 'gender-female', label: 'Female' },
    { value: 'gender-decline', label: 'Decline' },
  ],
  veteran: [
    { value: 'veteran-am-a', label: 'Yes' },
    { value: 'veteran-am-not', label: 'No' },
    { value: 'veteran-decline', label: 'Decline' },
  ],
  disability: [
    { value: 'disability-yes', label: 'Yes' },
    { value: 'disability-no', label: 'No' },
    { value: 'disability-decline', label: 'Decline' },
  ],
  hispanic: [
    { value: 'hispanic-yes', label: 'Yes' },
    { value: 'hispanic-no', label: 'No' }
  ],
};

interface BtnItem {
  value: string;
  label: string;
}

interface iState {
  disability: string;
  gender: string;
  veteran: string;
  race: string;
  hispanic: string;
  showOptions: boolean,
};

/**
 * Options Component
 */
class Options extends React.Component<{}, iState> {
  public state: iState = {
    disability: '',
    gender: '',
    veteran: '',
    race: '',
    hispanic: '',
    showOptions: false,
  };

  /**
   * Get the list of options on mount
   */
  public componentDidMount = () => {
    chrome.storage.sync.get(['options'], (data) => {
      if (data.options) {
        const { disability, gender, veteran, race, hispanic } = data.options;
        this.setState({
          disability,
          gender,
          veteran,
          race,
          hispanic
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
      if (changes.options) {
        const { disability, gender, veteran, race, hispanic } = changes.options.newValue;
        this.setState({
          disability,
          gender,
          veteran,
          race,
          hispanic
        });
      }
    });
  }

  /**
   * Toggles the options view
   */
  private toggleOptionView = () => {
    this.setState((prevState: iState) => ({
      showOptions: !prevState.showOptions
    }));
  }

  /**
   * Selects the selected button option item
   * @param {SyntheticEvent} e
   */
  private onSelectBtnClick = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    const key: string = e.currentTarget.getAttribute('data-for') || '';
    const value = e.currentTarget.getAttribute('data-item');
    if (value) {
      // @ts-ignore
      this.setState({
        [key]: value
      }, () => {
        chrome.storage.sync.set({ options: this.state });
      });
    }
  }

  /**
   * Sets the race option on dropdown change
   * @param {SyntheticEvent} e
   */
  private onDropdownChange = (e: React.SyntheticEvent<HTMLSelectElement>): void => {
    const { value } = e.currentTarget;
    if (value) {
      this.setState({
        race: value
      }, () => {
        chrome.storage.sync.set({ options: this.state });
      });
    }
  }

  /**
   * Renders a btn group which contains a list of button
   * option for a specific question.
   *
   * @param {BtnItem[]} btnList
   * @param {string} btnFor
   */
  private renderBtnGroup = (btnList: BtnItem[], btnFor: string) => (
    // @ts-ignore
    <BtnWrapper split={"1fr ".repeat(btnList.length)}>
      {btnList.map((btn) => (
        <SelectBtn
          key={btn.value}
          data-for={btnFor}
          data-item={btn.value}
          value={this.state[btnFor]}
          selected={this.state[btnFor] === btn.value}
          onClick={this.onSelectBtnClick}
        >
          {btn.label}
        </SelectBtn>
      ))}
    </BtnWrapper>
  )

  /**
   * Renders race dropdown option
   */
  private renderRaceDropdown = () => (
    <SelectOption value={this.state.race} onChange={this.onDropdownChange}>
      {RACE.map((op) => (
        <option key={op.value} value={op.value}>{op.label}</option>
      ))}
    </SelectOption>
  );

  /**
   * Renders the collapsable
   */
  private renderCollapsable = () => (
    // @ts-ignore
    <OptionsCollapsable show={this.state.showOptions}>
      <FormGroup>
        <Label>Gender</Label>
        {this.renderBtnGroup(INFO.gender, 'gender')}
      </FormGroup>
      <FormGroup>
        <Label>Hispanic</Label>
        {this.renderBtnGroup(INFO.hispanic, 'hispanic')}
      </FormGroup>
      <FormGroup>
        <Label>Race</Label>
        {this.renderRaceDropdown()}
      </FormGroup>
      <FormGroup>
        <Label>Veteran</Label>
        {this.renderBtnGroup(INFO.veteran, 'veteran')}
      </FormGroup>
      <FormGroup>
        <Label>Disable</Label>
        {this.renderBtnGroup(INFO.disability, 'disability')}
      </FormGroup>
    </OptionsCollapsable>
  );

  // Render <Options />
  render() {
    return (
      <OptionsWrapper>
        <OptionsToggle>
          <div>
            <ToggleTitle>Options</ToggleTitle>
            <ToggleSubtitle>Options for race, disability, etc.</ToggleSubtitle>
          </div>
          <ToggleBtn onClick={this.toggleOptionView}>
            {(this.state.showOptions) ? 'Hide' : 'Show'}
          </ToggleBtn>
        </OptionsToggle>
        {this.renderCollapsable()}
      </OptionsWrapper>
    );
  }
}

// Export
export default Options;
