import {Component, OnInit, Renderer2} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AgentService} from "../../../../shared/agent.service";

@Component({
  selector: 'app-agent-detail',
  templateUrl: './agent-detail.component.html',
  styleUrls: ['./agent-detail.component.css']
})
export class AgentDetailComponent implements OnInit {

  id;
  agent;
  baseUrl = 'http://localhost:8000';
  properties: any[] ;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private renderer: Renderer2,
    private agentService: AgentService
  ) {}

  renderExternalScript(src: string): HTMLScriptElement {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    script.async = true;
    script.defer = true;
    this.renderer.appendChild(document.body, script);
    return script;
  }

  ngOnInit(): void {
    this.renderExternalScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyBMhNtTeK3q5agvPCN_yKSk-GQbXg3WULo&callback=myMap').onload = () => {
      console.log('Google API Script loaded');
      // do something with this library
    };
    this.renderExternalScript('/assets/js/jquery.js').onload = () => {
      console.log('Google API Script loaded');
      // do something with this library
    };
    this.renderExternalScript('/assets/js/plugins.js').onload = () => {
      console.log('Google API Script loaded');
      // do something with this library
    };
    this.renderExternalScript('/assets/js/bootstrap-slider.min.js').onload = () => {
      console.log('Google API Script loaded');
      // do something with this library
    };
    this.renderExternalScript('/assets/js/jquery.main.js').onload = () => {
      console.log('Google API Script loaded');
      // do something with this library
    };
    this.renderExternalScript('/assets/js/map2.js').onload = () => {
      console.log('Google API Script loaded');
      // do something with this library
    };
    this.renderExternalScript('/assets/js/init.js').onload = () => {
      console.log('Google API Script loaded');
      // do something with this library
    };
    this.activatedRoute.paramMap.subscribe(params => {
      console.log(params);
      this.id = params.get('id');
    });
    this.agentService.agent(this.id).subscribe(result => {
      console.log(result);
      this.agent = result.agent;
      this.properties = result.property.data;
      console.log(this.properties);
    });
  }

}
