var numeral = require("numeral");

export const formatPercentage: (percentage: number) => string = (currency) => {
  return numeral(currency).format("0.00") + "%";
};
