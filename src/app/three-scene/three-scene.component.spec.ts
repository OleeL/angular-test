import { gameServiceProvider } from 'src/providers/gameServiceProvider';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThreeSceneComponent } from './three-scene.component';

describe('ThreeSceneComponent', () => {
	let component: ThreeSceneComponent;
	let fixture: ComponentFixture<ThreeSceneComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [ThreeSceneComponent],
			providers: [gameServiceProvider],
		});
		fixture = TestBed.createComponent(ThreeSceneComponent);
		component = fixture.componentInstance;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should initialize THREE properly', () => {
		const initSpy = spyOn(component as any, 'initTHREE').and.callThrough();
		fixture.detectChanges(); // Trigger ngOnInit
		expect(initSpy).toHaveBeenCalled();
	});
});
