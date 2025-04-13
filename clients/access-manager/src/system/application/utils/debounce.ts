
  export function executeDebounced(that,statement,timeout=300){
    let uniqueHash = statement.toString()
    .split('')
    .map( char=>char.charCodeAt(0) )
    .reduce( (a,b) => a+b % 4 ) ;

    if (typeof that.debounceListener[uniqueHash] !== "undefined"){
        clearTimeout(that.debounceListener[uniqueHash]);
    } else {
        statement.bind(that)();
    }
    that.debounceListener[uniqueHash]=setTimeout(statement.bind(that),timeout);
  }

  export function debounce(that,statement,timeout=300){
    if (typeof that.debounceListener !== "undefined"){
        clearTimeout(that.debounceListener);
    } else {
        statement.bind(that)();
    }
    that.debounceListener=setTimeout(statement.bind(that),timeout);

    /*//hash unico da funcao
    console.log(
      
      statement.toString()
      .split('')
      .map( char=>char.charCodeAt(0) )
      .reduce( (a,b) => a+b % 4 ) 

    );*/
  }