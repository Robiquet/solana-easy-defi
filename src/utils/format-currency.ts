var numeral = require("numeral");

export const formatCurrency: (currency: number) => string = (currency) => {
  return numeral(currency).format("($ 0.00 a)");
};
