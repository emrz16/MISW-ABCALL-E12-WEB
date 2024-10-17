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
  constructor(private boardService:BoardService) { }


  ngOnInit() {
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

}
