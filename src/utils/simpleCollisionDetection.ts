import { Box3, Mesh } from 'three';

export const checkCollision = (meshA: Mesh, meshB: Mesh): boolean => {
	const boxA = new Box3().setFromObject(meshA);
	const boxB = new Box3().setFromObject(meshB);

	return boxA.intersectsBox(boxB);
};
