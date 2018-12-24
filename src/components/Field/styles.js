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
  grid-template-columns: 20px 1fr 55px 30px;
  grid-gap: 0.75rem;
  align-items: center;
  padding: 6px 1rem;
  margin: 4px 0;
`;

/**
 * Icon
 * @type i
 */
export const Icon = styled.img`
  width: 100%;
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
  border-radius: 50px;
  height: 30px;
  display: flex;
  padding: 0 0.5rem;
  transition: 0.25s all ease-in;
  cursor: pointer;

  span {
    margin: auto;
    color: #666666;
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
  width: 30px;

  i {
    margin: auto;
    color: #f62e60;
    font-size: 14px;
    font-weight: 500;
  }

  &:hover {
    background: #ffccd9;
  }
`;
