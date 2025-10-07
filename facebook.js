// Facebook Clone JavaScript

  click', () => {
            chatWidget.classList.remove('show');
        });

        closeBtn.addEventListener('click', () => {
            chatWidget.classList.remove('show');
        });
    }

    handleScroll() {
        // Infinite scroll implementation
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
            this.loadMorePosts();
        }
    }

    loadMorePosts() {
        // Simulate loading more posts
        if (this.posts.length < 20) { // Limit for demo
            const additionalPosts = [
                {
                    id: Date.now(),
                    author: {
                        name: 'David Brown',
                        avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=40&h=40&fit=crop&crop=face'
                    },
                    text: 'Working on a new project! Excited to share the progress with everyone. Stay tuned for updates! 💻🚀',
                    timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000),
                    likes: Math.floor(Math.random() * 50) + 10,
                    comments: [],
                    shares: Math.floor(Math.random() * 10),
                    liked: Math.random() > 0.5,
                    image: Math.random() > 0.5 ? 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=300&fit=crop' : null
                }
            ];

            this.posts.push(...additionalPosts);
            this.renderPosts();
        }
    }

    showToast(title, message) {
        // Create toast notification
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--background-secondary);
                border: 1px solid var(--border-color);
                border-radius: var(--border-radius);
                padding: 16px;
                box-shadow: var(--shadow-2);
                z-index: 2001;
                max-width: 300px;
                animation: slideInRight 0.3s ease;
            ">
                <div style="font-weight: 600; margin-bottom: 4px;">${title}</div>
                <div style="color: var(--text-secondary); font-size: 14px;">${message}</div>
            </div>
        `;

        document.body.appendChild(toast);

        // Remove toast after 3 seconds
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }
}

// Add CSS animations for toasts
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
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
