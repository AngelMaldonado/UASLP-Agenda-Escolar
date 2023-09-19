document.addEventListener("DOMContentLoaded", function () {
    // Obtén referencias a los elementos del DOM
    const formulario = document.getElementById("formulario");
    const botonAgregar = document.querySelector(".boton-agregar");
    const botonCancelar = document.querySelector(".boton-cancelar");

    // Manejar clic en el botón "Agregar"
    botonAgregar.addEventListener("click", function (event) {
        // Evita que se envíe el formulario y recargue la página
        event.preventDefault();

        // Obtén los valores de los campos de entrada
        const nombre = document.getElementById("nombre").value;
        const apellidos = document.getElementById("apellidos").value;
        // Obtén otros valores de los campos

        // Crea un nuevo usuario o realiza alguna acción con los datos
        // Puedes imprimirlos en la consola para probar
        console.log("Nuevo Usuario:");
        console.log("Nombre:", nombre);
        console.log("Apellidos:", apellidos);
        // Imprime otros valores

        // Restablece los campos del formulario después de agregar
        formulario.reset();
    });

    // Manejar clic en el botón "Cancelar"
    botonCancelar.addEventListener("click", function () {
        // Restablece los campos del formulario
        formulario.reset();
    });
});