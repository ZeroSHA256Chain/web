export const extractErrorMessage = (error: any): string => {
  const revertString = error?.cause.message || "";

  const match = revertString.match(/reverted with reason string '(.+)'/);

  if (match?.[1]) {
    return match[1];
  }

  if (revertString.includes("user rejected transaction")) {
    return "Transaction was rejected";
  }

  return "Operation failed. Please try again.";
};
