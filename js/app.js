/* Variables */
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');

let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners() {
    /* Cuando agregas un curso presionando "Agregar al carrito" */
    listaCursos.addEventListener('click', agregarCurso);
    /* Elimina curso */
    carrito.addEventListener('click', eliminarCurso);
    /* Vaciar carrito */
    vaciarCarrito.addEventListener('click', () => {
        articulosCarrito = []; /* resetear el arreglo */
        limpiarHTML(); /* eliminar html */
    });
}

/* 
    Mis comentarios con respecto a esta funcion:
    * para evitar usar el preventDefault la etiqueta html debe ser button y no a 
*/
function agregarCurso(e) {
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement; /* info-card -> card */
        leerDatosCursos(cursoSeleccionado);
    }
}

function eliminarCurso(e) {
    if(e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');
        /* Elimina del arreglo de articulos Carrito por el data-id */
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

        carritoHTML();
    }
}

/* Lee el contenido del HTML al que le dimos click y extraer la información del curos */
function leerDatosCursos(curso) {
    /* Crear un objeto con el contenido del curso */
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: parseInt(curso.querySelector('.u-pull-right').textContent.slice(1)),
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    /* Revisa si un elemento ya existe en el carrito */
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if(existe) {
        /* Actualizamos la cantidad */
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; /* objeto actualizado */
            } else {
                return curso; /* objeto que no estan duplicados */
            }
        });
        articulosCarrito = [...cursos];
    } else {
        /* Agregar elementos al arreglo de carrito */
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    carritoHTML();
}

/* Mostrar el carrito de compras en el HTML */
function carritoHTML() {
    /* Limpiar el html */
    limpiarHTML();

    /* Recorrer el carrito y genera el HTML */
    articulosCarrito.forEach(curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                $${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}">X</a>
            </td>
        `;
        /* Agregar el html en el tbody */
        contenedorCarrito.appendChild(row);
    });
}

/* Eliminar los cursos del tbody */
function limpiarHTML() {
    /* Forma lenta */
    // contenedorCarrito.innerHTML = '';

    /* Forma rapida */
    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}