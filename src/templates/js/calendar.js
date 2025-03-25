document.addEventListener('DOMContentLoaded', function() {
    /**
     * Funcionalidad del calendario
     */
    const prevMonthBtn = document.querySelector('.prev-month');
    const nextMonthBtn = document.querySelector('.next-month');
    
    // Mes actual (0-11)
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    
    // Función para actualizar el calendario
    function updateCalendar() {
        const daysContainer = document.querySelector('.days');
        if (!daysContainer) return;
        
        // Limpiar días existentes
        daysContainer.innerHTML = '';
        
        // Obtener el primer día del mes y el último día
        const firstDay = new Date(currentYear, currentMonth, 1);
        const lastDay = new Date(currentYear, currentMonth + 1, 0);
        
        // Obtener el día de la semana del primer día (0-6, donde 0 es domingo)
        let firstDayOfWeek = firstDay.getDay();
        // Ajustar para que la semana comience en lunes (0-6, donde 0 es lunes)
        firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
        
        // Días del mes anterior
        const prevMonthLastDay = new Date(currentYear, currentMonth, 0).getDate();
        for (let i = 0; i < firstDayOfWeek; i++) {
            const day = document.createElement('div');
            day.className = 'day prev-month-day';
            day.textContent = prevMonthLastDay - firstDayOfWeek + i + 1;
            daysContainer.appendChild(day);
        }
        
        // Días del mes actual
        for (let i = 1; i <= lastDay.getDate(); i++) {
            const day = document.createElement('div');
            day.className = 'day';
            
            // Marcar días con eventos (ejemplo)
            if (i === 8 || i === 11 || i === 15 || i === 18 || i === 24) {
                day.classList.add('has-event');
                const eventMarker = document.createElement('div');
                eventMarker.className = 'day-event';
                day.appendChild(eventMarker);
            }
            
            day.textContent = i;
            daysContainer.appendChild(day);
        }
        
        // Días del mes siguiente
        const totalDaysDisplayed = firstDayOfWeek + lastDay.getDate();
        const remainingCells = 42 - totalDaysDisplayed; // 6 semanas * 7 días = 42
        
        for (let i = 1; i <= remainingCells; i++) {
            const day = document.createElement('div');
            day.className = 'day next-month-day';
            day.textContent = i;
            daysContainer.appendChild(day);
        }
    }
    
    // Inicializar calendario
    updateCalendar();
    
    // Eventos de navegación del calendario
    if (prevMonthBtn) {
        prevMonthBtn.addEventListener('click', function() {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            updateCalendar();
        });
    }
    
    if (nextMonthBtn) {
        nextMonthBtn.addEventListener('click', function() {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            updateCalendar();
        });
    }
    
    // Funcionalidad para los eventos del calendario
    const eventItems = document.querySelectorAll('.event-item');
    
    eventItems.forEach(item => {
        const editBtn = item.querySelector('.edit-button');
        const deleteBtn = item.querySelector('.delete-button');
        
        if (editBtn) {
            editBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const eventTitle = item.querySelector('h3').textContent;
                alert(`Editar evento: ${eventTitle}`);
                // Aquí iría la lógica para editar el evento
            });
        }
        
        if (deleteBtn) {
            deleteBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const eventTitle = item.querySelector('h3').textContent;
                if (confirm(`¿Estás seguro de que deseas eliminar el evento: ${eventTitle}?`)) {
                    item.remove();
                    // Aquí iría la lógica para eliminar el evento de la base de datos
                }
            });
        }
    });
});