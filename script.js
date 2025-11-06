// Navegación SPA - Cambio de secciones sin recargar la página
class SPANavigation {
    constructor() {
        this.currentSection = 'inicio';
        this.init();
    }

    init() {
        this.setupNavigation();
        this.showSection(this.currentSection);
    }

    setupNavigation() {
        // Configurar event listeners para los enlaces de navegación
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetSection = link.getAttribute('data-section');
                this.navigateTo(targetSection);
            });
        });

        // Manejar cambios en el hash de la URL
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.substring(1);
            if (hash && this.isValidSection(hash)) {
                this.navigateTo(hash);
            }
        });

        // Manejar carga inicial con hash
        const initialHash = window.location.hash.substring(1);
        if (initialHash && this.isValidSection(initialHash)) {
            this.navigateTo(initialHash);
        }
    }

    navigateTo(section) {
        // Ocultar sección actual
        this.hideCurrentSection();

        // Mostrar nueva sección
        this.showSection(section);

        // Actualizar navegación activa
        this.updateActiveNav(section);

        // Actualizar URL
        this.updateURL(section);

        this.currentSection = section;
    }

    hideCurrentSection() {
        const currentSection = document.querySelector('.content-section.active');
        if (currentSection) {
            currentSection.classList.remove('active');
        }
    }

    showSection(section) {
        const targetSection = document.getElementById(section);
        if (targetSection) {
            targetSection.classList.add('active');
        }
    }

    updateActiveNav(section) {
        // Remover clase active de todos los enlaces
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Agregar clase active al enlace correspondiente
        const activeLink = document.querySelector(`[data-section="${section}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    updateURL(section) {
        window.history.pushState(null, null, `#${section}`);
    }

    isValidSection(section) {
        const validSections = ['inicio', 'nutricion', 'ejercicio', 'mental'];
        return validSections.includes(section);
    }
}

// Funciones para mostrar/ocultar elementos (Hipermedios)
function toggleDescription() {
    const description = document.getElementById('health-description');
    description.classList.toggle('hidden');
}

function toggleNutritionTip() {
    const tip = document.getElementById('nutrition-tip');
    tip.classList.toggle('hidden');
}

function toggleExerciseTip() {
    const tip = document.getElementById('exercise-tip');
    tip.classList.toggle('hidden');
}

function toggleMentalTip() {
    const tip = document.getElementById('mental-tip');
    tip.classList.toggle('hidden');
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new SPANavigation();
});

// Manejo de errores básico
window.addEventListener('error', (e) => {
    console.error('Error en la aplicación:', e.error);
});