import { Component, OnInit } from '@angular/core';
import {AgentService} from "../../../../shared/agent.service";

export class Property {
  title: String;
  price: number;
  id: number;
  bedroom: string;
  bathroom: string;
  garages: string;
  type: string;
  area: string;
  image: string;
  city: string;

}

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {

  properties: any;
  baseUrl = 'http://localhost:8000/storage/images/';
  propertyList: Property[]  ;
  prop: Property;

  constructor(public agentService: AgentService) {
    this.agentService.propertyList().subscribe((data:any) => {
      this.propertyList = data;
      console.log(data);
      console.log(this.propertyList);
      console.log('****************');
      console.log(this.propertyList.length);
    });
  }

  ngOnInit(): void {

  }

}
