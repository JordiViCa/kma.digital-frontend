import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent  implements OnInit {

  animationTrigger: boolean = false;

  constructor( ) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.animationTrigger = true;
    }, 5);
  }

}
