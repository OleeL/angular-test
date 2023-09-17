import { Component, Inject, OnInit, HostListener } from '@angular/core';
import { Game } from 'src/types/game';
import { GAME_SERVICE } from 'src/utils/injectionTokens';
import { Plane, Raycaster, Vector2, Vector3 } from 'three';
import { PlayerService } from './player.service';

@Component({
	selector: 'app-player',
	templateUrl: './player.component.html',
	styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
	private moveSpeed = 0.1;
	private moveDirection = new Vector3(0, 0, 0);

	constructor(
		@Inject(GAME_SERVICE) private game: Game,
		private playerService: PlayerService,
	) {}

	ngOnInit() {
		this.playerService.getCube().subscribe(cube => {
			this.game.scene.add(cube);
		});

		this.animate();
	}

	@HostListener('window:keydown', ['$event'])
	onKeyDown(event: KeyboardEvent) {
		switch (event.key.toLowerCase()) {
			case 'w':
			case 'arrowup':
				this.moveDirection.z = -1;
				break;
			case 's':
			case 'arrowdown':
				this.moveDirection.z = 1;
				break;
			case 'a':
			case 'arrowleft':
				this.moveDirection.x = -1;
				break;
			case 'd':
			case 'arrowright':
				this.moveDirection.x = 1;
				break;
		}
	}

	@HostListener('window:keyup', ['$event'])
	onKeyUp(event: KeyboardEvent) {
		switch (event.key.toLowerCase()) {
			case 'w':
			case 'arrowup':
			case 's':
			case 'arrowdown':
				this.moveDirection.z = 0;
				break;
			case 'a':
			case 'arrowleft':
			case 'd':
			case 'arrowright':
				this.moveDirection.x = 0;
				break;
		}
	}

	private raycaster = new Raycaster();
	private mouse = new Vector2();
	private groundPlane = new Plane(new Vector3(0, 1, 0), 0);

	@HostListener('window:mousemove', ['$event'])
	onMouseMove(event: MouseEvent) {
		// Convert the mouse position to normalized device coordinates (-1 to +1) for both components.
		this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
		this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
	}

	updateLookDirection() {
		this.playerService.getCube().subscribe(cube => {
			const { x, z } = cube.position;
			this.game.camera.position.set(x, 10, z);
			this.game.camera.lookAt(cube.position);

			// Update the picking ray with the camera and mouse position.
			this.raycaster.setFromCamera(this.mouse, this.game.camera);

			// Calculate the intersection of the ray with the groundPlane.
			const intersects = this.raycaster.ray.intersectPlane(
				this.groundPlane,
				new Vector3(this.mouse.x, this.mouse.y, 0),
			);

			if (intersects) {
				cube.lookAt(intersects);
			}
		});
	}

	animate() {
		this.playerService.getCube().subscribe(cube => {
			requestAnimationFrame(() => this.animate());
			const deltaMove = new Vector3(
				this.moveDirection.x * this.moveSpeed,
				0,
				this.moveDirection.z * this.moveSpeed,
			);

			cube.position.add(deltaMove);
			this.updateLookDirection();
		});
	}
}
