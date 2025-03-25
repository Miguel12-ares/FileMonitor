document.addEventListener('DOMContentLoaded', function() {
    /**
     * Funcionalidad de la barra lateral
     */
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            if (sidebar) {
                sidebar.classList.toggle('collapsed');
            }
        });
    }
    
    /**
     * Funcionalidad de los dropdown (menús desplegables)
     */
    const actionButtons = document.querySelectorAll('.action-button, .more-button');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const dropdown = this.nextElementSibling;
            
            // Cerrar todos los demás dropdowns
            document.querySelectorAll('.action-dropdown, .dropdown').forEach(d => {
                if (d !== dropdown) {
                    d.style.display = 'none';
                }
            });
            
            // Alternar la visibilidad del dropdown actual
            if (dropdown && (dropdown.classList.contains('action-dropdown') || dropdown.classList.contains('dropdown'))) {
                dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
            }
        });
    });
    
    // Cerrar dropdowns al hacer clic en cualquier otra parte
    document.addEventListener('click', function() {
        document.querySelectorAll('.action-dropdown, .dropdown').forEach(dropdown => {
            dropdown.style.display = 'none';
        });
    });
    
    /**
     * Funcionalidad de las pestañas (tabs)
     */
    const tabButtons = document.querySelectorAll('.tab-button');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover clase 'active' de todos los botones en el mismo grupo
            const tabGroup = this.parentElement;
            tabGroup.querySelectorAll('.tab-button').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Agregar clase 'active' al botón actual
            this.classList.add('active');
            
            // Aquí se podría agregar lógica para mostrar el contenido correspondiente
            // Por ejemplo, mostrando/ocultando secciones basadas en el tab seleccionado
        });
    });
});