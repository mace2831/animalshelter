import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Animal } from '../models/animal';
import { AuthenticationService } from '../services/authentication.service';
import { AnimalDataService } from '../services/animal-data.service';

@Component({
  selector: 'app-animal-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './animal-card.component.html',
  styleUrl: './animal-card.component.css'
})
export class AnimalCardComponent implements OnInit {

  @Input() animal: any;

  constructor(private router: Router,
    private authenticationService: AuthenticationService,
    private animalDataService: AnimalDataService
  ){}
  
  ngOnInit(): void {
      
  }

  public isLoggedIn()
  {
    return this.authenticationService.isLoggedIn();
  }

  public editAnimal(animal: Animal){
    localStorage.removeItem('rec_num');
    localStorage.setItem('rec_num', animal.rec_num);
    this.router.navigate(['edit-animal']);
  }

  public deleteAnimal(animal: Animal): void {
    console.log('Deleting animal:', animal);
    this.animalDataService.deleteAnimal(animal.rec_num).subscribe(
      response => {
        console.log('Animal deleted successfully', response);
        window.location.reload();
      },
      error => {
        console.error('Failed to delete animal', error);
      }
    );
  }

}
