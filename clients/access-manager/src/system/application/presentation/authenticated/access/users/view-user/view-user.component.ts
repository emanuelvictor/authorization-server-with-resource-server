import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticatedViewComponent} from '../../../authenticated-view.component';
import {MessageService} from '../../../../../../domain/services/message.service';
import {UserRepository} from "../../../../../../domain/repository/user.repository";
import {viewAnimation} from "../../../../../utils/utils";
import {UpdatePasswordComponent} from "../update-password/update-password.component";
import {MatDialog} from "@angular/material";

// @ts-ignore
@Component({
    selector: 'view-user',
    templateUrl: './view-user.component.html',
    styleUrls: ['../user.component.scss'],
    animations: [
        viewAnimation
    ]
})
export class ViewUserComponent implements OnInit {

    /**
     *
     */
    user: any = {};

    /**
     *
     */
    itsMe: boolean;

    /**
     *
     * @param router
     * @param dialog
     * @param homeView
     * @param activatedRoute
     * @param messageService
     * @param userRepository
     */
    constructor(private router: Router,
                private dialog: MatDialog,
                public activatedRoute: ActivatedRoute,
                private messageService: MessageService,
                public homeView: AuthenticatedViewComponent,
                private userRepository: UserRepository) {
        this.user.id = +this.activatedRoute.snapshot.params.id || null;
        homeView.toolbar.subhead = 'Usuário / Detalhes'
    }

    /**
     *
     */
    ngOnInit() {
        if (this.user && this.user.id) {
            this.findById();
            this.itsMe = this.homeView.itsMe(this.user)
        } else this.router.navigate(["access/users"])
    }

    /**
     *
     */
    public findById() {
        this.userRepository.findById(this.user.id)
            .subscribe(result => {
                this.user = result;
            })
    }

    /**
     *
     */
    public updateEnabled(id: number) {
        this.userRepository.updateEnable(id)
            .then((enabled) => {
                this.user.enabled = enabled;
                this.messageService.toastSuccess(this.user.enabled ? 'Ativado com sucesso' : 'Inativado com sucesso')
            })
    }

    /**
     *
     */
    public updatePassword() {
        this.dialog.open(UpdatePasswordComponent, {
            width: '400px',
            height: 'auto',
            data: {user: this.user || null}
        })
    }

}
