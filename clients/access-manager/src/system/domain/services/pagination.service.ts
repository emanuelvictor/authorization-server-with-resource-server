import {Injectable} from '@angular/core';

export type Direction = 'ASC' | 'DESC';

@Injectable()
export class PaginationService {

    /**
     * 
     * @param property 
     * @param direction 
     * @param size 
     */
    public pageable( property: string = '', direction: Direction = 'ASC', size: number = 10) {
        return { 
            page: 0, 
            size: size,
            sort: {
                'properties': property || '',
                'direction': direction || ''
            } 
        };
    }    
}
