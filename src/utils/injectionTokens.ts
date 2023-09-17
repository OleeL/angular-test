import { InjectionToken } from '@angular/core';
import { Game } from 'src/types/game';

export const GAME_SERVICE = new InjectionToken<Game>('GAME_SERVICE');
