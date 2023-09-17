import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Vector3 } from 'three';

@Injectable({
	providedIn: 'root',
})
export class PlayerService {
	private playerPosition = new BehaviorSubject<Vector3>(new Vector3(0, 0, 0));

	setPosition(position: Vector3) {
		this.playerPosition.next(position);
	}

	getPosition() {
		return this.playerPosition.asObservable();
	}
}
