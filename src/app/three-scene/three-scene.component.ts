import {
	Component,
	ElementRef,
	Inject,
	NgZone,
	OnDestroy,
	OnInit,
} from '@angular/core';
import { gameServiceProvider } from 'src/providers/gameServiceProvider';
import { Game } from 'src/types/game';
import { GAME_SERVICE } from 'src/utils/injectionTokens';
import { AmbientLight, DirectionalLight, WebGLRenderer } from 'three';
import { degToRad } from 'three/src/math/MathUtils';

@Component({
	selector: 'app-three-scene',
	template: ` <ng-content></ng-content> `,
	styleUrls: ['./three-scene.component.scss'],
	providers: [gameServiceProvider],
})
export class ThreeSceneComponent implements OnInit, OnDestroy {
	private renderer!: WebGLRenderer;

	constructor(
		private ngZone: NgZone,
		private el: ElementRef<HTMLElement>,
		@Inject(GAME_SERVICE) private game: Game,
	) {}

	ngOnInit() {
		this.initTHREE();
		this.animate();
	}

	private initSceneLights() {
		// Create directional light and add to the scene
		const directionalLight = new DirectionalLight(0xffffff, 0.5);
		directionalLight.position.set(4, 10, 1).normalize();
		this.game.scene.add(directionalLight);

		// Add ambient light to softly light the entire scene
		const ambientLight = new AmbientLight(0x555555);
		this.game.scene.add(ambientLight);
	}

	private initRenderer(width: number, height: number) {
		this.renderer = new WebGLRenderer({
			antialias: true,
		});
		this.renderer.setSize(width, height);
		this.el.nativeElement.appendChild(this.renderer.domElement);
		return this.renderer;
	}

	private initCamera(width: number, height: number) {
		this.game.camera.aspect = width / height;
		this.game.camera.fov = this.game.camera.position.z = 5;
		this.game.camera.position.y = 2;
		this.game.camera.rotateX(degToRad(-30));
	}

	private initScene() {
		this.game.scene.castShadow = true;
		this.game.scene.receiveShadow = true;
	}

	private getClientWidth = () => {
		const width = this.el?.nativeElement.clientWidth;
		const height = this.el?.nativeElement.clientHeight;

		return { width, height };
	};

	private initTHREE() {
		const { width, height } = this.getClientWidth();
		this.initScene();
		this.initCamera(width, height);
		this.initRenderer(width, height);
		this.initSceneLights();
	}

	private animate() {
		this.ngZone.runOutsideAngular(() => {
			if (document.readyState !== 'loading') {
				this.render();
			} else {
				window.addEventListener('DOMContentLoaded', this.render);
			}
			window.addEventListener('resize', this.resize);
		});
	}

	private render = () => {
		requestAnimationFrame(this.render);
		this.renderer.render(this.game.scene, this.game.camera);
	};

	private resize = () => {
		const width = this.el.nativeElement.clientWidth;
		const height = this.el.nativeElement.clientHeight;

		this.game.camera.aspect = width / height;
		this.game.camera.updateProjectionMatrix();
		this.renderer.setSize(width, height);
	};

	ngOnDestroy() {
		window.removeEventListener('DOMContentLoaded', this.render);
		window.removeEventListener('resize', this.resize);
	}
}
