
document.addEventListener("DOMContentLoaded", function () {
    cargarBodegas();
    cargarMonedas();

    document.getElementById("bodega").addEventListener("change", function () {
        cargarSucursales(this.value);
    });
});

function cargarBodegas() {
    fetch("php/obtener_datos.php?tipo=bodegas")
        .then(response => response.json())
        .then(data => {
            let selectBodega = document.getElementById("bodega");
            selectBodega.innerHTML = '<option value="">Seleccione una bodega</option>';
            data.forEach(bodega => {
                selectBodega.innerHTML += `<option value="${bodega.id}">${bodega.nombre}</option>`;
            });
        })
        .catch(error => console.error("Error cargando bodegas:", error));
}

function cargarSucursales(bodegaId) {
    let selectSucursal = document.getElementById("sucursal");
    selectSucursal.innerHTML = '<option value="">Seleccione una sucursal</option>';

    if (bodegaId) {
        fetch(`php/obtener_datos.php?tipo=sucursales&bodega_id=${bodegaId}`)
            .then(response => response.json())
            .then(data => {
                data.forEach(sucursal => {
                    selectSucursal.innerHTML += `<option value="${sucursal.id}">${sucursal.nombre}</option>`;
                });
            })
            .catch(error => console.error("Error cargando sucursales:", error));
    }
}

function cargarMonedas() {
    fetch("php/obtener_datos.php?tipo=monedas")
        .then(response => response.json())
        .then(data => {
            let selectMoneda = document.getElementById("moneda");
            selectMoneda.innerHTML = '<option value="">Seleccione una moneda</option>';
            data.forEach(moneda => {
                selectMoneda.innerHTML += `<option value="${moneda.id}">${moneda.nombre}</option>`;
            });
        })
        .catch(error => console.error("Error cargando monedas:", error));
}


function enviarDatos() {
    let formData = new FormData(document.getElementById("registroForm"));

    fetch("php/guardar_producto.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        document.getElementById("registroForm").reset(); // Limpiar formulario tras envío
    })
    .catch(error => console.error("Error:", error));
}
