import {Request, Response} from 'express';
import { bebidasCalientes, bebidasFrias, botanas, crepasDulce, crepasSalada, ensaladas, waffleCanasta, waffles } from './models/nameCrepas';
import pool from '../database';
import pool1 from '../databaseproduct';
import jwt from 'jsonwebtoken';
import moment from 'moment-timezone';
class VentasController {

    obtenerIdRepeticiones(diccionario:any) {
    // Usa la función map() para generar una lista de tuplas.
    return Object.entries(diccionario).map(([id, repeticiones]:[any, any]) => [id, repeticiones]);
    }

    private contarRepeticiones(arrays: any) {
      const resultados:any = {};
      for (const item of arrays) {
        const id = item.id;
        if (!resultados[id]) {
          resultados[id] = 0;
        }
        resultados[id]++;
      }
      return resultados;
    }

  

    index  (req: Request, res: Response) {
        res.json({ text: 'API is ready'});
    } 
     sales = (req: Request, res: Response) => {
      const now = req.params.now;
      const token:any = req.headers['authorization'];
            const tokenWithoutBearer = token.replace('Bearer ', '');
      const decodedToken:any = jwt.verify(tokenWithoutBearer, 'secreto-seguro'); // Decodificar el token
            const sucursal_id1 = decodedToken.sucursal 
            const caja_id = decodedToken.caja
            const user_id = decodedToken.id
            const adminId = decodedToken.adminId;
        const ordenes = req.body;
        
        // Crepas saladas
        const aderesosCrepaSalada: any[] = [];
        const resultA:any[] = [];
        var idRepeticionesAcs1:any;
        const aderesosBaseCrepaSalada: any[] = [];
        const ingredientesCrepaSalada: any[] = [];
        const ingredientesBaseCrepaSalada: any[] = [];

        // Crepas Dulces 
        const ingredientesComCrepaDulce: any[] = [];
        const ingredientesUntCrepaDulce: any[] = [];
        const nievesCrepaDulce: any[] = [];
        const harinaCrepaDulce: any[] = [];

        // Waffles
        const ingredientesComWaffle: any[] = [];
        const ingredientesUntWaffle: any[] = [];
        const nievesWaffle: any[] = [];

        // Waffle Canasta
        const ingredientesComWaffleCanasta: any[] = [];
        const ingredientesUntWaffleCanasta: any[] = [];
        const nievesWaffleCanasta: any[] = [];

        // Bebidas Calientes
        const bebidasCalientes1: any[] = [];

        // Bebidas Frías
        const bebidasFrias1: any[] = [];

        // Botanas
        const botanas1: any[] = [];

        // Ensaladas
        const ensaladas1: any[] = [];

        var cantidadProductos:number = 0;

      var totalProductos:number = 0;
      if(ordenes.length === 0){
        res.status(400).json({message: '400'})
      }else if(ordenes.length > 0){

        try{
        const promise1 = new Promise<void>((resolve) => {
        ordenes.forEach((orden: any, index: any) => {


            let cantidad:number = orden.cantidad;
            cantidadProductos += cantidad;
            let total:number = orden.total;
            totalProductos += total;
                    if (orden.nombre === crepasSalada) {
                      for(let i = 0; i < orden.cantidad; i++) {
                        orden.orden.aderesos.forEach((aderezo: any) => {
              aderesosCrepaSalada.push(aderezo);
            });
            orden.orden.adereso_base.forEach((aderezoBase: any) => {
              aderesosBaseCrepaSalada.push(aderezoBase);
            });

            orden.orden.ingredientes.forEach((ingrediente: any) => {
                ingredientesCrepaSalada.push(ingrediente);
            });

            orden.orden.ingredientes_base.forEach((ingrediente: any) => {
                ingredientesBaseCrepaSalada.push(ingrediente);
            });
          }
    
          }

          if (orden.nombre === crepasDulce) {
            for(let i = 0; i < orden.cantidad; i++) {
            orden.orden.ingredientes_com.forEach((ingredienteCom: any) => {
              ingredientesComCrepaDulce.push(ingredienteCom);
            });
            orden.orden.ingredientes_unt.forEach((ingredienteUnt: any) => {
              ingredientesUntCrepaDulce.push(ingredienteUnt);
            });
            orden.orden.nieve.forEach((nieve: any) => {
              nievesCrepaDulce.push(nieve);
            });
            harinaCrepaDulce.push(orden.orden.harina)
          }
          }

          if(orden.nombre === waffles) {
            for(let i = 0; i < orden.cantidad; i++) {
            orden.orden.ingredientes_com.forEach((ingredienteCom: any) => {
              ingredientesComWaffle.push(ingredienteCom);
            });
            orden.orden.ingredientes_unt.forEach((ingredienteUnt: any) => {
              ingredientesUntWaffle.push(ingredienteUnt);
            });
            orden.orden.nieve.forEach((nieve: any) => {
              nievesWaffle.push(nieve);
            });
          }
          }
            if(orden.nombre === waffleCanasta){
              for(let i = 0; i < orden.cantidad; i++) {
              orden.orden.ingredientes_com.forEach((ingredienteCom: any) => {
                ingredientesComWaffleCanasta.push(ingredienteCom);
              });
              orden.orden.ingredientes_unt.forEach((ingredienteUnt: any) => {
                ingredientesUntWaffleCanasta.push(ingredienteUnt);
              });
              orden.orden.nieve.forEach((nieve: any) => {
                nievesWaffleCanasta.push(nieve);
              });  
            }
          }

          if(orden.nombre === bebidasCalientes){
            for(let i = 0; i < orden.cantidad; i++) {
            bebidasCalientes1.push(orden.orden);
            }
          }

          if(orden.nombre === bebidasFrias){
            for(let i = 0; i < orden.cantidad; i++) {
            bebidasFrias1.push(orden.orden);
            }
          }

          if(orden.nombre === botanas){
            for(let i = 0; i < orden.cantidad; i++) {
            botanas1.push(orden.orden);
            }
          }

          if(orden.nombre === ensaladas){
            for(let i = 0; i < orden.cantidad; i++) {
            ensaladas1.push(orden.orden);
            }
          }

          if (index === ordenes.length - 1) {
            resolve();
          }

        });
        });
        promise1.then(() => {
          console.log(aderesosCrepaSalada)
          const promiseAcs = new Promise<void>((resolve, reject) => {
              const resultados:any = {};
              var test:any = 0;
              var index1:any;
              aderesosCrepaSalada.forEach((aderezo, index) => {
                const id = aderezo.id;
                index1 = index;
                test++;
                if (!resultados[id]) {
                  resultados[id] = 0;
                }
                resultados[id]++;
              });
                                          if(test === aderesosCrepaSalada.length ){
                const repPromises: Promise<any>[] = Object.entries(resultados).map(async ([id, repeticiones]): Promise<[any, any]> => {
                  return Promise.resolve([id, repeticiones]);
                });
                Promise.all(repPromises).then((rep) => {
                  if (Object.keys(rep).length === Object.keys(resultados).length) {
                    idRepeticionesAcs1 = rep;
                    resolve();
                  }
                });              
              }

            });

        promiseAcs.then(() => {
        const promise = new Promise<void>((resolve) => {
          idRepeticionesAcs1.forEach(async (id: any, index: number) => {
            const product_id = id[0];
            const sucursal_id = sucursal_id1;
            const repeticiones = id[1];
            const query = 'SELECT * FROM csae WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
            const existencia:any = await pool.promise().query(query, [product_id, sucursal_id, adminId])
              .then(existencia => existencia[0])
              .catch(err => console.log(err));
            if(existencia[0].cantidad === 0){
              if(existencia[0].existencia === 0){
                resultA.push(false)
              }else if(existencia[0].existencia === 1){
                resultA.push(true)
              }
            }else if(existencia[0].cantidad === 1){
              if(existencia[0].existencia === 0){
                resultA.push(false)
              }else if(existencia[0].existencia === 1){
                if(existencia[0].inventario >= repeticiones){
                  resultA.push(true) 
                }else if(existencia[0].inventario < repeticiones){
                  resultA.push(false)
                }
              }
            }
        
            // Si se han completado todas las operaciones de push, resolver la promesa
            if (index === idRepeticionesAcs1.length - 1) {
              resolve();
            }
          });
        });
        setTimeout(() => {
        promise.then(() => {
                  }).catch((err) => {err});
      }, 1000);
        });


        var idRepeticionesABcs:any;
        const promiseABcs = new Promise<void>((resolve, reject) => {
          const resultados:any = {};
          var test:any = 0;
          var index1:any;
          aderesosBaseCrepaSalada.forEach((aderezo, index) => {
            const id = aderezo.id;
            index1 = index;
            test++;
            if (!resultados[id]) {
              resultados[id] = 0;
            }
            resultados[id]++;
          });
                              if(test === aderesosBaseCrepaSalada.length ){
            const repPromises: Promise<any>[] = Object.entries(resultados).map(async ([id, repeticiones]): Promise<[any, any]> => {
              return Promise.resolve([id, repeticiones]);
            });
            Promise.all(repPromises).then((rep) => {
              if (Object.keys(rep).length === Object.keys(resultados).length) {
                idRepeticionesABcs = rep;
                resolve();
              }
            });              
          }

        });
        const resultAB:any = [];
        promiseABcs.then(() => {
          const promise1 = new Promise<void>((resolve) => {
            idRepeticionesABcs.forEach(async (id: any, index: number) => {
              const product_id = id[0];
              const sucursal_id = sucursal_id1;
              const repeticiones = id[1];
              const query = 'SELECT * FROM csabe WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
              const existencia:any = await pool.promise().query(query, [product_id, sucursal_id, adminId])
                .then(existencia => existencia[0])
                .catch(err => console.log(err));
              if(existencia[0].cantidad === 0){
                if(existencia[0].existencia === 0){
                  resultAB.push(false)
                }else if(existencia[0].existencia === 1){
                  resultAB.push(true)
                }
              }else if(existencia[0].cantidad === 1){
                if(existencia[0].existencia === 0){
                  resultAB.push(false)
                }else if(existencia[0].existencia === 1){
                  if(existencia[0].inventario >= repeticiones){
                    resultAB.push(true) 
                  }else if(existencia[0].inventario < repeticiones){
                    resultAB.push(false)
                  }
                }
              }
          
              // Si se han completado todas las operaciones de push, resolver la promesa
              if (index === idRepeticionesABcs.length - 1) {
                resolve();
              }
            });
          });
          setTimeout(() => {
          promise1.then(() => {
                      }).catch((err) => {err});
        }, 1000);
          });
          
        var idRepeticionesIPcs:any;
        const promiseIPcs = new Promise<void>((resolve, reject) => {
          const resultados:any = {};
          var test:any = 0;
          ingredientesCrepaSalada.forEach((aderezo, index) => {
            const id = aderezo.id;
            test++;
            if (!resultados[id]) {
              resultados[id] = 0;
            }
            resultados[id]++;
          });
                    if(test === ingredientesCrepaSalada.length ){
            const repPromises: Promise<any>[] = Object.entries(resultados).map(async ([id, repeticiones]): Promise<[any, any]> => {
              return Promise.resolve([id, repeticiones]);
            });
            Promise.all(repPromises).then((rep) => {
              if (Object.keys(rep).length === Object.keys(resultados).length) {
                idRepeticionesIPcs = rep;
                resolve();
              }
            });              
          }

        });
        const resultIP:any = [];
        promiseIPcs.then(() => {
          const promise1 = new Promise<void>((resolve) => {
            idRepeticionesIPcs.forEach(async (id: any, index: number) => {
              const product_id = id[0];
              const sucursal_id = sucursal_id1;
              const repeticiones = id[1];
              const query = 'SELECT * FROM csipe WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
              const existencia:any = await pool.promise().query(query, [product_id, sucursal_id, adminId])
                .then(existencia => existencia[0])
                .catch(err => console.log(err));
              if(existencia[0].cantidad === 0){
                if(existencia[0].existencia === 0){
                  resultIP.push(false)
                }else if(existencia[0].existencia === 1){
                  resultIP.push(true)
                }
              }else if(existencia[0].cantidad === 1){
                if(existencia[0].existencia === 0){
                  resultIP.push(false)
                }else if(existencia[0].existencia === 1){
                  if(existencia[0].inventario >= repeticiones){
                    resultIP.push(true) 
                  }else if(existencia[0].inventario < repeticiones){
                    resultIP.push(false)
                  }
                }
              }
          
              // Si se han completado todas las operaciones de push, resolver la promesa
              if (index === idRepeticionesIPcs.length - 1) {
                resolve();
              }
            });
          });
          setTimeout(() => {
          promise1.then(() => {
                      }).catch((err) => {err});
        }, 1000);
          });


        var idRepeticionesIBcs:any;
        const promiseIBcs = new Promise<void>((resolve, reject) => {
          const resultados:any = {};
          var test:any = 0;
          ingredientesBaseCrepaSalada.forEach((aderezo, index) => {
            const id = aderezo.id;
            test++;
            if (!resultados[id]) {
              resultados[id] = 0;
            }
            resultados[id]++;
          });
                    if(test === ingredientesBaseCrepaSalada.length ){
            const repPromises: Promise<any>[] = Object.entries(resultados).map(async ([id, repeticiones]): Promise<[any, any]> => {
              return Promise.resolve([id, repeticiones]);
            });
            Promise.all(repPromises).then((rep) => {
              if (Object.keys(rep).length === Object.keys(resultados).length) {
                idRepeticionesIBcs = rep;
                resolve();
              }
            });              
          }

        });
        const resultIB:any = [];
        promiseIBcs.then(() => {
          const promise1 = new Promise<void>((resolve) => {
            idRepeticionesIBcs.forEach(async (id: any, index: number) => {
              const product_id = id[0];
              const sucursal_id = sucursal_id1;
              const repeticiones = id[1];
              const query = 'SELECT * FROM csibe WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
              const existencia:any = await pool.promise().query(query, [product_id, sucursal_id, adminId])
                .then(existencia => existencia[0])
                .catch(err => console.log(err));
              if(existencia[0].cantidad === 0){
                if(existencia[0].existencia === 0){
                  resultIB.push(false)
                }else if(existencia[0].existencia === 1){
                  resultIB.push(true)
                }
              }else if(existencia[0].cantidad === 1){
                if(existencia[0].existencia === 0){
                  resultIB.push(false)
                }else if(existencia[0].existencia === 1){
                  if(existencia[0].inventario >= repeticiones){
                    resultIB.push(true) 
                  }else if(existencia[0].inventario < repeticiones){
                    resultIB.push(false)
                  }
                }
              }
          
              // Si se han completado todas las operaciones de push, resolver la promesa
              if (index === idRepeticionesIBcs.length - 1) {

                resolve();
              }
            });
          });
          setTimeout(() => {
          promise1.then(() => {
            console.log('result'+resultIB)
                      }).catch((err) => {err});
        }, 1000);
          });


                var idRepeticionesICD:any;
        const promiseICcd = new Promise<void>((resolve, reject) => {
          const resultados:any = {};
          var test:any = 0;
          ingredientesComCrepaDulce.forEach((aderezo, index) => {
            const id = aderezo.id;
            test++;
            if (!resultados[id]) {
              resultados[id] = 0;
            }
            resultados[id]++;
          });
                      const repPromises: Promise<any>[] = Object.entries(resultados).map(async ([id, repeticiones]): Promise<[any, any]> => {
              return Promise.resolve([id, repeticiones]);
            });
            Promise.all(repPromises).then((rep) => {
              if (Object.keys(rep).length === Object.keys(resultados).length) {
                idRepeticionesICD = rep;
                resolve();
              }
            });              
          

        });
        const resultICcd:any = [];
        promiseICcd.then(() => {
          const promise1 = new Promise<void>((resolve) => {
            idRepeticionesICD.forEach(async (id: any, index: number) => {
              const product_id = id[0];
              const sucursal_id = sucursal_id1;
              const repeticiones = id[1];
              const query = 'SELECT * FROM cdice WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
              const existencia:any = await pool.promise().query(query, [product_id, sucursal_id, adminId])
                .then(existencia => existencia[0])
                .catch(err => console.log(err));
              if(existencia[0].cantidad === 0){
                if(existencia[0].existencia === 0){
                  resultICcd.push(false)
                }else if(existencia[0].existencia === 1){
                  resultICcd.push(true)
                }
              }else if(existencia[0].cantidad === 1){
                if(existencia[0].existencia === 0){
                  resultICcd.push(false)
                }else if(existencia[0].existencia === 1){
                  if(existencia[0].inventario >= repeticiones){
                    resultICcd.push(true) 
                  }else if(existencia[0].inventario < repeticiones){
                    resultICcd.push(false)
                  }
                }
              }
          
              // Si se han completado todas las operaciones de push, resolver la promesa
              if (index === idRepeticionesICD.length - 1) {
                resolve();
              }
            });
          });
          setTimeout(() => {
          promise1.then(() => {
                      }).catch((err) => {err});
        }, 1000);
          });

        var idRepeticionesIUD:any;
        const promiseIUcd = new Promise<void>((resolve, reject) => {
          const resultados:any = {};
          var test:any = 0;
          ingredientesUntCrepaDulce.forEach((aderezo, index) => {
            const id = aderezo.id;
            test++;
            if (!resultados[id]) {
              resultados[id] = 0;
            }
            resultados[id]++;
          });
            const repPromises: Promise<any>[] = Object.entries(resultados).map(async ([id, repeticiones]): Promise<[any, any]> => {
              return Promise.resolve([id, repeticiones]);
            });
            Promise.all(repPromises).then((rep) => {
              if (Object.keys(rep).length === Object.keys(resultados).length) {
                idRepeticionesIUD = rep;
                resolve();
              }
            });              
          

        });
        const resultIUcd:any = [];
        promiseIUcd.then(() => {
          const promise1 = new Promise<void>((resolve) => {
            idRepeticionesIUD.forEach(async (id: any, index: number) => {
              const product_id = id[0];
              const sucursal_id = sucursal_id1;
              const repeticiones = id[1];
              const query = 'SELECT * FROM cdiue WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
              const existencia:any = await pool.promise().query(query, [product_id, sucursal_id, adminId])
                .then(existencia => existencia[0])
                .catch(err => console.log(err));
              if(existencia[0].cantidad === 0){
                if(existencia[0].existencia === 0){
                  resultIUcd.push(false)
                }else if(existencia[0].existencia === 1){
                  resultIUcd.push(true)
                }
              }else if(existencia[0].cantidad === 1){
                if(existencia[0].existencia === 0){
                  resultIUcd.push(false)
                }else if(existencia[0].existencia === 1){
                  if(existencia[0].inventario >= repeticiones){
                    resultIUcd.push(true) 
                  }else if(existencia[0].inventario < repeticiones){
                    resultIUcd.push(false)
                  }
                }
              }
          
              // Si se han completado todas las operaciones de push, resolver la promesa
              if (index === idRepeticionesIUD.length - 1) {
                resolve();
              }
            });
          });
          setTimeout(() => {
          promise1.then(() => {
                      }).catch((err) => {err});
        }, 1000);
          });

          var idRepeticionesND:any;
          const promiseNcd = new Promise<void>((resolve, reject) => {
            const resultados:any = {};
            var test:any = 0;
            nievesCrepaDulce.forEach((aderezo, index) => {
              const id = aderezo.id;
              test++;
              if (!resultados[id]) {
                resultados[id] = 0;
              }
              resultados[id]++;
            });
              const repPromises: Promise<any>[] = Object.entries(resultados).map(async ([id, repeticiones]): Promise<[any, any]> => {
                return Promise.resolve([id, repeticiones]);
              });
              Promise.all(repPromises).then((rep) => {
                if (Object.keys(rep).length === Object.keys(resultados).length) {
                  idRepeticionesND = rep;
                  resolve();
                }
              });              
            
  
          });
          const resultNcd:any = [];
          promiseNcd.then(() => {
            const promise1 = new Promise<void>((resolve) => {
              idRepeticionesND.forEach(async (id: any, index: number) => {
                const product_id = id[0];
                const sucursal_id = sucursal_id1;
                const repeticiones = id[1];
                const query = 'SELECT * FROM cdne WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                const existencia:any = await pool.promise().query(query, [product_id, sucursal_id, adminId])
                  .then(existencia => existencia[0])
                  .catch(err => console.log(err));
                if(existencia[0].cantidad === 0){
                  if(existencia[0].existencia === 0){
                    resultNcd.push(false)
                  }else if(existencia[0].existencia === 1){
                    resultNcd.push(true)
                  }
                }else if(existencia[0].cantidad === 1){
                  if(existencia[0].existencia === 0){
                    resultNcd.push(false)
                  }else if(existencia[0].existencia === 1){
                    if(existencia[0].inventario >= repeticiones){
                      resultNcd.push(true) 
                    }else if(existencia[0].inventario < repeticiones){
                      resultNcd.push(false)
                    }
                  }
                }
            
                // Si se han completado todas las operaciones de push, resolver la promesa
                if (index === idRepeticionesND.length - 1) {
                  resolve();
                }
              });
            });
            setTimeout(() => {
            promise1.then(() => {
                          }).catch((err) => {err});
          }, 1000);
            });

        var idRepeticionesHD:any;
        const promiseHcd = new Promise<void>((resolve, reject) => {
          const resultados:any = {};
          var test:any = 0;
          harinaCrepaDulce.forEach((aderezo, index) => {
            const id = aderezo.id;
            test++;
            if (!resultados[id]) {
              resultados[id] = 0;
            }
            resultados[id]++;
          });
            const repPromises: Promise<any>[] = Object.entries(resultados).map(async ([id, repeticiones]): Promise<[any, any]> => {
              return Promise.resolve([id, repeticiones]);
            });
            Promise.all(repPromises).then((rep) => {
              if (Object.keys(rep).length === Object.keys(resultados).length) {
                idRepeticionesHD = rep;
                resolve();
              }
            });              
          

        });
        const resultHcd:any = [];
        promiseHcd.then(() => {
          const promise1 = new Promise<void>((resolve) => {
            idRepeticionesHD.forEach(async (id: any, index: number) => {
              const product_id = id[0];
              const sucursal_id = sucursal_id1;
              const repeticiones = id[1];
              const query = 'SELECT * FROM cdthe WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
              const existencia:any = await pool.promise().query(query, [product_id, sucursal_id, adminId])
                .then(existencia => existencia[0])
                .catch(err => console.log(err));
              if(existencia[0].cantidad === 0){
                if(existencia[0].existencia === 0){
                  resultHcd.push(false)
                }else if(existencia[0].existencia === 1){
                  resultHcd.push(true)
                }
              }else if(existencia[0].cantidad === 1){
                if(existencia[0].existencia === 0){
                  resultHcd.push(false)
                }else if(existencia[0].existencia === 1){
                  if(existencia[0].inventario >= repeticiones){
                    resultHcd.push(true) 
                  }else if(existencia[0].inventario < repeticiones){
                    resultHcd.push(false)
                  }
                }
              }
          
              // Si se han completado todas las operaciones de push, resolver la promesa
              if (index === idRepeticionesHD.length - 1) {
                resolve();
              }
            });
          });
          setTimeout(() => {
          promise1.then(() => {
                      }).catch((err) => {err});
        }, 1000);
          });


        // Waffles

        var idRepeticionesICW:any;
        const promiseICw = new Promise<void>((resolve, reject) => {
          const resultados:any = {};
          var test:any = 0;
          ingredientesComWaffle.forEach((aderezo, index) => {
            const id = aderezo.id;
            test++;
            if (!resultados[id]) {
              resultados[id] = 0;
            }
            resultados[id]++;
          });
                      const repPromises: Promise<any>[] = Object.entries(resultados).map(async ([id, repeticiones]): Promise<[any, any]> => {
              return Promise.resolve([id, repeticiones]);
            });
            Promise.all(repPromises).then((rep) => {
              if (Object.keys(rep).length === Object.keys(resultados).length) {
                idRepeticionesICW = rep;
                resolve();
              }
            });              
          

        });
        const resultICw:any = [];
        promiseICw.then(() => {
          const promise1 = new Promise<void>((resolve) => {
            idRepeticionesICW.forEach(async (id: any, index: number) => {
              const product_id = id[0];
              const sucursal_id = sucursal_id1;
              const repeticiones = id[1];
              const query = 'SELECT * FROM wice WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
              const existencia:any = await pool.promise().query(query, [product_id, sucursal_id, adminId])
                .then(existencia => existencia[0])
                .catch(err => console.log(err));
              if(existencia[0].cantidad === 0){
                if(existencia[0].existencia === 0){
                  resultICw.push(false)
                }else if(existencia[0].existencia === 1){
                  resultICw.push(true)
                }
              }else if(existencia[0].cantidad === 1){
                if(existencia[0].existencia === 0){
                  resultICw.push(false)
                }else if(existencia[0].existencia === 1){
                  if(existencia[0].inventario >= repeticiones){
                    resultICw.push(true) 
                  }else if(existencia[0].inventario < repeticiones){
                    resultICw.push(false)
                  }
                }
              }
          
              // Si se han completado todas las operaciones de push, resolver la promesa
              if (index === idRepeticionesICW.length - 1) {
                resolve();
              }
            });
          });
          setTimeout(() => {
          promise1.then(() => {
                      }).catch((err) => {err});
        }, 1000);
          });

        var idRepeticionesIUW:any;
        const promiseIUw = new Promise<void>((resolve, reject) => {
          const resultados:any = {};
          var test:any = 0;
          ingredientesUntWaffle.forEach((aderezo, index) => {
            const id = aderezo.id;
            test++;
            if (!resultados[id]) {
              resultados[id] = 0;
            }
            resultados[id]++;
          });
            const repPromises: Promise<any>[] = Object.entries(resultados).map(async ([id, repeticiones]): Promise<[any, any]> => {
              return Promise.resolve([id, repeticiones]);
            });
            Promise.all(repPromises).then((rep) => {
              if (Object.keys(rep).length === Object.keys(resultados).length) {
                idRepeticionesIUW = rep;
                resolve();
              }
            });              
          

        });
        const resultIUw:any = [];
        promiseIUw.then(() => {
          const promise1 = new Promise<void>((resolve) => {
            idRepeticionesIUW.forEach(async (id: any, index: number) => {
              const product_id = id[0];
              const sucursal_id = sucursal_id1;
              const repeticiones = id[1];
              const query = 'SELECT * FROM wiue WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
              const existencia:any = await pool.promise().query(query, [product_id, sucursal_id, adminId])
                .then(existencia => existencia[0])
                .catch(err => console.log(err));
              if(existencia[0].cantidad === 0){
                if(existencia[0].existencia === 0){
                  resultIUw.push(false)
                }else if(existencia[0].existencia === 1){
                  resultIUw.push(true)
                }
              }else if(existencia[0].cantidad === 1){
                if(existencia[0].existencia === 0){
                  resultIUw.push(false)
                }else if(existencia[0].existencia === 1){
                  if(existencia[0].inventario >= repeticiones){
                    resultIUw.push(true) 
                  }else if(existencia[0].inventario < repeticiones){
                    resultIUw.push(false)
                  }
                }
              }
          
              // Si se han completado todas las operaciones de push, resolver la promesa
              if (index === idRepeticionesIUW.length - 1) {
                resolve();
              }
            });
          });
          setTimeout(() => {
          promise1.then(() => {
                      }).catch((err) => {err});
        }, 1000);
          });


          var idRepeticionesNW:any;
          const promiseNw = new Promise<void>((resolve, reject) => {
            const resultados:any = {};
            var test:any = 0;
            nievesWaffle.forEach((aderezo, index) => {
              const id = aderezo.id;
              test++;
              if (!resultados[id]) {
                resultados[id] = 0;
              }
              resultados[id]++;
            });
              const repPromises: Promise<any>[] = Object.entries(resultados).map(async ([id, repeticiones]): Promise<[any, any]> => {
                return Promise.resolve([id, repeticiones]);
              });
              Promise.all(repPromises).then((rep) => {
                if (Object.keys(rep).length === Object.keys(resultados).length) {
                  idRepeticionesNW = rep;
                  resolve();
                }
              });              
            
  
          });
          const resultNw:any = [];
          promiseNw.then(() => {
            const promise1 = new Promise<void>((resolve) => {
              idRepeticionesNW.forEach(async (id: any, index: number) => {
                const product_id = id[0];
                const sucursal_id = sucursal_id1;
                const repeticiones = id[1];
                const query = 'SELECT * FROM wne WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                const existencia:any = await pool.promise().query(query, [product_id, sucursal_id, adminId])
                  .then(existencia => existencia[0])
                  .catch(err => console.log(err));
                if(existencia[0].cantidad === 0){
                  if(existencia[0].existencia === 0){
                    resultNw.push(false)
                  }else if(existencia[0].existencia === 1){
                    resultNw.push(true)
                  }
                }else if(existencia[0].cantidad === 1){
                  if(existencia[0].existencia === 0){
                    resultNw.push(false)
                  }else if(existencia[0].existencia === 1){
                    if(existencia[0].inventario >= repeticiones){
                      resultNw.push(true) 
                    }else if(existencia[0].inventario < repeticiones){
                      resultNw.push(false)
                    }
                  }
                }
            
                // Si se han completado todas las operaciones de push, resolver la promesa
                if (index === idRepeticionesNW.length - 1) {
                  resolve();
                }
              });
            });
            setTimeout(() => {
            promise1.then(() => {
                          }).catch((err) => {err});
          }, 1000);
            });

        // Waffles Canasta
        
        var idRepeticionesICWC:any;
        const promiseICwc = new Promise<void>((resolve, reject) => {
          const resultados:any = {};
          var test:any = 0;
          ingredientesComWaffleCanasta.forEach((aderezo, index) => {
            const id = aderezo.id;
            test++;
            if (!resultados[id]) {
              resultados[id] = 0;
            }
            resultados[id]++;
          });
                      const repPromises: Promise<any>[] = Object.entries(resultados).map(async ([id, repeticiones]): Promise<[any, any]> => {
              return Promise.resolve([id, repeticiones]);
            });
            Promise.all(repPromises).then((rep) => {
              if (Object.keys(rep).length === Object.keys(resultados).length) {
                idRepeticionesICWC = rep;
                resolve();
              }
            });              
          

        });
        const resultICwc:any = [];
        promiseICwc.then(() => {
          const promise1 = new Promise<void>((resolve) => {
            idRepeticionesICWC.forEach(async (id: any, index: number) => {
              const product_id = id[0];
              const sucursal_id = sucursal_id1;
              const repeticiones = id[1];
              const query = 'SELECT * FROM wcice WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
              const existencia:any = await pool.promise().query(query, [product_id, sucursal_id, adminId])
                .then(existencia => existencia[0])
                .catch(err => console.log(err));
              if(existencia[0].cantidad === 0){
                if(existencia[0].existencia === 0){
                  resultICwc.push(false)
                }else if(existencia[0].existencia === 1){
                  resultICwc.push(true)
                }
              }else if(existencia[0].cantidad === 1){
                if(existencia[0].existencia === 0){
                  resultICwc.push(false)
                }else if(existencia[0].existencia === 1){
                  if(existencia[0].inventario >= repeticiones){
                    resultICwc.push(true) 
                  }else if(existencia[0].inventario < repeticiones){
                    resultICwc.push(false)
                  }
                }
              }
          
              // Si se han completado todas las operaciones de push, resolver la promesa
              if (index === idRepeticionesICWC.length - 1) {
                resolve();
              }
            });
          });
          setTimeout(() => {
          promise1.then(() => {
                      }).catch((err) => {err});
        }, 1000);
          });

        var idRepeticionesIUWC:any;
        const promiseIUwc = new Promise<void>((resolve, reject) => {
          const resultados:any = {};
          var test:any = 0;
          ingredientesUntWaffleCanasta.forEach((aderezo, index) => {
            const id = aderezo.id;
            test++;
            if (!resultados[id]) {
              resultados[id] = 0;
            }
            resultados[id]++;
          });
            const repPromises: Promise<any>[] = Object.entries(resultados).map(async ([id, repeticiones]): Promise<[any, any]> => {
              return Promise.resolve([id, repeticiones]);
            });
            Promise.all(repPromises).then((rep) => {
              if (Object.keys(rep).length === Object.keys(resultados).length) {
                idRepeticionesIUWC = rep;
                resolve();
              }
            });              
          

        });
        const resultIUwc:any = [];
        promiseIUwc.then(() => {
          const promise1 = new Promise<void>((resolve) => {
            idRepeticionesIUWC.forEach(async (id: any, index: number) => {
              const product_id = id[0];
              const sucursal_id = sucursal_id1;
              const repeticiones = id[1];
              const query = 'SELECT * FROM wciue WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
              const existencia:any = await pool.promise().query(query, [product_id, sucursal_id, adminId])
                .then(existencia => existencia[0])
                .catch(err => console.log(err));
              if(existencia[0].cantidad === 0){
                if(existencia[0].existencia === 0){
                  resultIUwc.push(false)
                }else if(existencia[0].existencia === 1){
                  resultIUwc.push(true)
                }
              }else if(existencia[0].cantidad === 1){
                if(existencia[0].existencia === 0){
                  resultIUwc.push(false)
                }else if(existencia[0].existencia === 1){
                  if(existencia[0].inventario >= repeticiones){
                    resultIUwc.push(true) 
                  }else if(existencia[0].inventario < repeticiones){
                    resultIUwc.push(false)
                  }
                }
              }
          
              // Si se han completado todas las operaciones de push, resolver la promesa
              if (index === idRepeticionesIUWC.length - 1) {
                resolve();
              }
            });
          });
          setTimeout(() => {
          promise1.then(() => {
                      }).catch((err) => {err});
        }, 1000);
          });

          var idRepeticionesNWC:any;
          const promiseNwc = new Promise<void>((resolve, reject) => {
            const resultados:any = {};
            var test:any = 0;
            nievesWaffleCanasta.forEach((aderezo, index) => {
              const id = aderezo.id;
              test++;
              if (!resultados[id]) {
                resultados[id] = 0;
              }
              resultados[id]++;
            });
              const repPromises: Promise<any>[] = Object.entries(resultados).map(async ([id, repeticiones]): Promise<[any, any]> => {
                return Promise.resolve([id, repeticiones]);
              });
              Promise.all(repPromises).then((rep) => {
                if (Object.keys(rep).length === Object.keys(resultados).length) {
                  idRepeticionesNWC = rep;
                  resolve();
                }
              });              
            
  
          });
          const resultNwc:any = [];
          promiseNwc.then(() => {
            const promise1 = new Promise<void>((resolve) => {
              idRepeticionesNWC.forEach(async (id: any, index: number) => {
                const product_id = id[0];
                const sucursal_id = sucursal_id1;
                const repeticiones = id[1];
                const query = 'SELECT * FROM wcne WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                const existencia:any = await pool.promise().query(query, [product_id, sucursal_id, adminId])
                  .then(existencia => existencia[0])
                  .catch(err => console.log(err));
                if(existencia[0].cantidad === 0){
                  if(existencia[0].existencia === 0){
                    resultNwc.push(false)
                  }else if(existencia[0].existencia === 1){
                    resultNwc.push(true)
                  }
                }else if(existencia[0].cantidad === 1){
                  if(existencia[0].existencia === 0){
                    resultNwc.push(false)
                  }else if(existencia[0].existencia === 1){
                    if(existencia[0].inventario >= repeticiones){
                      resultNwc.push(true) 
                    }else if(existencia[0].inventario < repeticiones){
                      resultNwc.push(false)
                    }
                  }
                }
            
                // Si se han completado todas las operaciones de push, resolver la promesa
                if (index === idRepeticionesNWC.length - 1) {
                  resolve();
                }
              });
            });
            setTimeout(() => {
            promise1.then(() => {
                          }).catch((err) => {err});
          }, 1000);
            });

        var idRepeticionesBC:any;
        const promiseBC = new Promise<void>((resolve, reject) => {
          const resultados:any = {};
          var test:any = 0;
          bebidasCalientes1.forEach((aderezo, index) => {
            const id = aderezo.id;
            test++;
            if (!resultados[id]) {
              resultados[id] = 0;
            }
            resultados[id]++;
          });
            const repPromises: Promise<any>[] = Object.entries(resultados).map(async ([id, repeticiones]): Promise<[any, any]> => {
              return Promise.resolve([id, repeticiones]);
            });
            Promise.all(repPromises).then((rep) => {
              if (Object.keys(rep).length === Object.keys(resultados).length) {
                idRepeticionesBC = rep;
                resolve();
              }
            });              
          

        });
        const resultBC:any = [];
        promiseBC.then(() => {
          const promise1 = new Promise<void>((resolve) => {
            idRepeticionesBC.forEach(async (id: any, index: number) => {
              const product_id = id[0];
              const sucursal_id = sucursal_id1;
              const repeticiones = id[1];
              const query = 'SELECT * FROM bce WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
              const existencia:any = await pool.promise().query(query, [product_id, sucursal_id, adminId])
                .then(existencia => existencia[0])
                .catch(err => console.log(err));
              if(existencia[0].cantidad === 0){
                if(existencia[0].existencia === 0){
                  resultBC.push(false)
                }else if(existencia[0].existencia === 1){
                  resultBC.push(true)
                }
              }else if(existencia[0].cantidad === 1){
                if(existencia[0].existencia === 0){
                  resultBC.push(false)
                }else if(existencia[0].existencia === 1){
                  if(existencia[0].inventario >= repeticiones){
                    resultBC.push(true) 
                  }else if(existencia[0].inventario < repeticiones){
                    resultBC.push(false)
                  }
                }
              }
          
              // Si se han completado todas las operaciones de push, resolver la promesa
              if (index === idRepeticionesBC.length - 1) {
                resolve();
              }
            });
          });
          setTimeout(() => {
          promise1.then(() => {
                      }).catch((err) => {err});
        }, 1000);
          });


        var idRepeticionesBF:any;
        const promiseBF = new Promise<void>((resolve, reject) => {
          const resultados:any = {};
          var test:any = 0;
          bebidasFrias1.forEach((aderezo, index) => {
            const id = aderezo.id;
            test++;
            if (!resultados[id]) {
              resultados[id] = 0;
            }
            resultados[id]++;
          });
            const repPromises: Promise<any>[] = Object.entries(resultados).map(async ([id, repeticiones]): Promise<[any, any]> => {
              return Promise.resolve([id, repeticiones]);
            });
            Promise.all(repPromises).then((rep) => {
              if (Object.keys(rep).length === Object.keys(resultados).length) {
                idRepeticionesBF = rep;
                resolve();
              }
            });              
          

        });
        const resultBF:any = [];
        promiseBF.then(() => {
          const promise1 = new Promise<void>((resolve) => {
            idRepeticionesBF.forEach(async (id: any, index: number) => {
              const product_id = id[0];
              const sucursal_id = sucursal_id1;
              const repeticiones = id[1];
              const query = 'SELECT * FROM bfe WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
              const existencia:any = await pool.promise().query(query, [product_id, sucursal_id, adminId])
                .then(existencia => existencia[0])
                .catch(err => console.log(err));
              if(existencia[0].cantidad === 0){
                if(existencia[0].existencia === 0){
                  resultBF.push(false)
                }else if(existencia[0].existencia === 1){
                  resultBF.push(true)
                }
              }else if(existencia[0].cantidad === 1){
                if(existencia[0].existencia === 0){
                  resultBF.push(false)
                }else if(existencia[0].existencia === 1){
                  if(existencia[0].inventario >= repeticiones){
                    resultBF.push(true) 
                  }else if(existencia[0].inventario < repeticiones){
                    resultBF.push(false)
                  }
                }
              }
          
              // Si se han completado todas las operaciones de push, resolver la promesa
              if (index === idRepeticionesBF.length - 1) {
                resolve();
              }
            });
          });
          setTimeout(() => {
          promise1.then(() => {
                      }).catch((err) => {err});
        }, 1000);
          });

        var idRepeticionesB:any;
        const promiseB = new Promise<void>((resolve, reject) => {
          const resultados:any = {};
          var test:any = 0;
          botanas1.forEach((aderezo, index) => {
            const id = aderezo.id;
            test++;
            if (!resultados[id]) {
              resultados[id] = 0;
            }
            resultados[id]++;
          });
            const repPromises: Promise<any>[] = Object.entries(resultados).map(async ([id, repeticiones]): Promise<[any, any]> => {
              return Promise.resolve([id, repeticiones]);
            });
            Promise.all(repPromises).then((rep) => {
              if (Object.keys(rep).length === Object.keys(resultados).length) {
                idRepeticionesB = rep;
                resolve();
              }
            });              
          

        });
        const resultB:any = [];
        promiseB.then(() => {
          const promise1 = new Promise<void>((resolve) => {
            idRepeticionesB.forEach(async (id: any, index: number) => {
              const product_id = id[0];
              const sucursal_id = sucursal_id1;
              const repeticiones = id[1];
              const query = 'SELECT * FROM csbe WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
              const existencia:any = await pool.promise().query(query, [product_id, sucursal_id, adminId])
                .then(existencia => existencia[0])
                .catch(err => console.log(err));
              if(existencia[0].cantidad === 0){
                if(existencia[0].existencia === 0){
                  resultB.push(false)
                }else if(existencia[0].existencia === 1){
                  resultB.push(true)
                }
              }else if(existencia[0].cantidad === 1){
                if(existencia[0].existencia === 0){
                  resultB.push(false)
                }else if(existencia[0].existencia === 1){
                  if(existencia[0].inventario >= repeticiones){
                    resultB.push(true) 
                  }else if(existencia[0].inventario < repeticiones){
                    resultB.push(false)
                  }
                }
              }
          
              // Si se han completado todas las operaciones de push, resolver la promesa
              if (index === idRepeticionesB.length - 1) {
                resolve();
              }
            });
          });
          setTimeout(() => {
          promise1.then(() => {
            
          }).catch((err) => {err});
        }, 1000);
          });

        var idRepeticionesE:any;
        const promiseE = new Promise<void>((resolve, reject) => {
          const resultados:any = {};
          var test:any = 0;
          ensaladas1.forEach((aderezo, index) => {
            const id = aderezo.id;
            test++;
            if (!resultados[id]) {
              resultados[id] = 0;
            }
            resultados[id]++;
          });
            const repPromises: Promise<any>[] = Object.entries(resultados).map(async ([id, repeticiones]): Promise<[any, any]> => {
              return Promise.resolve([id, repeticiones]);
            });
            Promise.all(repPromises).then((rep) => {
              if (Object.keys(rep).length === Object.keys(resultados).length) {
                idRepeticionesE = rep;
                resolve();
              }
            });              
          

        });
        const resultE:any = [];
        promiseE.then(() => {
          const promise1 = new Promise<void>((resolve) => {
            idRepeticionesE.forEach(async (id: any, index: number) => {
              const product_id = id[0];
              const sucursal_id = sucursal_id1;
              const repeticiones = id[1];
              const query = 'SELECT * FROM cseie WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
              const existencia:any = await pool.promise().query(query, [product_id, sucursal_id, adminId])
                .then(existencia => existencia[0])
                .catch(err => console.log(err));
              if(existencia[0].cantidad === 0){
                if(existencia[0].existencia === 0){
                  resultE.push(false)
                }else if(existencia[0].existencia === 1){
                  resultE.push(true)
                }
              }else if(existencia[0].cantidad === 1){
                if(existencia[0].existencia === 0){
                  resultE.push(false)
                }else if(existencia[0].existencia === 1){
                  if(existencia[0].inventario >= repeticiones){
                    resultE.push(true) 
                  }else if(existencia[0].inventario < repeticiones){
                    resultE.push(false)
                  }
                }
              }
          
              // Si se han completado todas las operaciones de push, resolver la promesa
              if (index === idRepeticionesE.length - 1) {
                resolve();
              }
            });
          });
          setTimeout(() => {
          promise1.then(() => {
                      }).catch((err) => {err});
        }, 1000);
          });


          resultA
          resultAB
          resultIP
          resultIB
          resultICcd
          resultIUcd
          resultNcd
          resultHcd
          resultICw
          resultIUw
          resultNw
          resultICwc
          resultIUwc
          resultNwc
          resultBC
          resultBF
          resultB
          resultE
          setTimeout(async() => {
          const result = resultA.concat(resultAB, resultIP, resultIB, resultICcd, resultIUcd, resultNcd, resultHcd, resultICw, resultIUw, resultNw, resultICwc, resultIUwc, resultNwc, resultBC, resultBF, resultB, resultE);
          console.log(result);
          const resultFinal = result.every((value:any) => value === true);
          console.log(resultFinal);  
          if(resultFinal === true){
            console.log(sucursal_id1)
            console.log(user_id)
            console.log(caja_id)
            console.log(now);
            console.log(JSON.stringify(ordenes))
            console.log(cantidadProductos)
            console.log(totalProductos)
            const factura:any = {
              sucursal_id: sucursal_id1,
              userId: user_id,
              numero_caja: caja_id,
              fecha_hora: now,
              orden: JSON.stringify(ordenes),
              numero_productos: cantidadProductos,
              total: totalProductos,
              adminId: adminId
            }
            const query = 'INSERT INTO factura_caja SET ?';
            const factura1:any = await pool1.promise().query(query, [factura])
            .then(factura1 => factura1[0])
            .catch(err => console.log(err));
            console.log(factura1);
            const factura_id = factura1.insertId;
            
           if(idRepeticionesAcs1.length > 0){
            idRepeticionesAcs1.forEach(async (id: any) => {
              const product_id = id[0];
              const sucursal_id = sucursal_id1;
              const repeticiones = id[1];
              const query = 'SELECT * FROM csae WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
              const existencia:any = await pool.promise().query(query, [product_id, sucursal_id, adminId])
                .then((existencia:any) => {
                  const venta:any = {
                    adereso: existencia[0][0].adereso,
                    product_id: existencia[0][0].id,
                    sucursal_id: sucursal_id1,
                    created_at: now,
                    ventas: repeticiones,
                    factura_id: factura_id,
                    adminId: adminId
                  }
                  console.log(existencia[0][0])
                  console.log(venta)
                  if(existencia[0][0].cantidad === 0){
                  const query = 'INSERT INTO csav SET ?';
                  const venta1:any = pool.promise().query(query, [venta])
                  .then(venta1 => {
                    venta1[0]
                    console.log('todo bien csa');
                  })
                  .catch(err => console.log(err));
                console.log(venta1);
                  }else if(existencia[0][0].cantidad === 1){
                    if(existencia[0][0].inventario > repeticiones){
                    const query1 = 'UPDATE csae SET inventario = inventario - ? WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                    const existencia1:any = pool.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId])
                    console.log(venta)
                    const query = 'INSERT INTO csav SET ?';
                    const venta1:any = pool.promise().query(query, [venta])
                    .then(venta1 => {
                      console.log('todo bien csa');
                    })
                    .catch(err => console.log(err));}else if(existencia[0][0].inventario === repeticiones){
                      const query1 = 'UPDATE csae SET inventario = inventario - ?, existencia = 0 WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                      const existencia1:any = pool.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId])
                      console.log(venta)
                      const query = 'INSERT INTO csav SET ?';
                      const venta1:any = pool.promise().query(query, [venta])
                      .then(venta1 => {
                        console.log('todo bien csa');
                      })
                      .catch(err => console.log(err));
                    }
                  }
                })
                
                .catch(err => console.log(err));

              });
            }
            if(idRepeticionesABcs.length > 0){
              idRepeticionesABcs.forEach(async (id: any) => {
                const product_id = id[0];
                const sucursal_id = sucursal_id1;
                const repeticiones = id[1];
                const query = 'SELECT * FROM csabe WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                const existencia:any = await pool.promise().query(query, [product_id, sucursal_id, adminId])
                  .then((existencia:any) => {
                    const venta:any = {
                      adereso_base: existencia[0][0].adereso_base,
                      product_id: existencia[0][0].id,
                      sucursal_id: sucursal_id1,
                      created_at: now,
                      ventas: repeticiones,
                      factura_id: factura_id,
                      adminId: adminId
                    }
                    console.log(existencia[0][0])
                    console.log(venta)
                    if(existencia[0][0].cantidad === 0){
                    const query = 'INSERT INTO csabv SET ?';
                    const venta1:any = pool.promise().query(query, [venta])
                    .then(venta1 => {
                      venta1[0]
                  console.log('todo bien csab');
                    })
                    .catch(err => console.log(err));
                  }else if(existencia[0][0].cantidad === 1){
                    if(existencia[0][0].inventario > repeticiones){
                    const query1 = 'UPDATE csabe SET inventario = inventario - ? WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                    const existencia1:any = pool.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId])
                    console.log(venta)
                    const query = 'INSERT INTO csabv SET ?';
                    const venta1:any = pool.promise().query(query, [venta])
                    .then(venta1 => {
                      console.log('todo bien csab');
                    })
                    .catch(err => console.log(err));}else if(existencia[0][0].inventario === repeticiones){
                      const query1 = 'UPDATE csabe SET inventario = inventario - ?, existencia = 0 WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                      const existencia1:any = pool.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId])
                      console.log(venta)
                      const query = 'INSERT INTO csabv SET ?';
                      const venta1:any = pool.promise().query(query, [venta])
                      .then(venta1 => {
                        console.log('todo bien csab');
                      })
                      .catch(err => console.log(err));
                    }
                  }
                  })
                  
                  .catch(err => console.log(err));
  
                });
            }
            if(idRepeticionesIPcs.length > 0){
              idRepeticionesIPcs.forEach(async (id: any) => {
                const product_id = id[0];
                const sucursal_id = sucursal_id1;
                const repeticiones = id[1];
                const query = 'SELECT * FROM csipe WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                const existencia:any = await pool.promise().query(query, [product_id, sucursal_id, adminId])
                  .then((existencia:any) => {
                    const venta:any = {
                      ingrediente_pri: existencia[0][0].ingrediente_pri,
                      product_id: existencia[0][0].id,
                      sucursal_id: sucursal_id1,
                      created_at: now,
                      ventas: repeticiones,
                      factura_id: factura_id,
                      adminId: adminId
                    }
                    console.log(existencia[0][0])
                    console.log(venta)
                    if(existencia[0][0].cantidad === 0){
                    const query = 'INSERT INTO csipv SET ?';
                    const venta1:any = pool.promise().query(query, [venta])
                    .then(venta1 => {
                      venta1[0]
                  console.log('todo bien csip');
                    })
                    .catch(err => console.log(err));
                  }else if(existencia[0][0].cantidad === 1){
                    if(existencia[0][0].inventario > repeticiones){
                    const query1 = 'UPDATE csipe SET inventario = inventario - ? WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                    const existencia1:any = pool.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId])
                    console.log(venta)
                    const query = 'INSERT INTO csipv SET ?';
                    const venta1:any = pool.promise().query(query, [venta])
                    .then(venta1 => {
                      console.log('todo bien csip');
                    })
                    .catch(err => console.log(err));}else if(existencia[0][0].inventario === repeticiones){
                      const query1 = 'UPDATE csipe SET inventario = inventario - ?, existencia = 0 WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                      const existencia1:any = pool.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId])
                      console.log(venta)
                      const query = 'INSERT INTO csipv SET ?';
                      const venta1:any = pool.promise().query(query, [venta])
                      .then(venta1 => {
                        console.log('todo bien csip');
                      })
                      .catch(err => console.log(err));
                    }
                  }
                  })
                  
                  .catch(err => console.log(err));
  
                });
            }
            if(idRepeticionesIBcs.length > 0){
              idRepeticionesIBcs.forEach(async (id: any) => {
                const product_id = id[0];
                const sucursal_id = sucursal_id1;
                const repeticiones = id[1];
                const query = 'SELECT * FROM csibe WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                const existencia:any = await pool.promise().query(query, [product_id, sucursal_id, adminId])
                  .then((existencia:any) => {
                    const venta:any = {
                      ingrediente_base: existencia[0][0].ingrediente_base,
                      product_id: existencia[0][0].id,
                      sucursal_id: sucursal_id1,
                      created_at: now,
                      ventas: repeticiones,
                      factura_id: factura_id,
                      adminId: adminId
                    }
                    console.log(existencia[0][0])
                    console.log(venta)
                    if(existencia[0][0].cantidad === 0){
                    const query = 'INSERT INTO csibv SET ?';
                    const venta1:any = pool.promise().query(query, [venta])
                    .then(venta1 => {
                      venta1[0]
                      console.log('todo bien csib');
                    })
                    .catch(err => console.log(err));
                  }else if(existencia[0][0].cantidad === 1){
                    if(existencia[0][0].inventario > repeticiones){
                    const query1 = 'UPDATE csibe SET inventario = inventario - ? WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                    const existencia1:any = pool.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId])
                    console.log(venta)
                    const query = 'INSERT INTO csibv SET ?';
                    const venta1:any = pool.promise().query(query, [venta])
                    .then(venta1 => {
                      console.log('todo bien csib');
                    })
                    .catch(err => console.log(err));}else if(existencia[0][0].inventario === repeticiones){
                      const query1 = 'UPDATE csibe SET inventario = inventario - ?, existencia = 0 WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                      const existencia1:any = pool.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId])
                      console.log(venta)
                      const query = 'INSERT INTO csibv SET ?';
                      const venta1:any = pool.promise().query(query, [venta])
                      .then(venta1 => {
                        console.log('todo bien csib');
                      })
                      .catch(err => console.log(err));
                    }
                  }
                  })
                  
                  .catch(err => console.log(err));
  
                });
            }

            if(idRepeticionesICD.length > 0){
              idRepeticionesICD.forEach(async (id: any) => {
                const product_id = id[0];
                const sucursal_id = sucursal_id1;
                const repeticiones = id[1];
                const query = 'SELECT * FROM cdice WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                const existencia:any = await pool.promise().query(query, [product_id, sucursal_id, adminId])
                  .then((existencia:any) => {
                    const venta:any = {
                      ingrediente_com: existencia[0][0].ingrediente_com,
                      product_id: existencia[0][0].id,
                      sucursal_id: sucursal_id1,
                      created_at: now,
                      ventas: repeticiones,
                      factura_id: factura_id,
                      adminId: adminId
                    }
                    console.log(existencia[0][0])
                    console.log(venta)
                    if(existencia[0][0].cantidad === 0){
                    const query = 'INSERT INTO cdicv SET ?';
                    const venta1:any = pool.promise().query(query, [venta])
                    .then(venta1 => {
                      venta1[0]
                      console.log('todo bien cdice');
                    })
                    .catch(err => console.log(err));
                  }else if(existencia[0][0].cantidad === 1){
                    if(existencia[0][0].inventario > repeticiones){
                    const query1 = 'UPDATE cdice SET inventario = inventario - ? WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                    const existencia1:any = pool.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId])
                    console.log(venta)
                    const query = 'INSERT INTO cdicv SET ?';
                    const venta1:any = pool.promise().query(query, [venta])
                    .then(venta1 => {
                      console.log('todo bien cdice');
                    })
                    .catch(err => console.log(err));}else if(existencia[0][0].inventario === repeticiones){
                      const query1 = 'UPDATE cdice SET inventario = inventario - ?, existencia = 0 WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                      const existencia1:any = pool.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId])
                      console.log(venta)
                      const query = 'INSERT INTO cdicv SET ?';
                      const venta1:any = pool.promise().query(query, [venta])
                      .then(venta1 => {
                        console.log('todo bien cdice');
                      })
                      .catch(err => console.log(err));
                    }
                  }
                  })
                  .catch(err => console.log(err));
                })
            }
            if(idRepeticionesIUD.length > 0){
              idRepeticionesIUD.forEach(async (id: any) => {
                const product_id = id[0];
                const sucursal_id = sucursal_id1;
                const repeticiones = id[1];
                const query = 'SELECT * FROM cdiue WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                const existencia:any = await pool.promise().query(query, [product_id, sucursal_id, adminId])
                  .then((existencia:any) => {
                    const venta:any = {
                      ingrediente_unt: existencia[0][0].ingrediente_unt,
                      product_id: existencia[0][0].id,
                      sucursal_id: sucursal_id1,
                      created_at: now,
                      ventas: repeticiones,
                      factura_id: factura_id,
                      adminId: adminId
                    }
                    console.log(existencia[0][0])
                    console.log(venta)
                    if(existencia[0][0].cantidad === 0){
                    const query = 'INSERT INTO cdiuv SET ?';
                    const venta1:any = pool.promise().query(query, [venta])
                    .then(venta1 => {
                      venta1[0]
                      console.log('todo bien cdiu');
                    })
                    .catch(err => console.log(err));
                  }else if(existencia[0][0].cantidad === 1){
                    if(existencia[0][0].inventario > repeticiones){
                    const query1 = 'UPDATE cdiue SET inventario = inventario - ? WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                    const existencia1:any = pool.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId])
                    console.log(venta)
                    const query = 'INSERT INTO cdiuv SET ?';
                    const venta1:any = pool.promise().query(query, [venta])
                    .then(venta1 => {
                      console.log('todo bien cdiu');
                    })
                    .catch(err => console.log(err));}else if(existencia[0][0].inventario === repeticiones){
                      const query1 = 'UPDATE cdiue SET inventario = inventario - ?, existencia = 0 WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                      const existencia1:any = pool.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId])
                      console.log(venta)
                      const query = 'INSERT INTO cdiuv SET ?';
                      const venta1:any = pool.promise().query(query, [venta])
                      .then(venta1 => {
                        console.log('todo bien cdiu');
                      })
                      .catch(err => console.log(err));
                    }
                  }
                  })
                  .catch(err => console.log(err));
                })
            }
            if(idRepeticionesND.length > 0){
              idRepeticionesND.forEach(async (id: any) => {
                const product_id = id[0];
                const sucursal_id = sucursal_id1;
                const repeticiones = id[1];
                const query = 'SELECT * FROM cdne WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                const existencia:any = await pool.promise().query(query, [product_id, sucursal_id, adminId])
                  .then((existencia:any) => {
                    const venta:any = {
                      nieve: existencia[0][0].nieve,
                      product_id: existencia[0][0].id,
                      sucursal_id: sucursal_id1,
                      created_at: now,
                      ventas: repeticiones,
                      factura_id: factura_id,
                      adminId: adminId
                    }
                    console.log(existencia[0][0])
                    console.log(venta)
                    if(existencia[0][0].cantidad === 0){
                    const query = 'INSERT INTO cdnv SET ?';
                    const venta1:any = pool.promise().query(query, [venta])
                    .then(venta1 => {
                      venta1[0]
                      console.log('todo bien cdn');
                    })
                    .catch(err => console.log(err));
                  }else if(existencia[0][0].cantidad === 1){
                    if(existencia[0][0].inventario > repeticiones){
                    const query1 = 'UPDATE cdne SET inventario = inventario - ? WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                    const existencia1:any = pool.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId])
                    console.log(venta)
                    const query = 'INSERT INTO cdnv SET ?';
                    const venta1:any = pool.promise().query(query, [venta])
                    .then(venta1 => {
                      console.log('todo bien cdn');
                    })
                    .catch(err => console.log(err));}else if(existencia[0][0].inventario === repeticiones){
                      const query1 = 'UPDATE cdne SET inventario = inventario - ?, existencia = 0 WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                      const existencia1:any = pool.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId])
                      console.log(venta)
                      const query = 'INSERT INTO cdnv SET ?';
                      const venta1:any = pool.promise().query(query, [venta])
                      .then(venta1 => {
                        console.log('todo bien cdn');
                      })
                      .catch(err => console.log(err));
                    }
                  }
                  })
                  .catch(err => console.log(err));
                })
            }

            if(idRepeticionesHD.length > 0){
              idRepeticionesHD.forEach(async (id: any) => {
                const product_id = id[0];
                const sucursal_id = sucursal_id1;
                const repeticiones = id[1];
                const query = 'SELECT * FROM cdthe WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                const existencia:any = await pool.promise().query(query, [product_id, sucursal_id, adminId])
                  .then((existencia:any) => {
                    const venta:any = {
                      harina: existencia[0][0].harina,
                      product_id: existencia[0][0].id,
                      sucursal_id: sucursal_id1,
                      created_at: now,
                      ventas: repeticiones,
                      factura_id: factura_id,
                      adminId: adminId
                    }
                    console.log(existencia[0][0])
                    console.log(venta)
                    if(existencia[0][0].cantidad === 0){
                    const query = 'INSERT INTO cdthv SET ?';
                    const venta1:any = pool.promise().query(query, [venta])
                    .then(venta1 => {
                      venta1[0]
                      console.log('todo bien cdth');
                    })
                    .catch(err => console.log(err));
                  }else if(existencia[0][0].cantidad === 1){
                    if(existencia[0][0].inventario > repeticiones){
                    const query1 = 'UPDATE cdthe SET inventario = inventario - ? WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                    const existencia1:any = pool.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId])
                    console.log(venta)
                    const query = 'INSERT INTO cdthv SET ?';
                    const venta1:any = pool.promise().query(query, [venta])
                    .then(venta1 => {
                      console.log('todo bien cdth');
                    })
                    .catch(err => console.log(err));}else if(existencia[0][0].inventario === repeticiones){
                      const query1 = 'UPDATE cdthe SET inventario = inventario - ?, existencia = 0 WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                      const existencia1:any = pool.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId])
                      console.log(venta)
                      const query = 'INSERT INTO cdthv SET ?';
                      const venta1:any = pool.promise().query(query, [venta])
                      .then(venta1 => {
                        console.log('todo bien cdth');
                      })
                      .catch(err => console.log(err));
                    }
                  }
                  })
                  .catch(err => console.log(err));
                })
            }

            if(idRepeticionesICW.length > 0){
              idRepeticionesICW.forEach(async (id: any) => {
                const product_id = id[0];
                const sucursal_id = sucursal_id1;
                const repeticiones = id[1];
                const query = 'SELECT * FROM wice WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                const existencia:any = await pool.promise().query(query, [product_id, sucursal_id, adminId])
                  .then((existencia:any) => {
                    const venta:any = {
                      ingrediente_com: existencia[0][0].ingrediente_com,
                      product_id: existencia[0][0].id,
                      sucursal_id: sucursal_id1,
                      created_at: now,
                      ventas: repeticiones,
                      factura_id: factura_id,
                      adminId: adminId
                    }
                    console.log(existencia[0][0])
                    console.log(venta)
                    if(existencia[0][0].cantidad === 0){
                    const query = 'INSERT INTO wicv SET ?';
                    const venta1:any = pool.promise().query(query, [venta])
                    .then(venta1 => {
                      venta1[0]
                      console.log('todo bien wic');
                    })
                    .catch(err => console.log(err));
                  }else if(existencia[0][0].cantidad === 1){
                    if(existencia[0][0].inventario > repeticiones){
                    const query1 = 'UPDATE wice SET inventario = inventario - ? WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                    const existencia1:any = pool.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId])
                    console.log(venta)
                    const query = 'INSERT INTO wicv SET ?';
                    const venta1:any = pool.promise().query(query, [venta])
                    .then(venta1 => {
                      console.log('todo bien wic');
                    })
                    .catch(err => console.log(err));}else if(existencia[0][0].inventario === repeticiones){
                      const query1 = 'UPDATE wice SET inventario = inventario - ?, existencia = 0 WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                      const existencia1:any = pool.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId])
                      console.log(venta)
                      const query = 'INSERT INTO wicv SET ?';
                      const venta1:any = pool.promise().query(query, [venta])
                      .then(venta1 => {
                        console.log('todo bien wic');
                      })
                      .catch(err => console.log(err));
                    }
                  }
                  })
                  .catch(err => console.log(err));
                })
            }
            if(idRepeticionesIUW.length > 0){
              idRepeticionesIUW.forEach(async (id: any) => {
                const product_id = id[0];
                const sucursal_id = sucursal_id1;
                const repeticiones = id[1];
                const query = 'SELECT * FROM wiue WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                const existencia:any = await pool.promise().query(query, [product_id, sucursal_id, adminId])
                  .then((existencia:any) => {
                    const venta:any = {
                      ingrediente_unt: existencia[0][0].ingrediente_unt,
                      product_id: existencia[0][0].id,
                      sucursal_id: sucursal_id1,
                      created_at: now,
                      ventas: repeticiones,
                      factura_id: factura_id,
                      adminId: adminId
                    }
                    console.log(existencia[0][0])
                    console.log(venta)
                    if(existencia[0][0].cantidad === 0){
                    const query = 'INSERT INTO wiuv SET ?';
                    const venta1:any = pool.promise().query(query, [venta])
                    .then(venta1 => {
                      venta1[0]
                      console.log('todo bien wiu');
                    })
                    .catch(err => console.log(err));
                  }else if(existencia[0][0].cantidad === 1){
                    if(existencia[0][0].inventario > repeticiones){
                    const query1 = 'UPDATE wiue SET inventario = inventario - ? WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                    const existencia1:any = pool.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId])
                    console.log(venta)
                    const query = 'INSERT INTO wiuv SET ?';
                    const venta1:any = pool.promise().query(query, [venta])
                    .then(venta1 => {
                      console.log('todo bien wiu');
                    })
                    .catch(err => console.log(err));}else if(existencia[0][0].inventario === repeticiones){
                      const query1 = 'UPDATE wiue SET inventario = inventario - ?, existencia = 0 WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                      const existencia1:any = pool.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId])
                      console.log(venta)
                      const query = 'INSERT INTO wiuv SET ?';
                      const venta1:any = pool.promise().query(query, [venta])
                      .then(venta1 => {
                        console.log('todo bien wiu');
                      })
                      .catch(err => console.log(err));
                    }
                  }
                  })
                  .catch(err => console.log(err));
                })
            }

            if(idRepeticionesNW.length > 0){
              idRepeticionesNW.forEach(async (id: any) => {
                const product_id = id[0];
                const sucursal_id = sucursal_id1;
                const repeticiones = id[1]; 
                const query = 'SELECT * FROM wne WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                const existencia:any = await pool.promise().query(query, [product_id, sucursal_id, adminId])
                  .then((existencia:any) => {
                    console.log(existencia[0][0])
                    const venta:any = {
                      nieve: existencia[0][0].nieve,
                      product_id: existencia[0][0].id,
                      sucursal_id: sucursal_id1,
                      created_at: now,
                      ventas: repeticiones,
                      factura_id: factura_id,
                      adminId: adminId
                    }
                    console.log(venta)
                    if(existencia[0][0].cantidad === 0){
                    const query = 'INSERT INTO wnv SET ?';
                    const venta1:any = pool.promise().query(query, [venta])
                    .then(venta1 => {
                      venta1[0]
                      console.log('todo bien wne');
                    })
                    .catch(err => console.log(err));
                  }else if(existencia[0][0].cantidad === 1){
                    if(existencia[0][0].inventario > repeticiones){
                      const query1 = 'UPDATE wne SET inventario = inventario - ? WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                      const existencia1:any = pool.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId])
                      console.log(venta)
                      const query = 'INSERT INTO wnv SET ?';
                      const venta1:any = pool.promise().query(query, [venta])
                      .then(venta1 => {
                        console.log('todo bien wne');
                      })
                      .catch(err => console.log(err));
                    }else if(existencia[0][0].inventario === repeticiones){
                      const query1 = 'UPDATE wne SET inventario = inventario - ?, existencia = 0 WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                      const existencia1:any = pool.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId])
                      console.log(venta)
                      const query = 'INSERT INTO wnv SET ?';
                      const venta1:any = pool.promise().query(query, [venta])
                      .then(venta1 => {
                        console.log('todo bien wne');
                      })
                      .catch(err => console.log(err));
                    }
                  }
                  })
                  .catch(err => console.log(err));
                })
            }
            if(idRepeticionesICWC.length > 0){
              idRepeticionesICWC.forEach(async (id: any) => {
                const product_id = id[0];
                const sucursal_id = sucursal_id1;
                const repeticiones = id[1]; 
                const query = 'SELECT * FROM wcice WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                const existencia:any = await pool.promise().query(query, [product_id, sucursal_id, adminId])
                  .then((existencia:any) => {
                    console.log(existencia[0][0])
                    const venta:any = {
                      ingrediente_com: existencia[0][0].ingrediente_com,
                      product_id: existencia[0][0].id,
                      sucursal_id: sucursal_id1,
                      created_at: now,
                      ventas: repeticiones,
                      factura_id: factura_id,
                      adminId: adminId
                    }
                    console.log(venta)
                    if(existencia[0][0].cantidad === 0){
                    const query = 'INSERT INTO wcicv SET ?';
                    const venta1:any = pool.promise().query(query, [venta])
                    .then(venta1 => {
                      venta1[0]
                      console.log('todo bien wcic');
                    })
                    .catch(err => console.log(err));
                  }else if(existencia[0][0].cantidad === 1){
                    if(existencia[0][0].inventario > repeticiones){
                    const query1 = 'UPDATE wcice SET inventario = inventario - ? WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                    const existencia1:any = pool.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId])
                    console.log(venta)
                    const query = 'INSERT INTO wcicv SET ?';
                    const venta1:any = pool.promise().query(query, [venta])
                    .then(venta1 => {
                      console.log('todo bien wcic');
                    })
                    .catch(err => console.log(err));}else if(existencia[0][0].inventario === repeticiones){
                      const query1 = 'UPDATE wcice SET inventario = inventario - ?, existencia = 0 WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                      const existencia1:any = pool.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId])
                      console.log(venta)
                      const query = 'INSERT INTO wcicv SET ?';
                      const venta1:any = pool.promise().query(query, [venta])
                      .then(venta1 => {
                        console.log('todo bien wcic');
                      })
                      .catch(err => console.log(err));
                    }
                  }
                  })
                  .catch(err => console.log(err));
                })
            }

            if(idRepeticionesIUWC.length > 0){
              idRepeticionesIUWC.forEach(async (id: any) => {
                const product_id = id[0];
                const sucursal_id = sucursal_id1;
                const repeticiones = id[1]; 
                const query = 'SELECT * FROM wciue WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                const existencia:any = await pool.promise().query(query, [product_id, sucursal_id, adminId])
                  .then((existencia:any) => {
                    console.log(existencia[0][0])
                    const venta:any = {
                      ingrediente_unt: existencia[0][0].ingrediente_unt,
                      product_id: existencia[0][0].id,
                      sucursal_id: sucursal_id1,
                      created_at: now,
                      ventas: repeticiones,
                      factura_id:factura_id,
                      adminId: adminId
                    }
                    console.log(venta)
                    if(existencia[0][0].cantidad === 0){
                    const query = 'INSERT INTO wciuv SET ?';
                    const venta1:any = pool.promise().query(query, [venta])
                    .then(venta1 => {
                      venta1[0]
                      console.log('todo bien wciu');
                    })
                    .catch(err => console.log(err));
                  }else if(existencia[0][0].cantidad === 1){
                    if(existencia[0][0].inventario > repeticiones){
                    const query1 = 'UPDATE wciue SET inventario = inventario - ? WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                    const existencia1:any = pool.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId])
                    console.log(venta)
                    const query = 'INSERT INTO wciuv SET ?';
                    const venta1:any = pool.promise().query(query, [venta])
                    .then(venta1 => {
                      console.log('todo bien wciu');
                    })
                    .catch(err => console.log(err));
                  }else if(existencia[0][0].inventario === repeticiones){
                    const query1 = 'UPDATE wciue SET inventario = inventario - ?, existencia = 0 WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                    const existencia1:any = pool.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId])
                    console.log(venta)
                    const query = 'INSERT INTO wciuv SET ?';
                    const venta1:any = pool.promise().query(query, [venta])
                    .then(venta1 => {
                      console.log('todo bien wciu');
                    })
                    .catch(err => console.log(err));
                  }
                  }
                  })
                  .catch(err => console.log(err));
                })
            }
            if(idRepeticionesNWC.length > 0){
              idRepeticionesNWC.forEach(async (id: any) => {
                const product_id = id[0];
                const sucursal_id = sucursal_id1;
                const repeticiones = id[1]; 
                const query = 'SELECT * FROM wcne WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                const existencia:any = await pool.promise().query(query, [product_id, sucursal_id, adminId])
                  .then((existencia:any) => {
                    console.log(existencia[0][0])
                    const venta:any = {
                      nieve: existencia[0][0].nieve,
                      product_id: existencia[0][0].id,
                      sucursal_id: sucursal_id1,
                      created_at: now,
                      ventas: repeticiones,
                      factura_id:factura_id,
                      adminId: adminId
                    }
                    console.log(venta)
                    if(existencia[0][0].cantidad === 0){
                    const query = 'INSERT INTO wcnv SET ?';
                    const venta1:any = pool.promise().query(query, [venta])
                    .then(venta1 => {
                      venta1[0]
                      console.log('todo bien wcn');
                    })
                    .catch(err => console.log(err));
                  }else if(existencia[0][0].cantidad === 1){ 
                    if(existencia[0][0].inventario > repeticiones){
                    const query1 = 'UPDATE wcne SET inventario = inventario - ? WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                    const existencia1:any = pool.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId])
                    console.log(venta)
                    const query = 'INSERT INTO wcnv SET ?';
                    const venta1:any = pool.promise().query(query, [venta])
                    .then(venta1 => {
                      console.log('todo bien wcn');
                    })
                    .catch(err => console.log(err));
                  }else if(existencia[0][0].inventario === repeticiones){
                    const query1 = 'UPDATE wcne SET inventario = inventario - ?, existencia = 0 WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                    const existencia1:any = pool.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId])
                    .then(venta1 => {})
                    .catch(err => console.log(err));
                    console.log(venta)
                    const query = 'INSERT INTO wcnv SET ?';
                    const venta1:any = pool.promise().query(query, [venta])
                    .then(venta1 => {
                      console.log('todo bien wcn');
                    })
                    .catch(err => console.log(err));
                  }
                }
                  })
                  .catch(err => console.log(err));
                })
            }
            if(idRepeticionesBC.length > 0){
              idRepeticionesBC.forEach(async (id: any) => {
                const product_id = id[0];
                const sucursal_id = sucursal_id1;
                const repeticiones = id[1];
                const query = 'SELECT * FROM bce WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                const existencia:any = await pool.promise().query(query, [product_id, sucursal_id, adminId])
                  .then((existencia:any) => { 
                    const venta:any = {
                      bebida: existencia[0][0].bebida,
                      descripcion: existencia[0][0].descripcion,
                      product_id: existencia[0][0].id,
                      sucursal_id: sucursal_id1,
                      created_at: now,
                      factura_id:factura_id,
                      ventas: repeticiones,
                      adminId: adminId
                    }
                    console.log(venta)
                    if(existencia[0][0].cantidad === 0){
                    const query = 'INSERT INTO bcv SET ?';
                    const venta1:any = pool.promise().query(query, [venta])
                    .then(venta1 => {
                      console.log('todo bien bc');
                    })
                    .catch(err => console.log(err));
                  }else if(existencia[0][0].cantidad === 1){
                    if(existencia[0][0].inventario > repeticiones){
                    const query1 = 'UPDATE bce SET inventario = inventario - ? WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                    const existencia1:any = pool.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId])
                    console.log(venta)
                    const query = 'INSERT INTO bcv SET ?';
                    const venta1:any = pool.promise().query(query, [venta])
                    .then(venta1 => {
                      console.log('todo bien bc');
                    })
                    .catch(err => console.log(err));
                  }else if(existencia[0][0].inventario === repeticiones){
                    const query1 = 'UPDATE bce SET inventario = inventario - ?, existencia = 0 WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                    const existencia1:any = pool.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId])
                    console.log(venta)
                    const query = 'INSERT INTO bcv SET ?';
                    const venta1:any = pool.promise().query(query, [venta])
                    .then(venta1 => {
                      console.log('todo bien bc');
                    })
                    .catch(err => console.log(err));
                  }
                }
                  })
                  .catch(err => console.log(err));
                })
            }

            if(idRepeticionesBF.length > 0){
              idRepeticionesBF.forEach(async (id: any) => {
                const product_id = id[0];
                const sucursal_id = sucursal_id1;
                const repeticiones = id[1];
                const query = 'SELECT * FROM bfe WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                const existencia:any = await pool.promise().query(query, [product_id, sucursal_id, adminId])
                  .then((existencia:any) => { 
                    const venta:any = {
                      bebida: existencia[0][0].bebida,
                      descripcion: existencia[0][0].descripcion,
                      product_id: existencia[0][0].id,
                      sucursal_id: sucursal_id1,
                      created_at: now,
                      factura_id:factura_id,
                      ventas: repeticiones,
                      adminId: adminId
                    }
                    console.log(venta)
                    if(existencia[0][0].cantidad === 0){
                    const query = 'INSERT INTO bfv SET ?';
                    const venta1:any = pool.promise().query(query, [venta])
                    .then(venta1 => {
                      console.log('todo bien bf');
                    })
                    .catch(err => console.log(err));
                  }else if(existencia[0][0].cantidad === 1){
                    if(existencia[0][0].inventario > repeticiones){
                    const query1 = 'UPDATE bfe SET inventario = inventario - ? WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                    const existencia1:any = pool.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId])
                    console.log(venta)
                    const query = 'INSERT INTO bfv SET ?';
                    const venta1:any = pool.promise().query(query, [venta])
                    .then(venta1 => {
                      console.log('todo bien bf');
                    })
                    .catch(err => console.log(err));
                  }else if(existencia[0][0].inventario === repeticiones){ 
                    const query1 = 'UPDATE bfe SET inventario = inventario - ?, existencia = 0 WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                    const existencia1:any = pool.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId])
                    console.log(venta)
                    const query = 'INSERT INTO bfv SET ?';
                    const venta1:any = pool.promise().query(query, [venta])
                    .then(venta1 => {
                      console.log('todo bien bf');
                    })
                    .catch(err => console.log(err));
                  }
                  }
                  })
                  .catch(err => console.log(err));
                })
            }

            if(idRepeticionesB.length > 0){
              idRepeticionesB.forEach(async (id: any) => {
                const product_id = id[0];
                const repeticiones = id[1];
                const sucursal_id = sucursal_id1;
                const query = 'SELECT * FROM csbe WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                const existencia:any = await pool.promise().query(query, [product_id, sucursal_id, adminId])
                  .then( async(existencia:any) => { 
                    const venta:any = {
                      botana: existencia[0][0].botana,
                      product_id: existencia[0][0].id,
                      sucursal_id: sucursal_id1,
                      created_at: now,
                      factura_id:factura_id,
                      ventas: repeticiones,
                      adminId: adminId
                    }
                    console.log(existencia[0][0])
                    if(existencia[0][0].cantidad === 0){
                    console.log(venta)
                    const query = 'INSERT INTO csbv SET ?';
                    const venta1:any = pool.promise().query(query, [venta])
                    .then(venta1 => {
                      console.log('todo bien csb');
                    })
                    .catch(err => console.log(err));
                  }else if(existencia[0][0].cantidad === 1){
                    if(existencia[0][0].inventario > repeticiones){
                    const query1 = 'UPDATE csbe SET inventario = inventario - ? WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                    const existencia1:any = await pool.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId])
                    console.log(venta)
                    const query = 'INSERT INTO csbv SET ?';
                    const venta1:any = await pool.promise().query(query, [venta])
                    .then(venta1 => {
                      console.log('todo bien csb');
                    })
                    .catch(err => console.log(err));
                  }else if(existencia[0][0].inventario === repeticiones){
                    const query1 = 'UPDATE csbe SET inventario = inventario - ?, existencia = 0 WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                    const existencia1:any = await pool.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId])
                    console.log(venta)
                    const query = 'INSERT INTO csbv SET ?';
                    const venta1:any = await pool.promise().query(query, [venta])
                    .then(venta1 => {
                      console.log('todo bien csb');
                    })
                    .catch(err => console.log(err));
                  }
                }
                  })
                  .catch(err => console.log(err));
                })
            }
            if(idRepeticionesE.length > 0){
              idRepeticionesE.forEach(async (id: any) => {
                const product_id = id[0];
                const repeticiones = id[1];
                const sucursal_id = sucursal_id1;
                const query = 'SELECT * FROM cseie WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                const existencia:any = await pool.promise().query(query, [product_id, sucursal_id, adminId])
                  .then((existencia:any) => { 
                    const venta:any = {
                      ensalada_ind: existencia[0][0].ensalada_ind,
                      descripcion: existencia[0][0].descripcion,
                      product_id: existencia[0][0].id,
                      sucursal_id: sucursal_id1,
                      created_at: now,
                      factura_id:factura_id,
                      ventas: repeticiones,
                      adminId: adminId
                    }
                    console.log(venta)
                    if(existencia[0][0].cantidad === 0){
                    const query = 'INSERT INTO cseiv SET ?';
                    const venta1:any = pool.promise().query(query, [venta])
                    .then(venta1 => {
                      console.log('todo bien csei');
                    })
                    .catch(err => console.log(err));
                  }else if(existencia[0][0].cantidad === 1){
                    if(existencia[0][0].inventario > repeticiones){
                    const query1 = 'UPDATE cseie SET inventario = inventario - ? WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                    const existencia1:any = pool.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId])
                    console.log(venta)
                    const query = 'INSERT INTO cseiv SET ?';
                    const venta1:any = pool.promise().query(query, [venta])
                    .then(venta1 => {
                      console.log('todo bien csei');
                    })
                    .catch(err => console.log(err));
                  }else if(existencia[0][0].inventario === repeticiones){
                    const query1 = 'UPDATE cseie SET inventario = inventario - ?, existencia = 0 WHERE product_id = ? AND sucursal_id = ? AND adminId = ?';
                    const existencia1:any = pool.promise().query(query1, [repeticiones, product_id, sucursal_id, adminId])
                    console.log(venta)
                    const query = 'INSERT INTO cseiv SET ?';
                    const venta1:any = pool.promise().query(query, [venta])
                    .then(venta1 => {
                      console.log('todo bien csei');
                    })
                    .catch(err => console.log(err));
                  }

                  }
                  })
                  .catch(err => console.log(err));
                })
            }
            res.status(200).json({ message: 'Orden realizada con exito', id: factura_id });
          }else if(resultFinal === false){
            res.status(500).json({ message: '404' });
          }          
          }, 1200);





// Crear una promesa que se resuelva cuando se completen todas las operaciones de push en el arreglo



// Esperar a que se resuelva la promesa antes de hacer el console.log de resultA

});
      }catch(err){
        console.log(err);
      }
    }
  }

}

export const ventasController = new VentasController();