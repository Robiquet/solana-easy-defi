export const calculateAverageMagnitude: (numbers: number[]) => number = (
  numbers
) => {
  return numbers.reduce((a, b) => a + b) / numbers.length;
};
