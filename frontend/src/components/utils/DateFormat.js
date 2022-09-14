export const dateFormat = (num) => {
  const timeStamp = Date.parse(num);
  
  const options = {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  
  const date = new Date(timeStamp).toLocaleDateString("fr-FR", options);

  return date.toString();
};
