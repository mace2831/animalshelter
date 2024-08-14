import { Routes } from '@angular/router';
import { AddAnimalComponent } from './add-animal/add-animal.component';
import { AnimalsListingComponent } from './animals-listing/animals-listing.component';
import { EditAnimalComponent } from './edit-animal/edit-animal.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {path: 'add-animal', component: AddAnimalComponent},
    {path: 'edit-animal', component: EditAnimalComponent},
    {path: 'login', component: LoginComponent},
    {path: '', component: AnimalsListingComponent, pathMatch: 'full'}
];
