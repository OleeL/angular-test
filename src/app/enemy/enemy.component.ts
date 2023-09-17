import { Component, Inject, OnInit } from '@angular/core';
import { Game } from 'src/types/game';
import { GAME_SERVICE } from 'src/utils/injectionTokens';
import { BoxGeometry, Mesh, MeshStandardMaterial, Vector3 } from 'three';
import { PlayerService } from '../player/player.service';

@Component({
	selector: 'app-enemy',
	templateUrl: './enemy.component.html',
	styleUrls: ['./enemy.component.scss'],
})
export class EnemyComponent implements OnInit {
	private enemyCube!: Mesh;
	private moveSpeed = 0.01; // Made it slower than the player's speed for this example
	private targetPosition: Vector3 | null = null;

	constructor(
		@Inject(GAME_SERVICE) private game: Game,
		private playerService: PlayerService,
	) {
		this.playerService.getPosition().subscribe(position => {
			this.targetPosition = position;

			// Logic to move the enemy towards the player.
			this.moveTowardsPlayer();
		});
	}

	ngOnInit() {
		const geometry = new BoxGeometry();
		const material = new MeshStandardMaterial({
			color: 0xff0000,
		});
		this.enemyCube = new Mesh(geometry, material);

		// Randomly position on x and z axis but keep y at 0
		this.enemyCube.position.set(
			Math.random() * 10 - 5,
			0,
			Math.random() * 10 - 5,
		);

		this.game.scene.add(this.enemyCube);

		this.animate();
	}

	// Method to make the enemy cube move towards the player cube
	moveTowardsPlayer() {
		if (this.targetPosition === null) return;
		const direction = new Vector3().subVectors(
			this.targetPosition,
			this.enemyCube.position,
		);

		// Make enemy look towards player
		this.enemyCube.lookAt(this.targetPosition);

		direction.normalize().multiplyScalar(this.moveSpeed);

		// Update enemy position based on direction
		this.enemyCube.position.add(direction);
	}

	animate() {
		requestAnimationFrame(() => this.animate());

		// Call the function to move enemy towards player
		this.moveTowardsPlayer();
	}
}
