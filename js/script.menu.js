//=============================
// PARA EL SUBMENU
//=============================

// FUNCION PARA CERRAR TODOS LOS SUBMENUS
function toggleSubmenu(id) {
    document.querySelectorAll(".submenu").forEach(menu => {
        menu.style.display = (menu.id === id && menu.style.display !== "block") ? "block" : "none";
    });
}
// FUNCION PARA CERRAR SESION
function cerrarSesion() {
    if (confirm("¿Seguro que quieres cerrar sesión?")) {
        window.location.href = "index.html"; 
    } 
};


//============================
// PARA LA FECHA AUTOMATICA 
// ===========================

// Variable para guardar el temporizador
let temporizadorFecha;
// FUNCION PARA CONTROL DE FECHA AUTOMÁTICA
function colocarFechaActual() {
    const hoy = new Date();
    const fecha = hoy.toISOString().split('T')[0];
    const horas = hoy.getHours().toString().padStart(2, "0");
    const minutos = hoy.getMinutes().toString().padStart(2, "0");
    const segundos = hoy.getSeconds().toString().padStart(2, "0");

    const fechaCompleta = `${fecha} ${horas}:${minutos}:${segundos}`;

    // Coloca la fecha en todos los campos con id o name "fecha"
    document.querySelectorAll('#fecha, [name="fecha"]').forEach(input => {
        input.value = fechaCompleta;
    });
}
// Coloca la fecha al cargar la página
window.addEventListener("DOMContentLoaded", colocarFechaActual);


// =====================================================
// PARA ABRIR, CERRAR Y DAR CLIC ATRAS EN LOS MODALES
//======================================================

//FUNCION PARA ABRIR MODAL
function abrirModal(idModal) {
    // Limpia solo en crear usuario
    if (idModal.includes("CrearUsuario1")) limpiarCrearUsuario();

    document.getElementById(idModal).style.display = "block";

    colocarFechaActual();
    clearInterval(temporizadorFecha);
    temporizadorFecha = setInterval(colocarFechaActual, 1000);
}
//FUNCION PARA CERRAR MODAL
function cerrarModal(idModal) {
    document.getElementById(idModal).style.display = "none";
    clearInterval(temporizadorFecha);
    resetearFlujoUsuarios();
}
//FUNCION BOTON ATRÁS
function Atras(modalActual, modalAnterior) { 
    document.getElementById(modalActual).style.display = "none"; 
    document.getElementById(modalAnterior).style.display = "block"; 
}


//=================================================================
// PARA MARCAR ERRORES Y LIMPIAR CAMPOS Y RESTABLECER FORMULARIO
//=================================================================

// FUNCION PARA MARCAR CAMPO CON ERROR DE COLOR ROJO
function marcarError(campo) {
    campo.style.border = "2px solid red";
}
// FUNCION PARA LIMPIAR CAMPO QUE TENGA EL ERROR
function limpiarError(campo) {
    campo.style.border = "1px solid #ccc";
}
// FUNCION PARA LIMPIAR UN FORMULARIO COMPLETO
function limpiarFormulario(form) {
    form.reset();
    form.querySelectorAll("input, select, textarea")
        .forEach(campo => limpiarError(campo));
}
// FUNCION PARA DESMARCAR TODOS LOS PERMISOS SELECCIONADOS
function limpiarCheckboxes(selector) {
    document.querySelectorAll(selector).forEach(chk => chk.checked = false);
}


//==========================
// PARA RESETEO GLOBAL
//==========================

// FUNCION PARA RESETEO GLOBAL
function resetearFlujoUsuarios() {
    usuarioSeleccionado = null;

    // Quitar selección visual
    document.querySelectorAll(".usuario-card").forEach(c => c.classList.remove("seleccionado"));

    // Resetear todos los formularios
    document.querySelectorAll("form").forEach(form => limpiarFormulario(form));

    // Cerrar todos los modales
    document.querySelectorAll(".modalmod").forEach(modal => {
        modal.style.display = "none";
    });
}
// FUNCION PARA BOTON CANCELAR (Crear, Modificar, Desactivar, Eliminar)
function cancelarProceso(modalActual) {
    cerrarModal(modalActual);

    const proceso = ["CrearUsuario", "ModificarUsuario", "DesactivarUsuario", "EliminarUsuario"]
        .find(p => modalActual.includes(p));

    if (!proceso) return;

    // Limpiar formularios del proceso
    document.querySelectorAll(`div[id*=${proceso}] form`)
        .forEach(form => limpiarFormulario(form));

    // Caso especial → limpieza completa
    if (proceso === "CrearUsuario") limpiarCrearUsuario();
}


//===========================
// PARA LAS CONTRASEÑAS
//===========================

//FUNCION PARA MOSTRAR Y OCULTAR CONTRASEÑAS
function togglePassword(idCampo, boton) {
    const input = document.getElementById(idCampo);
    const visible = input.type === "text";

    input.type = visible ? "password" : "text";
    boton.textContent = visible ? "👁️" : "🙈";
}
//FUNCION VALIDACION CONTRASEÑAS
function validarContraseñas(idContrasena, idConfirmar) {
    const contrasenaInput = document.getElementById(idContrasena);
    const confirmarInput = document.getElementById(idConfirmar);

    const contrasena = contrasenaInput.value.trim();
    const confirmar = confirmarInput.value.trim();

    if (contrasena !== confirmar) {
        alert("⚠️ Las contraseñas no coinciden. Por favor verifica.");
        marcarError(contrasenaInput);
        marcarError(confirmarInput);

        contrasenaInput.value = "";
        confirmarInput.value = "";
        contrasenaInput.focus();
        return false;
    }

    limpiarError(contrasenaInput);
    limpiarError(confirmarInput);
    return true;
}


// ================================================================================
// VALIDACIONES GENERALES
// ================================================================================
//FUNCION VALIDACION CAMPOS SIN DILIGENCIAR
function validarCamposVacios(form) {
    let valido = true;

    form.querySelectorAll("input, select").forEach(campo => {
        if (!campo.value.trim()) {
            marcarError(campo);
            valido = false;
        } else {
            limpiarError(campo);
        }
    });

    return valido;
}
//FUNCION PARA AVANZAR ENTRE MODALES
function validarYpasar(formId, modalActual, modalSiguiente) {
    const form = document.getElementById(formId);

    if (!validarCamposVacios(form)) {
        alert("⚠️ Debes llenar todos los campos antes de continuar.");
        return false;
    }

    if (form.dataset.enviado) return false;

    form.dataset.enviado = "true";

    document.getElementById(modalActual).style.display = "none";

    if (modalSiguiente) 
        document.getElementById(modalSiguiente).style.display = "block";
    else 
        alert("✅ Proceso completado.");

    setTimeout(() => delete form.dataset.enviado, 300);
    return true;
}


// ===========================================================================================================================
// CREAR USUARIO
// ===========================================================================================================================

function limpiarCrearUsuario() {
    // Limpiar todos los formularios del proceso
    document.querySelectorAll("#llenarCampos1, #llenarCampos2, #llenarCampos3")
        .forEach(form => limpiarFormulario(form));
    // Desmarcar permisos
    limpiarCheckboxes('#modalCrearUsuario3 input[type="checkbox"]');
    // Limpiar fecha
    document.querySelectorAll('[name="fecha"], #fecha').forEach(campo => campo.value = "");
}

// ====================================
// FORMULARIO 1 (DATOS PERSONALES)
// ====================================
document.getElementById("llenarCampos1").addEventListener("submit", e => {
    e.preventDefault();
    validarYpasar("llenarCampos1", "modalCrearUsuario1", "modalCrearUsuario2");
});

// ====================================
// FORMULARIO 2 (ID + CONTRASEÑA)
// ====================================
const idsRegistrados = ["Administrador", "Vendedor001", "Vendedor002"];

document.getElementById("llenarCampos2").addEventListener("submit", e => {
    e.preventDefault();

    const form = e.target;
    const idEmpleadoInput = form.querySelector('[name="idEmpleado"]');

    const idEmpleado = idEmpleadoInput.value.trim();
    // Validar ID existente
    if (idsRegistrados.includes(idEmpleado)) {
        alert("⚠️ El ID ingresado ya existe. Por favor ingrese uno diferente.");
        marcarError(idEmpleadoInput);
        idEmpleadoInput.value = "";
        idEmpleadoInput.focus();
        return;
    }

    limpiarError(idEmpleadoInput);
    // Validar contraseñas
    if (!validarContraseñas("contrasena_crear", "confirmacioncontrasena_crear")) return;

    validarYpasar("llenarCampos2", "modalCrearUsuario2", "modalCrearUsuario3");
});

// =========================================
// FORMULARIO 3 SELECCION DE PERMISOS
// =========================================
document.getElementById("llenarCampos3").addEventListener("submit", e => {
    e.preventDefault();

    const permisos = document.querySelectorAll('#modalCrearUsuario3 input[type="checkbox"]');
    if (!Array.from(permisos).some(chk => chk.checked)) {
        alert("⚠️ Debes seleccionar al menos un permiso antes de finalizar.");
        return;
    }

    if (!validarYpasar("llenarCampos3", "modalCrearUsuario3", null)) return;

    // Guardar datos
    if (!window.baseUsuarios) window.baseUsuarios = {};

    const datos = {};
    document.querySelectorAll("#modalCrearUsuario1 input, #modalCrearUsuario2 input, #modalCrearUsuario2 select")
        .forEach(campo => datos[campo.name] = campo.value);

    datos.permisos = Array.from(
        document.querySelectorAll('#modalCrearUsuario3 input[type="checkbox"]:checked')
    ).map(chk => chk.value);

    baseUsuarios[datos.idEmpleado] = datos;

    alert("✅ Usuario creado correctamente.");

    limpiarCrearUsuario();
    cerrarModal("modalCrearUsuario3");
});



//=================================================================================================
// MODIFICAR USUARIO
//=================================================================================================

//===============================
// BASE DE USUARIOS (GLOBAL)
//===============================
if (!window.baseUsuarios) window.baseUsuarios = {};

window.baseUsuarios = {
    "ADMINISTRADORA": {
        nombre: "Pepita",
        apellido: "Perez",
        documento: "123456",
        tipoDocumento: "CC",
        correoPersonal: "pepita@gmail.com",
        telefono: "3001234567",
        idEmpleado: "Administrador",
        contrasena:"admin123",
        confirmarContrasena:"admin123",
        correoEmpresa: "broasterhouse@gmail.com",
        rolEmpleado: "admin",
        permisos: ["crear", "modificar", "registrarVentas"]
    },

    "VENDEDORA UNO": {
        nombre: "Cata",
        apellido: "Sanchez",
        documento: "654321",
        tipoDocumento: "TI",
        correoPersonal: "cata@gmail.com",
        telefono: "3009876543",
        idEmpleado: "Vendedor001",
        contrasena:"vend001",
        confirmarContrasena:"vend001",
        correoEmpresa: "broasterhouse@gmail.com",
        rolEmpleado: "empleado",
        permisos: ["registrarVentas", "historialVentas"]
    },

    "VENDEDORA DOS": {
        nombre: "Juanita",
        apellido: "Diaz",
        documento: "789456",
        tipoDocumento: "CE",
        correoPersonal: "juanita@gmail.com",
        telefono: "3014567890",
        idEmpleado: "Vendedor002",
        contrasena:"vend002",
        confirmarContrasena:"vend002",
        correoEmpresa: "broasterhouse@gmail.com",
        rolEmpleado: "empleado",
        permisos: ["consultarInventario"]
    }
};

//========================================
// PARA VARIABLES
//========================================
// Variable para guardar el usuario actual
let usuarioSeleccionado = null;

//========================================
// SELECCIONAR USUARIO (Con toggle)
//========================================
function seleccionarUsuario(usuario) {
    const tarjetas = document.querySelectorAll(".usuario-card");

    tarjetas.forEach(card => {
        // Si la tarjeta corresponde al usuario clickeado
        if (card.innerText.includes(usuario)) {
            // Si ya está seleccionado → deseleccionar
            if (card.classList.contains("seleccionado")) {
                card.classList.remove("seleccionado");
                usuarioSeleccionado = null;
            } 
            // Si no está seleccionado → seleccionar
            else {
                tarjetas.forEach(c => c.classList.remove("seleccionado"));
                card.classList.add("seleccionado");
                usuarioSeleccionado = usuario;
            }
        }
    });
}

//=================================
// ABRIR EL SIGUIENTE MODAL
//=================================
function mostrarModal(id) {
    document.querySelectorAll(".modalmod").forEach(m => m.style.display = "none");
    document.getElementById(id).style.display = "block";
}

//=============================================
// PASO 1 → PASO 2 (cargar datos personales)
//=============================================
document.getElementById("btnModificarPaso1").addEventListener("click", () => {

    if (!usuarioSeleccionado) {
        alert("Debe seleccionar un usuario primero.");
        return;
    }

    const data = window.baseUsuarios[usuarioSeleccionado];

    // Cargar campos del modal 2
    document.getElementById("campoNombre").value = data.nombre;
    document.getElementById("campoApellido").value = data.apellido;
    document.getElementById("campoDocumento").value = data.documento;
    document.getElementById("campoTipoDocumento").value = data.tipoDocumento;
    document.getElementById("campoCorreoPersonal").value = data.correoPersonal;
    document.getElementById("campoTelefono").value = data.telefono;

    // Mostrar siguiente modal
    mostrarModal("modalModificar2");
});

//=========================
// PASO 2 → PASO 3
//=========================
document.getElementById("ModificarCampos2").addEventListener("submit", function(e) {
    e.preventDefault();

    if (!validarYpasar("ModificarCampos2", "modalModificar2", "modalModificar3")) return;

    const data = window.baseUsuarios[usuarioSeleccionado];

    document.getElementById("campoIdEmpleado").value = data.idEmpleado;
    document.getElementById("contrasena_modificada").value = data.contrasena;
    document.getElementById("confirmacioncontrasena_modificada").value = data.confirmarContrasena;
    document.getElementById("campoCorreoEmpresa").value = data.correoEmpresa;
    document.getElementById("campoRolEmpleado").value = data.rolEmpleado;

    // Mostrar siguiente modal
    mostrarModal("modalModificar3");
});

//================================
// PASO 3 → PASO 4 (permisos)
//================================
document.getElementById("ModificarCampos3").addEventListener("submit", function(e) {
    e.preventDefault();

    // 1) Validar contraseñas
    if (!validarContraseñas("contrasena_modificada", "confirmacioncontrasena_modificada")) {
        return;
    }

    // 2) VALIDAR ID (evitar duplicados) - usa tu array si lo prefieres
    const idsRegistrados = ["Administrador", "Vendedor001", "Vendedor002"];
    const idActual = window.baseUsuarios[usuarioSeleccionado].idEmpleado;
    const nuevoID = document.getElementById("campoIdEmpleado").value.trim();

    if (nuevoID !== idActual && idsRegistrados.includes(nuevoID)) {
        alert("⚠️ Este ID ya está registrado. Por favor elige uno diferente.");
        return;
    }

    // 3) Si todo OK → avanzar al siguiente modal (esto oculta el actual y muestra el siguiente)
    if (!validarYpasar("ModificarCampos3", "modalModificar3", "modalModificar4")) return;

    // 4) Cargar permisos en modal 4
    const data = window.baseUsuarios[usuarioSeleccionado];
    document.querySelectorAll("#ModificarCampos4 input[type='checkbox']").forEach(ch => ch.checked = false);
    data.permisos.forEach(permiso => {
        const chk = document.querySelector(`#ModificarCampos4 input[value='${permiso}']`);
        if (chk) chk.checked = true;
    });

    // mostrarModal("modalModificar4"); // no hace falta si validarYpasar ya lo abrió
});

//=======================================
// PASO FINAL — BOTON MODIFICAR
//=======================================
document.getElementById("btnModificar").addEventListener("click", function(e) {
    e.preventDefault();

    // Verificar que al menos un permiso esté seleccionado
const permisosSeleccionados = document.querySelectorAll("#ModificarCampos4 input[type='checkbox']:checked");

if (permisosSeleccionados.length === 0) {
    alert("⚠️ Debes seleccionar al menos un permiso.");
    return;  
}

 validarYpasar("ModificarCampos4", "modalModificar4", null);
    alert(" ✅ Usuario modificado correctamente.");
    cerrarModal("modalModificar4");
});


//=================================================================================================
// ELIMINAR USUARIO
//=================================================================================================

// Función para seleccionar/deseleccionar usuario
function eliminarUsuario(usuario) {
    const tarjetas = document.querySelectorAll(".usuario-eliminar");

    tarjetas.forEach(card => {
        // Si la tarjeta corresponde al usuario clickeado
        if (card.innerText.includes(usuario)) {
            // Si ya está seleccionado → deseleccionar
            if (card.classList.contains("seleccionado")) {
                card.classList.remove("seleccionado");
                usuarioSeleccionado = null;
            } 
            // Si no está seleccionado → seleccionar
            else {
                tarjetas.forEach(c => c.classList.remove("seleccionado"));
                card.classList.add("seleccionado");
                usuarioSeleccionado = usuario;
            }
        }
    });
}

//=================================
// ABRIR EL SIGUIENTE MODAL
//=================================
function mostrarModal(id) {
    document.querySelectorAll(".modalEliminar").forEach(m => m.style.display = "none");
    document.getElementById(id).style.display = "block";
}

// Botón ELIMINAR → Paso 1
document.getElementById("btnEliminarPaso1").addEventListener("click", function() {
    if (!usuarioSeleccionado) {
        alert("⚠️ Debes seleccionar un usuario para eliminar.");
        return;
    }

    // Confirmación de eliminación
    const confirmar = confirm(`⚠️ ¿Deseas eliminar al usuario "${usuarioSeleccionado}"?`);

    if (confirmar) {
        // Eliminar de baseUsuarios
        if (window.baseUsuarios && window.baseUsuarios[usuarioSeleccionado]) {
            delete window.baseUsuarios[usuarioSeleccionado];
        }

        alert(`✅ Usuario "${usuarioSeleccionado}" eliminado correctamente.`);

        // Reiniciar selección
        usuarioSeleccionado = null;
        document.querySelectorAll("#usuariosListaEliminar .usuario-card").forEach(c => c.classList.remove("seleccionado"));

        cerrarModal("modalEliminar");
    }
});

//=================================================================================================
// DESACTIVAR USUARIO
//=================================================================================================

// Función para seleccionar/deseleccionar usuario
function desactivarUsuario(usuario) {
    const tarjetas = document.querySelectorAll(".usuario-desactivar");

    tarjetas.forEach(card => {
        // Si la tarjeta corresponde al usuario clickeado
        if (card.innerText.includes(usuario)) {
            // Si ya está seleccionado → deseleccionar
            if (card.classList.contains("seleccionado")) {
                card.classList.remove("seleccionado");
                usuarioSeleccionado = null;
            } 
            // Si no está seleccionado → seleccionar
            else {
                tarjetas.forEach(c => c.classList.remove("seleccionado"));
                card.classList.add("seleccionado");
                usuarioSeleccionado = usuario;
            }
        }
    });
}

//=================================
// ABRIR EL SIGUIENTE MODAL
//=================================
function mostrarModal(id) {
    // Oculta otros modales
    document.querySelectorAll(".modalDesactivar").forEach(m => m.style.display = "none");

    // Muestra el modal solicitado
    const modal = document.getElementById(id);
    modal.style.display = "block";

    // 🔥 LIMPIAR TODO SIN FUNCIONES 🔥

    // Resetear formulario
    const form = modal.querySelector("form");
    if (form) form.reset();

    // Quitar selección de tarjetas
    document.querySelectorAll(".usuario-desactivar").forEach(card => {
        card.classList.remove("seleccionado");
    });

    // Reiniciar variable
    usuarioSeleccionado = null;
}


// Botón DESACTIVAR → Paso 1
document.getElementById("btnDesactivarPaso1").addEventListener("click", function() {
    if (!usuarioSeleccionado) {
        alert("⚠️ Debes seleccionar un usuario para desactivar.");
        return;
    }

    // Confirmación de desactivacion
    const confirmar = confirm(`⚠️ ¿Deseas desactivar al usuario "${usuarioSeleccionado}"?`);

    if (confirmar) {
        // Cierra el modal actual
        document.getElementById("modalDesactivar").style.display = "none";
        // Abre el siguiente modal (por ejemplo: modalDesactivar2)
        mostrarModal("modalDesactivar1");
    }
});



document.getElementById("seleccionarCampos1").addEventListener("submit", function(e) {
    e.preventDefault();
    const inicio = document.getElementById("fechaInicio").value;
    const fin = document.getElementById("fechaFin").value;

    if (fin < inicio) {
        alert("⚠️ La fecha de finalización no puede ser anterior a la fecha de inicio.");
        return;
    }

// Validar que seleccione un motivo de desactivación
const motivo = document.getElementById("motivoDesactivacion").value;

if (motivo === "" || motivo === "0") {
    alert("⚠️ Debes seleccionar un motivo de desactivación antes de continuar.");
    document.getElementById("motivoDesactivacion").style.border = "2px solid red";
    document.getElementById("motivoDesactivacion").focus();
    return; // Detiene el proceso de desactivar
}


    
    alert("✅ Usuario desactivado correctamente.");
    cerrarModal("modalDesactivar1");
});














