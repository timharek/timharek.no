export function groupByMap<K, V>(
  array: V[],
  keyGetter: (input: V) => K,
): Map<K, V[]> {
  const map = new Map<K, V[]>();

  array.forEach((item: V) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });

  return map;
}

interface GroupBy<V> {
  [key: string]: V[];
}

export function groupBy<K, V>(
  array: V[],
  keyGetter: (input: V) => K,
): GroupBy<V> {
  const map = groupByMap(array, keyGetter);

  return Object.fromEntries(map);
}
