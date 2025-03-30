import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-not-found-page',
  imports: [CommonModule, RouterModule, ButtonModule],
  templateUrl: './not-found-page.component.html',
})
export class NotFoundPageComponent {}
