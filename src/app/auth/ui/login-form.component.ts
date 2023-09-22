import {
  ChangeDetectionStrategy,
  Component,
  Output,
  inject,
  EventEmitter,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { LoginModel } from '../data/login.model';

@Component({
  selector: 'auth-login-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
  ],
  template: `
    <mat-card class="form-card">
      <mat-card-header>
        <mat-card-title>Login</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <p>
            <mat-form-field appearance="fill" class="mat-control">
              <mat-label>Username</mat-label>
              <input
                matInput
                formControlName="username"
                placeholder="Username"
              />
            </mat-form-field>
          </p>
          <p>
            <mat-form-field class="mat-control" appearance="fill">
              <mat-label>Password</mat-label>
              <input
                type="password"
                formControlName="password"
                matInput
                placeholder="Password"
              />
            </mat-form-field>
          </p>

          <p>
            <button
              mat-raised-button
              color="primary"
              [disabled]="loginForm.invalid"
              type="submit"
            >
              Save
            </button>
          </p>
        </form>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      :host {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
      }
      .form-card {
        width: 500px;
      }

      mat-card-content {
        padding: 10px;
      }

      .mat-control {
        width: 100%;
      }
    `,
  ],
})
export class LoginFormComponent {
  @Output() submit = new EventEmitter<LoginModel>();
  private readonly fb: FormBuilder = inject(FormBuilder);

  loginForm: FormGroup = this.fb.group({
    id: [''],
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit() {
    this.submit.emit(this.loginForm.value);
  }
}
