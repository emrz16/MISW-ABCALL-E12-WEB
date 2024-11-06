import { Component, Input, OnInit } from '@angular/core';
import { BoardService } from './board.service';
import { Board } from './Board';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { ToastrService } from 'ngx-toastr';
import { interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  @Input() board!: Board;
  isDivVisible: boolean = true;
  private refreshSubscription!: Subscription;
  messages: Array<{ tipo: string, mensaje: string }> = [];
  newMessage: string = ''; 
  currentTime: string = '';
  token: string | null = '';
  client_id: string | null = '';

  



  constructor(private boardService:BoardService,
     private toastr: ToastrService,
     private router: Router
    ) { }


  ngOnInit() {
    
    this.getTokenAndClientId();
    this.updateCurrentTime(); 

    

    
    

    // Configura el intervalo para actualizar cada X segundos (ej. cada 5 segundos)
    this.refreshSubscription = interval(5000) // 5000 ms = 5 segundos
      .pipe(
        switchMap(() => this.boardService.getBoard(this.token, this.client_id))
      )
      .subscribe({
        next: (board) => {
          this.board = board;
          //this.toastr.info('Actualizando tablero', 'Información');
          console.info('Actualizando tablero:');
        },
        error: (error) => {
          console.error('Error al actualizar el tablero:', error);

        }
      });
    
  }

  getBoard(token: string | null, client_id: string | null) {
    this.boardService.getBoard(token, client_id).subscribe({
      next: (board) => {
        console.log('board:', board);
        this.board = board; 
        this.toastr.info('tablero cargado...', 'Información');
      },
      error: (error) => {
        console.error('Error al obtener el tablero:', error);
        if (error.error) {
          this.toastr.error(error.error, 'Error al obtener el tablero');
        } else {
          this.toastr.error(error, 'Error al obtener el tablero');
        }
      }
    });

  }


  getTokenAndClientId() {
    this.token = sessionStorage.getItem('token');
    this.client_id = sessionStorage.getItem('client_id');
    if(this.token === null || this.client_id === null) {
      this.toastr.error('No se ha iniciado sesión', 'Error');
      this.router.navigate(['clients/login']);
    }else{
      this.getBoard(this.token, this.client_id);
    }
  }

  
  onActivateClick(): void {
    this.isDivVisible = !this.isDivVisible;  
    //this.messages.push({ tipo: "IA", mensaje: this.board.ia_response.msg }); 
      this.newMessage = ''; 
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      this.messages.push({ tipo: "USER", mensaje: this.newMessage }); 
      
      const delay = this.getRandomDelay();
      if (this.client_id && this.newMessage) {
        let client = this.client_id;
        let message = this.newMessage;
      setTimeout(() => {
          this.callIaEndpoint(client, message);
      }, delay);
    }
      this.newMessage = ''; 
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

  callIaEndpoint(client_id: string, message: string) {

    //alert("Llamando al endpoint con el mensaje: " + message + " para el cliente: " + client_id);
//this.messages.push({ tipo: 'IA', mensaje: this.board.ia_response.msg });

    
     // Ensure these are not null
      this.boardService.getClientReport(client_id, message ).subscribe({
        next: (response) => {
          console.log('response:', response);
          this.messages.push({ tipo: 'IA', mensaje: response.msg });
        },
        error: (error) => {
          console.error('Error al obtener el analisis:', error);
          if (error.error) {
            this.toastr.error(error.error, 'Error al obtener el analisis');
          } else {
            this.toastr.error(error, 'Error al obtener el analisis');
          }
        }
      });
  

  }

  generateAnalisis() {
    if (!this.isDivVisible){
      let client_id = this.client_id;

        const metrics = [
          "total_open_incidents",
          "total_closed_incidents",
          "average_resolution_time",
          "average_response_time",
          "total_phone_incidents",
          "total_email_incidents",
          "total_chat_incidents",
          "compliance_rate"
        ];

        const shuffled = [...metrics].sort(() => 0.5 - Math.random());
        const shuffledElements = shuffled.slice(0, 4)

        shuffledElements.forEach((metric, index) => {
                  const delay = Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000; // Delay aleatorio entre 2000ms y 5000ms
                  setTimeout(() => {
                    if (client_id) {
                      this.callIaEndpoint(client_id, metric);
                    } else {
                      console.error('client_id is null');
                    }
                  }, delay * index);
                });


    }else{
      this.toastr.info('Presiona el boton Activar ', 'Importante');
    }
  }

  getRandomMetrics(metrics: string[], count: number): string[] {
    const shuffled = [...metrics].sort(() => 0.5 - Math.random()); // Mezcla los elementos aleatoriamente
    return shuffled.slice(0, count); // Selecciona los primeros 'count' elementos
  }


  generatePDF() {
    this.getBoard(this.token, this.client_id);
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


  ngOnDestroy(): void {
    // Detén el intervalo cuando el componente se destruya para evitar fugas de memoria
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

}
