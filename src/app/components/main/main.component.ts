import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'tasks-main',
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit {
  constructor(
    private _router: Router
  ) {

  }

  ngOnInit(): void {
    
  }

  onMenuClick($event: any) {
    this._router.navigate(["main/"+$event]);
  }
}

