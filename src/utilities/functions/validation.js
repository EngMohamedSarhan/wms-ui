import { calcDateYearsDifference } from "./date";

export const handleRowValidation = (row) => {
  switch (true) {
    case row.reason.includes("CPD Null"):
      if (
        !row.consumptionPriorityDate ||
        row.consumptionPriorityDate !== row.suggestedCPD
      ) {
        return "CPD is missing and can come from the suggested date!";
      }

      return null;
    case row.reason.includes("MFG DATE ITEM MISSING MFG DATE"):
      if (
        !row.manufacturedDate ||
        !row.consumptionPriorityDate ||
        row.consumptionPriorityDate !== row.manufacturedDate
      ) {
        return "Manufacturing date is missing or not equal consumption priority date!";
      }

      return null;
    case row.reason.includes("MFG DATE ITEM MISSING EXP DATE") ||
      row.reason.includes("MFG DATE TRACKED CPD <> EXP DATE") ||
      row.reason.includes("EXP DATE TRACKED CPD <> EXP DATE"):
      if (
        !row.expirationDate ||
        !row.consumptionPriorityDate ||
        row.expirationDate !== row.consumptionPriorityDate ||
        row.consumptionPriorityDate !== row.suggestedCPD
      ) {
        return "Expiration date is missing or not equal consumption priority date or not equal suggested date!";
      }

      return null;
    case row.reason.includes("EXP DATE ITEM MISSING EXP DATE"):
      if (
        !row.expirationDate ||
        !row.consumptionPriorityDate ||
        row.consumptionPriorityDate !== row.expirationDate
      ) {
        return "Expiration date is missing or not equal consumption priority date!";
      }

      return null;
    case row.reason.includes("EXP Date >= 5 yrs"):
      if (
        !row.expirationDate ||
        !row.consumptionPriorityDate ||
        row.consumptionPriorityDate !== row.expirationDate ||
        calcDateYearsDifference(row.expirationDate, new Date()) > 5
      ) {
        return "Expiration date is missing or not equal consumption priority date or not less than 5 years from today!";
      }

      return null;
    case row.reason.includes("MFG Date > Today"):
      if (
        !row.manufacturedDate ||
        !row.consumptionPriorityDate ||
        row.consumptionPriorityDate !== row.manufacturedDate ||
        new Date().getTime() - new Date(row.manufacturedDate).getTime() < 0
      ) {
        return "Manufacturing date is missing or not equal consumption priority date or not less than today!";
      }

      return null;
    case row.reason.includes("SLASH VINTAGE CPD <> 01-01-VINTAGE YEAR"):
      if (
        !row.consumptionPriorityDate ||
        row.consumptionPriorityDate.split("-")[1] !== "01" ||
        row.consumptionPriorityDate.split("-")[2] !== "01" ||
        new Date(row.consumptionPriorityDate).getUTCFullYear() <
          new Date().getUTCFullYear()
      ) {
        return "Consumption priority date must be 01/01 of the vintage year, and the vintage year shouldn't be in the past!";
      }

      return null;
    case row.reason.includes("VINTAGE SPECIFIC CPD <> 01-01 VINTAGE YEAR"):
      if (
        !row.consumptionPriorityDate ||
        row.consumptionPriorityDate !== row.suggestedCPD
      ) {
        return "Consumption priority date must be 01/01 of the vintage year or not equal suggested date!";
      }

      return null;
    default:
      return null;
  }
};
