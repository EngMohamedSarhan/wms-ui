export const getDateFromPicker = (value) =>
  `${value["$y"]}-${(value["$M"] + 1).toString().padStart(2, "0")}-${value["$D"]
    .toString()
    .padStart(2, "0")}`;

export const calcDateDifference = (date1, date2) => {
  const diff = Math.floor(date1.getTime() - date2.getTime());
  const day = 1000 * 60 * 60 * 24;

  const days = Math.floor(diff / day);
  const months = Math.floor(days / 31);
  const years = Math.floor(months / 12);

  return `${years}-${months.padStart(2, "0")}-${days.padStart(2, "0")}`;
};

export const calcDateYearsDifference = (date1, date2) => {
  const diff = Math.floor(date1.getTime() - date2.getTime());
  const day = 1000 * 60 * 60 * 24 * 365;

  return Math.floor(diff / day);
};
