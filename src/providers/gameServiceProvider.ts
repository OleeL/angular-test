import { Game } from 'src/types/game';
import { GAME_SERVICE } from 'src/utils/injectionTokens';
import { PerspectiveCamera, Scene } from 'three';

export const gameServiceProvider = {
	provide: GAME_SERVICE,
	useFactory: () =>
		({
			scene: new Scene(),
			camera: new PerspectiveCamera(
				75,
				window.innerWidth / window.innerHeight,
				0.1,
				1000,
			),
		}) as Game,
};
