import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import firebase from 'firebase';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { DialogMessageComponent } from 'src/app/dialog-message/dialog-message.component';
@Injectable({
	providedIn: 'root',
})
export class AuthService {
	// Declare attribut
	authStateUpdate: Subject<boolean>; // the type does not import as it is only a trigger
	authState!: firebase.User | null | undefined;
	userID: string | undefined;
	date = new Date();
	//Create a Observable to send new userID to all subscribers if the value of userID changed 
	userIDObservable = this.afAuth.authState.pipe(map((auth) => auth?.uid));
	yourDate = new Date(
		this.date.getTime() - 1000 * 60 * 60 * 24
	).toLocaleDateString();

	constructor(
		private afAuth: AngularFireAuth,
		private router: Router,
		private db: AngularFireDatabase,
		public dialog: MatDialog
	) {
		this.authStateUpdate = new Subject<boolean>();
		// get the current user
		this.afAuth.authState.subscribe((auth) => {
			this.authState = auth;
			this.authStateUpdate.next(true);
			this.userID = auth?.uid;
		});
	}
	// Database user reference
	dbRef = this.db.database.ref('users');

	// get if the user is anonymous
	get isUserAnonymousLoggedIn(): boolean {
		return typeof this.authState !== 'undefined' && this.authState !== null
			? this.authState.isAnonymous
			: false;
	}

	// get current user id
	get currentUserId(): string {
		return typeof this.authState !== 'undefined' && this.authState !== null
			? this.authState.uid
			: '';
	}

	// get current user
	get currentUser(): firebase.User | null {
		return typeof this.authState !== 'undefined' ? this.authState : null;
	}

	// get if the user email is logged in
	get isUserEmailLoggedIn(): boolean {
		if (this.authState !== null && !this.isUserAnonymousLoggedIn) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * sign up to the database
	 *
	 * @param email
	 * @param password
	 * @returns
	 */
	signUpWithEmail(email: string, password: string) {
		return this.afAuth
			.createUserWithEmailAndPassword(email, password)
			.then((userCredentials) => {
				this.authState = userCredentials.user;
				if (this.authState != null) {
					// add id to the database
					this.dbRef.child(this.authState.uid).set(this.yourDate);
				}
			})
			.catch((error) => {
				this.dialog.open(DialogMessageComponent, {
					data: {
						error: error.message,
					},
				});
				throw error;
			});
	}

	/**
	 * login with user credentials
	 *
	 * @param email
	 * @param password
	 * @returns
	 */
	loginWithEmail(email: string, password: string) {
		return this.afAuth
			.signInWithEmailAndPassword(email, password)
			.then((userCredentials) => {
				// retrieve userCredentials
				this.authState = userCredentials.user;
			})
			.catch((error) => {
				this.dialog.open(DialogMessageComponent, {
					data: {
						error: error.message,
					},
				});
				throw error;
			});
	}

	signOut(): void {
		this.afAuth.signOut();
		void this.router.navigate(['/']);
	}
}
