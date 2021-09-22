import { groupBy, sortBy } from "lodash";

export default function groupAndSortByLength<T extends { data: any }>(
  collection: T[],
  key: string
) {
  const collectionDatum = collection.map((item) => item.data);
  const grouped = groupBy(collectionDatum, key);
  const sorted = sortBy(grouped, (item: any) => !item.length);
  return sorted.map((e: any) => ({
    key: e[0][key],
  }));
}
