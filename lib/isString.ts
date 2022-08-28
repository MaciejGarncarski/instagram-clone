export const isString = (data: string | null | undefined) => {
  return typeof data === 'string' ? data : '';
};
