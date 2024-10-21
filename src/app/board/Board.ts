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
  average_response_time: string;  
  total_phone_incidents: number;  
  total_email_incidents: number;  
  total_chat_incidents: number;  
  compliance_rate: number;      
}
  
  
  export interface IaResponse {
    msg: string;
  }
  
  export interface Board {
    client: Client;
    incidents: any[];
    stats: Stats;
    ia_response: IaResponse;
  }
