
document.head.appendChild(style);

// Global functions for HTML onclick handlers
function closePostModal() {
    window.facebookClone.closePostModal();
}

function createPost() {
    window.facebookClone.createPost();
}

// Initialize Facebook Clone
document.addEventListener('DOMContentLoaded', () => {
    window.facebookClone = new FacebookClone();
});

// Additional utility functions
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

function validateInput(input) {
    return input && input.trim().length > 0;
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        // Preload images
        const imageUrls = [
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
            'https://images.unsplash.com/photo-1494790108755-2616c113d94e',
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
            'https://images.unsplash.com/photo-1539571696285-e7d0a4d75d35'
        ];
        
        imageUrls.forEach(url => {
            const img = new Image();
            img.src = url;
        });
    });
}

// Service Worker registration for PWA (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
