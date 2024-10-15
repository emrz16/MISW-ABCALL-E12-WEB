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
    this.getBoard();
  }

  getBoard() {
    this.boardService.getBoard().subscribe(board => {
      console.log(board);
      this.board = board;
    });
  }

}
