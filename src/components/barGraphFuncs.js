const generateBars = (count, range) => {
  let bars = [];
  for (let i = 0; i < count; i++) {
    bars.push({ id: i, value: Math.floor(Math.random() * range) + 1 });
  }
  return bars;
};
module.exports = { generateBars };
