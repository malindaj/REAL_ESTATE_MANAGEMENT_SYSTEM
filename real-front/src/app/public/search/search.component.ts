import {Component, OnInit, Renderer2} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AgentService} from "../../shared/agent.service";
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  propertyList: any[];
  baseUrl = 'http://localhost:8000/storage/images/';
  //search form var
  city;
  type;
  purpose;
  bedroom;
  bathroom;
  minprice;
  maxprice;

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private  agentService: AgentService,
    private  renderer: Renderer2
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


    this.activateRoute.paramMap.subscribe(params => {
      console.log(params);
      this.city = params.get('city');
      this.type = params.get('type');
      this.purpose = params.get('purpose');
      this.minprice = params.get('minprice');
      this.maxprice = params.get('maxprice');
      this.bedroom = params.get('bedroom');
      this.bathroom = params.get('bathroom');
    });
    const search = new FormData();
    search.append('city', this.city);
    search.append('type', this.type);
    search.append('purpose', this.purpose);
    search.append('minprice', this.minprice);
    search.append('maxprice', this.maxprice);
    search.append('bedroom', this.bedroom);
    search.append('bathroom', this.bathroom);

    this.agentService.searchh(search).subscribe(result => {
      console.log(result);
      this.propertyList = result.data;
    },error => {
      console.log(error);
    });
  }

}
