import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form: any = {
    username: null,
    password: null,
  };

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    // private dialog: MatDialog,
    private router: Router
  ) {
    if (this.storageService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe({
      next: (data) => {
        this.storageService.saveUser(data);
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err);
        Swal.fire({
          title: 'Error!',
          text: 'เกิดข้อผิดพลาด\n กรุณาลองใหม่อีกครั้ง',
          icon: 'error',
          confirmButtonText: 'OK',
        })
      },
    });
  }
}
