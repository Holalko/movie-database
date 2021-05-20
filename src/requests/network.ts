export const getRequest = async <Return>(url: string) => {
  const response = await fetch(url);
  const text = await response.text();
  if (response.status < 200 && response.status > 300) throw new Error(text);
  return JSON.parse(text) as Return;
};
