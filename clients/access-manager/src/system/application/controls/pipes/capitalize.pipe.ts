import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'capitalize' })
export class CapitalizePipe implements PipeTransform {

    /**
     * 
     * @param value 
     * @param args 
     */
    transform(value: any, ...args: any[]): any {
        return value ? value.toUpperCase() + value.slice(1) : value;
    }
}
