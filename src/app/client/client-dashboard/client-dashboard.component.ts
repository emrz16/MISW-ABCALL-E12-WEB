import { Component, OnInit } from '@angular/core';
import { ClientPlan } from '../client-plan/client-plan';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.css']
})
export class ClientDashboardComponent implements OnInit {

  clientplan: ClientPlan | null = null;
  constructor() { }

  ngOnInit() {
    
    const clientPlanData = sessionStorage.getItem('client_plan');
    
    if (clientPlanData) {
      this.clientplan = JSON.parse(clientPlanData);
      console.log('clientplan:', this.clientplan?.email);
    } else {
      this.clientplan = null;
    }

    

  }

}
