import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user = {
    agent_id: 'AGENT123',
    client_id: 'CLIENT456',
    user_id: 1234
  };

  constructor() { }

  getAgentId(): string {
    return this.user.agent_id;
  }

  getClientId(): string {
    return this.user.client_id;
  }

  getUserId(): number {
    return this.user.user_id;
  }
}