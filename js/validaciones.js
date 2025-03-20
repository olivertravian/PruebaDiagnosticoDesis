function validarCodigo(input) {
    let valor = input.value.trim();

    // Permitir solo letras y numeros
    valor = valor.replace(/[^A-Za-z0-9]/g, ''); 

    // Limitar a 15 caracteres
    if (valor.length > 15) {
        valor = valor.substring(0, 15);
    }

    input.value = valor; 

    let regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,15}$/;

    if (valor.length < 5 || !regex.test(valor)) {
        return false;
    }
    return true;
}


// Funcion para validar solo numeros y un punto decimal
function validarPrecio(input) {
    let valor = input.value;

    valor = valor.replace(/[^0-9.]/g, ''); 

    let partes = valor.split('.');
    if (partes.length > 2) {
        valor = partes[0] + '.' + partes.slice(1).join('');
    }
    if (valor.startsWith('.')) {
        valor = '0' + valor;
    }
    if (partes.length === 2) {
        valor = partes[0] + '.' + partes[1].substring(0, 2);
    }

    input.value = valor;
}

document.addEventListener("DOMContentLoaded", function () {
    const modalAlerta = document.getElementById("modalAlerta");
    const mensajeAlerta = document.getElementById("mensajeAlerta");
    const cerrarAlerta = document.getElementById("cerrarAlerta");

    function mostrarAlerta(mensaje) {
        mensajeAlerta.textContent = mensaje;
        modalAlerta.classList.add("active");
    }

    cerrarAlerta.addEventListener("click", function () {
        modalAlerta.classList.remove("active");
    });

    document.getElementById("registroForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Evita el envío normal del formulario

        let formData = new FormData(this);

        //Validar Código del Producto
        let codigo = formData.get("codigo").trim();
        if (codigo === "") {
            mostrarAlerta("El código del producto no puede estar en blanco.");
            return;
        } 
        if (!/[a-zA-Z]/.test(codigo) || !/\d/.test(codigo)) {
            mostrarAlerta("El código del producto debe contener letras y números.");
            return;
        } 
        if (codigo.length < 5 || codigo.length > 15) {
            mostrarAlerta("El código del producto debe tener entre 5 y 15 caracteres.");
            return;
        }

        //Validar Nombre del Producto
        let nombre = formData.get("nombre").trim();
        if (nombre === "") {
            mostrarAlerta("El nombre del producto no puede estar en blanco.");
            return;
        } 
        if (nombre.length < 2 || nombre.length > 50) {
            mostrarAlerta("El nombre del producto debe tener entre 2 y 50 caracteres.");
            return;
        }

        //Validar Bodega (Debe seleccionarse)
        let bodega = formData.get("bodega");
        if (bodega === "") {
            mostrarAlerta("Debe seleccionar una bodega.");
            return;
        }

        //Validar Sucursal (Debe seleccionarse)
        let sucursal = formData.get("sucursal");
        if (sucursal === "") {
            mostrarAlerta("Debe seleccionar una sucursal para la bodega seleccionada.");
            return;
        }

        //Validar Moneda (Debe seleccionarse)
        let moneda = formData.get("moneda");
        if (moneda === "") {
            mostrarAlerta("Debe seleccionar una moneda para el producto.");
            return;
        }


        //Validar Precio
        let precio = formData.get("precio").trim();
        if (precio === "") {
            mostrarAlerta("El precio del producto no puede estar en blanco.");
            return;
        } 
        if (!/^\d+(\.\d{1,2})?$/.test(precio)) {
            mostrarAlerta("El precio debe ser un número positivo con hasta dos decimales.");
            return;
        }

        //Validar Materiales (mínimo 2 seleccionados)
        let materialesSeleccionados = document.querySelectorAll('.checkbox-group input[type="checkbox"]:checked');
        if (materialesSeleccionados.length < 2) {
            mostrarAlerta("Debes seleccionar al menos dos materiales.");
            return;
        }

        //Validar Descripción
        let descripcion = formData.get("descripcion").trim();
        if (descripcion === "") {
            mostrarAlerta("La descripción del producto no puede estar en blanco.");
            return;
        } 
        if (descripcion.length < 10 || descripcion.length > 1000) {
            mostrarAlerta("La descripción del producto debe tener entre 10 y 1000 caracteres.");
            return;
        }

        fetch("php/guardar_producto.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            mostrarAlerta(data.message);
            if (data.status === "success") {
                document.getElementById("registroForm").reset();
            }
        })
        .catch(error => console.error("Error en la petición AJAX:", error));
    });
});
