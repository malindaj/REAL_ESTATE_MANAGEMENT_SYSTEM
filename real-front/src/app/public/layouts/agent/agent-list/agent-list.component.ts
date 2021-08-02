import { Component, OnInit } from '@angular/core';
import {AgentService} from "../../../../shared/agent.service";

export class AgentList{
  name: String ;
  image: String ;
  id: number;
}

@Component({
  selector: 'app-agent-list',
  templateUrl: './agent-list.component.html',
  styleUrls: ['./agent-list.component.css']
})
export class AgentListComponent implements OnInit {
  agentList: any;
  baseUrl = 'http://localhost:8000';

  constructor(public agentService: AgentService) {
    this.agentService.agentList().subscribe((data:any) => {
      this.agentList = data;
      console.log(data);
      console.log('****************');
      console.log();
    });
  }

  ngOnInit(): void {
    this.agentService.agentList().subscribe((data:any) => {
      this.agentList = data;
      console.log();
      console.log('*****************');
      console.log();
    });
  }

}
