import { Timestamp } from "firebase/firestore";

export const parseTimestamp = (timestampString: string) => {
  return Timestamp.fromDate(new Date(timestampString))
    .toDate()
    .toLocaleString();
};

export const getDateStringFromTimestamp = (timestamp: Timestamp) => {
  return timestamp.toDate().toLocaleDateString();
}
