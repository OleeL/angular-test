export interface IVector2 {
	x: number;
	y: number;
}

export const radToDeg = (angle: number) => (angle * 180) / Math.PI;
export const degToRad = (angle: number) => (angle * Math.PI) / 180;
export const getPositionFromAngledRadius = (
	angle: number,
	radius: number,
): IVector2 => ({
	x: Math.cos(angle) * radius,
	y: Math.sin(angle) * radius,
});
export const addVectors = (
	{ x, y }: IVector2,
	addition: IVector2,
): IVector2 => ({
	x: x + addition.x,
	y: y + addition.y,
});
export const clamp = (n: number, min: number, max: number) =>
	Math.max(min, Math.min(max, n));
