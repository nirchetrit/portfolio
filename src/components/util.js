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
const timeOut = async (seconds) => {
  return new Promise((r) => setTimeout(r, seconds * 1000));
};

module.exports = {
  removeFromArray,
  swapElemsByIndex,
  timeOut,
};
