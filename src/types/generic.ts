export type SnakeToCamelCase<S extends string> =
	S extends `${infer T}_${infer U}`
		? `${T}${Capitalize<SnakeToCamelCase<U>>}`
		: S;

export type Nullable<T> = T | null;

export type Prettify<T> = {
	[K in keyof T]: T[K];
	// eslint-disable-next-line @typescript-eslint/ban-types
} & {};

export const pick = <T, K extends keyof T>(
	object: T,
	keys: K[],
): Pick<T, K> => {
	const result = {} as Pick<T, K>;
	for (const key of keys) {
		result[key] = object[key];
	}
	return result;
};

export type ObjectValues<T> = T[keyof T];

export type WithKey<T, K extends string> = T & Record<K, number>;
