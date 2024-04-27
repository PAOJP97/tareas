import { Component, OnInit } from '@angular/core';
import { Firestore, collection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { TaskServices } from '../../../services/tasks/task.services';
import { LoadingServices } from '../../../services/loading/loading.services';

@Component({
  selector: 'main-panel',
  templateUrl: './panel.component.html',
})
export class PanelComponent implements OnInit {
  public data: any = null;
  public options: any = null;

  constructor(
    private _router: Router,
    private _firestore: Firestore,
    private _taskService: TaskServices,
    private _loadingService: LoadingServices
  ) {

  }

  ngOnInit(): void {
    
    this.data = {
      labels: ['Completadas', 'No completadas'],
      datasets: [
          {
              data: [0, 0],
              backgroundColor: ['#09b614', '#f9ba32']
          }
      ]
    };

    this.options = {
      plugins: {
          legend: {
              labels: {
                  usePointStyle: true,
                  color: '#2F2F31'
              }
          }
      }
    }

    const refTasks = collection(this._firestore, 'tareas');
    this._loadingService.setLoadingSubject(true);
    this._taskService.getTasks(refTasks).then((response) => {
      const completedCount = response.filter((task: any) => task.status === 'Completado')?.length || 0;
      const nonCompletedCount = response.filter((task: any) => task.status === 'No completado')?.length || 0;
      this.data = {
        labels: ['Completadas', 'No completadas'],
        datasets: [
            {
                data: [completedCount, nonCompletedCount],
                backgroundColor: ['#09b614', '#f9ba32']
            }
        ]
      };
    })
    .catch(() => {

    })
    .finally(() => {
      this._loadingService.setLoadingSubject(false);
    })
  }

  navigateToTareas() {
    this._router.navigate(["main/tareas"]);
  }
}

