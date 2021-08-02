import {Component, OnInit, Renderer2} from '@angular/core';
import {AgentService} from "../../shared/agent.service";
import {Property} from "../layouts/property/property-list/property-list.component";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //search form var
  city;
  type;
  purpose;
  bedroom;
  bathroom;
  minprice;
  maxprice;

  baseUrl = 'http://localhost:8000/storage/images/';
  propertyList: any[]  ;

  zoom = 12;
  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
    center: {lat: 6.9271, lng: 79.8612},
  };

  constructor(public agentService: AgentService, private  renderer: Renderer2) {
    this.agentService.propertyList().subscribe((data:any) => {
      this.propertyList = data;
      console.log(data);
      console.log(this.propertyList);
      console.log('****************');
      console.log(this.propertyList.length);
    });
  }

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
    navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
    });
  }
}


