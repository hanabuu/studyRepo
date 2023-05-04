// Promise関数 (1)
var promise1 = new Promise( function( resolve, reject ) {
	setTimeout( function () {
		resolve( "3秒経過" ) ;
	}, 3000 ) ;
} ) ;

// Promise関数 (2)
var promise2 = new Promise( function( resolve, reject ) {
	setTimeout( function () {
		resolve( "1秒経過" ) ;
	}, 1000 ) ;
} ) ;

// Promise関数 (3)
var promise3 = new Promise( function( resolve, reject ) {
	setTimeout( function () {
		resolve( "2秒経過" ) ;
	}, 2000 ) ;
} ) ;

Promise.all( [ promise1, promise2, promise3 ] ).then( function ( message ) {
	console.log( message ) ;	// [ "3秒経過", "1秒経過", "2秒経過", ]
} ) ;

console.log("test");