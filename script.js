// DOM Elements
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const successMessage = document.getElementById('successMessage');
const successText = document.getElementById('successText');

// Form switching functionality
function switchToSignup() {
    loginForm.classList.add('slide-out');
    setTimeout(() => {
        loginForm.classList.add('hidden');
        loginForm.classList.remove('slide-out');
        signupForm.classList.remove('hidden');
        signupForm.classList.add('pulse');
        setTimeout(() => signupForm.classList.remove('pulse'), 500);
    }, 250);
}

function switchToLogin() {
    signupForm.classList.add('slide-out');
    setTimeout(() => {
        signupForm.classList.add('hidden');
        signupForm.classList.remove('slide-out');
        loginForm.classList.remove('hidden');
        loginForm.classList.add('pulse');
        setTimeout(() => loginForm.classList.remove('pulse'), 500);
    }, 250);
}

// Password visibility toggle
function togglePassword(inputId, toggleElement) {
    const input = document.getElementById(inputId);
    const icon = toggleElement.querySelector('i');
    
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

// Password strength checker
function checkPasswordStrength(password) {
    let strength = 0;
    let feedback = '';
    
    // Length check
    if (password.length >= 8) strength += 25;
    
    // Lowercase check
    if (/[a-z]/.test(password)) strength += 25;
    
    // Uppercase check
    if (/[A-Z]/.test(password)) strength += 25;
    
    // Number or special character check
    if (/[\d\W]/.test(password)) strength += 25;
    
    // Determine feedback
    if (strength <= 25) {
        feedback = 'Weak password';
    } else if (strength <= 50) {
        feedback = 'Fair password';
    } else if (strength <= 75) {
        feedback = 'Good password';
    } else {
        feedback = 'Strong password';
    }
    
    return { strength, feedback };
}

// Update password strength meter
function updatePasswordStrength() {
    const passwordInput = document.getElementById('signupPassword');
    const strengthFill = document.querySelector('.strength-fill');
    const strengthText = document.querySelector('.strength-text');
    
    if (!passwordInput || !strengthFill || !strengthText) return;
    
    const password = passwordInput.value;
    const { strength, feedback } = checkPasswordStrength(password);
    
    strengthFill.style.width = strength + '%';
    strengthText.textContent = password ? feedback : 'Password strength';
    
    // Color coding
    if (strength <= 25) {
        strengthFill.style.background = '#ff4757';
    } else if (strength <= 50) {
        strengthFill.style.background = '#ffa502';
    } else if (strength <= 75) {
        strengthFill.style.background = '#2ed573';
    } else {
        strengthFill.style.background = '#2ed573';
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Form validation
function validateLoginForm() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (!email || !password) {
        showError('Please fill in all fields');
        return false;
    }
    
    if (!isValidEmail(email)) {
        showError('Please enter a valid email address');
        return false;
    }
    
    return true;
}

function validateSignupForm() {
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;
    
    if (!name || !email || !password || !confirmPassword) {
        showError('Please fill in all fields');
        return false;
    }
    
    if (!isValidEmail(email)) {
        showError('Please enter a valid email address');
        return false;
    }
    
    if (password.length < 8) {
        showError('Password must be at least 8 characters long');
        return false;
    }
    
    if (password !== confirmPassword) {
        showError('Passwords do not match');
        return false;
    }
    
    if (!agreeTerms) {
        showError('Please agree to the terms and conditions');
        return false;
    }
    
    const { strength } = checkPasswordStrength(password);
    if (strength < 50) {
        showError('Please choose a stronger password');
        return false;
    }
    
    return true;
}

// Error handling
function showError(message) {
    // Create error message element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <span>${message}</span>
    `;
    
    // Style the error message
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #ff4757, #ff3742);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(255, 71, 87, 0.3);
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 14px;
        font-weight: 500;
        z-index: 1001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(errorDiv);
    
    // Animate in
    setTimeout(() => {
        errorDiv.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        errorDiv.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(errorDiv);
        }, 300);
    }, 4000);
}

// Success message
function showSuccess(message) {
    successText.textContent = message;
    successMessage.classList.add('show');
    
    setTimeout(() => {
        successMessage.classList.remove('show');
    }, 3000);
}

// Loading state
function setLoadingState(button, isLoading) {
    if (isLoading) {
        button.classList.add('loading');
        button.disabled = true;
    } else {
        button.classList.remove('loading');
        button.disabled = false;
    }
}

// Simulate API calls
async function simulateLogin(email, password) {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Simulate successful login
            resolve({
                success: true,
                user: { email, name: 'John Doe' }
            });
        }, 2000);
    });
}

async function simulateSignup(name, email, password) {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Simulate successful signup
            resolve({
                success: true,
                user: { name, email }
            });
        }, 2000);
    });
}

// Form submission handlers
async function handleLogin(e) {
    e.preventDefault();
    
    if (!validateLoginForm()) return;
    
    const button = e.target.querySelector('.btn-primary');
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    setLoadingState(button, true);
    
    try {
        const result = await simulateLogin(email, password);
        
        if (result.success) {
            showSuccess(`Welcome back, ${result.user.name}!`);
            // Reset form
            e.target.reset();
        }
    } catch (error) {
        showError('Login failed. Please try again.');
    } finally {
        setLoadingState(button, false);
    }
}

async function handleSignup(e) {
    e.preventDefault();
    
    if (!validateSignupForm()) return;
    
    const button = e.target.querySelector('.btn-primary');
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    
    setLoadingState(button, true);
    
    try {
        const result = await simulateSignup(name, email, password);
        
        if (result.success) {
            showSuccess(`Account created successfully! Welcome, ${result.user.name}!`);
            // Reset form and switch to login
            e.target.reset();
            setTimeout(() => {
                switchToLogin();
            }, 2000);
        }
    } catch (error) {
        showError('Signup failed. Please try again.');
    } finally {
        setLoadingState(button, false);
    }
}

// Social login handlers
function handleSocialLogin(provider) {
    showSuccess(`Redirecting to ${provider} login...`);
    
    // Simulate social login
    setTimeout(() => {
        showSuccess(`Successfully logged in with ${provider}!`);
    }, 1500);
}

// Input animation handlers
function addInputAnimations() {
    const inputs = document.querySelectorAll('input[type="email"], input[type="password"], input[type="text"]');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        input.addEventListener('input', function() {
            if (this.value) {
                this.parentElement.classList.add('has-value');
            } else {
                this.parentElement.classList.remove('has-value');
            }
        });
    });
}

// Initialize event listeners
function init() {
    // Form submissions
    document.getElementById('login').addEventListener('submit', handleLogin);
    document.getElementById('signup').addEventListener('submit', handleSignup);
    
    // Password strength checker
    const signupPasswordInput = document.getElementById('signupPassword');
    if (signupPasswordInput) {
        signupPasswordInput.addEventListener('input', updatePasswordStrength);
    }
    
    // Social login buttons
    document.querySelectorAll('.btn-social').forEach(button => {
        button.addEventListener('click', function() {
            const provider = this.textContent.trim();
            handleSocialLogin(provider);
        });
    });
    
    // Input animations
    addInputAnimations();
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Alt + S to switch to signup
        if (e.altKey && e.key === 's') {
            e.preventDefault();
            if (!signupForm.classList.contains('hidden')) return;
            switchToSignup();
        }
        
        // Alt + L to switch to login
        if (e.altKey && e.key === 'l') {
            e.preventDefault();
            if (!loginForm.classList.contains('hidden')) return;
            switchToLogin();
        }
        
        // Escape to close success message
        if (e.key === 'Escape') {
            successMessage.classList.remove('show');
        }
    });
    
    // Add ripple effect to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
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
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                this.removeChild(ripple);
            }, 600);
        });
    });
}

// CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .btn {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Add some fun easter eggs
let clickCount = 0;
document.addEventListener('click', function() {
    clickCount++;
    
    // After 50 clicks, show a fun message
    if (clickCount === 50) {
        showSuccess('Wow! You really like clicking! 🎉');
    }
});

// Konami code easter egg
const konamiCode = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];
let konamiIndex = 0;

document.addEventListener('keydown', function(e) {
    if (e.code === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            showSuccess('🎮 Konami code activated! You found the secret! 🎮');
            konamiIndex = 0;
            
            // Add some fun visual effects
            document.body.style.animation = 'rainbow 2s infinite';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 5000);
        }
    } else {
        konamiIndex = 0;
    }
});

// Rainbow animation for easter egg
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);
