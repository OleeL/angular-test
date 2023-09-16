import {
	Component,
	ElementRef,
	NgZone,
	OnDestroy,
	OnInit,
} from '@angular/core';
import {
	AmbientLight,
	BoxGeometry,
	DirectionalLight,
	Mesh,
	MeshStandardMaterial,
	PerspectiveCamera,
	Scene,
	WebGLRenderer,
} from 'three';
import { degToRad } from 'three/src/math/MathUtils';

@Component({
	selector: 'app-three-scene',
	template: '',
	styleUrls: ['./three-scene.component.scss'],
})
export class ThreeSceneComponent implements OnInit, OnDestroy {
	private renderer!: WebGLRenderer;
	private camera!: PerspectiveCamera;
	private scene!: Scene;
	private cube!: Mesh;

	constructor(
		private ngZone: NgZone,
		private el: ElementRef<HTMLElement>,
	) {}

	ngOnInit() {
		this.initTHREE();
		this.animate();
	}

	private initTHREE() {
		const width: number = this.el?.nativeElement.clientWidth;
		const height: number = this.el?.nativeElement.clientHeight;

		this.scene = new Scene();
		this.scene.castShadow = true;
		this.scene.receiveShadow = true;
		this.camera = new PerspectiveCamera(75, width / height, 0.1, 1000);
		this.camera.position.z = 5;
		this.camera.position.y = 2;
		this.camera.rotateX(degToRad(-30));

		this.renderer = new WebGLRenderer({
			antialias: true,
		});
		this.renderer.setSize(width, height);
		this.el.nativeElement.appendChild(this.renderer.domElement);

		const geometry = new BoxGeometry();
		const material = new MeshStandardMaterial({
			color: 0x00ff00,
		});
		this.cube = new Mesh(geometry, material);
		this.scene.add(this.cube);

		// Create directional light and add to the scene
		const directionalLight = new DirectionalLight(0xffffff, 0.5);
		directionalLight.position.set(4, 10, 1).normalize();
		this.scene.add(directionalLight);

		// Add ambient light to softly light the entire scene
		const ambientLight = new AmbientLight(0x555555);
		this.scene.add(ambientLight);
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
		this.renderer.render(this.scene, this.camera);
	};

	private resize = () => {
		const width: number = this.el.nativeElement.clientWidth;
		const height: number = this.el.nativeElement.clientHeight;

		this.camera.aspect = width / height;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(width, height);
	};

	ngOnDestroy() {
		window.removeEventListener('DOMContentLoaded', this.render);
		window.removeEventListener('resize', this.resize);
	}
}
