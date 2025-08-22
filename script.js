// Modern Authentication System
class AuthSystem {
    constructor() {
        this.currentTab = 'login';
        this.isLoading = false;
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupPasswordStrength();
        this.setupTheme();
        this.addAnimations();
    }

    bindEvents() {
        // Form submissions
        document.getElementById('loginForm').addEventListener('submit', (e) => this.handleLogin(e));
        document.getElementById('signupForm').addEventListener('submit', (e) => this.handleSignup(e));

        // Password strength monitoring
        const signupPassword = document.getElementById('signupPassword');
        if (signupPassword) {
            signupPassword.addEventListener('input', () => this.updatePasswordStrength());
        }

        // Real-time validation
        this.setupRealTimeValidation();

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
    }

    setupPasswordStrength() {
        const passwordInput = document.getElementById('signupPassword');
        if (!passwordInput) return;

        passwordInput.addEventListener('input', () => {
            this.updatePasswordStrength();
        });
    }

    setupTheme() {
        // Auto-detect system theme
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-theme', 'dark');
        }

        // Listen for theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
            }
        });

        // Apply saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
            this.updateThemeIcon(savedTheme);
        }
    }

    setupRealTimeValidation() {
        const inputs = document.querySelectorAll('input[type="email"], input[type="password"], input[type="text"]');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });

        // Password match validation
        const confirmPassword = document.getElementById('confirmPassword');
        const signupPassword = document.getElementById('signupPassword');
        
        if (confirmPassword && signupPassword) {
            confirmPassword.addEventListener('input', () => {
                this.validatePasswordMatch(signupPassword.value, confirmPassword.value);
            });
        }
    }

    addAnimations() {
        // Add entrance animations
        const authContainer = document.querySelector('.auth-container');
        const sidePanel = document.querySelector('.side-panel');
        
        if (authContainer) {
            authContainer.classList.add('slide-up');
        }
        
        if (sidePanel) {
            setTimeout(() => {
                sidePanel.classList.add('fade-in');
            }, 200);
        }

        // Add ripple effect to buttons
        this.addRippleEffect();
    }

    addRippleEffect() {
        const buttons = document.querySelectorAll('.submit-btn, .social-btn, .tab-btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.createRipple(e, button);
            });
        });
    }

    createRipple(event, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;

        element.appendChild(ripple);

        setTimeout(() => {
            if (element.contains(ripple)) {
                element.removeChild(ripple);
            }
        }, 600);
    }

    // Tab switching
    switchTab(tab) {
        if (this.isLoading) return;

        const loginTab = document.getElementById('loginTab');
        const signupTab = document.getElementById('signupTab');
        const loginPanel = document.getElementById('loginPanel');
        const signupPanel = document.getElementById('signupPanel');
        const tabIndicator = document.querySelector('.tab-indicator');

        // Update active states
        if (tab === 'login') {
            loginTab.classList.add('active');
            signupTab.classList.remove('active');
            loginPanel.classList.add('active');
            signupPanel.classList.remove('active');
            tabIndicator.classList.remove('signup');
        } else {
            signupTab.classList.add('active');
            loginTab.classList.remove('active');
            signupPanel.classList.add('active');
            loginPanel.classList.remove('active');
            tabIndicator.classList.add('signup');
        }

        this.currentTab = tab;
    }

    // Password visibility toggle
    togglePassword(inputId, toggleButton) {
        const input = document.getElementById(inputId);
        const icon = toggleButton.querySelector('i');

        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    }

    // Theme toggle
    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        this.updateThemeIcon(newTheme);
    }

    updateThemeIcon(theme) {
        const themeToggle = document.querySelector('.theme-toggle i');
        if (theme === 'dark') {
            themeToggle.classList.remove('fa-sun');
            themeToggle.classList.add('fa-moon');
        } else {
            themeToggle.classList.remove('fa-moon');
            themeToggle.classList.add('fa-sun');
        }
    }

    // Password strength checker
    updatePasswordStrength() {
        const password = document.getElementById('signupPassword').value;
        const strengthBars = document.querySelectorAll('.strength-bar');
        const strengthText = document.querySelector('.strength-text');

        if (!password) {
            strengthBars.forEach(bar => {
                bar.className = 'strength-bar';
            });
            strengthText.textContent = 'Password strength';
            return;
        }

        const strength = this.calculatePasswordStrength(password);
        const levels = ['weak', 'fair', 'good', 'strong'];
        const messages = ['Weak password', 'Fair password', 'Good password', 'Strong password'];

        strengthBars.forEach((bar, index) => {
            bar.className = 'strength-bar';
            if (index < strength.score) {
                bar.classList.add(levels[strength.score - 1]);
            }
        });

        strengthText.textContent = messages[strength.score - 1] || 'Password strength';
    }

    calculatePasswordStrength(password) {
        let score = 0;
        const checks = {
            length: password.length >= 8,
            lowercase: /[a-z]/.test(password),
            uppercase: /[A-Z]/.test(password),
            numbers: /\d/.test(password),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
        };

        // Length check
        if (checks.length) score++;
        
        // Character variety
        const varietyCount = [checks.lowercase, checks.uppercase, checks.numbers, checks.special].filter(Boolean).length;
        score += Math.min(varietyCount, 3);

        return { score: Math.min(score, 4), checks };
    }

    // Field validation
    validateField(input) {
        const value = input.value.trim();
        const type = input.type;
        let isValid = true;
        let message = '';

        switch (type) {
            case 'email':
                isValid = this.isValidEmail(value);
                message = isValid ? '' : 'Please enter a valid email address';
                break;
            case 'password':
                isValid = value.length >= 8;
                message = isValid ? '' : 'Password must be at least 8 characters';
                break;
            case 'text':
                isValid = value.length >= 2;
                message = isValid ? '' : 'This field is required';
                break;
        }

        this.setFieldValidation(input, isValid, message);
        return isValid;
    }

    validatePasswordMatch(password, confirmPassword) {
        const input = document.getElementById('confirmPassword');
        const isMatch = password === confirmPassword && confirmPassword.length > 0;
        const message = isMatch ? '' : 'Passwords do not match';
        
        this.setFieldValidation(input, isMatch, message);
        return isMatch;
    }

    setFieldValidation(input, isValid, message) {
        const container = input.closest('.input-container');
        const existingError = container.querySelector('.error-message');

        // Remove existing error
        if (existingError) {
            existingError.remove();
        }

        if (!isValid && message) {
            // Add error styling
            container.classList.add('error');
            
            // Add error message
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = message;
            errorDiv.style.cssText = `
                color: var(--error-color);
                font-size: var(--font-size-xs);
                margin-top: var(--spacing-xs);
                animation: fadeIn 0.3s ease-out;
            `;
            container.appendChild(errorDiv);
        } else {
            container.classList.remove('error');
        }
    }

    clearFieldError(input) {
        const container = input.closest('.input-container');
        const errorMessage = container.querySelector('.error-message');
        
        if (errorMessage) {
            container.classList.remove('error');
            errorMessage.remove();
        }
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Form submissions
    async handleLogin(e) {
        e.preventDefault();
        
        if (this.isLoading) return;

        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const rememberMe = document.getElementById('loginRemember').checked;

        // Validate inputs
        if (!this.validateLoginInputs(email, password)) return;

        this.setLoadingState(true);

        try {
            // Simulate API call
            const result = await this.simulateLogin(email, password, rememberMe);
            
            if (result.success) {
                this.showSuccessModal('Welcome back!', `Hello ${result.user.name}, you're successfully logged in.`);
                this.clearForm('loginForm');
            } else {
                this.showToast('error', 'Login failed', result.message || 'Invalid credentials');
            }
        } catch (error) {
            this.showToast('error', 'Login Error', 'Something went wrong. Please try again.');
        } finally {
            this.setLoadingState(false);
        }
    }

    async handleSignup(e) {
        e.preventDefault();
        
        if (this.isLoading) return;

        const formData = this.getSignupFormData();

        // Validate inputs
        if (!this.validateSignupInputs(formData)) return;

        this.setLoadingState(true);

        try {
            // Simulate API call
            const result = await this.simulateSignup(formData);
            
            if (result.success) {
                this.showSuccessModal('Account Created!', `Welcome ${formData.firstName}! Your account has been created successfully.`);
                this.clearForm('signupForm');
                setTimeout(() => this.switchTab('login'), 3000);
            } else {
                this.showToast('error', 'Signup failed', result.message || 'Could not create account');
            }
        } catch (error) {
            this.showToast('error', 'Signup Error', 'Something went wrong. Please try again.');
        } finally {
            this.setLoadingState(false);
        }
    }

    getSignupFormData() {
        return {
            firstName: document.getElementById('firstName').value.trim(),
            lastName: document.getElementById('lastName').value.trim(),
            email: document.getElementById('signupEmail').value.trim(),
            password: document.getElementById('signupPassword').value,
            confirmPassword: document.getElementById('confirmPassword').value,
            agreeTerms: document.getElementById('agreeTerms').checked
        };
    }

    validateLoginInputs(email, password) {
        let isValid = true;

        if (!email || !this.isValidEmail(email)) {
            this.showToast('error', 'Invalid Email', 'Please enter a valid email address');
            isValid = false;
        }

        if (!password || password.length < 8) {
            this.showToast('error', 'Invalid Password', 'Password must be at least 8 characters');
            isValid = false;
        }

        return isValid;
    }

    validateSignupInputs(formData) {
        let isValid = true;

        if (!formData.firstName || !formData.lastName) {
            this.showToast('error', 'Name Required', 'Please enter your first and last name');
            isValid = false;
        }

        if (!formData.email || !this.isValidEmail(formData.email)) {
            this.showToast('error', 'Invalid Email', 'Please enter a valid email address');
            isValid = false;
        }

        if (!formData.password || formData.password.length < 8) {
            this.showToast('error', 'Weak Password', 'Password must be at least 8 characters');
            isValid = false;
        }

        if (formData.password !== formData.confirmPassword) {
            this.showToast('error', 'Password Mismatch', 'Passwords do not match');
            isValid = false;
        }

        if (!formData.agreeTerms) {
            this.showToast('error', 'Terms Required', 'Please agree to the terms and conditions');
            isValid = false;
        }

        const strength = this.calculatePasswordStrength(formData.password);
        if (strength.score < 2) {
            this.showToast('error', 'Weak Password', 'Please create a stronger password');
            isValid = false;
        }

        return isValid;
    }

    // API simulation methods
    async simulateLogin(email, password, rememberMe) {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Simulate different responses
                if (email === 'demo@example.com' && password === 'demo1234') {
                    resolve({
                        success: true,
                        user: { 
                            email, 
                            name: 'Demo User',
                            id: '12345'
                        }
                    });
                } else {
                    resolve({
                        success: Math.random() > 0.3, // 70% success rate for demo
                        user: { 
                            email, 
                            name: email.split('@')[0],
                            id: Math.random().toString(36).substr(2, 9)
                        },
                        message: 'Invalid email or password'
                    });
                }
            }, 2000);
        });
    }

    async simulateSignup(formData) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    success: true,
                    user: {
                        name: `${formData.firstName} ${formData.lastName}`,
                        email: formData.email,
                        id: Math.random().toString(36).substr(2, 9)
                    }
                });
            }, 2500);
        });
    }

    // Social authentication
    handleSocialAuth(provider) {
        this.showToast('info', 'Redirecting...', `Opening ${provider} authentication...`);
        
        // Simulate social login process
        setTimeout(() => {
            const success = Math.random() > 0.2; // 80% success rate
            
            if (success) {
                const user = {
                    name: 'Social User',
                    email: `user@${provider.toLowerCase()}.com`,
                    id: Math.random().toString(36).substr(2, 9)
                };
                
                this.showSuccessModal('Success!', `Welcome! You've successfully logged in with ${provider}.`);
            } else {
                this.showToast('error', 'Authentication Failed', `Failed to authenticate with ${provider}. Please try again.`);
            }
        }, 3000);
    }

    // UI state management
    setLoadingState(loading) {
        this.isLoading = loading;
        const submitBtn = document.querySelector('.form-panel.active .submit-btn');
        const loadingOverlay = document.getElementById('loadingOverlay');
        
        if (loading) {
            submitBtn?.classList.add('loading');
            loadingOverlay?.classList.add('show');
        } else {
            submitBtn?.classList.remove('loading');
            loadingOverlay?.classList.remove('show');
        }
    }

    clearForm(formId) {
        const form = document.getElementById(formId);
        if (form) {
            form.reset();
            
            // Clear any validation errors
            const errorMessages = form.querySelectorAll('.error-message');
            errorMessages.forEach(error => error.remove());
            
            const errorContainers = form.querySelectorAll('.input-container.error');
            errorContainers.forEach(container => container.classList.remove('error'));
            
            // Reset password strength
            if (formId === 'signupForm') {
                const strengthBars = document.querySelectorAll('.strength-bar');
                const strengthText = document.querySelector('.strength-text');
                
                strengthBars.forEach(bar => {
                    bar.className = 'strength-bar';
                });
                
                if (strengthText) {
                    strengthText.textContent = 'Password strength';
                }
            }
        }
    }

    // Toast notifications
    showToast(type, title, message) {
        const toastContainer = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <div class="toast-icon">
                <i class="fas ${this.getToastIcon(type)}"></i>
            </div>
            <div class="toast-content">
                <strong>${title}</strong>
                <div>${message}</div>
            </div>
            <button class="toast-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        toastContainer.appendChild(toast);
        
        // Animate in
        setTimeout(() => toast.classList.add('show'), 10);
        
        // Auto remove
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (toastContainer.contains(toast)) {
                    toastContainer.removeChild(toast);
                }
            }, 300);
        }, 5000);
    }

    getToastIcon(type) {
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            info: 'fa-info-circle',
            warning: 'fa-exclamation-triangle'
        };
        return icons[type] || 'fa-info-circle';
    }

    // Success modal
    showSuccessModal(title, message) {
        const modal = document.getElementById('successModal');
        const modalTitle = modal.querySelector('h3');
        const modalMessage = modal.querySelector('p');
        
        modalTitle.textContent = title;
        modalMessage.textContent = message;
        modal.classList.add('show');
    }

    closeSuccessModal() {
        const modal = document.getElementById('successModal');
        modal.classList.remove('show');
    }

    // Keyboard shortcuts
    handleKeyboardShortcuts(e) {
        // Tab switching shortcuts
        if (e.altKey && e.key === '1') {
            e.preventDefault();
            this.switchTab('login');
        }
        
        if (e.altKey && e.key === '2') {
            e.preventDefault();
            this.switchTab('signup');
        }
        
        // Theme toggle
        if (e.ctrlKey && e.key === 'd') {
            e.preventDefault();
            this.toggleTheme();
        }
        
        // Close modals with Escape
        if (e.key === 'Escape') {
            this.closeSuccessModal();
        }
        
        // Quick login for demo (Ctrl + Shift + L)
        if (e.ctrlKey && e.shiftKey && e.key === 'L') {
            e.preventDefault();
            this.fillDemoCredentials();
        }
    }

    fillDemoCredentials() {
        if (this.currentTab === 'login') {
            document.getElementById('loginEmail').value = 'demo@example.com';
            document.getElementById('loginPassword').value = 'demo1234';
            this.showToast('info', 'Demo Credentials', 'Demo credentials filled! You can now sign in.');
        }
    }
}

// Global functions (for backwards compatibility and HTML onclick handlers)
function switchTab(tab) {
    window.authSystem.switchTab(tab);
}

function togglePassword(inputId, toggleButton) {
    window.authSystem.togglePassword(inputId, toggleButton);
}

function toggleTheme() {
    window.authSystem.toggleTheme();
}

function handleSocialAuth(provider) {
    window.authSystem.handleSocialAuth(provider);
}

function closeSuccessModal() {
    window.authSystem.closeSuccessModal();
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .input-container.error input {
        border-color: var(--error-color) !important;
        box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.1) !important;
    }
    
    .submit-btn {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    window.authSystem = new AuthSystem();
});

// Fun Easter Eggs
let clickCount = 0;
let konamiSequence = [];
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('click', () => {
    clickCount++;
    
    if (clickCount === 100) {
        window.authSystem?.showToast('success', '🎉 Wow!', 'You really love clicking! Here\'s a virtual cookie 🍪');
    }
});

document.addEventListener('keydown', (e) => {
    konamiSequence.push(e.code);
    konamiSequence = konamiSequence.slice(-10);
    
    if (konamiSequence.join(',') === konamiCode.join(',')) {
        window.authSystem?.showToast('success', '🎮 Konami Code!', 'You found the secret! Welcome to the matrix 🕶️');
        document.body.style.filter = 'hue-rotate(180deg)';
        setTimeout(() => {
            document.body.style.filter = '';
        }, 3000);
    }
});

// Performance optimization
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        // Preload social auth icons
        const socialIcons = ['fab fa-google', 'fab fa-github', 'fab fa-apple'];
        socialIcons.forEach(iconClass => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'font';
            link.crossOrigin = 'anonymous';
        });
    });
}
