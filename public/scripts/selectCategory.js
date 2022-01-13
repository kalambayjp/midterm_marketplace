const getCategoryID = (category) => {
  switch (category) {
    case 'Cellphones':
      return 1;
    case 'Laptops':
      return 2;
    case 'Desktops':
      return 3;
    case 'Tablets':
      return 4;
    case 'TVs':
      return 1;
    case 'Cameras':
      return 1;
    case 'Components':
      return 1;
    default:
      return 8;
  }
}

module.exports = { getCategoryID };
