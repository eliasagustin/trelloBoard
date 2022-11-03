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

  constructor(
    private auth: AuthService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {
    this.auth.currentUser.subscribe((user) => {
      //console.log ('user login component: ', user);
      if (user !== null) {
        //console.log('No redirecciona sin usuario')
        this.router.navigateByUrl('/workspace', { replaceUrl: true })
      } else {
        //this.router.navigateByUrl('/workspace', { replaceUrl: true })
      }
    })
  }

  ngOnInit(): void {}

  async signIn() {
    this.spinner.show()
    const result = await this.auth.signInWithEmail(this.email)

    this.spinner.hide()
    if (!result.error) {
      this.linkSuccess = true
    } else {
      alert(result.error.message)
    }
  }
}
