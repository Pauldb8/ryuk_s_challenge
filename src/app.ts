import {PLATFORM} from 'aurelia-pal';
import {Router, RouterConfiguration} from 'aurelia-router';

export class App {
  public router: Router;

  public configureRouter(config: RouterConfiguration, router: Router): Promise<void> | PromiseLike<void> | void {
    config.title = 'Aurelia';
    config.map([
      {
        route: ['', 'welcome'],
        name: 'welcome',
        moduleId: PLATFORM.moduleName('./pages/welcome/welcome'),
        title: 'Welcome'
      },
      {
        route: ['episode/:number'],
        name: "episode",
        moduleId: PLATFORM.moduleName('./pages/episode/episode'),
        title: 'Episodes'
      }
    ]);

    this.router = router;
  }
}
