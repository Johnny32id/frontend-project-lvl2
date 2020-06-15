import stylish from './stylish';
import plain from './plain';
import json from './json';

const lineBuildingFormat = (format, differrence) => {
  let formater;
  switch (format) {
    case ('plain'):
      formater = plain;
      break;
    case ('json'):
      formater = json;
      break;
    default:
      formater = stylish;
  }
  return formater(differrence);
};
export default lineBuildingFormat;
