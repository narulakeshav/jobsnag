/**
 * External Dependencies
 */
import * as React from 'react';
// @ts-ignore-start
import { CopyToClipboard } from 'react-copy-to-clipboard';
// @ts-ignore-end

/**
 * Internal Dependencies
 */
import { Item, Icon, SocialLink, CopyBtn, DeleteBtn } from './styles';

/**
 * Local Variables
 */
interface iProps {
  type: string;
  link: string;
  removeLink: Function;
};

/**
 * Generates the icon for the site type
 * @param {sting } icon
 */
const genIcon = (icon: string) => {
  switch (icon) {
    case 'twitter':
    case 'linkedin':
    case 'github':
    case 'facebook':
      return `fa fa-${icon}`;
    default:
      return 'fa fa-link';
  }
};

/**
 * Field item that contains social link
 * @param props
 */
const Field = (props: iProps) => (
  <Item>
    <Icon {...props}>
      <i className={genIcon(props.type)} />
    </Icon>
    <SocialLink href={props.link} target="_blank">{props.link}</SocialLink>
    <CopyToClipboard text={props.link}>
      <CopyBtn><i className="fa fa-clone" /></CopyBtn>
    </CopyToClipboard>
    <DeleteBtn onClick={() => props.removeLink({
      type: props.type,
      link: props.link
    })}><i className="fa fa-trash" /></DeleteBtn>
  </Item>
);

// Export
export default Field;
