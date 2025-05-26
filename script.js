// ── Datos de productos con stock y mínimos ────────────────────────────
const productos = [
  { id: 1, nombre: "Hamburguesa Clásica", imagen: "img/CLASICA.png", ingredientes: ["Lechuga", "Tomate", "Queso", "Cebolla" , "Carne" , "Catsup" , "Pan"], stock: 10, minStock: 3 },
  { id: 2, nombre: "Hamburguesa BBQ", imagen: "img/BBQ.png", ingredientes: ["Bacon", "Lechuga", "Tomate", "Cebolla" , "Carne" , "Cebolla caramelizada", "Salsa BBQ" , "Pan"], stock: 5, minStock: 2 },
  { id: 3, nombre: "Hamburguesa Hawaiana", imagen: "img/HAWAIANA.png", ingredientes: ["Bacon", "Queso", "Cebolla caramelizada", "Salsa BBQ" , "Lechuga", "Tomate", "Cebolla" , "Carne" , "Pan"], stock: 5, minStock: 2 },
  { id: 4, nombre: "Hamburguesa Doble", imagen: "img/DOBLE.png", ingredientes: ["Lechuga", "Tomate", "Queso", "Cebolla" , "Carne x2" , "Catsup" , "Pan"], stock: 5, minStock: 2 },
  { id: 5, nombre: "Hamburguesa Mixta", imagen: "img/MIXTA.png", ingredientes: ["Lechuga", "Tomate", "Queso", "Cebolla" , "Carne" , "Pollo" , "Catsup" , "Pan"], stock: 5, minStock: 2 },
  { id: 6, nombre: "Hamburguesa de pollo", imagen: "img/POLLO.png", ingredientes: ["Lechuga", "Tomate", "Queso", "Cebolla" , "Pollo" , "Catsup" , "Pan"], stock: 5, minStock: 2 },
  { id: 7, nombre: "Hamburguesa de Vegetariana", imagen: "img/VEGETARIANA.png", ingredientes: ["Lechuga", "Tomate", "Queso", "Cebolla" , "Hongo" , "Mantequilla" , "Pan"], stock: 5, minStock: 2 },
  { id: 8, nombre: "Banderia", imagen: "img/ban.png", ingredientes: ["Lechuga", "Tomate", "Queso", "Cebolla" , "Hongo" , "Mantequilla" , "Pan"], stock: 5, minStock: 2 },
  { id: 9, nombre: "Hot dog", imagen: "img/HOT DOG.png", ingredientes: ["Cebolla", "Tomate", "Catsup", "Mostaza" , "Salchica" , "Pan"], stock: 5, minStock: 2 },
  { id: 10, nombre: "Salchipapas", imagen: "img/SALCHI.png", ingredientes: ["Sazonador", "Papas", "Salchicha"], stock: 5, minStock: 2 },
  { id: 11, nombre: "Orden de papas", imagen: "img/PAPAS.png", ingredientes: ["Sazonador", "Papas"], stock: 5, minStock: 2 },


  { id: 12, nombre: "Coca-Cola", imagen: "img/COCA.png", ingredientes: [], stock: 20, minStock: 5 },
  { id: 13, nombre: "Sprite", imagen: "img/SPRITE.png", ingredientes: [], stock: 15, minStock: 5 },
  { id: 14, nombre: "Fanta Naranja", imagen: "img/FANTA.png", ingredientes: [], stock: 10, minStock: 3 },
  { id: 15, nombre: "Pepsi", imagen: "img/PEPSI.png", ingredientes: [], stock: 10, minStock: 3 },
  { id: 16, nombre: "Manzanita", imagen: "img/MANZANITA.png", ingredientes: [], stock: 10, minStock: 3 },

  // ── Aguas frescas ──
  { id: 17, nombre: "Agua de Horchata", imagen: "img/HORCHATA.png", ingredientes: [], stock: 10, minStock: 3 },
  { id: 18, nombre: "Agua de Jamaica", imagen: "img/JAMAICA.png", ingredientes: [], stock: 10, minStock: 3 },
  { id: 19, nombre: "Agua de Limón", imagen: "img/LIMON.png", ingredientes: [], stock: 10, minStock: 3 }
];

// ── Helpers LocalStorage ───────────────────────────────────────────────
function getPedido() { return JSON.parse(localStorage.getItem("pedido")) || []; }
function setPedido(p) { localStorage.setItem("pedido", JSON.stringify(p)); }
function getKitchen() { return JSON.parse(localStorage.getItem("kitchenOrders")) || []; }
function setKitchen(k) { localStorage.setItem("kitchenOrders", JSON.stringify(k)); }

// ── MENÚ ──────────────────────────────────────────────────────────────
function renderMenu() {
  const contenedor = document.getElementById("contenedor-productos");
  contenedor.innerHTML = "";

  productos.forEach(p => {
    const col = document.createElement("div");
    col.classList.add("col-md-4", "mb-3");
    col.innerHTML = `
      <div class="card h-100 shadow-sm">
<img src="${p.imagen}" class="card-img-top" alt="Imagen de la ${p.nombre}, una hamburguesa con ${p.ingredientes.join(", ")}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${p.nombre}</h5>
          <strong>Ingredientes:</strong>
          <div class="mb-2">
            ${p.ingredientes.map(ingrediente => `
              <div class="form-check">
                <input class="form-check-input" type="checkbox" checked value="${ingrediente}" id="check-${p.id}-${ingrediente}">
                <label class="form-check-label" for="check-${p.id}-${ingrediente}">${ingrediente}</label>
              </div>
            `).join("")}
          </div>
          <div class="mb-3">
            <label class="form-label">Agregar ingrediente extra (opcional):</label>
            <input type="text" class="form-control" id="extra-${p.id}" placeholder="Ej: Jalapeños">
          </div>
          <button class="btn btn-success mt-auto" onclick="agregarAlPedido(${p.id})">Agregar al pedido</button>
        </div>
      </div>
    `;
    contenedor.appendChild(col);
  });
}

function agregarAlPedido(id) {
  const pedido = getPedido();
  const producto = productos.find(p => p.id === id);

  const ingredientesSeleccionados = producto.ingredientes.filter(ingrediente => {
    const checkbox = document.getElementById(`check-${id}-${ingrediente}`);
    return checkbox && checkbox.checked;
  });

  const extraInput = document.getElementById(`extra-${id}`);
  if (extraInput && extraInput.value.trim() !== "") {
    ingredientesSeleccionados.push(extraInput.value.trim());
  }

  const pedidoFinal = {
    id: producto.id,
    nombre: producto.nombre,
    imagen: producto.imagen,
    ingredientes: ingredientesSeleccionados
  };

  pedido.push(pedidoFinal);
  setPedido(pedido);
  actualizarContador();
  alert(`"${producto.nombre}" agregado al pedido.`);

  // Redirigir a index.html
  window.location.href = "menu.html";  
}


// ── CONTADOR ICONO ────────────────────────────────────────────────────
function actualizarContador() {
  const c = document.getElementById("contadorOrden");
  if (c) c.textContent = getPedido().length;
}




function updateStock(id) {
  const p = productos.find(x => x.id === id);
  p.stock = parseInt(document.getElementById(`stk-${id}`).value, 10);
  p.minStock = parseInt(document.getElementById(`min-${id}`).value, 10);
  renderInventarioAdmin();
}

// ── REPORTES ──────────────────────────────────────────────────────────
function renderReportes() {
  const cont = document.getElementById("reportes"); if (!cont) return;
  const comp = JSON.parse(localStorage.getItem("kitchenCompleted")) || [];
  if (!comp.length) {
    cont.innerHTML = "<p>No hay ventas.</p>";
    return;
  }
  const porDia = comp.reduce((a, p) => {
    const d = new Date(p.timestamp).toLocaleDateString();
    a[d] = a[d] || { total: 0, items: [] };
    a[d].total += p.items.length * 100;
    a[d].items.push(...p.items);
    return a;
  }, {});
  cont.innerHTML = Object.entries(porDia).map(([d, inf]) => `
    <div class="card mb-3"><div class="card-header">${d} — $${inf.total}</div>
      <ul class="list-group list-group-flush">${inf.items.map(i => `<li class="list-group-item">${i.nombre}</li>`).join("")}</ul>
    </div>`).join("");
}

// ── Inicialización ────────────────────────────────────────────────────
window.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("contenedor-productos")) renderMenu();
  actualizarContador();
  if (document.getElementById("pedidoMesero")) renderPedidoMesero();
  if (document.getElementById("pedidosCocina")) renderPedidosCocina();
  if (document.getElementById("inventarioAdmin")) renderInventarioAdmin();
  if (document.getElementById("reportes")) renderReportes();
});


// Modal: Detalle de la orden
const ordenModal = document.getElementById("modalOrden");
const btnEnviar = document.getElementById("btnEnviarMesero");

if (ordenModal && btnEnviar) {
  ordenModal.addEventListener("show.bs.modal", renderOrdenModal);
  btnEnviar.addEventListener("click", enviarAlMesero);
}

function renderOrdenModal() {
  const lista = document.getElementById("detalleOrden");
  const mensaje = document.getElementById("mensajeVacio");
  const pedido = getPedido();

  lista.innerHTML = "";
  if (!pedido.length) {
    mensaje.style.display = "block";
  } else {
    mensaje.style.display = "none";
    pedido.forEach((item, index) => {
      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between align-items-center";

      li.innerHTML = `
        <div>
          ${item.nombre}${item.ingredientes.length ? ` (${item.ingredientes.join(", ")})` : ""}
        </div>
        <button class="btn btn-sm btn-danger" onclick="eliminarDelPedido(${index})">
          🗑️
        </button>
        <button class="btn btn-sm btn-warning" onclick="editarProducto(${index})">
          ✏️ Editar
        </button>
      `;

      lista.appendChild(li);
    });
  }
}
function editarProducto(index) {
  const pedido = getPedido();
  const item = pedido[index];

  // Mostrar un modal con el nombre y los ingredientes actuales
  const modalContent = document.getElementById("modalEditarContenido");
  
  // Crear una lista de checkboxes con los ingredientes actuales
  modalContent.innerHTML = `
    <h5>Editar ${item.nombre}</h5>
    <div>
      <strong>Ingredientes actuales:</strong>
      <ul id="ingredientesLista">
        ${item.ingredientes.map((ingrediente, i) => `
          <li>
            <input type="checkbox" id="ingrediente${i}" ${item.ingredientes.includes(ingrediente) ? 'checked' : ''}>
            <label for="ingrediente${i}">${ingrediente}</label>
          </li>`).join("")}
      </ul>
      <label for="nuevoIngrediente">Nuevo ingrediente:</label>
      <input type="text" id="nuevoIngrediente" class="form-control" placeholder="Ej: Jalapeños">
      <button class="btn btn-success mt-2" onclick="guardarEdicion(${index})">Guardar cambios</button>
    </div>
  `;
  
  // Mostrar el modal de edición
  const modal = new bootstrap.Modal(document.getElementById('modalEditar'));
  modal.show();
}

function guardarEdicion(index) {
  const pedido = getPedido();
  const item = pedido[index];
  
  // Obtener la lista de checkboxes y actualizar los ingredientes según las casillas seleccionadas
  const checkboxes = document.querySelectorAll('#ingredientesLista input[type="checkbox"]');
  const ingredientesEditados = [];

  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      ingredientesEditados.push(checkbox.nextElementSibling.textContent); // El ingrediente es el texto del label
    }
  });

  // Si el campo "Nuevo ingrediente" no está vacío, añadirlo a la lista
  const nuevoIngrediente = document.getElementById('nuevoIngrediente').value.trim();
  if (nuevoIngrediente !== "") {
    ingredientesEditados.push(nuevoIngrediente);
  }

  // Actualizar los ingredientes en el pedido
  item.ingredientes = ingredientesEditados;

  // Guardar el carrito actualizado en localStorage
  setPedido(pedido);

  // Cerrar el modal después de guardar
  const modal = bootstrap.Modal.getInstance(document.getElementById('modalEditar'));
  if (modal) modal.hide();

  // Redibujar el modal de la orden con los cambios
  renderOrdenModal();

  // Actualizar el contador del carrito
  actualizarContador();
}



function eliminarDelPedido(index) {
  const pedido = getPedido();
  pedido.splice(index, 1);
  localStorage.setItem("pedido", JSON.stringify(pedido));
  renderOrdenModal(); // Redibuja el modal
  actualizarContadorPedido(); // Actualiza el número del carrito
}
//MODIFICAR IMPORTANTE, NECESITA ACTUALIZAR EL CONTADOR
function enviarAlMesero() {
  const pedido = getPedido();
  if (pedido.length === 0) {
    alert("No hay productos en el pedido.");
    return;
  }

  const kitchenOrders = getKitchen();
  kitchenOrders.push({ timestamp: Date.now(), items: pedido });
  setKitchen(kitchenOrders);

  // Vaciar el pedido después de enviarlo
  localStorage.removeItem("pedido");

  // Actualizar el contador a 0
  actualizarContador();

  // Cerrar el modal (opcional si usas Bootstrap)
  const modal = bootstrap.Modal.getInstance(ordenModal);
  if (modal) modal.hide();

  alert("Pedido enviado al mesero.");
window.location.href = "index.html";
}

function actualizarContadorPedido() {
  const contador = document.getElementById("contadorOrden");
  const pedido = getPedido();
  contador.textContent = pedido.length;
}

// Función de utilidad que debes tener en tu script
function getPedido() {
  return JSON.parse(localStorage.getItem("pedido")) || [];
}


//-------------------INDEX

    // Función para validar el formulario y guardar los datos en localStorage
    function validarFormulario() {
      const nombre = document.getElementById("nombre").value.trim();
      const mesa = document.getElementById("mesa").value;

      if (!nombre) {
        alert("Por favor, ingresa tu nombre.");
        return false;
      }
      if (!mesa) {
        alert("Por favor, selecciona una mesa.");
        return false;
      }

      // Crear el objeto JSON con los datos
      const usuarioData = {
        nombre: nombre,
        mesa: mesa
      };

      // Guardar el objeto JSON en localStorage
      localStorage.setItem("usuarioData", JSON.stringify(usuarioData));

      // Redirigir a la página del menú
      window.location.href = "menu.html";
      return false;
    }


     



function filtrarProductos() {
  const select = document.getElementById('alergias');
  const alergiasSeleccionadas = Array.from(select.selectedOptions).map(option => option.value);

  const listaAlergenos = document.getElementById('listaAlergenos');
  listaAlergenos.innerHTML = '';

  // Filtrar productos que contienen al menos un ingrediente alérgeno
  const productosConAlergenos = productos.filter(producto =>
    alergiasSeleccionadas.some(alergia => producto.ingredientes.includes(alergia))
  );

  if (productosConAlergenos.length === 0) {
    listaAlergenos.innerHTML = '<p class="text-muted">Ningún producto contiene los ingredientes seleccionados.</p>';
  } else {
    productosConAlergenos.forEach(p => {
      const col = document.createElement("div");
      col.classList.add("col-md-6", "mb-3");

      col.innerHTML = `
        <div class="card border-danger bg-danger bg-opacity-10">
          <img src="${p.imagen}" class="card-img-top" alt="${p.nombre}">
          <div class="card-body">
            <h5 class="card-title text-danger">${p.nombre}</h5>
            <p><strong>Ingredientes:</strong></p>
            <ul class="list-group list-group-flush">
              ${p.ingredientes.map(ing =>
                `<li class="list-group-item ${alergiasSeleccionadas.includes(ing) ? 'bg-danger text-white' : ''}">
                  ${ing}
                </li>`
              ).join('')}
            </ul>
          </div>
        </div>
      `;

      listaAlergenos.appendChild(col);
    });
  }

  // Mostrar el modal
  const modal = new bootstrap.Modal(document.getElementById('modalAlergenos'));
  modal.show();
}



function toggleMenu() {
  const menu = document.getElementById('menuDesplegableContenido');
  if (menu.style.display === "none" || menu.style.display === "") {
    menu.style.display = "block"; // Mostrar el menú
  } else {
    menu.style.display = "none"; // Ocultar el menú
  }
}



  // Guardar el estado del modo oscuro en el localStorage
  function actualizarModoOscuro() {
    const modoOscuroActivo = document.body.classList.contains('dark-mode');
    localStorage.setItem('modoOscuro', modoOscuroActivo);
  }

  // Recuperar el estado del modo oscuro desde localStorage
  function recuperarModoOscuro() {
    const modoOscuroActivo = localStorage.getItem('modoOscuro') === 'true';
    if (modoOscuroActivo) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  // Al cargar la página, recupera el estado del modo oscuro
  window.addEventListener('load', recuperarModoOscuro);

  document.getElementById('btnDarkMode').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    actualizarModoOscuro();
  });

  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.forEach(function (tooltipTriggerEl) {
    new bootstrap.Tooltip(tooltipTriggerEl);
    const btnDarkMode = document.getElementById("btnDarkMode");
    const tooltip = bootstrap.Tooltip.getInstance(btnDarkMode);

    // Estado inicial: claro
    let modoOscuroActivo = false;

    btnDarkMode.addEventListener("click", function () {
      modoOscuroActivo = !modoOscuroActivo;

      // Cambiar el texto del tooltip
      const nuevoTitulo = modoOscuroActivo ? "Desactivar modo oscuro" : "Activar modo oscuro";
      btnDarkMode.setAttribute("title", nuevoTitulo);

      // Actualizar el tooltip manualmente
      tooltip.setContent({ '.tooltip-inner': nuevoTitulo });
      tooltip.hide(); // Ocultar para que se actualice correctamente
    });
  });



  //instrucciones por voz
function leerTexto(texto) {
  const speech = new SpeechSynthesisUtterance(texto);
  speech.lang = "es-MX";
  window.speechSynthesis.speak(speech);
}

    //CAmbiar tipo de letra
let fontSize = 100;

document.getElementById("btnAumentar").onclick = () => {
  fontSize += 10;
  document.body.style.fontSize = fontSize + "%";
};

document.getElementById("btnReducir").onclick = () => {
  fontSize = Math.max(80, fontSize - 10); // Evita que baje de 80%
  document.body.style.fontSize = fontSize + "%";
};

  

  // Verificar si el modo dislexia está activado al cargar la página
  if (localStorage.getItem('modoDislexia') === 'activado') {
    document.body.classList.add("fuente-dislexia");
  }

  // Al hacer clic en el botón para activar/desactivar dislexia
  document.getElementById("btnDislexia").onclick = () => {
    // Alternar la clase de dislexia
    document.body.classList.toggle("fuente-dislexia");

    // Guardar el estado actual del modo dislexia en el almacenamiento local
    if (document.body.classList.contains("fuente-dislexia")) {
      localStorage.setItem('modoDislexia', 'activado');
    } else {
      localStorage.setItem('modoDislexia', 'desactivado');
    }
  };

