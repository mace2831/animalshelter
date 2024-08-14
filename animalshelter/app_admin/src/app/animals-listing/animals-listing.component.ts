import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimalCardComponent } from '../animal-card/animal-card.component';
import { AuthenticationService } from '../services/authentication.service';
import { AnimalDataService } from '../services/animal-data.service';
import { Animal } from '../models/animal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-animals-listing',
  standalone: true,
  imports: [CommonModule, AnimalCardComponent],
  templateUrl: './animals-listing.component.html',
  styleUrl: './animals-listing.component.css',
  providers: [AnimalDataService]
})

export class AnimalsListingComponent implements OnInit {

  animals!: Animal[];
  message: string = '';

  constructor(
    private animalDataService: AnimalDataService,
    private router: Router,
    private authenticationService: AuthenticationService){
    console.log('animal-listing constructor');
   }

   public addAnimal(): void{
    this.router.navigate(['add-animal']);
   }

   private getAnimals():void{
    this.animalDataService.getAnimals()
    .subscribe({
      next: (value: any) => {
        this.animals = value;
        if(value.length > 0)
        {
          this.message = 'There are ' + value.length + ' animals available.';
        }
        else
        {
          this.message = 'There were no animals retreived from the database.';
        }
        console.log(this.message);
      },
      error: (error: any) => {
        console.log('Error: ' + error);
      }
    })
   }

   public isLoggedIn()
   {
     return this.authenticationService.isLoggedIn();
   }

  ngOnInit(): void {
      console.log('ngOnInit');
      this.getAnimals();
  }
}
