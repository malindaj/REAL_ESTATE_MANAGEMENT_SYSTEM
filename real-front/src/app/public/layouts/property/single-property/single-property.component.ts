import {Component, OnInit, Renderer2} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AgentService} from "../../../../shared/agent.service";

@Component({
  selector: 'app-single-property',
  templateUrl: './single-property.component.html',
  styleUrls: ['./single-property.component.css']
})
export class SinglePropertyComponent implements OnInit {
  id;
  agent;
  properties: any[];
  property;
  baseUrl = 'http://localhost:8000/storage/images/';
  baseUrl2 ='http://localhost:8000';

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private  agentService: AgentService,
    private  renderer: Renderer2
  ) { }

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


    this.activateRoute.paramMap.subscribe(params => {
      console.log(params);
      this.id = params.get('id');
    });
    this.agentService.property(this.id).subscribe(result => {
      console.log(result);
      this.property = result.data;
    });
    this.agentService.agent(this.id).subscribe( result => {
      console.log(result);
      this.agent = result.agent;
      this.properties = result.property.data;
    });
  }

}
