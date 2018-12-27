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
const List = (props: iProps) => {
  const { children } = props;
  return <ListWrapper>{children}</ListWrapper>;
};

// Export
export default List;
