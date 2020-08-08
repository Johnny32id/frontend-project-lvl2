import stylish from './stylish';
import plain from './plain';

const lineBuildingFormat = (format, difference) => {
  switch (format) {
    case ('plain'):
      return plain(difference);
    case ('json'):
      return JSON.stringify(difference);
    default:
      return stylish(difference);
  }
};
export default lineBuildingFormat;
