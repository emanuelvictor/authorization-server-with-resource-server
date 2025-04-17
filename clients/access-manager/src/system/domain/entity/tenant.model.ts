import {Abstract} from "./abstract/abstract.model";
import {GroupPermission} from "./group-permission.model";
import {name} from "moment";

export class Tenant extends Abstract {

    public identification: string;

    constructor(id?: number) {
        super();
        this.id = id;
    }
}
