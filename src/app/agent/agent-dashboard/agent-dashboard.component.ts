import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClientPlanService } from '../../client/client-plan/client-plan.service';
import { AgenteService } from '../agent-register/agente.service';

@Component({
  selector: 'app-agent-dashboard',
  templateUrl: './agent-dashboard.component.html',
  styleUrls: ['./agent-dashboard.component.css']
})
export class AgentDashboardComponent implements OnInit {


  agent_id: string = '';
  incidents : any[] = [];

  constructor(private toastr: ToastrService,
    private router: Router,
    private plansService: ClientPlanService,
    private AgenteService: AgenteService) {

    this.agent_id = localStorage.getItem('agent_id') || '';
   }

  

  ngOnInit() {


    this.loadAgentData(this.agent_id);
    this.loadIncidentsByAgentId(this.agent_id);
  }

  crearIncidencia(){
    console.log('Crear incidencia');
    this.router.navigate(['incidents']);

  }

  loadIncidentsByAgentId(agent_id : string){
    this.AgenteService.getIncidentsByAgent(agent_id).subscribe(
      incidents => {
        this.incidents = incidents;
        if(this.incidents.length == 0){
          this.toastr.info('No hay incidencias asignadas', 'Info');
        }
      },
      error => {
        this.toastr.error('Error al cargar las incidencias', 'Error');
      }
    );
  }

  loadAgentData(agent_id : string){
    this.AgenteService.getIncidentsByAgent(agent_id).subscribe(
      incidents => {
        this.incidents = incidents;
        if(this.incidents.length == 0){
          this.toastr.info('No hay incidencias asignadas', 'Info');
        }
      },
      error => {
        this.toastr.error('Error al cargar las incidencias', 'Error');
      }
    );
  }

}
