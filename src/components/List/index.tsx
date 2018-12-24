/**
 * External Dependencies
 */
import * as React from 'react';

/**
 * Internal Dependencies
 */
import { ListWrapper } from './styles';

/**
 * Local Variables
 */
interface iProps {
  children: any;
}

/**
 * List wrapper that contains a list of
 * social field item
 * @param props
 */
const List = (props: iProps) => (
  <ListWrapper>
    {props.children}
  </ListWrapper>
);

// Export
export default List;
