const columns = [
  { id: "itemId", label: "Item", minWidth: 90 },
  { id: "itemDescription", label: "Item Description", minWidth: 220 },
  { id: "ilpnId", label: "LPN ID", minWidth: 110 },
  { id: "reason", label: "Reason", minWidth: 250 },
  {
    id: "lpnStatus",
    label: "LPN Status Description",
    minWidth: 145,
  },
  { id: "locationId", label: "Display Location", minWidth: 95 },
  {
    id: "lpnQuantityInCases",
    label: "LPN Quantity In Cases",
    minWidth: 160,
    format: (value) => value.toFixed(2),
  },
  {
    id: "manufacturedDate",
    label: "Manufactured Date",
    minWidth: 180,
    isManufactureDate: true,
  },
  {
    id: "expirationDate",
    label: "Expiration Date",
    minWidth: 180,
    isExpirationDate: true,
  },
  {
    id: "consumptionPriorityDate",
    label: "Consumption Priority Date",
    minWidth: 210,
    isPriorityDate: true,
  },
  {
    id: "suggestedCPD",
    label: "Suggested Date",
    minWidth: 180,
    isSuggestedCPD: true,
  },
  {
    id: "acceptSuggestedDate",
    label: "Accept Suggested Date",
    minWidth: 100,
    isAcceptDate: true,
    disableFilter: true,
    disableSort: true,
  },
  {
    id: "productLifeInDays",
    label: "Product Life In Days",
    minWidth: 110,
  },
  { id: "dateCode", label: "Date Code", minWidth: 90 },
  {
    id: "trackManufacturingDate",
    label: "Item Track Manufacturing Date",
    minWidth: 175,
  },
  { id: "trackExpiryDate", label: "Item Track Expiry Date", minWidth: 140 },
  { id: "mfgDateDiff", label: "Manufacture Date Diff", minWidth: 160 },
  { id: "expDateDiff", label: "Expiration Date Diff", minWidth: 130 },
  {
    id: "save",
    isSave: true,
    minWidth: 100,
    sx: {
      position: "sticky",
      right: 0,
    },
  },
];

export default columns;
