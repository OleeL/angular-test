import { Component, Inject, OnInit } from '@angular/core';
import { Game } from 'src/types/game';
import { GAME_SERVICE } from 'src/utils/injectionTokens';
import { BoxGeometry, Mesh, MeshStandardMaterial } from 'three';

@Component({
	selector: 'app-player',
	templateUrl: './player.component.html',
	styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
	private cube!: Mesh;

	constructor(@Inject(GAME_SERVICE) private game: Game) {}

	ngOnInit() {
		const geometry = new BoxGeometry();
		const material = new MeshStandardMaterial({
			color: 0x00ff00,
		});
		this.cube = new Mesh(geometry, material);
		this.game.scene.add(this.cube);
	}
}
