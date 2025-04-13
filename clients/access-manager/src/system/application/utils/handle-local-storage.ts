/**
 * Obtém os filtros de acordo com a entidade agregadora
 * @param filters 
 * @param aggr 
 */
export function getLocalStorage( filters, aggr ) {
    const keys = Object.keys( filters );
    const result = {};
    
    keys.forEach(key => {
        result[key] = localStorage.getItem(`${aggr}.${key}`) || ''
    });

    return result;
}

/**
 * Define os filtros de acordo com a entidade agregadora
 * @param filters 
 * @param aggr 
 */
export function setLocalStorage( filters, aggr ) {
    const entries = Object.entries( filters );
    entries.forEach(([key, value]) => localStorage.setItem(`${aggr}.${key}`, value.toString()));
}