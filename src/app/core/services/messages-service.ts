import {Injectable} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({providedIn: 'root'})

export class MessagesService {

  constructor(private snackBar: MatSnackBar) {

  }


  public openErrorSnackBarAddGroup(message: string, durationTime: number): void {
    this.snackBar.open(message, '', {
      panelClass: ['add-group-error-snackbar'],
      duration: durationTime,
      verticalPosition: "top",
      horizontalPosition: "left"
    })
  }

  public openSuccessSnackBarAddGroup(message: string): void {
    this.snackBar.open(message, '', {
      panelClass: ['add-group-success-snackbar'],
      horizontalPosition: "left",
      verticalPosition: "top",
      duration: 2000
    })
  }

  public openSuccessSnackBarAuthPage(message: string, isMobile: boolean): void {
    this.snackBar.open(message, '', {
      panelClass: ['auth-page-success-snackbar'],
      duration: 3000,
      verticalPosition: isMobile ? "top" : "bottom",

    })
  }

  public openErrorSnackBarAuthPage(message: string, isMobile: boolean): void {
    this.snackBar.open(message, '', {
      panelClass: ['auth-page-error-snackbar'],
      duration: 3000,
      verticalPosition: isMobile ? "top" : "bottom"
    })
  }
}
