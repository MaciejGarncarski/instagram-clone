import { IconType } from 'react-icons';
import { BiComment } from 'react-icons/bi';

export const CommentIcon: IconType = ({ ...props }) => {
  return <BiComment {...props} style={{ transform: 'scaleX(-1)' }} />;
};
