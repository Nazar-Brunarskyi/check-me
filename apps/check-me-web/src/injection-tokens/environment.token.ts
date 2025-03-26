import { InjectionToken } from '@angular/core';
import { IAngularEnvironment } from '@check-me/models';

export const ENVIRONMENT_CONFIG = new InjectionToken<IAngularEnvironment>('Application environment');
