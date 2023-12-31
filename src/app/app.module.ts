import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThreeSceneComponent } from './three-scene/three-scene.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { PlayerComponent } from './player/player.component';
import { EnemyComponent } from './enemy/enemy.component';

export const appModuleExports = [
	ThreeSceneComponent,
	PlayerComponent,
	EnemyComponent,
];

export const appModuleDeclarations = [AppComponent, ...appModuleExports];

@NgModule({
	declarations: appModuleDeclarations,
	exports: appModuleExports,
	imports: [
		BrowserModule,
		AppRoutingModule,
		ServiceWorkerModule.register('ngsw-worker.js', {
			enabled: !isDevMode(),
			// Register the ServiceWorker as soon as the application is stable
			// or after 30 seconds (whichever comes first).
			registrationStrategy: 'registerWhenStable:30000',
		}),
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
