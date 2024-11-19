import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agent-dashboard',
  templateUrl: './agent-dashboard.component.html',
  styleUrls: ['./agent-dashboard.component.css']
})
export class AgentDashboardComponent implements OnInit {


  agent_id: string = '';
  constructor() {

    this.agent_id = localStorage.getItem('agent_id') || '';
   }

  

  ngOnInit() {
  }

}
