/**
 * External Dependencies
 */
import styled from 'styled-components';

/**
 * EmptyContainer
 * @type div
 */
export const EmptyContainer = styled.div`
  margin: 0 auto;
  padding: 1rem 0;
  text-align: center;

  &:before {
    content: '';
    background: url(${props => props.icon}) bottom right/100% no-repeat;
    display: block;
    position: absolute;
    top: 3rem;
    left: 17rem;
    width: 123px;
    height: 94px;
  }
`;

/**
 * SVG
 * @type img
 */
export const SVG = styled.img`
  width: 75px;
  height: 75px;
  margin: 0 auto 1rem;
`;

/**
 * Message
 * @type p
 */
export const Message = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #afb3c5;
  text-align: center;
`;
