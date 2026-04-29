/**
 * Mubende Engineering Outreach | Behavioral Logic
 * Orchestrates DOM interactions and scroll-synchronized animations.
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // UI State Management
    const uiState = {
        isNavOpen: false,
        scrolled: false
    };

    /**
     * Scroll Animation Engine
     * Utilizes Intersection Observer for performant reveal logic.
     */
    const initScrollAnimations = () => {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Stop observing once visible to maintain performance
                    revealObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            revealObserver.observe(el);
        });
    };

    /**
     * Header Dynamic Styling
     * Monitors scroll position to adjust header visibility/blur.
     */
    const handleHeaderScroll = () => {
        const header = document.querySelector('.site-header');
        const scrollThreshold = 50;

        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;
            
            if (currentScroll > scrollThreshold && !uiState.scrolled) {
                header.classList.add('header-scrolled');
                uiState.scrolled = true;
            } else if (currentScroll <= scrollThreshold && uiState.scrolled) {
                header.classList.remove('header-scrolled');
                uiState.scrolled = false;
            }
        }, { passive: true });
    };

    /**
     * Navigation Logic
     * Handles mobile menu state and fluid link transitions.
     */
    const initNavigation = () => {
        const mobileToggle = document.querySelector('.mobile-toggle');
        const navLinks = document.querySelector('.nav-links');

        if (mobileToggle) {
            mobileToggle.addEventListener('click', () => {
                uiState.isNavOpen = !uiState.isNavOpen;
                mobileToggle.classList.toggle('active');
                navLinks.classList.toggle('active');
                document.body.style.overflow = uiState.isNavOpen ? 'hidden' : '';
            });
        }

        // Close mobile nav on link click
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (uiState.isNavOpen) {
                    mobileToggle.click();
                }
            });
        });
    };

    // Initialize core behavioral modules
    initScrollAnimations();
    handleHeaderScroll();
    initNavigation();

    // Console handshake for engineering verification
    console.log('%c Mubende Engineering Outreach | System Initialized ', 'background: #3b82f6; color: #fff; font-weight: bold;');
});
