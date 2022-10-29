import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email = 'eliasagustin@gmail.com';
  linkSuccess = false;

  constructor(private auth: AuthService,
    private spinner: NgxSpinnerService,
    private router: Router) { }

  ngOnInit(): void {
  }

  async signIn() {
    this.spinner.show();
    const result = await this.auth.signInWithEmail(this.email);
    console.log("~ file: login.component.ts ~ line 26 ~ LoginComponent ~ signIn ~ result", result);

    this.spinner.hide();
    if (!result.error) {
      this.linkSuccess = true;
    } else {
      alert(result.error.message);
    }
  };
}
