export interface Client {
    id: string;
    name: string;
    email: string;
    company_name: string;
    created_at: string;
    updated_at: string;
    plan:string | null;
}
