import { Component, Input, OnInit } from '@angular/core';
import { BoardService } from './board.service';
import { Board } from './Board';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  @Input() board!: Board;
  isDivVisible: boolean = true;
  messages: Array<{ tipo: string, mensaje: string }> = [];
  newMessage: string = ''; 
  currentTime: string = '';

  constructor(private boardService:BoardService) { }


  ngOnInit() {

    this.updateCurrentTime(); 


    let token  = localStorage.getItem('token');
    let client_id = localStorage.getItem('client_id');
    this.getBoard(token, client_id);
  
  }

  getBoard(token: string | null, client_id: string | null) {
    this.boardService.getBoard(token,client_id).subscribe(board => {
      console.log('board:', board);
      this.board = board;
    });

  }

  
  onActivateClick(): void {
    this.isDivVisible = !this.isDivVisible;  
    this.messages.push({ tipo: "IA", mensaje: this.board.ia_response.msg }); 
      this.newMessage = ''; 
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      this.messages.push({ tipo: "USER", mensaje: this.newMessage }); 
      this.newMessage = ''; 
      const delay = this.getRandomDelay();

      setTimeout(() => {
        this.messages.push({ tipo: 'IA', mensaje: this.board.ia_response.msg });
      }, delay);
      // call for new message to generative IA and push into messages Array

    }
  }

  updateCurrentTime() {
    const date = new Date();
    this.currentTime = date.toLocaleTimeString(); // Almacena la hora en formato de cadena
  }

  getRandomDelay(): number {
    const delays = [2000, 3000, 4000, 5000]; // Los posibles tiempos de retraso
    const randomIndex = Math.floor(Math.random() * delays.length); // Seleccionar un índice aleatorio
    return delays[randomIndex]; // Retornar el valor aleatorio
  }

}
