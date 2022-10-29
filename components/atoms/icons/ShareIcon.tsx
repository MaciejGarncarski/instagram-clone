import { IconType } from 'react-icons';
import { BiShare } from 'react-icons/bi';

export const ShareIcon: IconType = ({ ...props }) => {
  return <BiShare {...props} style={{ transform: 'scaleX(-1)' }} />;
};
