import stylish from './stylish';

const lineBuildingFormat = (format, differrence) => {
  let formater;
  switch (format) {
    default:
      formater = stylish;
  }
  return formater(differrence);
};
export default lineBuildingFormat;
