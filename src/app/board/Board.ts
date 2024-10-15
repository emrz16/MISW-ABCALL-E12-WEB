export interface Client {
    id: string;
    name: string;
    email: string;
    company_name: string;
    created_at: string;
    updated_at: string;
    plan: string | null;
  }
  
  export interface Stats {
    total_incidents: number;
    total_open_incidents: number;
    total_closed_incidents: number;
    average_resolution_time: string;
  }

  /*
export interface Stats {
  total_incidents: number;
  total_open_incidents: number;
  total_closed_incidents: number;
  average_resolution_time: string;
  average_response_time: string;  // Nuevo campo para tiempo promedio de respuesta
  total_phone_incidents: number;  // Nuevo campo para incidentes por teléfono
  total_email_incidents: number;  // Nuevo campo para incidentes por email
  total_chat_incidents: number;   // Nuevo campo para incidentes por chat
  compliance_rate: number;        // Nuevo campo para tasa de cumplimiento
}
  */
  
  export interface IaResponse {
    msg: string;
  }
  
  export interface Board {
    client: Client;
    incidents: any[]; // Si tienes la estructura de los incidentes, puedes cambiar "any" por su tipo correspondiente
    stats: Stats;
    ia_response: IaResponse;
  }
