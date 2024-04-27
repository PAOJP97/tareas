import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingServices } from '../../services/loading/loading.services';

@Component({
  selector: 'tasks-main',
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit {
  public isLoading: boolean = false;

  constructor(
    private _router: Router,
    private _loadingService: LoadingServices
  ) {

  }

  ngOnInit(): void {
    this._router.navigate(["main/panel"]);

    this._loadingService.loadingSubjectHandler().subscribe((loading) => {
      setTimeout(()=>{
        this.isLoading = loading;
      }, 500)
    })
  }

  onMenuClick($event: any) {
    this._router.navigate(["main/"+$event]);
  }
}

