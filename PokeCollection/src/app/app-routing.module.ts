import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllCollectionComponent } from './all-collection/all-collection.component';
import { DescriptionComponent } from './description/description.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RandomPokemonComponent } from './random-pokemon/random-pokemon.component';

const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: 'all-collection', component: AllCollectionComponent },
	{ path: '', component: HomeComponent, pathMatch: 'full' },
	{ path: 'description/:pokeID', component: DescriptionComponent },
	{ path: 'randomPokemon', component: RandomPokemonComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
