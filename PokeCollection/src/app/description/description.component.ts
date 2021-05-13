import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import Const from 'src/utils/const';
import { DialogMessageComponent } from '../dialog-message/dialog-message.component';
import Poke from '../models/Poke';
import { DataService } from '../services/Data/data.service';

@Component({
	selector: 'app-description',
	templateUrl: './description.component.html',
	styleUrls: ['./description.component.css'],
})
export class DescriptionComponent implements OnInit {
	// retrieve the generation constant from const.ts in utils
	GENE1 = Const.GENE1;
	GENE2 = Const.GENE2;
	GENE3 = Const.GENE3;
	GENE4 = Const.GENE4;
	GENE5 = Const.GENE5;
	GENE6 = Const.GENE6;

	// stockage of the actual pokemon
	pokemon!: Poke;

	// type data source of the statistics
	data: {
		hp: number;
		attack: number;
		defense: number;
		specialAttack: number;
		specialDefense: number;
		speed: number;
	}[] = [];
	dataSource = new MatTableDataSource<any>(this.data);

	// name of the columns in the table statistics
	displayedColumns: string[] = [
		'hp',
		'attack',
		'defense',
		'special attack',
		'special defense',
		'speed',
	];

	constructor(
		private dataService: DataService,
		private route: ActivatedRoute,
		private dialog: MatDialog
	) {}

	ngOnInit(): void {
		// declare attributes
		let pokeStats;
		// retrieve the pokemon with the id in the url
		let pokeID = this.route.snapshot.params['pokeID'];

		this.dataService
			.getMoreData(pokeID)
			.then((uniqResponse: Poke) => {
				this.pokemon = uniqResponse;

				// retrieve statistics of the pokemon
				pokeStats = {
					hp: uniqResponse.stats[0].base_stat,
					attack: uniqResponse.stats[1].base_stat,
					defense: uniqResponse.stats[2].base_stat,
					specialAttack: uniqResponse.stats[3].base_stat,
					specialDefense: uniqResponse.stats[4].base_stat,
					speed: uniqResponse.stats[5].base_stat,
				};

				// stock the stat in data
				this.data.push(pokeStats);
				// give the stat to the mat table
				this.dataSource = new MatTableDataSource<any>(this.data);
			})
			.catch((error) => {
				this.dialog.open(DialogMessageComponent, {
					data: {
						error: 'Pokemon not found',
					},
				});
				throw error;
			});
	}
}
