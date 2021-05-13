import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { EMPTY, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class DailyService {
	// declare attribut
	date = new Date().toLocaleDateString();
	dbRef: string | undefined;

	constructor(private db: AngularFireDatabase) {}

	/**
	 * set the current date
	 *
	 * @param userID
	 */
	addDate(userID: string): void {
		this.db.database
			.ref(`users/${userID}/`)
			.set(new Date().toLocaleDateString());
	}
	/**
	 * retrieve date for an user
	 *
	 * @param userID
	 * @returns
	 */
	getDate(userID: string): Observable<any> {
		if (userID != null && userID.length > 0) {
			return this.db.object(`users/${userID}/`).valueChanges();
		}
		return EMPTY;
	}
}
