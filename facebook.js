// Facebook Clone JavaScript
class FacebookClone {
    constructor() {
        this.posts = [];
        this.currentUser = {
            id: 1,
            name: 'John Doe',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
        };
        this.init();
    }
    bindEvents() {
       ;
    
      
    
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            
            if (query.length > 0) {
                this.showSearchResults(query);
            } else {
                searchResults.style.display = 'none';
            }
        });

        searchInput.addEventListener('focus', () => {
            if (searchInput.value.trim().length > 0) {
                searchResults.style.display = 'block';
            }
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container')) {
                searchResults.style.display = 'none';
            }
        });
    }

    showSearchResults(query) {
        const searchResults = document.getElementById('searchResults');
        const results = this.mockSearchResults(query);
        
        searchResults.innerHTML = results.map(result => `
            <div class="search-result-item" style="display: flex; align-items: center; gap: 12px; padding: 8px 12px; cursor: pointer;">
                <img src="${result.avatar}" alt="${result.name}" style="width: 36px; height: 36px; border-radius: 50%; object-fit: cover;">
                <div>
                    <div style="font-weight: 600; font-size: 15px;">${result.name}</div>
                    <div style="font-size: 13px; color: var(--text-secondary);">${result.type}</div>
                </div>
            </div>
        `).join('');
        
        searchResults.style.display = 'block';
    }

    mockSearchResults(query) {
        const mockData = [
            { name: 'Sarah Wilson', type: 'Friend', avatar: 'https://images.unsplash.com/photo-1494790108755-2616c113d94e?w=36&h=36&fit=crop&crop=face' },
            { name: 'Web Developers Group', type: 'Group', avatar: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=36&h=36&fit=crop' },
            { name: 'Photography Club', type: 'Page', avatar: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=36&h=36&fit=crop' }
        ];
        
        return mockData.filter(item => 
            item.name.toLowerCase().includes(query.toLowerCase())
        );
    }

    openPostModal() {
        const modal = document.getElementById('postModal');
        modal.classList.add('show');
        document.getElementById('modalPostText').focus();
    }

    closePostModal() {
        const modal = document.getElementById('postModal');
        modal.classList.remove('show');
        document.getElementById('modalPostText').value = '';
    }

    createPost() {
        const text = document.getElementById('modalPostText').value.trim();
        
        if (!text) {
            this.showToast('Error', 'Please write something to post');
            return;
        }

        const newPost = {
            id: Date.now(),
            author: this.currentUser,
            text: text,
            timestamp: new Date(),
            likes: 0,
            comments: [],
            shares: 0,
            liked: false,
            image: null
        };

        this.posts.unshift(newPost);
        this.renderPosts();
        this.closePostModal();
        this.showToast('Success', 'Post created successfully!');
    }

    generateSamplePosts() {
        const samplePosts = [
            {
                id: 1,
                author: {
                    name: 'Sarah Wilson',
                    avatar: 'https://images.unsplash.com/photo-1494790108755-2616c113d94e?w=40&h=40&fit=crop&crop=face'
                },
                text: 'Just finished reading an amazing book about web development! The future of technology is so exciting 🚀',
                timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
                likes: 24,
                comments: [
                    { author: 'Mike Johnson', text: 'Which book was it? I\'m looking for good tech reads!' },
                    { author: 'Emma Davis', text: 'Sounds interesting! Would love to hear your thoughts' }
                ],
                shares: 3,
                liked: false,
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop'
            },
            {
                id: 2,
                author: {
                    name: 'Mike Johnson',
                    avatar: 'https://images.unsplash.com/photo-1539571696285-e7d0a4d75d35?w=40&h=40&fit=crop&crop=face'
                },
                text: 'Beautiful sunset today! Nature never fails to amaze me 🌅 #sunset #nature #photography',
                timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
                likes: 47,
                comments: [
                    { author: 'Lisa Chen', text: 'Absolutely stunning! Where was this taken?' },
                    { author: 'David Brown', text: 'Amazing colors! Great shot 📸' },
                    { author: 'Sarah Wilson', text: 'This made my day! Thanks for sharing' }
                ],
                shares: 8,
                liked: true,
                image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop'
            },
            {
                id: 3,
                author: {
                    name: 'Emma Davis',
                    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face'
                },
                text: 'Excited to announce that I\'ve joined the amazing team at TechCorp! Looking forward to new challenges and opportunities. Thank you to everyone who supported me on this journey! 💼✨',
                timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
                likes: 89,
                comments: [
                    { author: 'John Doe', text: 'Congratulations Emma! Well deserved 👏' },
                    { author: 'Sarah Wilson', text: 'So happy for you! You\'re going to do amazing things' },
                    { author: 'Mike Johnson', text: 'Congrats! TechCorp is lucky to have you' }
                ],
                shares: 12,
                liked: false,
                image: null
            },
            {
                id: 4,
                author: {
                    name: 'Lisa Chen',
                    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=40&h=40&fit=crop&crop=face'
                },
                text: 'Homemade pizza night! 🍕 Nothing beats fresh ingredients and good company. Who else loves cooking on weekends?',
                timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
                likes: 32,
                comments: [
                    { author: 'David Brown', text: 'That looks delicious! Recipe please? 😍' },
                    { author: 'Emma Davis', text: 'Making me hungry! Invite me next time 😄' }
                ],
                shares: 2,
                liked: true,
                image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500&h=300&fit=crop'
            }
        ];

        this.posts = samplePosts;
    }

    renderPosts() {
        const container = document.getElementById('postsContainer');
        container.innerHTML = this.posts.map(post => this.createPostHTML(post)).join('');
    }

    createPostHTML(post) {
        const timeAgo = this.getTimeAgo(post.timestamp);
        const hasImage = post.image ? `<div class="post-media"><img src="${post.image}" alt="Post image"></div>` : '';
        
        return `
            <div class="post" data-post-id="${post.id}">
                <div class="post-header">
                    <div class="post-author">
                        <img src="${post.author.avatar}" alt="${post.author.name}">
                        <div class="post-author-info">
                            <h4>${post.author.name}</h4>
                            <div class="post-time">
                                <span>${timeAgo}</span>
                                <i class="fas fa-globe-americas"></i>
                            </div>
                        </div>
                    </div>
                    <div class="post-options">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
                
                <div class="post-content">
                    <div class="post-text">${post.text}</div>
                    ${hasImage}
                </div>
                
                <div class="post-stats">
                    <div class="post-reactions">
                        <div class="reaction-icons">
                            <span class="like-icon">👍</span>
                            <span class="love-icon">❤️</span>
                        </div>
                        <span>${post.likes} likes</span>
                    </div>
                    <div class="post-engagement">
                        <span>${post.comments.length} comments</span>
                        <span>${post.shares} shares</span>
                    </div>
                </div>
                
                <div class="post-actions">
                    <div class="action-btn ${post.liked ? 'active' : ''}" data-action="like">
                        <i class="fas fa-thumbs-up"></i>
                        <span>Like</span>
                    </div>
                    <div class="action-btn" data-action="comment">
                        <i class="fas fa-comment"></i>
                        <span>Comment</span>
                    </div>
                    <div class="action-btn" data-action="share">
                        <i class="fas fa-share"></i>
                        <span>Share</span>
                    </div>
                </div>
            </div>
        `;
    }

    getTimeAgo(timestamp) {
        const now = new Date();
        const diff = now - timestamp;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 60) {
            return `${minutes}m`;
        } else if (hours < 24) {
            return `${hours}h`;
        } else {
            return `${days}d`;
        }
    }

    handleLike(e) {
        const postElement = e.target.closest('.post');
        const postId = parseInt(postElement.dataset.postId);
        const post = this.posts.find(p => p.id === postId);
        const likeBtn = e.target.closest('.action-btn');

        if (post) {
            post.liked = !post.liked;
            post.likes += post.liked ? 1 : -1;
            
            likeBtn.classList.toggle('active', post.liked);
            
            // Update like count in the post stats
            const likesSpan = postElement.querySelector('.post-reactions span');
            likesSpan.textContent = `${post.likes} likes`;
            
            // Add animation
            likeBtn.style.transform = 'scale(0.9)';
            setTimeout(() => {
                likeBtn.style.transform = 'scale(1)';
            }, 150);
        }
    }

    handleComment(e) {
        this.showToast('Comment', 'Comment feature coming soon!');
    }

    handleShare(e) {
        const postElement = e.target.closest('.post');
        const postId = parseInt(postElement.dataset.postId);
        const post = this.posts.find(p => p.id === postId);

        if (post) {
            post.shares += 1;
            const sharesSpan = postElement.querySelector('.post-engagement span:last-child');
            sharesSpan.textContent = `${post.shares} shares`;
            
            this.showToast('Shared', 'Post shared successfully!');
        }
    }

    openStory() {
        this.showToast('Stories', 'Story viewer coming soon!');
    }

    openChat(e) {
        const contactName = e.currentTarget.querySelector('span').textContent;
        const chatWidget = document.getElementById('chatWidget');
        
        // Update chat header with selected contact
        const chatContactName = chatWidget.querySelector('.chat-contact span');
        const chatContactImg = chatWidget.querySelector('.chat-contact img');
        
        chatContactName.textContent = contactName;
        chatContactImg.src = e.currentTarget.querySelector('img').src;
        
        chatWidget.classList.add('show');
    }

    setupChatEvents() {
        const chatWidget = document.getElementById('chatWidget');
        const chatInput = chatWidget.querySelector('.chat-input input');
        const chatMessages = chatWidget.querySelector('.chat-messages');
        const sendBtn = chatWidget.querySelector('.fa-paper-plane');
        const minimizeBtn = chatWidget.querySelector('.fa-minus');
        const closeBtn = chatWidget.querySelector('.fa-times');

        // Send message
        const sendMessage = () => {
            const message = chatInput.value.trim();
            if (message) {
                const messageElement = document.createElement('div');
                messageElement.className = 'message sent';
                messageElement.innerHTML = `<span>${message}</span>`;
                chatMessages.appendChild(messageElement);
                chatInput.value = '';
                chatMessages.scrollTop = chatMessages.scrollHeight;
                
                // Simulate received message
                setTimeout(() => {
                    const responses = [
                        'That\'s great!',
                        'I agree 😊',
                        'Thanks for sharing!',
                        'Sounds good to me',
                        'Let\'s talk more about this later'
                    ];
                    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                    const receivedMessage = document.createElement('div');
                    receivedMessage.className = 'message received';
                    receivedMessage.innerHTML = `<span>${randomResponse}</span>`;
                    chatMessages.appendChild(receivedMessage);
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }, 1000 + Math.random() * 2000);
            }
        };

        sendBtn.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });

        minimizeBtn.addEventListener('click', () => {
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
