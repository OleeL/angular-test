import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BoxGeometry, Mesh, MeshStandardMaterial } from 'three';

@Injectable({
	providedIn: 'root',
})
export class PlayerService {
	private cube: BehaviorSubject<Mesh>;

	constructor() {
		const geometry = new BoxGeometry();
		const material = new MeshStandardMaterial({
			color: 0x00ff00,
		});
		this.cube = new BehaviorSubject<Mesh>(new Mesh(geometry, material));
	}

	getCube() {
		return this.cube.asObservable();
	}
}
