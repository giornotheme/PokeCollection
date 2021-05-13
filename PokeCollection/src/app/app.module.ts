import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { AllCollectionComponent } from './all-collection/all-collection.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CollectionComponent } from './collection/collection.component';
import { DescriptionComponent } from './description/description.component';
import { DialogMessageComponent } from './dialog-message/dialog-message.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RandomPokemonComponent } from './random-pokemon/random-pokemon.component';

@NgModule({
	declarations: [
		AppComponent,
		NavigationComponent,
		LoginComponent,
		CollectionComponent,
		HomeComponent,
		DescriptionComponent,
		RandomPokemonComponent,
		AllCollectionComponent,
		FooterComponent,
		DialogMessageComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		BrowserAnimationsModule,
		MatToolbarModule,
		FormsModule,
		MatCardModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		AngularFireAuthModule,
		AngularFireModule.initializeApp(environment.config),
		MatListModule,
		MatExpansionModule,
		MatTableModule,
		MatGridListModule,
		MatTabsModule,
		MatDialogModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
