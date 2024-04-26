import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'main-panel',
  templateUrl: './panel.component.html',
})
export class PanelComponent implements OnInit {
  public data: any = null;
  public options: any = null;

  constructor(
    private _router: Router
  ) {

  }

  ngOnInit(): void {
    this.simulateFirestoreCall().then((response) => {
      this.data = {
        labels: ['Completadas', 'No completadas'],
        datasets: [
            {
                data: [response.conmpletadas, response.no_completadas],
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
    })
    .catch((error) => {
      console.log(error);
    })
  }

  navigateToTareas() {
    this._router.navigate(["main/tareas"]);
  }

  simulateFirestoreCall(): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve(
        {
          total: 95,
          conmpletadas: 45,
          no_completadas: 50
        }
      ),
      reject('ERROR');
    })
  }
}

