import stylish from './stylish';
import plain from './plain';

const lineBuildingFormat = (format, differrence) => {
  let formater;
  switch (format) {
    case ('plain'):
      formater = plain;
      break;
    default:
      formater = stylish;
  }
  return formater(differrence);
};
export default lineBuildingFormat;