import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import Poke from '../models/Poke';
import { AuthService } from '../services/Auth/auth.service';
import { DataService } from '../services/Data/data.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
	//list of pokemon
	pokemonList: Poke[] = [];
	//userID of connected user
	userID: string | undefined;
	userIDSubscription: Subscription;

	constructor(
		private dataService: DataService,
		private authService: AuthService
	) {
		this.userID = this.authService.currentUserId;
		//subscribe to userID Observable
		this.userIDSubscription = this.authService.userIDObservable.subscribe(
			(userID) => {
				this.userID = userID;
			}
		);
	}
	//initialyze the pokemon list of home page
	ngOnInit(): void {
		let array: string[] = ['12', '693', '213', '99', '654'];
		for (let i = 0; i < 5; i++) {
			this.dataService
				.getMoreData(array[i])
				.then((uniqResponse: Poke) => {
					this.pokemonList.push(uniqResponse);
				});
		}
	}
	// unsubscribe to userID Observable
	ngOnDestroy(): void {
		this.userIDSubscription.unsubscribe();
	}
}
