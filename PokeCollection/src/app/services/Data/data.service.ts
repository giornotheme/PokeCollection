import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogMessageComponent } from 'src/app/dialog-message/dialog-message.component';
import Const from 'src/utils/const';
import Poke from '../../models/Poke';

@Injectable({
	providedIn: 'root',
})
export class DataService {
	constructor(private http: HttpClient, private dialog: MatDialog) {}

	getPokemon() {
		return this.http.get('https://pokeapi.co/api/v2/pokemon?limit=802');
	}

	async getMoreData(name: string): Promise<Poke> {
		const poke = (await this.http
			.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
			.toPromise()) as Poke;

		return poke;
	}

	sortPokemonByGene(table: string[]) {
		// Create local table for sort pokemon by generation
		let pokeGen1: Poke[] = [];
		let pokeGen2: Poke[] = [];
		let pokeGen3: Poke[] = [];
		let pokeGen4: Poke[] = [];
		let pokeGen5: Poke[] = [];
		let pokeGen6: Poke[] = [];
		let pokeGen7: Poke[] = [];

		// Retrieve the constant of generation
		let GENE1 = Const.GENE1;
		let GENE2 = Const.GENE2;
		let GENE3 = Const.GENE3;
		let GENE4 = Const.GENE4;
		let GENE5 = Const.GENE5;
		let GENE6 = Const.GENE6;

		let pokeGen: Poke[][] = [];

		// Browse all pokeId in the table
		table.forEach((pokeId) => {
			// Retrieve data of each pokemon
			this.getMoreData(pokeId)
				.then((uniqResponse: Poke) => {
					// Push pokemon into generation in function of the value of the id
					if (uniqResponse.id <= GENE1) {
						pokeGen1.push(uniqResponse);
					} else if (uniqResponse.id <= GENE2) {
						pokeGen2.push(uniqResponse);
					} else if (uniqResponse.id <= GENE3) {
						pokeGen3.push(uniqResponse);
					} else if (uniqResponse.id <= GENE4) {
						pokeGen4.push(uniqResponse);
					} else if (uniqResponse.id <= GENE5) {
						pokeGen5.push(uniqResponse);
					} else if (uniqResponse.id <= GENE6) {
						pokeGen6.push(uniqResponse);
					} else {
						pokeGen7.push(uniqResponse);
					}
				})
				.catch((err) => {
					this.dialog.open(DialogMessageComponent, {
						data: {
							error: 'Pokemon not found',
						},
					});
					throw err;
				});
		});

		// Push all generation into the general table of pokemon
		pokeGen.push(
			pokeGen1,
			pokeGen2,
			pokeGen3,
			pokeGen4,
			pokeGen5,
			pokeGen6,
			pokeGen7
		);
		return pokeGen;
	}
}
