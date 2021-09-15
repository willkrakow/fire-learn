import { Timestamp } from "firebase/firestore";

export const parseTimestamp = (timestampString: string) => {
  return Timestamp.fromDate(new Date(timestampString))
    .toDate()
    .toLocaleString();
};
