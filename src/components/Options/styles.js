/**
 * External Dependencies
 */
import styled from 'styled-components';

/**
 * OptionsWrapper
 * @type section
 */
export const OptionsWrapper = styled.section`
  border-top: 1px solid #eeeeee;
  padding: 0;
`;

/**
 * OptionsToggle
 * @type div
 */
export const OptionsToggle = styled.div`
  padding: 6px 2rem 6px 1rem;
  display: grid;
  grid-template-columns: 1fr 20px;
  grid-gap: 1rem;
`;

/**
 * ToggleTitle
 * @type h3
 */
export const ToggleTitle = styled.h3`
  font-weight: 700;
  font-size: 16px;
  color: #222222;
`;

/**
 * ToggleSubtitle
 * @type p
 */
export const ToggleSubtitle = styled.p`
  font-weight: 500;
  font-size: 12px;
  color: #888888;
  line-height: 100%;
`;

/**
 * ToggleBtn
 * @type button
 */
export const ToggleBtn = styled.button`
  float: right;
  color: #999;
  font-size: 12px;
  font-weight: 700;
  background: none;
  padding: 6px 0 0;
  cursor: pointer;
  transition: 0.15s all ease-in;

  &:hover {
    color: #666;
  }
`;

/**
 * OptionsCollapsable
 * @type div
 */
export const OptionsCollapsable = styled.div`
  padding: 1rem;
  display: ${props => (props.show ? 'grid' : 'none')};
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
`;

/**
 * FormGroup
 * @type div
 */
export const FormGroup = styled.div`
  padding: 2px 0 4px;
`;

/**
 * Label
 * @type label
 */
export const Label = styled.label`
  font-weight: 16px;
  font-weight: 600;
  color: #888888;
  display: block;
`;

export const BtnWrapper = styled.div`
  display: grid;
  grid-template-columns: ${props => (props.split ? props.split : '1fr 1fr')};
  border-radius: 40px;
  margin-top: 2px;
`;

/**
 * SelectBtn
 * @type button
 */
export const SelectBtn = styled.button`
  display: block;
  background: ${props => (props.selected ? '#ff9f00' : '#f2f4fa')};
  border-radius: 40px;
  margin: 0 2px;
  color: ${props => (props.selected ? 'white' : '#222222')};
  font-size: 12px;
  font-weight: 700;
  padding: 4px 0.75rem;
  transition: 0.15s all ease-in;
  cursor: pointer;

  &:hover {
    background: ${props => (props.selected ? '#ffb53b' : '#e9eaeb')};
  }
`;

/**
 * SelectOption
 * @type select
 */
export const SelectOption = styled.select`
  background: #f2f4fa;
  border-radius: 40px;
  margin: 0;
  color: #222222;
  font-size: 12px;
  font-weight: 700;
  padding: 4px 0.75rem;
`;
