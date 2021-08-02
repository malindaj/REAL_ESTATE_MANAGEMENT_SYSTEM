import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {ImageUploadService} from "../../../../../shared/image-upload.service";
import {AgentService} from "../../../../../shared/agent.service";

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.css']
})
export class Step1Component implements OnInit {

  propertyForm: FormGroup;
  errors = null;
  image;
  image2;
  image3;
  floor_plan;
  fileName1;
  fileName2;
  fileName3;
  floor;


  constructor(
    public router: Router,
    public fb: FormBuilder,
    public imageUpload: ImageUploadService,
    public agentService: AgentService
  ) {
    this.propertyForm = this.fb.group({
      title: [''],
      price: [''],
      type: [''],
      bedroom: [''],
      bathroom: [''],
      garages: [''],
      city: [''],
      address: [''],
      area: [''],
      description: [''],
      purpose: [''],

    });
  }

  ngOnInit(): void {
  }
  onFileSelected1(event) {
    const file: File = event.target.files[0];

    console.log(event);
    console.log('--------------');
    console.log(file.name);
    this.fileName1 = file.name;
    const image1 = new FormData();
    image1.append('image', file);
    this.imageUpload.imageUpload(image1).subscribe(
      result => {
        console.log(result);
        console.log(result.image_url);
        this.image = result.image_url;
      },
      error => {
        console.log(error);
      }
    );
  }
  onFileSelected2(event) {
    const file: File = event.target.files[0];

    console.log(event);
    console.log('--------------');
    console.log(file.name);
    this.fileName2 = file.name;
    const image1 = new FormData();
    image1.append('image', file);
    this.imageUpload.imageUpload(image1).subscribe(
      result => {
        console.log(result);
        console.log(result.image_url);
        this.image2 = result.image_url;
      },
      error => {
        console.log(error);
      }
    );
  }
  onFileSelected3(event) {
    const file: File = event.target.files[0];

    console.log(event);
    console.log('--------------');
    console.log(file.name);
    this.fileName3 = file.name;
    const image1 = new FormData();
    image1.append('image', file);
    this.imageUpload.imageUpload(image1).subscribe(
      result => {
        console.log(result);
        console.log(result.image_url);
        this.image3 = result.image_url;
      },
      error => {
        console.log(error);
      }
    );
  }
  onFileSelected4(event) {
    const file: File = event.target.files[0];

    console.log(event);
    console.log('--------------');
    console.log(file.name);
    this.floor = file.name;
    const image1 = new FormData();
    image1.append('image', file);
    this.imageUpload.imageUpload(image1).subscribe(
      result => {
        console.log(result);
        console.log(result.image_url);
        this.floor_plan = result.image_url;
      },
      error => {
        console.log(error);
      }
    );
  }

  onSubmit() {
    const properyData = new FormData();
    properyData.append('title',this.propertyForm.value.title);
    properyData.append('price',this.propertyForm.value.price);
    properyData.append('type',this.propertyForm.value.type);
    properyData.append('bedroom',this.propertyForm.value.bedroom);
    properyData.append('bathroom',this.propertyForm.value.bathroom);
    properyData.append('garages',this.propertyForm.value.garages);
    properyData.append('city',this.propertyForm.value.city);
    properyData.append('address',this.propertyForm.value.address);
    properyData.append('area',this.propertyForm.value.area);
    properyData.append('description',this.propertyForm.value.description);
    properyData.append('purpose',this.propertyForm.value.purpose);
    properyData.append('image',this.image);
    properyData.append('image2',this.image2);
    properyData.append('image3',this.image3);
    properyData.append('floor_plan',this.floor_plan);
    console.log(properyData.getAll(this.errors));
    console.log(this.errors);
    this.agentService.addProperty(properyData).subscribe(
      result => {
        console.log(result);
      },
      error => {
        this.errors = error.error;
      },
      () => {
        this.propertyForm.reset();
      }
    );
  }

}
