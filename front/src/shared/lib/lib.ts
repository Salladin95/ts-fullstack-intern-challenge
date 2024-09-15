export function createArray<T, V = string>(
	length: number,
	iterator: (value: V, index: number, array: unknown[]) => T,
): T[] {
	return new Array(length).fill(0).map(iterator)
}
