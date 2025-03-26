import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { TestService } from '../../../services/test.service';

@Component({
  selector: 'app-login-page',
  imports: [CommonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent implements OnInit {
  private readonly testService = inject(TestService);

  ngOnInit() {
    this.testService.getTest().subscribe((data) => {
      console.log(data);
    });
  }
}
