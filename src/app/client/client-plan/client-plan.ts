export interface ClientPlan {
    id: string;
    name: string;
    email: string;
    company_name: string;
    created_at: string; // Puedes cambiar a Date si deseas manejarlo como objeto de fecha
    updated_at: string; // Puedes cambiar a Date si deseas manejarlo como objeto de fecha
    plan: string;
}
