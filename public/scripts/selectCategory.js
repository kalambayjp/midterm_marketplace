const getCategoryID = (category) => {
  category = req.body.category;
  switch (category) {
    case 'cellphones':
      return 1;
    break;
    default:
      return 2;
  }
}

module.exports = { getCategoryID };
