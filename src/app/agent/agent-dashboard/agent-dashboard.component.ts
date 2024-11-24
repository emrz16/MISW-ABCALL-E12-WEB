import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClientPlanService } from '../../client/client-plan/client-plan.service';
import { AgenteService } from '../agent-register/agente.service';
import { Agent } from '../Agent';

@Component({
  selector: 'app-agent-dashboard',
  templateUrl: './agent-dashboard.component.html',
  styleUrls: ['./agent-dashboard.component.css']
})
export class AgentDashboardComponent implements OnInit {


  agent_id: string = '';
  incidents : any[] = [];
  agent: Agent = {} as Agent;

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
    this.AgenteService.getAgentById(agent_id).subscribe(
      agent => {
        this.agent = agent;
        console.log('Agente:', this.agent);
      },
      error => {
        this.toastr.error('Error al cargar la informaciòn del agente', 'Error');
      }
    );
  }

  editIncident(incidentId: number) {
    console.log('Editar incidente con ID:', incidentId);
    localStorage.setItem('incident_to_update', incidentId.toString());
    this.router.navigate(['incident/update']);
  }

}
