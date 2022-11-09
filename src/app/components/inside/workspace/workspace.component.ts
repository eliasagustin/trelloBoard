import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {

  boards: any[] = [];
  user = this.auth.currentUser;

  constructor(private auth: AuthService,
              private dataService: DataService,
              private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.boards = await this.dataService.getBoards();
    console.log("this.boards", this.boards)
  }

  async startBoard() {
    await this.dataService.startBoard();
    this.boards = await this.dataService.getBoards();
    //console.log("this.data", data)
    
    if (this.boards.length > 0) {
      const newBoard = this.boards.pop();
      if (newBoard.boards) {
        this.router.navigateByUrl(`/workspace/${newBoard.boards.id}`);
      }
    }
  }
  
  signOut() {
    this.auth.logout();
  }

}
