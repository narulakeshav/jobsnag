/**
 * External Dependencies
 */
import styled from 'styled-components';

/**
 * Item
 * @type li
 */
export const Item = styled.li`
  display: grid;
  grid-template-columns: 25px 1fr 30px 30px;
  grid-gap: 0.75rem;
  align-items: stretch;
  padding: 6px 1rem;
  margin: 4px 0;
`;

/**
 * Icon
 * @type i
 */
export const Icon = styled.i`
  display: flex;
  background: ${props =>
    props.type === 'twitter'
      ? '#1EA1F1'
      : props.type === 'linkedin'
      ? '#0177B5'
      : props.type === 'github'
      ? '#222222'
      : props.type === 'facebook'
      ? '#4268B2'
      : props.type === 'blog'
      ? '#00D18D'
      : '#714BF9'};
  width: 25px;
  height: 25px;
  border-radius: 40px;

  i {
    margin: auto;
    font-size: 14px;
    color: #ffffff;
  }
`;

/**
 * SocialLink
 * @type a
 */
export const SocialLink = styled.a`
  text-decoration: none;
  font-weight: 400;
  font-size 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 250px;
`;

/**
 * CopyBtn
 * @type button
 */
export const CopyBtn = styled.button`
  background: #f5f6fa;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  transition: 0.25s all ease-in;
  cursor: pointer;

  i {
    margin: auto;
    color: #222222;
    font-size: 14px;
    font-weight: 700;
  }

  &:hover {
    background: #e9eaf2;
  }
`;

/**
 * DeleteBtn
 * @type CopyBtn
 */
export const DeleteBtn = styled(CopyBtn)`
  background: #ffe3ea;
  i {
    color: #f62e60;
    font-weight: 500;
  }

  &:hover {
    background: #ffccd9;
  }
`;
