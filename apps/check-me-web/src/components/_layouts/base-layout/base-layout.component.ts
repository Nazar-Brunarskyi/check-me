import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-base-layout',
  imports: [CommonModule, HeaderComponent, RouterOutlet],
  templateUrl: './base-layout.component.html',
})
export class BaseLayoutComponent {}
