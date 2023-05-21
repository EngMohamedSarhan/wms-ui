import { SortOrders } from "../constants/sort";

export const descendingComparator = (a, b, orderBy) => {
  const x = typeof a[orderBy] === "string" ? a[orderBy].toLowerCase() : a[orderBy];
  const y = typeof b[orderBy] === "string" ? b[orderBy].toLowerCase() : b[orderBy];
  // console.log(x, y);

  if (y < x || (!y && x)) {
    return -1;
  }
  if (y > x || (!x && y)) {
    return 1;
  }
  return 0;
};

export const getComparator = (order, orderBy) =>
  order === SortOrders.desc
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
