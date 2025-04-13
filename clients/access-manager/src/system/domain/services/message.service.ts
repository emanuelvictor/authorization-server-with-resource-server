import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';

const config = new MatSnackBarConfig();

@Injectable()
export class MessageService {
    constructor(public snackBarService: MatSnackBar) {}

    /**
     * Retorna uma mensagem de sucesso para o usuário.
     * @param message
     * @param duration
     */
    public toastSuccess(
        message: string = 'Registro salvo com sucesso', 
        duration: number = 3.5
    ) {
        config.duration = duration * 1000;
        config.panelClass = ['success'];
        this.snackBarService.open(message, '', config);
    }

    /**
     * Retorna uma mensagem de erro para o usuário.
     * @param message
     * @param duration
     */
    public toastError(message: string, duration: number = 3.5) {
        config.duration = duration * 1000;
        config.panelClass = ['error'];
        this.snackBarService.open(message, '', config);
    }

    /**
     * Retorna uma mensagem de alerta para o usuário.
     * @param message
     * @param duration
     */
    public toastWarning(
        message: string = 'Todos os campos obrigatórios devem ser preenchidos.', 
        duration: number = 3.5
    ) {
        config.duration = duration * 1000;
        config.panelClass = ['warning'];
        this.snackBarService.open(message, '', config);
    }
}
