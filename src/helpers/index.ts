export const formatLongString = (value: string) =>
  `${value.slice(0, 6)}...${value.slice(-4)}`;

export const ethToGwei = (value: number) => {
  const GWEI = 10 ** 9;

  return value * GWEI;
};
