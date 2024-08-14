import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from "@angular/forms";
import { Router } from '@angular/router';
import { AnimalDataService } from '../services/animal-data.service';
import {Animal} from '../models/animal';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './edit-animal.component.html',
  styleUrl: './edit-animal.component.css'
})
export class EditAnimalComponent {
  public editForm! : FormGroup;
  animal!: Animal;
  submitted = false;
  message : string='';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private animalDataService: AnimalDataService
  ){}

  

  ngOnInit(): void {
      //retreive stashed id
      let rec_num = localStorage.getItem("rec_num");
      if(!rec_num){
        alert("Something wrong, couldn't find where I stashed rec_num!");
        this.router.navigate(['']);
        return;
      }
      console.log('AnimalTripComponent::ngOnInit');
      console.log('rec_num' + rec_num);

      this.editForm = this.formBuilder.group({
        _id: [],
      rec_num: [rec_num, Validators.required],
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

      this.animalDataService.getAnimal(rec_num)
      .subscribe({
        next:(value:any)=>{
          this.animal = value;
          //populate our record
          this.editForm.patchValue(value[0]);
          if(!value)
            {
              this.message = 'No animal Retrieved!';
            }
            else{
              this.message = 'Animal: ' + this.animal + ' retrieved';
            }
            console.log(this.message);
        },
        error:(error:any)=>{
          console.log('Error: ' + error);
        }
      })
  }

  public onSubmit()
  {
    this.submitted=true;

    if(this.editForm.valid)
      {
        this.animalDataService.updateAnimal(this.editForm.value)
        .subscribe({
          next:(value:any)=>{
            console.log(value);
            this.router.navigate(['']);
          },
          error:(error:any)=>{
            console.log('Error: ' + error);
          }
        })
      }
  }
  
  get f(){return this.editForm.controls;}

}
