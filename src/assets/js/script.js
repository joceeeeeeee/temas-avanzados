<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Menú</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
  <link rel="stylesheet" href="src/css/menu.css" />
    <link rel="stylesheet" href="src/css/obscuro.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/antijingoist/open-dyslexic/web/opendyslexic.css" />


</head>
<body class="container py-4">

  <!-- Botón para activar modo oscuro -->
<button id="btnDarkMode" class="btn btn-dark" data-bs-toggle="tooltip" title="Activar modo oscuro">🌙</button>




<nav class="navbar bg-white mb-4 p-3 shadow-sm d-flex justify-content-between align-items-center">
    <h2 class="navbar-brand mb-0">Menú</h2>
    <div class="d-flex justify-content-center align-items-center gap-2">
      <button id="btnDislexia" class="boton-vintage" title="Activar fuente legible para dislexia">Fuente legible</button>
      <button id="btnAumentar" class="boton-vintage" title="Aumentar tamaño de texto">A+</button>
        <button id="btnReducir"class="boton-vintage"  title="Reducir tamaño de texto">A-</button>
        <!-- Filtro de Alergias -->
<div class="mb-3">
  <label for="alergias" class="form-label" onclick="document.getElementById('alergias').focus()">Selecciona tus alergias:</label>
  <select class="form-select" id="alergias" multiple size="6">
    <option value="Lechuga">Lechuga</option>
    <option value="Tomate">Tomate</option>
    <option value="Queso">Queso</option>
    <option value="Cebolla">Cebolla</option>
    <option value="Carne">Carne</option>
    <option value="Pollo">Pollo</option>
    <option value="Pan">Pan</option>
    <option value="Catsup">Catsup</option>
    <option value="Mostaza">Mostaza</option>
    <option value="Bacon">Bacon</option>
    <option value="Hongo">Hongo</option>
    <option value="Mantequilla">Mantequilla</option>
    <option value="Sazonador">Sazonador</option>
    <option value="Salchicha">Salchicha</option>
    <option value="Papas">Papas</option>
    <option value="Cebolla caramelizada">Cebolla caramelizada</option>
    <option value="Salsa BBQ">Salsa BBQ</option>
  </select>
  <button class="btn btn-primary mt-3" onclick="filtrarProductos()">Aplicar Filtro</button>
</div>
<!-- Modal de Productos con Alérgenos -->
<div class="modal fade" id="modalAlergenos" tabindex="-1" aria-labelledby="modalAlergenosLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header bg-danger text-white">
        <h5 class="modal-title" id="modalAlergenosLabel">Productos con Ingredientes Alérgenos</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Cerrar"></button>
      </div>
      <div class="modal-body">
        <div id="listaAlergenos" class="row"></div>
      </div>
    </div>
  </div>
</div>



    </div>
    <div id="saludoUsuario" class="navbar-text ms-auto"></div>
    <button class="position-relative ms-3" data-bs-toggle="modal" data-bs-target="#modalOrden">
        🛍️
        <span id="contadorOrden" class="badge bg-danger rounded-pill position-absolute top-0 start-100 translate-middle  btn-excluir">0</span>
    </button>
</nav>

  <div id="contenedor-productos" class="row"></div>

  <!-- Modal de Orden -->
  <div class="modal fade" id="modalOrden" tabindex="-1" aria-labelledby="modalOrdenLabel" aria-hidden="true">
    <div class="modal-dialog modal-md modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalOrdenLabel">Tu Pedido</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
        </div>
        <div class="modal-body">
          <ul id="detalleOrden" class="list-group mb-3"></ul>
          <p id="mensajeVacio" class="text-center text-muted">No hay productos en tu pedido.</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
          <button id="btnEnviarMesero" type="button" class="btn btn-primary">Enviar al mesero</button>
        </div>
      </div>
    </div>
  </div>


  <!-- Modal de Edición -->
  <div class="modal fade" id="modalEditar" tabindex="-1" aria-labelledby="modalEditarLabel" aria-hidden="true">
    <div class="modal-dialog modal-md modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body" id="modalEditarContenido">
          <!-- Aquí se cargará el contenido dinámicamente desde editarProducto(index) -->
        </div>
      </div>
    </div>
  </div>




  <!-- Bootstrap JS y Script principal -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="/src/assets/js/script.js"></script>
<div class="row" id="detalleOrden"></div>


  <!-- CSS -->
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible&display=swap');

    .fuente-dislexia {
      font-family: 'Atkinson Hyperlegible', Arial, sans-serif;
    }
  </style>
</body>
</html>
