import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators,  FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { routerTransition } from '../router.animations';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor( private formBuilder: FormBuilder, private route: ActivatedRoute,
               private router: Router, private translate: TranslateService) {
                 this.translate.addLangs(['th', 'en']);
                 this.translate.setDefaultLang('th');
                 const browserLang = this.translate.getBrowserCultureLang();
              //   this.translate.use(browserLang.match(/th|en/) ? browserLang : 'th');
                 console.log('language : ', browserLang);
               }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });

  // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/dashboard';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    console.log(this.loginForm);
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;
    console.log('url', this.returnUrl);
    if (this.f.username.value === 'admin' && this.f.password.value === '1234') {
      this.router.navigate([this.returnUrl]);
      localStorage.setItem('isLoggedin', 'true');
    } else {
      this.loading = false;
    }
    // this.authenticationService.login(this.f.username.value, this.f.password.value)
    //     .pipe(first())
    //     .subscribe(
    //         data => {
    //             this.router.navigate([this.returnUrl]);
    //         },
    //         error => {
    //             this.alertService.error(error);
    //             this.loading = false;
    //         });
  }

}
