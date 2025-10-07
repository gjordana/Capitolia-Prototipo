// menu.js - Web Component sin 'type=module' (funciona con file://)
(function(){
  class CapMenu extends HTMLElement {
    connectedCallback() {
      this.render();
      this.initTooltips();
      this.markActive();
      this.bindClicks();
    }
    render() {
      this.innerHTML = `
        <style>
          .navbar-nav .nav-item{margin:0 20px;position:relative}
          .navbar-nav .nav-link i{font-size:28px}
          .navbar-nav .nav-item.active::after{
            content:"";position:absolute;bottom:-6px;left:0;width:100%;height:4px;
            background-color:#41B649;border-radius:2px
          }
          .navbar{box-shadow:0 2px 4px rgba(0,0,0,.06)}
          .navbar .dropdown-toggle::after{display:none}
          .tooltip-inner{white-space:nowrap}
          .navbar-brand img {
            height: 40px;
            margin-right: 10px;
          }
        </style>

        <nav class="navbar navbar-expand-lg bg-light sticky-top">
          <div class="container-fluid">
            <a class="navbar-brand d-flex align-items-center" href="#">
              <img src="./logo.png" alt="Capitolia Logo">
            </a>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="mainNav">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item"><a class="nav-link" href="clientes.html" data-bs-toggle="tooltip" title="Gestión de Clientes"><i class="fa-solid fa-building"></i></a></li>
                <li class="nav-item"><a class="nav-link" href="contactos.html" data-bs-toggle="tooltip" title="Agenda de Contactos"><i class="fa-solid fa-users"></i></a></li>
                <li class="nav-item"><a class="nav-link" href="notas-envio.html" data-bs-toggle="tooltip" title="Notas de Envío"><i class="fa-solid fa-file-invoice"></i></a></li>
                <li class="nav-item"><a class="nav-link" href="ordenes-pedido.html" data-bs-toggle="tooltip" title="Órdenes de Pedido"><i class="fa-solid fa-clipboard-list"></i></a></li>
                <li class="nav-item"><a class="nav-link" href="plannings-envio.html" data-bs-toggle="tooltip" title="Plannings de Envío"><i class="fa-solid fa-calendar-check"></i></a></li>
                <li class="nav-item"><a class="nav-link" href="productos.html" data-bs-toggle="tooltip" title="Catálogo de Productos"><i class="fa-solid fa-box"></i></a></li>
                <li class="nav-item"><a class="nav-link" href="usuarios.html" data-bs-toggle="tooltip" title="Administración de Usuarios"><i class="fa-solid fa-user-gear"></i></a></li>
              </ul>

              <ul class="navbar-nav ms-auto">
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle d-flex align-items-center gap-2" href="#" id="userMenu" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="fa-solid fa-circle-user" style="font-size:20px"></i>
                    <span>gjordana@gmail.com</span>
                  </a>
                  <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userMenu">
                    <li><a class="dropdown-item" href="cambiar-password.html"><i class="fa-solid fa-key me-2"></i>Cambiar Contraseña</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="logout.html"><i class="fa-solid fa-right-from-bracket me-2"></i>Salir</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      `;
    }
    initTooltips() {
      if (window.bootstrap) {
        this.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => new bootstrap.Tooltip(el));
      }
    }
    markActive() {
      const currentPage = location.pathname.split('/').pop();
      this.querySelectorAll('.navbar-nav .nav-item a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
          link.parentElement.classList.add('active');
        }
      });
    }
    bindClicks() {
      this.querySelectorAll('.navbar-nav .nav-item a').forEach(link => {
        link.addEventListener('click', () => {
          this.querySelectorAll('.navbar-nav .nav-item').forEach(li => li.classList.remove('active'));
          link.parentElement.classList.add('active');
        });
      });
    }
  }
  customElements.define('cap-menu', CapMenu);
})();