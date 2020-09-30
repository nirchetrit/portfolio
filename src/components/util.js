const removeFromArray = (array, obj) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === obj) {
      array.splice(i, 1);
    }
  }
};

module.exports = {
  removeFromArray,
};
