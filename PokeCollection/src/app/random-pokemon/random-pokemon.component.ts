import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogMessageComponent } from '../dialog-message/dialog-message.component';
import Poke from '../models/Poke';
import { AuthService } from '../services/Auth/auth.service';
import { CollectionService } from '../services/Collection/collection.service';
import { DailyService } from '../services/Daily/daily.service';
import { DataService } from '../services/Data/data.service';

@Component({
	selector: 'app-random-pokemon',
	templateUrl: './random-pokemon.component.html',
	styleUrls: ['./random-pokemon.component.css'],
})
export class RandomPokemonComponent implements OnInit, OnDestroy {
	pokemonList = [] as number[];
	lastDate!: string;
	actualDate!: string;
	actualPoke: Poke | undefined;

	authUpdateSub: any;

	constructor(
		private db: CollectionService,
		private authService: AuthService,
		private dataService: DataService,
		private daily: DailyService,
		public dialog: MatDialog
	) {
		//initialize date value to today
		this.actualDate = new Date().toLocaleDateString();
		this.lastDate = this.actualDate;
	}
	// get variables 
	ngOnInit() {
		this.getPokemonList();
		this.getLastDateOfUser();
		this.authUpdateSub = this.authService.authStateUpdate.subscribe(() => {
			this.getPokemonList();
			this.getLastDateOfUser();
		});
	}
	// unsubscribe to connection user
	ngOnDestroy() {
		this.authUpdateSub.unsubscribe();
	}
	//send pokemon ID to firebase 
	sendPokemon(pokemonID: number): void {
		var id = this.authService.currentUserId;
		if (id != null && id.length > 0) {
			//send to pokemon ID list of the user
			this.db.sendToSpecific(id, pokemonID);
			//add current user ID to the claimed pokemon user list for today
			this.daily.addDate(id);
		} else {
			console.log('you are not connected');
		}
	}
	//get List of pokemon of the current user
	getPokemonList() {
		this.db
			.getPokemon(this.authService.currentUserId)
			.subscribe((collection) => {
				this.pokemonList = [];
				for (var i = 0; i < collection.length; i++) {
					this.pokemonList.push(collection[i]);
				}
			});
	}
	// get a random pokemon ID
	getRandomId() {
		var number = Math.floor(Math.random() * 802 + 1);
		this.dataService
			.getMoreData(String(number))
			.then((uniqResponse: Poke) => {
				// new pokemon 
				this.actualPoke = uniqResponse;
			})
			.catch((err) => {
				this.dialog.open(DialogMessageComponent, {
					data: {
						err: 'Pokemon is not found',
					},
				});
				throw err;
			});
		return number;
	}
  // get the date of the last claimed pokemon
	getLastDateOfUser() {
		this.daily
			.getDate(this.authService.currentUserId)
			.subscribe((lastDate) => (this.lastDate = lastDate));
	}
	//compare the current date and the last date
	compareDate(): boolean {
		if (this.lastDate === this.actualDate) return false;
		else {
			return true;
		}
	}
}
