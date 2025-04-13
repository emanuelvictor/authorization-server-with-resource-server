// https://stackoverflow.com/questions/47593692/how-to-translate-mat-paginator-in-angular4
// https://stackblitz.com/edit/angular-5mgfxh?file=app/dutch-paginator-intl.ts
import {MatPaginatorIntl} from '@angular/material';

const rangeLabel = (page: number, pageSize: number, length: number) => {
    if (length == 0 || pageSize == 0) {
        return `0 de ${length}`;
    }

    length = Math.max(length, 0);

    const startIndex = page * pageSize;

    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex =
        startIndex < length
            ? Math.min(startIndex + pageSize, length)
            : startIndex + pageSize;

    return `${startIndex + 1} - ${endIndex} de ${length}`;
};

// https://material.angular.io/components/paginator/api
export function getPaginatorIntl() {
    const paginatorIntl = new MatPaginatorIntl();

    paginatorIntl.itemsPerPageLabel = 'Registros por página:';
    paginatorIntl.getRangeLabel = rangeLabel;

    paginatorIntl.firstPageLabel = '';
    paginatorIntl.lastPageLabel = '';
    paginatorIntl.nextPageLabel = '';
    paginatorIntl.previousPageLabel = '';

    return paginatorIntl;
}
