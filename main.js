/**
 * Mubende Engineering Outreach | Technical Orchestration
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // State Management
    const state = {
        theme: localStorage.getItem('theme') || 'dark',
        scrolled: false
    };

    /**
     * Theme Orchestration System
     */
    const initTheme = () => {
        const root = document.documentElement;
        const toggleBtn = document.getElementById('theme-toggle');
        
        // Apply initial state
        root.setAttribute('data-theme', state.theme);

        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                state.theme = state.theme === 'dark' ? 'light' : 'dark';
                root.setAttribute('data-theme', state.theme);
                localStorage.setItem('theme', state.theme);
            });
        }
    };

    /**
     * Scroll-Synchronized Reveal Engine
     */
    const initScrollReveal = () => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        };

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            revealObserver.observe(el);
        });
    };

    /**
     * Navigation Logic
     */
    const handleHeaderState = () => {
        const header = document.querySelector('.site-header');
        const threshold = 60;

        window.addEventListener('scroll', () => {
            if (window.scrollY > threshold && !state.scrolled) {
                header.classList.add('header-scrolled');
                state.scrolled = true;
            } else if (window.scrollY <= threshold && state.scrolled) {
                header.classList.remove('header-scrolled');
                state.scrolled = false;
            }
        }, { passive: true });
    };

    // Initialize modules
    initTheme();
    initScrollReveal();
    handleHeaderState();

    console.log('%c MEO | System Expansion Synchronized ', 'background: #3b82f6; color: #fff; font-weight: bold;');
});
