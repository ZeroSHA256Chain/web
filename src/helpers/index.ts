const GWEI = 10 ** 9;

export const formatETHAddress = (
  value: string,
  options: { long?: boolean } = {}
) =>
  `${value.slice(0, options.long ? 10 : 8)}...${value.slice(-(options.long ? 8 : 6))}`;

export const ethToGwei = (value: number) => value * GWEI;

export const gweiToETH = (value: number) => value / GWEI;

export * from "./date";
