import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../../core/auth.service';
import { map, first } from 'rxjs/operators';


type UserFields = 'email' | 'password';
type FormErrors = { [u in UserFields]: string };

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.less']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  newUser = false;

  formErrors: FormErrors = {
    'email': '',
    'password': '',
  };
  validationMessages = {
    'email': {
      'required': 'Email is required.',
      'email': 'Email must be a valid email'
    },
    'password': {
      'required': 'Password is required.',
      'pattern': 'Password must be include at one letter and one number.',
      'minlength': 'Password must be at least 6 characters long.',
      'maxlength': 'Password cannot be more than 25 characters long.',
    }
  };

  constructor(private fb: FormBuilder, private auth: AuthService) { }

  ngOnInit() {
    this.buildForm();
  }

  toggleForm() {
    this.newUser = !this.newUser;
    this.buildForm();
  }

  signup() {
    return this.auth.emailSignUp(this.userForm.value['email'], this.userForm.value['password'])
      .then(user => console.log(user))
      .catch(err => console.log(err))
  }

  login() {
    return this.auth.emailLogin(this.userForm.value['email'], this.userForm.value['password'])
      .then(user => console.log(this.auth.user))
      .catch(err => console.log(err))
  }

  buildForm() {
    this.userForm = this.fb.group({
      'email': ['', {
        validators: [Validators.required, Validators.email],
        asyncValidators: this.newUser ? [this.validateEmailNotTaken.bind(this)] : undefined,
        updateOn: this.newUser ? 'blur' : null
      }],
      'password': ['', [
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25),
      ]],
    });

    this.userForm.valueChanges.subscribe((data) => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.userForm) { return; }
    
    const form = this.userForm;
    
    for (const field in this.formErrors) {
      if (Object.prototype.hasOwnProperty.call(this.formErrors, field) && (field === 'email' || field === 'password')) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          if (control.errors) {
            for (const key in control.errors) {
              if (key !== 'emailTaken' && Object.prototype.hasOwnProperty.call(control.errors, key) ) {
                this.formErrors[field] += `${(messages as {[key: string]: string})[key]} `;
              }
            }
          }
        }
      }
    }
  }

  validateEmailNotTaken(control: AbstractControl) {
    return this.auth.checkEmailNotTaken(control.value).pipe(
      map(res => res ? { 'emailTaken': true } : null),
      first()
    )
  }
}
