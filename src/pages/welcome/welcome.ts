import { Router } from 'aurelia-router';
import { autoinject } from 'aurelia-framework';

@autoinject
export class Welcome {

  constructor(private router: Router) {
  } 
  
  start() {
    this.router.navigateToRoute('episode_first')
  }
}
