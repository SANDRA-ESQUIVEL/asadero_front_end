//===============================================================================================
// INDEX- PAGINA PRINCIPAL 
//===============================================================================================
function seleccionaRol(rol) {
    localStorage.setItem("rolSeleccionado", rol);
    window.location.href = "seleccionar_usuario.html";
}


//===============================================================================================
// SELECCIONAR USUARIO 
//===============================================================================================

const rol = localStorage.getItem("rolSeleccionado");
const rolPrincipal = document.getElementById("rolPrincipal");

// Mostrar el botón grande con el rol
if(rolPrincipal) {
    rolPrincipal.textContent = rol === "admin" ? "ADMINISTRADOR" : "VENDEDOR";
}
// Mostrar solo el contenedor correspondiente
if (rol === "admin") {
    document.getElementById("listaAdmin").style.display = "block";
} else if (rol === "vendedor") {
    document.getElementById("listaVendedores").style.display = "block";
}


//===============================================================================================
// INGRESO DE USUARIO CON ID Y CONTRASEÑA
//===============================================================================================
function seleccionarUsuario(nombre) {
        localStorage.setItem("usuarioSeleccionado", nombre);
        window.location.href = "ingresar_usuario.html"; 
    }

    
// ingreso con id empleado y contraseña
function acceso() {
    const idadmin = "Administrador";
    const contrasenadmin = "admin123";
    const idvenuno= "Vendedor001";
    const contasenavenuno = "vend001";
    const idvendos = "Vendedor002";
    const contrasenavendos = "vend002";
    const idusuario = document.getElementById("idEmpleado").value.trim();
    const usuariocontrasena = document.getElementById("password").value.trim();

        if (idusuario === "" || usuariocontrasena === "") {
        alert("Por favor completa todos los campos.");
        return;
        }

        if (idusuario === idadmin && usuariocontrasena === contrasenadmin) {
            alert ("Información Validada: Usuario Existente (Presiona Enter)")
            window.location.href = "/html_menu/menu_principal.html";
    
        } else if (idusuario === idvenuno && usuariocontrasena === contasenavenuno) {
            alert ("Información Validada: Usuario Existente (Presiona Enter)")
            window.location.href = "/html_menu/menu_principal.html";
    
        } else if (idusuario === idvendos && usuariocontrasena === contrasenavendos) {
            alert ("Información Validada: Usuario Existente (Presiona Enter)")
            window.location.href = "/html_menu/menu_principal.html";
    
        } else if (
            (idusuario === idadmin && usuariocontrasena !== contrasenadmin) ||
            (idusuario === idvenuno && usuariocontrasena !== contasenavenuno) ||
            (idusuario === idvendos && usuariocontrasena !== contrasenavendos)
        ) {
            alert("La contraseña es incorrecta.");
    
        } else {
            alert("El usuario es incorrecto.");
        }
} 

//===============================================================================================
// OLVIDE CONTRASEÑA
//===============================================================================================
//Bonton Olvido Contraseña
function abrirOlvido() {
    window.open("olvide_contrasena.html", "_blank");
}

//Dar clic en Reposision de Contraseña
function reponer() {
    if (confirm("¿Seguro que quieres Reponer Contraseña?")) 
        alert(`✅ Se ha enviado una nueva contraseña al correo: **************@gmail.com`);
        {
    window.close();    } 
}

//Dar clic en boton Atras
function atrasar() {
    window.close(); 
};



// Simulación de usuario que inició sesión
const usuarioActual = {
    nombre: "Pepita Perez",
    rol: "VENDEDOR"  // o "ADMINISTRADORA"
};

window.onload = function() {
    // Mostrar rol y nombre en el div
    const userInfoDiv = document.querySelector(".user-info");
    userInfoDiv.innerHTML = `${usuarioActual.rol} <br> ${usuarioActual.nombre}`;

    // Mostrar rol en el título principal
    document.getElementById("rolPrincipal").textContent = usuarioActual.rol;

    // Control de permisos según rol
    if(usuarioActual.rol === "VENDEDOR") {
        // Ocultamos opciones de usuarios (solo administrador puede)
        document.getElementById("usuarios").style.display = "none";

        // Ocultamos ciertas funciones de inventario si no aplica
        const inventarioBotones = document.querySelectorAll("#inventario button");
        inventarioBotones.forEach((btn, index) => {
            // Por ejemplo: solo permitimos "Consultar Inventario"
            if(index !== 2) { 
                btn.style.display = "none";
            }
        });
    }
};

// Función para desplegar submenús
function toggleSubmenu(id) {
    const submenu = document.getElementById(id);
    submenu.style.display = submenu.style.display === "block" ? "none" : "block";
}

// Función de ejemplo para abrir modales
function abrirModal(id) {
    const modal = document.getElementById(id);
    if(modal) modal.style.display = "block";
}

// Función de cerrar sesión
function cerrarSesion() {
    alert("Sesión cerrada");
    // Aquí redirigir al login
}


