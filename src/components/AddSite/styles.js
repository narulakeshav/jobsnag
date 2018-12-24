/**
 * External Dependencies
 */
import styled from 'styled-components';

/**
 * Wrapper
 * @type div
 */
export const Wrapper = styled.div`
  border-bottom: 1px solid #eeeeee;
  background: #f5f6fa;
  height: 55px;
  display: grid;
  grid-template-columns: ${props => (props.showBtn ? '1fr 150px 60px' : '1fr')};
  grid-gap: 1rem;
  align-items: center;
  padding: 6px 1rem;
  width: 100%;
  pointer-events: ${props => (props.disabled ? 'none' : 'auto')};
  opacity: ${props => (props.disabled ? '0.6' : '1')};
`;

/**
 * TextLabel
 * @type p
 */
export const TextLabel = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #222222;
`;

/**
 * DropdownOption
 * @type select
 */
export const DropdownOption = styled.select`
  background: #ffffff;
  border-radius: 40px;
  border: 2px solid #e9eaf2;
  height: 32px;
  padding: 4px 1rem;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;

/**
 * ConfirmBtn
 * @type button
 */
export const ConfirmBtn = styled.button`
  height: 30px;
  padding: 4px 12px;
  background: #ff9f00;
  border-radius: 40px;
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
  opacity: 0.75;
  cursor: pointer;
  transition: 0.15s all ease-in;

  &:hover {
    opacity: 1;
  }
`;
