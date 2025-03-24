document.addEventListener('DOMContentLoaded', function() {
    // Countdown Timer Funktionalität
    function updateCountdown() {
        const days = document.getElementById('days');
        const hours = document.getElementById('hours');
        const minutes = document.getElementById('minutes');
        const seconds = document.getElementById('seconds');
        
        // Startdatum des Countdowns (heute + 3 Tage)
        const now = new Date();
        const targetDate = new Date();
        targetDate.setDate(now.getDate() + 3);
        targetDate.setHours(23, 59, 59, 0);
        
        function update() {
            const currentTime = new Date();
            const diff = targetDate - currentTime;
            
            // Countdown beendet
            if (diff <= 0) {
                clearInterval(timerInterval);
                days.textContent = "0";
                hours.textContent = "0";
                minutes.textContent = "0";
                seconds.textContent = "0";
                return;
            }
            
            // Berechnung der verbleibenden Zeit
            const d = Math.floor(diff / (1000 * 60 * 60 * 24));
            const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((diff % (1000 * 60)) / 1000);
            
            // Aktualisierung der Anzeige
            days.textContent = d < 10 ? '0' + d : d;
            hours.textContent = h < 10 ? '0' + h : h;
            minutes.textContent = m < 10 ? '0' + m : m;
            seconds.textContent = s < 10 ? '0' + s : s;
        }
        
        // Initialer Aufruf
        update();
        
        // Aktualisierung jede Sekunde
        const timerInterval = setInterval(update, 1000);
    }
    
    // Chat-Widget Funktionalität
    function initChatWidget() {
        const chatWidget = document.getElementById('chat-widget');
        const chatBubble = document.getElementById('open-chat');
        const closeChatButton = document.getElementById('close-chat');
        const minimizeChatButton = document.getElementById('minimize-chat');
        const chatForm = document.querySelector('.chat-input-form');
        const chatInput = document.getElementById('chat-input');
        const chatMessages = document.getElementById('chat-messages');
        
        // Prüfen, ob alle nötigen Elemente existieren
        if (!chatWidget || !chatBubble) return;
        
        // Standardmäßig ist das Widget ausgeblendet und die Bubble sichtbar
        chatWidget.style.display = 'none';
        chatBubble.style.display = 'flex';
        
        // Event-Listener für die Chat-Bubble
        chatBubble.addEventListener('click', function() {
            chatWidget.style.display = 'block';
            chatBubble.style.display = 'none';
            
            // Wenn der Chat minimiert war, maximieren
            const chatBody = chatWidget.querySelector('.chat-body');
            if (chatBody && chatBody.classList.contains('minimized')) {
                chatBody.classList.remove('minimized');
            }
        });
        
        // Event-Listener für den Schließen-Button
        if (closeChatButton) {
            closeChatButton.addEventListener('click', function() {
                chatWidget.style.display = 'none';
                chatBubble.style.display = 'flex';
            });
        }
        
        // Event-Listener für den Minimieren-Button
        if (minimizeChatButton) {
            minimizeChatButton.addEventListener('click', function() {
                const chatBody = chatWidget.querySelector('.chat-body');
                if (chatBody) {
                    chatBody.classList.toggle('minimized');
                }
            });
        }
        
        // Event-Listener für das Chat-Formular
        if (chatForm && chatInput && chatMessages) {
            chatForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const message = chatInput.value.trim();
                if (message !== '') {
                    // Nachricht des Benutzers hinzufügen
                    const userMessageDiv = document.createElement('div');
                    userMessageDiv.classList.add('message', 'sent');
                    
                    const userMessageP = document.createElement('p');
                    userMessageP.textContent = message;
                    
                    userMessageDiv.appendChild(userMessageP);
                    chatMessages.appendChild(userMessageDiv);
                    
                    // Eingabefeld leeren
                    chatInput.value = '';
                    
                    // Zum Ende des Chat-Fensters scrollen
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                    
                    // Automatische Antwort (im echten Einsatz würde hier die Verbindung zum Server erfolgen)
                    setTimeout(function() {
                        const botMessageDiv = document.createElement('div');
                        botMessageDiv.classList.add('message', 'received');
                        
                        const botMessageP = document.createElement('p');
                        botMessageP.textContent = 'Danke für Ihre Nachricht. Ein Kursleiter wird sich in Kürze bei Ihnen melden.';
                        
                        botMessageDiv.appendChild(botMessageP);
                        chatMessages.appendChild(botMessageDiv);
                        
                        // Zum Ende des Chat-Fensters scrollen
                        chatMessages.scrollTop = chatMessages.scrollHeight;
                    }, 1000);
                }
            });
        }
    }
    
    // Glatte Scroll-Funktion für Navigationlinks
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Animation beim Scrollen
    function initScrollAnimations() {
        const items = document.querySelectorAll('.glass-card, .feature-card, .timeline-item');
        
        function checkVisibility() {
            items.forEach(item => {
                const itemTop = item.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (itemTop < windowHeight - 100) {
                    item.style.opacity = 1;
                    item.style.transform = 'translateY(0)';
                }
            });
        }
        
        // Initiale Sichtbarkeitsprüfung
        items.forEach(item => {
            item.style.opacity = 0;
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        
        // Überprüfung beim Scrollen
        window.addEventListener('scroll', checkVisibility);
        
        // Erste Prüfung beim Laden
        checkVisibility();
    }
    
    // Accordion Funktionalität
    function initAccordions() {
        const accordionItems = document.querySelectorAll('.accordion-item');
        
        if (accordionItems.length === 0) return;
        
        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            
            if (header) {
                header.addEventListener('click', function() {
                    // Alle anderen Akkordeons schließen
                    accordionItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                        }
                    });
                    
                    // Dieses Akkordeon umschalten
                    item.classList.toggle('active');
                });
            }
        });
    }
    
    // Newsletter-Formular Funktionalität
    function initNewsletterForm() {
        const newsletterForm = document.querySelector('.newsletter-form');
        
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(newsletterForm);
            const name = formData.get('name');
            const email = formData.get('email');
            
            // Hier würde normalerweise eine API-Anfrage erfolgen
            
            // Erfolgsbenachrichtigung anzeigen
            const submitButton = newsletterForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Anmeldung erfolgreich!';
            
            setTimeout(function() {
                submitButton.disabled = false;
                submitButton.textContent = originalText;
                newsletterForm.reset();
            }, 3000);
        });
    }
    
    // Funktionsaufrufe
    updateCountdown();
    initChatWidget();
    initSmoothScroll();
    initScrollAnimations();
    initAccordions();
    initNewsletterForm();
});

// Funktion zum dynamischen Laden von Modulinhalten
function loadModuleContent(modulePath) {
    return fetch(modulePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Netzwerkantwort war nicht OK');
            }
            return response.text();
        })
        .then(html => {
            // Inhalt in die Seite einfügen
            document.querySelector('.content').innerHTML = html;
        })
        .catch(error => {
            console.error('Fehler beim Laden des Modulinhalts:', error);
        });
}

// Helper-Funktion für Animationen
function animateElement(element, animation, duration = 1000) {
    element.style.animation = `${animation} ${duration}ms`;
    
    setTimeout(() => {
        element.style.animation = '';
    }, duration);
}
