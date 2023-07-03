export const añadirProductosPrincipales = (agregarProductoInventario) => {
    //objeto creado para agregar productos al inventario
    const productosPrincipales = [{
            nombre: 'Iphone11',
            precio: 1000,
            stock: 10,
            categoria: 'movil',
            marca: 'mac',
            caracteristicas: [{
                nombre: 'tipo',
                valor: 'smartphone',
            }, {
                nombre: 'camara Principal',
                valor: '12mp',
            }, {
                nombre: 'camara Frontal',
                valor: '12mp',
            }, {
                nombre: 'almacenamiento',
                valor: '64gb',
            }, {
                nombre: 'conectividad',
                valor: '4g'
            }]
        },
        {
            nombre: 'Ipad',
            precio: 700,
            stock: 10,
            categoria: 'tablet',
            marca: 'mac',
            caracteristicas: [{
                    nombre: 'tipo',
                    valor: 'tablet'
                },
                {
                    nombre: 'camara Principal',
                    valor: '12mp'
                },
                {
                    nombre: 'procesador',
                    valor: 'seriea'
                },
                {
                    nombre: 'almacenamiento',
                    valor: '64gb'
                },
                {
                    nombre: 'conectividad',
                    valor: 'bluetooth'
                }
            ]
        },
        {
            nombre: 'S23',
            precio: 600,
            stock: 10,
            categoria: 'movil',
            marca: 'Samsung',
            caracteristicas: [{
                    nombre: 'tipo',
                    valor: 'smartphone'
                },
                {
                    nombre: 'camara Principal',
                    valor: '12mp'
                },
                {
                    nombre: 'camara Frontal',
                    valor: '12mp'
                },
                {
                    nombre: 'almacenamiento',
                    valor: '256gb'
                },
                {
                    nombre: 'conectividad',
                    valor: '4g'
                }
            ]
        },
        {
            nombre: 'macbook',
            precio: 900,
            stock: 10,
            categoria: 'portatil',
            marca: 'Mac',
            caracteristicas: [{
                    nombre: 'procesador',
                    valor: 'm1'
                },
                {
                    nombre: 'memoria Ram',
                    valor: '8gb'
                },
                {
                    nombre: 'sistema Operativo',
                    valor: 'macos'
                },
                {
                    nombre: 'tamaño Pantalla',
                    valor: '13.3p'
                },
                {
                    nombre: 'nucleos Procesador',
                    valor: 'octacore'
                }
            ]
        },
        {
            nombre: 'LenovoTab',
            precio: 300,
            stock: 10,
            categoria: 'tablet',
            marca: 'Lenovo',
            caracteristicas: [{
                    nombre: 'tipo',
                    valor: 'tablet'
                },
                {
                    nombre: 'camaraPrincipal',
                    valor: '8mp'
                },
                {
                    nombre: 'procesador',
                    valor: 'mediatek'
                },
                {
                    nombre: 'almacenamiento',
                    valor: '64gb'
                },
                {
                    nombre: 'conectividad',
                    valor: 'bluetooth'
                }
            ]
        },
        {
            nombre: 'Latitude',
            precio: 800,
            stock: 10,
            categoria: 'portatil',
            marca: 'Dell',
            caracteristicas: [{
                    nombre: 'procesador',
                    valor: 'i7'
                },
                {
                    nombre: 'memoria Ram',
                    valor: '16gb'
                },
                {
                    nombre: 'sistema Operativo',
                    valor: 'windows'
                },
                {
                    nombre: 'tamaño Pantalla',
                    valor: '14p'
                },
                {
                    nombre: 'nucleos Procesador',
                    valor: 'quadcore'
                }
            ]
        },
        {
            nombre: 'LgNano',
            precio: 680,
            stock: 20,
            categoria: 'Tv',
            marca: 'LG',
            caracteristicas: [{
                    nombre: 'Resolucion',
                    valor: '4K ultra HD'
                },
                {
                    nombre: 'Pulgadas',
                    valor: '55'
                },
                {
                    nombre: 'Voltaje',
                    valor: '220 V'
                },
                {
                    nombre: 'Garantia',
                    valor: '1 año'
                },
                {
                    nombre: 'Condicion',
                    valor: 'Nuevo'
                }
            ]
        },
        {
            nombre: 'Lg',
            precio: 460,
            stock: 30,
            categoria: 'Tv',
            marca: 'LG',
            caracteristicas: [{
                    nombre: 'Resolucion',
                    valor: 'Ultra HD'
                },
                {
                    nombre: 'Pulgadas',
                    valor: '55'
                },
                {
                    nombre: 'Voltaje',
                    valor: '220 V'
                },
                {
                    nombre: 'Garantia',
                    valor: '1 año'
                },
                {
                    nombre: 'Condicion',
                    valor: 'Nuevo'
                }
            ]
        },
        {
            nombre: 'Qled',
            precio: 1100,
            stock: 30,
            categoria: 'Tv',
            marca: 'Samsung',
            caracteristicas: [{
                    nombre: 'Resolucion',
                    valor: '8K 4K Ultra HD'
                },
                {
                    nombre: 'Pulgadas',
                    valor: '55'
                },
                {
                    nombre: 'Voltaje',
                    valor: '220 V'
                },
                {
                    nombre: 'Garantia',
                    valor: '1 año'
                },
                {
                    nombre: 'Condicion',
                    valor: 'Nuevo'
                }
            ]
        }
    ];

    for (let i = 0; i < productosPrincipales.length; i++) {

        agregarProductoInventario(
            productosPrincipales[i].nombre,
            productosPrincipales[i].precio,
            productosPrincipales[i].stock,
            productosPrincipales[i].categoria,
            productosPrincipales[i].marca,
            productosPrincipales[i].caracteristicas
        );
    }
};