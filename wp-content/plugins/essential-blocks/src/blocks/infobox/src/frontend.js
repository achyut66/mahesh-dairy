/**
 * Frontend JavaScript for Essential Blocks Infobox
 * Handles clickable infobox functionality while preserving inline links
 */

import domReady from '@wordpress/dom-ready';

domReady(function() {
    // Handle clickable infobox functionality
    const clickableInfoboxes = document.querySelectorAll('[data-clickable="true"]');
    
    clickableInfoboxes.forEach(function(infobox) {
        const href = infobox.getAttribute('data-href');
        const target = infobox.getAttribute('data-target');
        
        if (!href) return;
        
        // Add cursor pointer style
        infobox.style.cursor = 'pointer';
        
        infobox.addEventListener('click', function(event) {
            // Check if the clicked element or its parent is a link
            const clickedElement = event.target;
            const isLinkOrInLink = clickedElement.closest('a');
            
            // If user clicked on a link (like title anchor), don't trigger infobox click
            if (isLinkOrInLink) {
                return; // Let the link handle its own click
            }
            
            // Prevent default behavior
            event.preventDefault();
            
            // Handle infobox click
            if (target === '_blank') {
                window.open(href, '_blank', 'noopener,noreferrer');
            } else {
                window.location.href = href;
            }
        });
        
        // Add keyboard accessibility
        infobox.setAttribute('tabindex', '0');
        infobox.setAttribute('role', 'button');
        infobox.setAttribute('aria-label', 'Clickable infobox');
        
        infobox.addEventListener('keydown', function(event) {
            // Handle Enter and Space key presses
            if (event.key === 'Enter' || event.key === ' ') {
                // Check if focus is on a link inside the infobox
                const focusedElement = document.activeElement;
                const isLinkOrInLink = focusedElement.closest('a');
                
                if (isLinkOrInLink) {
                    return; // Let the link handle its own keyboard event
                }
                
                event.preventDefault();
                
                // Trigger infobox click
                if (target === '_blank') {
                    window.open(href, '_blank', 'noopener,noreferrer');
                } else {
                    window.location.href = href;
                }
            }
        });
    });
});
