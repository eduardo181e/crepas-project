import mysql from 'mysql2';


import keys from './keysproducts'



const pool = mysql.createPool(keys.database);

    pool.getConnection(function(err) {
        if (err) {
            console.error('Error de conexion: ' + err.stack);
            return;
        }
        console.log('DB is connected' );
    });
export default pool; 