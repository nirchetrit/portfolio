const removeFromArray = (array, obj) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === obj) {
      array.splice(i, 1);
    }
  }
};
const swapElemsByIndex = (arr, i, j) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};
const timeOut = async (ms) => {
  return new Promise((r) => setTimeout(r, ms));
};

module.exports = {
  removeFromArray,
  swapElemsByIndex,
  timeOut,
};
