import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  intervalSub: any;
  title = 'angular tour of heroes';

  constructor(private titleService:Title){
    this.titleService.setTitle($localize`${this.title}`)
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    if (this.intervalSub) {
      clearInterval(this.intervalSub);
    }
  }

}
