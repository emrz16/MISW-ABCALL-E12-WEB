import { Component, Input, OnInit } from '@angular/core';
import { BoardService } from './board.service';
import { Board } from './Board';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


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


  generatePDF() {
    const doc = new jsPDF();

    doc.setFontSize(22); 
    doc.setTextColor(0, 102, 204); 
    doc.text('Client Report', 10, 10); 
  
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); 
 
    doc.text(`Client: ${this.board.client.name}`, 10, 20);
    doc.text(`Id: ${this.board.client.id}`, 10, 30);
    doc.text(`Email: ${this.board.client.email}`, 10, 40);
    doc.text(`Plan: ${this.board.client.plan}`, 10, 50);

    (doc as any).autoTable({
      startY: 60,  
      head: [['ID', 'Description', 'Status']],  
      body: this.board.incidents.map(incident => [
        incident.id.toString(),  
        incident.description,
        incident.status
      ]),
    });

    // Guardar el PDF
    doc.save('report.pdf');
  }

}
