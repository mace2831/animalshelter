import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from "@angular/forms";
import { Router } from '@angular/router';
import { AnimalDataService } from '../services/animal-data.service';

@Component({
  selector: 'app-add-animal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-animal.component.html',
  styleUrl: './add-animal.component.css'
})

export class AddAnimalComponent implements OnInit {
  addForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private animalService: AnimalDataService
  ){}

  ngOnInit(){
    this.addForm = this.formBuilder.group({
      _id: [],
      rec_num: ['', Validators.required],
      age_upon_outcome: ['', Validators.required],
      animal_id: ['', Validators.required],
      animal_type: ['', Validators.required],
      breed: ['', Validators.required],
      color: ['', Validators.required],
      date_of_birth: ['', Validators.required],
      datetime: ['', Validators.required],
      monthyear: ['', Validators.required],
      name: ['', Validators.required],
      outcome_subtype: ['', Validators.required],
      sex_upon_outcome: ['', Validators.required],
      location_lat: ['', Validators.required],
      location_long: ['', Validators.required],
      age_upon_outcome_in_weeks: ['', Validators.required]
    })
  }

  public onSubmit(){
    this.submitted = true;
    if(this.addForm.valid){
      this.animalService.addAnimal(this.addForm.value)
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.router.navigate(['']);
        },
        error:(error: any)=>{
          console.log('Error: ' + error);
        }
      });
    }
  }
  get f() {return this.addForm.controls;}
}
