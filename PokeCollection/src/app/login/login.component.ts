import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/Auth/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
})
export class LoginComponent {
	// declare attribut
	email = 'admin@admin.fr';
	password = '123456789a';
	errorMessage = '';
	error: { name: string; message: string } = { name: '', message: '' };

	constructor(public authService: AuthService, private router: Router) {}

	// sign up function
	signUp(): void {
		if (this.validateForm(this.email, this.password)) {
			this.authService
				.signUpWithEmail(this.email, this.password)
				.then(() => {
					void this.router.navigate(['/']);
				})
				.catch((_error) => {
					this.error = _error;
				});
		}
	}
	// login function
	login(): void {
		if (this.validateForm(this.email, this.password)) {
			this.authService
				.loginWithEmail(this.email, this.password)
				.then(() => void this.router.navigate(['/']))
				.catch((_error) => {
					this.error = _error;
					void this.router.navigate(['/login']);
				});
		}
	}

	/**
	 * verify if the form is valid
	 *
	 * @param email
	 * @param password
	 * @returns
	 */
	validateForm(email: string, password: string): boolean {
		if (password.length < 6 || email.length < 0) {
			alert('too short');
			return false;
		}
		return true;
	}
}
