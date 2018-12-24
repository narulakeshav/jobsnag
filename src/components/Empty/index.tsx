/**
 * External Dependencies
 */
import * as React from 'react';

/**
 * Internal Dependencies
 */
import { EmptyContainer, SVG, Message } from './styles';
// @ts-ignore
import Icon from '../../../public/blocks.svg';
// @ts-ignore
import AddIcon from '../../../public/add.png';

/**
 * Empty Component
 * Is rendered if there are no links
 */
const Empty = () => (
  // @ts-ignore
  <EmptyContainer icon={AddIcon}>
    <SVG
      src={Icon}
      alt="Nothing here"
    />
    <Message>Adds links to see them here...</Message>
  </EmptyContainer>
);

// Export
export default Empty;
