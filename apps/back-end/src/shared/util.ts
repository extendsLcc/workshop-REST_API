type IdRouteParam = { id: string };

const isInArray = <T, A extends T>(item: T, array: ReadonlyArray<A>): item is A => array.includes(item as A);

export { isInArray };
export type { IdRouteParam };
