import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  email = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  iniciarSesion() {
    this.auth.login({ email: this.email, password: this.password })
      .subscribe((res: any) => {
        if (res.status === 'ok') {
          if (res.tipo === 'usuario') this.router.navigate(['/usuario']);
          if (res.tipo === 'informatico') this.router.navigate(['/informatico']);
          if (res.tipo === 'empresa') this.router.navigate(['/empresa']);
        } else {
          this.error = res.msg;
        }
      });
  }
}
