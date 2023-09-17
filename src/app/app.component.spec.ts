import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { appModuleDeclarations } from './app.module';

describe('AppComponent', () => {
	beforeEach(() =>
		TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: appModuleDeclarations,
		}),
	);

	it('should create the app', () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});

	it(`should have as title 'angular-test'`, () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.componentInstance;
		expect(app.title).toEqual('angular-test');
	});
});
