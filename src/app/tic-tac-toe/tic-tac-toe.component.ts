import { Component, OnInit, EventEmitter } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.css']
})
export class TicTacToeComponent implements OnInit {
  private playingGround: string[][];
  private gameResult: string;
  private modalAction = new EventEmitter<string | MaterializeAction>();

  constructor(
    private dataService: DataService,
    private router: Router) { }

  ngOnInit() {
    this.createPlaground();
  }

  openModal(): void {
    this.modalAction.emit({ action: 'modal', params: ['open'] });
  }

  closeModal(): void {
    this.refreshTable();
    this.modalAction.emit({ action: 'modal', params: ['close'] });
  }

  goHome(): void {
    let user = this.dataService.getUser().username;
    this.router.navigate([`home/${user}`]);
    this.closeModal();
  }

  createPlaground(): void {
    this.playingGround = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
  }

  nextStep(event): void {
    let target = event.target;

    if (target.tagName === 'DIV') {
      if (!!target.innerHTML) return;

      let x = target.parentNode.parentNode.rowIndex,
          y = target.parentNode.cellIndex;

      this.setCell(x, y, 'X');

      if (this.isWinner()) {
        setTimeout(() => {
          this.gameResult = 'You win!';
          this.openModal();
        }, 500);

        return;
      } else {
        this.PCstep();
        if (this.isWinner()) {
          setTimeout(() => {
            this.gameResult = 'You lost(';
            this.openModal();
          }, 500);

          return;
        }
      }

      if (this.checkDrow()) {
        setTimeout(() => {
          this.gameResult = 'Drow...';
          this.openModal();
        }, 500);
      }
    }

    return;
  }

  setCell(x: number, y: number, sign: string): void {
    this.playingGround[x][y] = sign;
  }

  isWinner() {
    let x = 0, y = 0, curretnCell;

    //check the main diagonal
    curretnCell = this.playingGround[x][y];

    if (curretnCell !== '') {
      for (let i = 1; i < 3; i++) {
        if (this.playingGround[x + i][y + i] !== curretnCell) curretnCell = '';
      }
    }

    if (curretnCell !== '') return curretnCell;

    //check the reverse diagonal
    curretnCell = this.playingGround[x][y + 2];

    if (curretnCell !== '') {
      for (let i = 1; i < 3; i++) {
        if (this.playingGround[x + i][y + 2 - i] !== curretnCell) curretnCell = '';
      }
    }

    if (curretnCell !== '') return curretnCell;

    //check the rows
    for (let i = 0; i < 3; i++) {
      curretnCell = this.playingGround[x + i][y];

      if (curretnCell !== '') {
        for (let j = 1; j < 3; j++)
          if (this.playingGround[x + i][y + j] !== curretnCell) curretnCell = '';
      }
      if (curretnCell !== '') return curretnCell;
    }

    //check the columns
    for (let i = 0; i < 3; i++) {
      curretnCell = this.playingGround[x][y + i];

      if (curretnCell !== '') {
        for (let j = 1; j < 3; j++)
          if (this.playingGround[x + j][y + i] !== curretnCell) curretnCell = '';
      }

      if (curretnCell !== '') return curretnCell;
    }



    return false;
  }

  //the function looks for the nearest cells with value, realtive to our current cell.
  searchCell(x: number, y: number, sign: string): boolean {
    let mini = -1,
        maxi = 1,
        minj = -1,
        maxj = 1;

    if (x + mini < 0) mini = 0;
    if (x + maxi > this.playingGround.length - 1) maxi = 0;
    if (y + minj < 0) minj = 0;
    if (y + maxj > this.playingGround[0].length - 1) maxj = 0;

    for (let i = mini; i <= maxi; i++) {
      for (let j = minj; j <= maxj; j++) {
        if (this.playingGround[x + i][y + j] === sign) return true;
      }
    }

    return false;
  }

  PCstep(): void {
    let PCx = null,
        PCy = null,
        priority = 0,
        PCsign = 'O',
        userSign = 'X';

    if (this.playingGround[1][1] !== PCsign && this.playingGround[1][1] !== userSign) {
      this.setCell(1, 1, PCsign);
      return;
    }

    outer: for (let x = 0; x < this.playingGround.length; x++) {
      for (let y = 0; y < this.playingGround[x].length; y++) {
        let currentCell = this.playingGround[x][y];
        //check if the cell is empty
        if (currentCell !== PCsign && currentCell !== userSign) {
          this.playingGround[x][y] = PCsign;
          //check if the PC can win, the highest priority
          if (this.isWinner() === 'O') {
            PCx = x;
            PCy = y;
            priority = 3;

            break outer;
          }
          //check if the user will be able to win, if yes put PC sign there
          if (priority < 3) {
            this.playingGround[x][y] = userSign;

            if (this.isWinner() === 'X') {
              PCx = x;
              PCy = y;
              priority = 2;
            }
            else this.playingGround[x][y] = '';
          }
          //find the nearest cell with PCsign and put one more in it
          if (priority < 2) {
            if (this.searchCell(x, y, PCsign)) {
              PCx = x;
              PCy = y;
              priority = 1;
            }
          }

          if (priority < 1) {
            PCx = x;
            PCy = y;
          }
          this.playingGround[PCx][PCy] = currentCell;
        }
      }
    }

    if (PCx !== null && PCy !== null) {
      this.setCell(PCx, PCy, PCsign);
    }
  }

  checkDrow(): boolean {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.playingGround[i][j] === '') return false
      }
    }

    return true;
  }

  refreshTable(): void {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        this.playingGround[i][j] = '';
      }
    }
  }
}
