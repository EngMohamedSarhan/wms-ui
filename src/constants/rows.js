const rows = [
  {
    id: "1", // changes
    itemId: "532432",
    itemDescription: "243 SA",
    ilpnId: "2222X",
    lpnStatus: "Not Allocated",
    locationId: "06203A",
    lpnQuantityInCases: 13,
    reason: "EXP DATE ITEM MISSING EXPDATE",
    dateCode: "E",
    trackManufacturingDate: 1,
    trackExpiryDate: 1,
    mfgDateDiff: 8,
    manufacturedDate: "2021-06-17T",
    consumptionPriorityDate: "2022-06-17",
  },
  {
    id: "2",
    itemId: "600032",
    itemDescription: "64Z 6 BLOOMERS FROSE MK",
    ilpnId: "P00000000000043",
    lpnStatus: "Not Allocated",
    locationId: "06203A",
    lpnQuantityInCases: 13,
    reason: "EXP DATE ITEM MISSING EXPDATE",
    dateCode: "E",
    trackManufacturingDate: 1,
    trackExpiryDate: 1,
    mfgDateDiff: 8,
    manufacturedDate: "2023-06-17T",
    expirationDate: "2022-04-12",
  },
  {
    id: "3",
    itemId: "112321",
    itemDescription: "HELLO",
    ilpnId: "P00000000000043",
    lpnStatus: "Not Allocated",
    locationId: "06203A",
    lpnQuantityInCases: 13,
    reason: "EXP DATE ITEM MISSING EXPDATE",
    dateCode: "E",
    trackManufacturingDate: 0,
    trackExpiryDate: 1,
    mfgDateDiff: 8,
    manufacturedDate: "2022-06-17",
  },
  {
    id: "4",
    itemId: "388888",
    itemDescription: "64Z 6 BLOOMERS FROSE MK",
    ilpnId: "P00000000000043",
    lpnStatus: "Not Allocated",
    locationId: "06203A",
    lpnQuantityInCases: 13,
    reason: "EXP DATE ITEM MISSING EXPDATE",
    dateCode: "E",
    trackManufacturingDate: 1,
    trackExpiryDate: 0,
    manufacturedDate: "2022-06-17",
  },
  {
    id: "5",
    itemId: "388888",
    itemDescription: "64Z 6 BLOOMERS FROSE MK",
    ilpnId: "P00000000000043",
    lpnStatus: "Not Allocated",
    locationId: "06203A",
    lpnQuantityInCases: 13,
    reason: "EXP DATE ITEM MISSING EXPDATE",
    dateCode: "E",
    trackManufacturingDate: 1,
    trackExpiryDate: 1,
    mfgDateDiff: 8,
    manufacturedDate: "2022-06-17",
  },
  {
    id: "6",
    itemId: "383888",
    itemDescription: "64Z 6 BLOOMERS FROSE MK",
    ilpnId: "P00000000000043",
    lpnStatus: "Not Allocated",
    locationId: "06203A",
    lpnQuantityInCases: 13,
    reason: "EXP DATE ITEM MISSING EXPDATE",
    dateCode: "E",
    trackManufacturingDate: 1,
    trackExpiryDate: 1,
    manufacturedDate: "2022-06-17",
    expirationDate: "2022-03-27",
  },
  {
    id: "7",
    itemId: "388888",
    itemDescription: "64Z 6 BLOOMERS FROSE MK",
    ilpnId: "P00000000000043",
    lpnStatus: "Not Allocated",
    locationId: "06203A",
    lpnQuantityInCases: 13,
    reason: "EXP DATE ITEM MISSING EXPDATE",
    dateCode: "E",
    trackManufacturingDate: 1,
    trackExpiryDate: 1,
    mfgDateDiff: 8,
    manufacturedDate: "2022-06-17",
  },
  {
    id: "8",
    itemId: "388888",
    itemDescription: "64Z 6 BLOOMERS FROSE MK",
    ilpnId: "P00000000000043",
    lpnStatus: "Not Allocated",
    locationId: "06203A",
    lpnQuantityInCases: 13,
    reason: "EXP DATE ITEM MISSING EXPDATE",
    dateCode: "E",
    trackManufacturingDate: 1,
    trackExpiryDate: 1,
    mfgDateDiff: 8,
    manufacturedDate: "2022-06-17",
  },
  {
    id: "9",
    itemId: "388888",
    itemDescription: "64Z 6 BLOOMERS FROSE MK",
    ilpnId: "P00000000000043",
    lpnStatus: "Not Allocated",
    locationId: "06203A",
    lpnQuantityInCases: 13,
    reason: "EXP DATE ITEM MISSING EXPDATE",
    dateCode: "E",
    trackManufacturingDate: 1,
    trackExpiryDate: 1,
    mfgDateDiff: 8,
    manufacturedDate: "2022-06-17",
  },
  {
    id: "10",
    itemId: "388888",
    itemDescription: "64Z 6 BLOOMERS FROSE MK",
    ilpnId: "P00000000000043",
    lpnStatus: "Not Allocated",
    locationId: "06203A",
    lpnQuantityInCases: 13,
    reason: "EXP DATE ITEM MISSING EXPDATE",
    dateCode: "E",
    trackManufacturingDate: 1,
    trackExpiryDate: 1,
    mfgDateDiff: 8,
    manufacturedDate: "2022-06-17",
  },
  {
    id: "11",
    itemId: "388888",
    itemDescription: "64Z 6 BLOOMERS FROSE MK",
    ilpnId: "P00000000000043",
    lpnStatus: "Not Allocated",
    locationId: "06203A",
    lpnQuantityInCases: 13,
    reason: "EXP DATE ITEM MISSING EXPDATE",
    dateCode: "E",
    trackManufacturingDate: 1,
    trackExpiryDate: 1,
    mfgDateDiff: 8,
    manufacturedDate: "2022-06-17",
  },
  {
    id: "12",
    itemId: "388888",
    itemDescription: "64Z 6 BLOOMERS FROSE MK",
    ilpnId: "P00000000000043",
    lpnStatus: "Not Allocated",
    locationId: "06203A",
    lpnQuantityInCases: 13,
    reason: "EXP DATE ITEM MISSING EXPDATE",
    dateCode: "E",
    trackManufacturingDate: 1,
    trackExpiryDate: 1,
    mfgDateDiff: 8,
    manufacturedDate: "2022-06-17",
  },
  {
    id: "13",
    itemId: "388888",
    itemDescription: "64Z 6 BLOOMERS FROSE MK",
    ilpnId: "P00000000000043",
    lpnStatus: "Not Allocated",
    locationId: "06203A",
    lpnQuantityInCases: 13,
    reason: "EXP DATE ITEM MISSING EXPDATE",
    dateCode: "E",
    trackManufacturingDate: 1,
    trackExpiryDate: 1,
    mfgDateDiff: 8,
    manufacturedDate: "2022-06-17",
    expirationDate: "2022-04-12",
  },
  {
    id: "14",
    itemId: "388888",
    itemDescription: "64Z 6 BLOOMERS FROSE MK",
    ilpnId: "P00000000000043",
    lpnStatus: "Not Allocated",
    locationId: "06203A",
    lpnQuantityInCases: 13,
    reason: "EXP DATE ITEM MISSING EXPDATE",
    dateCode: "E",
    trackManufacturingDate: 0,
    trackExpiryDate: 1,
    mfgDateDiff: 8,
    manufacturedDate: "2022-06-17",
  },
  {
    id: "15",
    itemId: "388888",
    itemDescription: "64Z 6 BLOOMERS FROSE MK",
    ilpnId: "P00000000000043",
    lpnStatus: "Not Allocated",
    locationId: "06203A",
    lpnQuantityInCases: 13,
    reason: "EXP DATE ITEM MISSING EXPDATE",
    dateCode: "E",
    trackManufacturingDate: 1,
    trackExpiryDate: 0,
    manufacturedDate: "2022-06-17",
  },
  {
    id: "16",
    itemId: "388888",
    itemDescription: "64Z 6 BLOOMERS FROSE MK",
    ilpnId: "P00000000000043",
    lpnStatus: "Not Allocated",
    locationId: "06203A",
    lpnQuantityInCases: 13,
    reason: "EXP DATE ITEM MISSING EXPDATE",
    dateCode: "E",
    trackManufacturingDate: 1,
    trackExpiryDate: 1,
    mfgDateDiff: 8,
    manufacturedDate: "2022-06-17",
  },
  {
    id: "17",
    itemId: "383888",
    itemDescription: "64Z 6 BLOOMERS FROSE MK",
    ilpnId: "P00000000000043",
    lpnStatus: "Not Allocated",
    locationId: "06203A",
    lpnQuantityInCases: 13,
    reason: "EXP DATE ITEM MISSING EXPDATE",
    dateCode: "E",
    trackManufacturingDate: 1,
    trackExpiryDate: 1,
    manufacturedDate: "2022-06-17",
    expirationDate: "2022-03-27",
  },
  {
    id: "18",
    itemId: "388888",
    itemDescription: "64Z 6 BLOOMERS FROSE MK",
    ilpnId: "P00000000000043",
    lpnStatus: "Not Allocated",
    locationId: "06203A",
    lpnQuantityInCases: 13,
    reason: "EXP DATE ITEM MISSING EXPDATE",
    dateCode: "E",
    trackManufacturingDate: 1,
    trackExpiryDate: 1,
    mfgDateDiff: 8,
    manufacturedDate: "2022-06-17",
  },
  {
    id: "19",
    itemId: "388888",
    itemDescription: "64Z 6 BLOOMERS FROSE MK",
    ilpnId: "P00000000000043",
    lpnStatus: "Allocated",
    locationId: "06203A",
    lpnQuantityInCases: 13,
    reason: "EXP DATE ITEM MISSING EXPDATE",
    dateCode: "E",
    trackManufacturingDate: 1,
    trackExpiryDate: 1,
    mfgDateDiff: 8,
    manufacturedDate: "2022-06-11",
  },
  {
    id: "20",
    itemId: "388888",
    itemDescription: "64Z 6 BLOOMERS FROSE MK",
    ilpnId: "P00000000000043",
    lpnStatus: "Not Allocated",
    locationId: "06203A",
    lpnQuantityInCases: 15,
    reason: "EXP DATE ITEM MISSING EXPDATE",
    dateCode: "E",
    trackManufacturingDate: 1,
    trackExpiryDate: 1,
    mfgDateDiff: 8,
    manufacturedDate: "2022-06-17",
  },
  {
    id: "21",
    itemId: "388888",
    itemDescription: "64Z 6 BLOOMERS FROSE MK",
    ilpnId: "P00000000000043",
    lpnStatus: "Not Allocated",
    locationId: "06203A",
    lpnQuantityInCases: 4,
    reason: "EXP DATE ITEM MISSING EXPDATE",
    dateCode: "E",
    trackManufacturingDate: 1,
    trackExpiryDate: 1,
    mfgDateDiff: 8,
    manufacturedDate: "2022-06-17",
  },
  {
    id: "22",
    itemId: "388888",
    itemDescription: "64Z 6 BLOOMERS FROSE MK",
    ilpnId: "P00000000000043",
    lpnStatus: "Not Allocated",
    locationId: "06203A",
    lpnQuantityInCases: 3,
    reason: "EXP DATE ITEM MISSING EXPDATE",
    dateCode: "E",
    trackManufacturingDate: 1,
    trackExpiryDate: 1,
    mfgDateDiff: 8,
    manufacturedDate: "2022-06-17",
  },
];

export default rows;
