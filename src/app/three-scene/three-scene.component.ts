import { Component, ElementRef, NgZone, OnDestroy, OnInit } from '@angular/core';
import { BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer } from 'three';

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

	constructor(private ngZone: NgZone, private el: ElementRef<HTMLElement>) {}

	ngOnInit(): void {
		this.initTHREE();
		this.animate();
	}

	private initTHREE(): void {
		const width: number = this.el?.nativeElement.clientWidth;
		const height: number = this.el?.nativeElement.clientHeight;

		this.scene = new Scene();
		this.camera = new PerspectiveCamera(75, width / height, 0.1, 1000);
		this.camera.position.z = 5;

		this.renderer = new WebGLRenderer();
		this.renderer.setSize(width, height);
		this.el.nativeElement.appendChild(this.renderer.domElement);

		const geometry: BoxGeometry = new BoxGeometry();
		const material: MeshBasicMaterial = new MeshBasicMaterial({
			color: 0x00ff00,
		});
		this.cube = new Mesh(geometry, material);
		this.scene.add(this.cube);
	}

	private animate(): void {
		this.ngZone.runOutsideAngular(() => {
			if (document.readyState !== 'loading') {
				this.render();
			} else {
				window.addEventListener('DOMContentLoaded', this.render);
			}
			window.addEventListener('resize', this.resize);
		});
	}

	private render = (): void => {
		requestAnimationFrame(this.render);
		this.cube.rotation.x += 0.01;
		this.cube.rotation.y += 0.01;
		this.renderer.render(this.scene, this.camera);
	}

	private resize = (): void => {
		const width: number = this.el.nativeElement.clientWidth;
		const height: number = this.el.nativeElement.clientHeight;

		this.camera.aspect = width / height;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(width, height);
	}

	ngOnDestroy(): void {
		window.removeEventListener('DOMContentLoaded', this.render);
		window.removeEventListener('resize', this.resize);
	}
}
