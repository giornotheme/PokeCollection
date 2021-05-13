import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/Auth/auth.service';
import { CollectionService } from '../services/Collection/collection.service';

@Component({
	selector: 'app-all-collection',
	templateUrl: './all-collection.component.html',
})
export class AllCollectionComponent implements OnInit, OnDestroy {
	// declare attributes
	pokemonList = [] as string[];
	authUpdateSub: any;

	constructor(
		private db: CollectionService,
		private authService: AuthService
	) {}

	ngOnInit(): void {
		this.getPokemonList();
		this.authUpdateSub = this.authService.authStateUpdate.subscribe(() => {
			this.getPokemonList();
		});
	}

	ngOnDestroy(): void {
		this.authUpdateSub.unsubscribe();
	}

	// retrieve the collection of an user
	getPokemonList(): void {
		this.db
			.getPokemon(this.authService.currentUserId)
			.subscribe((collection) => {
				// initialize empty array
				this.pokemonList = [];
				// hydrate the array
				for (var i = 0; i < collection.length; i++) {
					this.pokemonList.push(collection[i]);
				}
			});
	}
}
