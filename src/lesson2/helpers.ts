export const isNumber = (item: string): boolean => !isNaN(Number(item));

export const isFunction = (item: string): boolean => {
  const mathResult: string[] | null = item.match(/^(sin|cos|tan|fib|!)/);
  if (mathResult && mathResult.length > 0) {
    return true;
  }

  return false;
};
