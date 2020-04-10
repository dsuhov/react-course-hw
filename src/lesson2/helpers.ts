export const isNumber = (item: string): boolean => !isNaN(Number(item));

// Эта функция изначально задумывалась для поддержки тригонометрических и прочих функций,
// но потом я решил несколько упростить проект
export const isFunction = (item: string): boolean => {
  const mathResult: string[] | null = item.match(/^(sin|cos|tan|fib|!)/);
  if (mathResult && mathResult.length > 0) {
    return true;
  }

  return false;
};
