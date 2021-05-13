import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { EMPTY, Observable } from 'rxjs';

export interface Pokemon {
	pokemonID: number;
}

@Injectable({
	providedIn: 'root',
})
export class CollectionService {
	// declare attribut
	pokemonList = [] as number[];

	constructor(private db: AngularFireDatabase) {}

	/**
	 * retrieve pokemon collection of an user
	 *
	 * @param userID
	 * @returns
	 */
	getPokemon(userID: string): Observable<any> {
		if (userID != null && userID.length > 0) {
			return this.db.list(`collection/${userID}/`).valueChanges();
		}
		return EMPTY;
	}

	/**
	 *  add to the database the specific pokemon
	 *  into his collection
	 *
	 * @param userID
	 * @param pokemonID
	 * @returns
	 */
	sendToSpecific(userID: string, pokemonID: number) {
		if (userID != null) {
			this.db.list(`collection/${userID}`).push(pokemonID);
		}
		return EMPTY;
	}
}
