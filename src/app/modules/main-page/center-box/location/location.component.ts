import {Component, OnInit} from '@angular/core';
import {Loader} from "@googlemaps/js-api-loader";

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    let loader = new Loader({
      apiKey: `AIzaSyCENrbeYmbz-2hOF_VXO8NxrMNo4JFrwrA`
    })

    loader.load().then(() => {
      const map = new google.maps.Map(document.getElementById("map")!, {
        center: {lat: 54.3719828, lng: 18.6340791},
        zoom: 16,
        mapTypeId: 'satellite'
      })

      new google.maps.Marker({
        position: {lat: 54.3719828, lng: 18.6340791},
        map,
        title: "Hello World!",
      });
    })
  }

}
