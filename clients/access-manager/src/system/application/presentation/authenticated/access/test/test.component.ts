import {Component} from '@angular/core';
import {TestRepository} from "../../../../../domain/repository/test.repository";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MessageService} from "../../../../../domain/services/message.service";

@Component({
  selector: 'test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {

  /**
   *
   * @param messageService
   * @param testRepository
   */
  constructor(private messageService: MessageService,
              private testRepository: TestRepository) {
  }

  public getAuthorizedAccess() {
    this.testRepository.get('').subscribe(value => {
      this.showToast(value.message);
    })
  }

  public tryForbiddenAccess() {
    this.testRepository.get('/not-access').subscribe(value => {
      this.showToast(value.message);
    })
  }

  public getPublicAccess() {
    this.testRepository.get('/public-access').subscribe(value => {
      this.showToast(value.message);
    })
  }

  private showToast(message: string){
    this.messageService.toastSuccess(message);
  }
}