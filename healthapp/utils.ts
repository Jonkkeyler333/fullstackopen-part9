export const isNumber = (value: any) : boolean => { // eslint-disable-line @typescript-eslint/no-explicit-any
  return !isNaN(Number(value));
};