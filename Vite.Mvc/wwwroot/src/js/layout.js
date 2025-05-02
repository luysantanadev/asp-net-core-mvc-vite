
// Import our custom CSS
import '../scss/layout.scss'

import { OverlayScrollbars } from 'overlayscrollbars';
import "@popperjs/core";
import "bootstrap";
import "admin-lte";

const SELECTOR_SIDEBAR_WRAPPER = '.sidebar-wrapper';
const Default = {
    scrollbarTheme: 'os-theme-light',
    scrollbarAutoHide: 'leave',
    scrollbarClickScroll: true,
};
document.addEventListener('DOMContentLoaded', function () {
    const sidebarWrapper = document.querySelector(SELECTOR_SIDEBAR_WRAPPER);
    if (sidebarWrapper && typeof OverlayScrollbars !== 'undefined') {
        OverlayScrollbars(sidebarWrapper, {
            scrollbars: {
                theme: Default.scrollbarTheme,
                autoHide: Default.scrollbarAutoHide,
                clickScroll: Default.scrollbarClickScroll,
            },
        });
    }
});

import { Treeview } from 'admin-lte'

document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname.toLowerCase()

    document.querySelectorAll('.app-sidebar .nav-link').forEach(link => {
        const href = link.getAttribute('href')
        if (!href || href === '#') return

        const linkPath = new URL(href, window.location.origin).pathname.toLowerCase()
        const isLinkHome = linkPath === '/' || linkPath === '/home' || linkPath === '/home/index'
        const isCurrentHome = currentPath === '/' || currentPath === '/home' || currentPath === '/home/index'

        const shouldActivate =
            (isLinkHome && isCurrentHome) ||
            (!isLinkHome && currentPath.startsWith(linkPath))

        if (shouldActivate) {
            document.querySelectorAll('.app-sidebar .nav-link.active').forEach(a => a.classList.remove('active'))
            link.classList.add('active')

            // Sobe até encontrar o nav-item com submenu (menu pai)
            let expandableItem = link.closest('.nav-treeview')?.closest('.nav-item')
            if (expandableItem) {
                new Treeview(expandableItem).open()
            }
        }
    })
})
