import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnemyComponent } from './enemy.component';
import { gameServiceProvider } from 'src/providers/gameServiceProvider';

describe('EnemyComponent', () => {
	let component: EnemyComponent;
	let fixture: ComponentFixture<EnemyComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [EnemyComponent],
			providers: [gameServiceProvider],
		});
		fixture = TestBed.createComponent(EnemyComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
