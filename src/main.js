// Vercel Analytics
import { inject } from '@vercel/analytics';
import { translations, initLanguageSwitcher, getCurrentLanguage } from './i18n.js';
import { initSiteLegalDisclaimer } from './siteSectionDisclaimer.js';
import { initNavChipHighlight } from './navHighlight.js';
import { initContactModal, updateVCardForLanguage } from './contactModal.js';
import { initHthpDiagramLightbox } from './hthpDiagramLightbox.js';
import { displayPortalBriefing, loadLatestBriefing } from './portalBriefing.js';
import { initWhatsNew, refreshWhatsNewLanguage } from './whatsNew.js';

// Initialize Vercel Analytics
inject();

// GitHub version checking removed to eliminate 404 errors (kept disabled)

function isAppCardInView(card) {
    const invitedGrid = card.closest('#apps-invited-grid');
    if (invitedGrid && invitedGrid.hasAttribute('hidden')) {
        return false;
    }
    return true;
}

function applyAppsFilter(filter) {
    const appsFilterEmptyEl = document.getElementById('apps-filter-empty');
    const cards = document.querySelectorAll('#apps .app-card');
    let visibleDisplayed = 0;
    cards.forEach(card => {
        const cat = card.getAttribute('data-category') || 'general';
        const match = filter === 'all' || cat === filter;
        card.classList.toggle('app-card--hidden', !match);
        if (match && isAppCardInView(card)) {
            visibleDisplayed++;
        }
    });
    if (appsFilterEmptyEl) {
        const lang = document.documentElement.lang && document.documentElement.lang.startsWith('zh') ? 'zh' : 'en';
        const msg = translations[lang] && translations[lang]['apps.filter.empty'];
        if (msg) {
            appsFilterEmptyEl.textContent = msg;
        }
        appsFilterEmptyEl.hidden = visibleDisplayed > 0;
    }
}

function refreshAppsFilterFromUI() {
    const tab = document.querySelector('.filter-tab.active');
    const f = tab ? (tab.getAttribute('data-filter') || 'all') : 'all';
    applyAppsFilter(f);
}

// Weekly briefings: edit content/briefings/*.json then run npm run build (or dev).

let latestBriefingCache = null;

async function initializeBriefings() {
    if (!latestBriefingCache) {
        latestBriefingCache = await loadLatestBriefing();
    }
    if (latestBriefingCache) {
        displayPortalBriefing(latestBriefingCache);
    }
}

// Smooth scroll behavior and interactive features
document.addEventListener('DOMContentLoaded', function() {
    
    // Display version number immediately
    const versionElement = document.getElementById('app-version');
    if (versionElement) {
        // @ts-ignore - __APP_VERSION__ is defined by Vite in vite.config.js
        const appVersion = __APP_VERSION__ || '1.0.0';
        versionElement.textContent = `V${appVersion}`;
    }
    
    // Set initial language + bind language switcher
    initLanguageSwitcher({
        afterSet: (lang) => {
            if (latestBriefingCache) displayPortalBriefing(latestBriefingCache);
            updateVCardForLanguage(lang);
            refreshWhatsNewLanguage(lang);
            refreshAppsFilterFromUI();
        }
    });

    initSiteLegalDisclaimer();

    // Version checking from GitHub is disabled to avoid 404 errors
    // Static versions are already defined in translations
    // Uncomment the line below if you want to enable GitHub version checking:
    // updateAppVersions().catch(() => {});
    
    // 保存和恢复滚动位置（用于应用打开/关闭后返回）
    const SCROLL_POSITION_KEY = 'homepage_scroll_position';
    
    // 恢复滚动位置的函数
    function restoreScrollPosition() {
        const savedScrollPosition = sessionStorage.getItem(SCROLL_POSITION_KEY);
        if (savedScrollPosition !== null) {
            // 使用 requestAnimationFrame 确保 DOM 完全加载后再滚动
            requestAnimationFrame(() => {
                const scrollTop = parseInt(savedScrollPosition, 10);
                if (!isNaN(scrollTop) && scrollTop >= 0) {
                    window.scrollTo({
                        top: scrollTop,
                        behavior: 'auto' // 使用 'auto' 而不是 'smooth'，避免用户看到滚动动画
                    });
                }
                // 清除已使用的滚动位置
                sessionStorage.removeItem(SCROLL_POSITION_KEY);
            });
        }
    }
    
    // 保存当前滚动位置的函数
    function saveScrollPosition() {
        const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop || window.scrollY || 0;
        if (currentScrollPosition > 0) {
            sessionStorage.setItem(SCROLL_POSITION_KEY, currentScrollPosition.toString());
        }
    }
    
    // 页面加载时恢复滚动位置
    restoreScrollPosition();
    
    // 检测是否在PWA模式（standalone模式）
    function isStandaloneMode() {
        // iOS Safari
        if (window.navigator.standalone === true) {
            return true;
        }
        // Android Chrome和其他浏览器
        if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
            return true;
        }
        // 备用检测：检查是否在非浏览器环境中
        if (window.matchMedia && window.matchMedia('(display-mode: fullscreen)').matches) {
            return true;
        }
        return false;
    }
    
    // 监听页面可见性变化（当用户从其他标签页返回时）
    document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'visible') {
            // 页面变为可见时，延迟恢复滚动位置，确保页面完全可见
            setTimeout(() => {
                restoreScrollPosition();
            }, 100);
        }
    });
    
    // 监听 pageshow 事件（处理从浏览器缓存恢复页面的情况，包括生产环境）
    window.addEventListener('pageshow', function(event) {
        // event.persisted 为 true 表示页面是从缓存中恢复的
        if (event.persisted) {
            // 从缓存恢复时，延迟恢复滚动位置
            setTimeout(() => {
                restoreScrollPosition();
            }, 50);
        } else {
            // 正常加载时也尝试恢复
            restoreScrollPosition();
        }
    });
    
    // 监听 pagehide 事件，确保在页面隐藏前保存滚动位置
    window.addEventListener('pagehide', function() {
        saveScrollPosition();
    });
    
    // 处理应用链接点击 - 现在应用卡片包含独立的Launch和Source链接
    const appLaunchBtns = document.querySelectorAll('.app-launch-btn');
    const appSourceLinks = document.querySelectorAll('.app-source-link');
    
    // 处理Launch按钮点击
    appLaunchBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (!href || !href.startsWith('http')) {
                return;
            }
            
            // 检查是否已经在打开
            const openingKey = 'opening_' + btoa(href).substring(0, 10);
            if (sessionStorage.getItem(openingKey) === 'true') {
                e.preventDefault();
                return;
            }
            
            // 设置标志
            sessionStorage.setItem(openingKey, 'true');
            
            // 1秒后清除标志
            setTimeout(() => {
                sessionStorage.removeItem(openingKey);
            }, 1000);
        });
    });
    
    // 处理Source链接点击（GitHub链接）
    appSourceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (!href || !href.startsWith('http')) {
                return;
            }
            
            // GitHub链接直接打开，不需要特殊处理
        });
    });
    
    // Language switcher buttons are handled by initLanguageSwitcher()
    
    // Helper function to calculate scroll offset
    function getScrollOffset() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            return navbar.offsetHeight + 20; // Add 20px extra spacing
        }
        return 100; // Fallback
    }

    // Helper function to scroll to section (centered in viewport)
    function scrollToSection(sectionId) {
        const targetSection = document.querySelector(sectionId);
        if (targetSection) {
            // Use scrollIntoView with block: 'center' to center the section in viewport
            // This is the most reliable method for centering elements
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'nearest'
            });
            return true;
        }
        return false;
    }

    initNavChipHighlight();

    const navAnchorLinks = document.querySelectorAll('.nav-link--anchor');

    navAnchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href') || '';
            const hashIndex = href.indexOf('#');
            if (hashIndex === -1) {
                return;
            }
            const targetId = href.slice(hashIndex);
            e.preventDefault();
            if (scrollToSection(targetId)) {
                navAnchorLinks.forEach((l) => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Handle hero secondary link click - 阅读工程洞察 -> 工程洞察 (#insights)
    const heroSecondaryLink = document.querySelector('.hero-secondary-link');
    if (heroSecondaryLink) {
        heroSecondaryLink.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToSection('#insights');
        });
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.app-card'
    );

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Active navigation highlighting on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.pageYOffset + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navAnchorLinks.forEach((link) => {
            link.classList.remove('active');
            const href = link.getAttribute('href') || '';
            if (href === '#' + current || href.endsWith('#' + current)) {
                link.classList.add('active');
            }
        });
    });

    // Card hover effects are now handled by CSS for better performance

    // Nav brand click to scroll to top
    const navBrand = document.querySelector('.nav-brand');
    if (navBrand) {
        navBrand.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            navAnchorLinks.forEach((link) => link.classList.remove('active'));
        });
    }

    // Hide partner logos that failed to load
    const partnerLogos = document.querySelectorAll('.partner-logo img');
    partnerLogos.forEach(img => {
        img.addEventListener('error', function() {
            this.parentElement.style.display = 'none';
        });
        
        // Also check if image loaded successfully after a short delay
        const checkImage = new Image();
        checkImage.onerror = () => {
            img.parentElement.style.display = 'none';
        };
        checkImage.onload = () => {
            // Image exists, keep it visible
        };
        checkImage.src = img.src;
    });

    initContactModal([
        document.getElementById('hero-cta-diagnostic'),
        document.getElementById('methodology-cta-btn'),
    ].filter(Boolean));

    initHthpDiagramLightbox();

    document.querySelectorAll('.app-launch-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            if (typeof gtag === 'function') {
                gtag('event', 'tool_launch', {
                    tool_url: btn.getAttribute('href') || '',
                    page_path: window.location.pathname,
                });
            }
        });
    });

    // About section toggle — light gate only (not a security boundary); full resume behind client-side password
    const RESUME_PASSWORD = '123456!';
    const RESUME_UNLOCK_KEY = 'resumeUnlocked';

    const aboutToggleBtn = document.getElementById('about-toggle-btn');
    const aboutDetails = document.getElementById('about-details');
    const toggleTextExpand = aboutToggleBtn?.querySelector('.toggle-text-expand');
    const toggleTextCollapse = aboutToggleBtn?.querySelector('.toggle-text-collapse');
    const resumePasswordOverlay = document.getElementById('resume-password-overlay');
    const resumePasswordInput = document.getElementById('resume-password-input');
    const resumePasswordError = document.getElementById('resume-password-error');
    const resumePasswordConfirm = document.getElementById('resume-password-confirm');
    const resumePasswordCancel = document.getElementById('resume-password-cancel');

    function expandResumeSection() {
        if (!aboutDetails || !aboutToggleBtn) return;
        aboutDetails.classList.remove('u-hidden');
        aboutToggleBtn.classList.add('expanded');
        if (toggleTextExpand) toggleTextExpand.classList.add('u-hidden');
        if (toggleTextCollapse) toggleTextCollapse.classList.remove('u-hidden');
    }

    function collapseResumeSection() {
        if (!aboutDetails || !aboutToggleBtn) return;
        aboutDetails.classList.add('u-hidden');
        aboutToggleBtn.classList.remove('expanded');
        if (toggleTextExpand) toggleTextExpand.classList.remove('u-hidden');
        if (toggleTextCollapse) toggleTextCollapse.classList.add('u-hidden');
    }

    function openResumePasswordModal() {
        if (!resumePasswordOverlay || !resumePasswordInput) return;
        resumePasswordOverlay.setAttribute('aria-hidden', 'false');
        resumePasswordOverlay.classList.add('is-open');
        resumePasswordInput.value = '';
        if (resumePasswordError) resumePasswordError.classList.add('u-hidden');
        resumePasswordInput.focus();
    }

    function closeResumePasswordModal() {
        if (!resumePasswordOverlay) return;
        resumePasswordOverlay.setAttribute('aria-hidden', 'true');
        resumePasswordOverlay.classList.remove('is-open');
    }

    function checkResumePasswordAndExpand() {
        const value = resumePasswordInput?.value?.trim() || '';
        if (value !== RESUME_PASSWORD) {
            if (resumePasswordError) {
                resumePasswordError.classList.remove('u-hidden');
                resumePasswordInput.focus();
            }
            return;
        }
        try { sessionStorage.setItem(RESUME_UNLOCK_KEY, 'true'); } catch (_) {}
        closeResumePasswordModal();
        expandResumeSection();
    }

    if (aboutToggleBtn && aboutDetails) {
        aboutToggleBtn.addEventListener('click', function() {
            const isExpanded = aboutDetails && !aboutDetails.classList.contains('u-hidden');
            if (isExpanded) {
                collapseResumeSection();
            } else {
                const unlocked = typeof sessionStorage !== 'undefined' && sessionStorage.getItem(RESUME_UNLOCK_KEY) === 'true';
                if (unlocked) {
                    expandResumeSection();
                } else {
                    openResumePasswordModal();
                }
            }
        });
    }

    if (resumePasswordConfirm) {
        resumePasswordConfirm.addEventListener('click', checkResumePasswordAndExpand);
    }
    if (resumePasswordCancel) {
        resumePasswordCancel.addEventListener('click', closeResumePasswordModal);
    }
    if (resumePasswordInput) {
        resumePasswordInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') checkResumePasswordAndExpand();
        });
    }
    if (resumePasswordOverlay) {
        resumePasswordOverlay.addEventListener('click', function(e) {
            if (e.target === resumePasswordOverlay) closeResumePasswordModal();
        });
    }

    const filterTabs = document.querySelectorAll('.filter-tab');
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            const f = this.getAttribute('data-filter') || 'all';
            applyAppsFilter(f);
        });
    });
    refreshAppsFilterFromUI();

    // Invitation-only zone: password gate (password: 123456!), persist unlock in session
    const INVITED_STORAGE_KEY = 'appsInvitedUnlock';
    const INVITED_PASSWORD = '123456!';
    const gateEl = document.getElementById('apps-invited-gate');
    const gridEl = document.getElementById('apps-invited-grid');
    const passwordInput = document.getElementById('apps-invited-password');
    const unlockBtn = document.getElementById('apps-invited-unlock-btn');
    const errorEl = document.getElementById('apps-invited-error');

    function setInvitedUnlocked(unlocked) {
        if (unlocked) {
            try { sessionStorage.setItem(INVITED_STORAGE_KEY, '1'); } catch (e) {}
            if (gateEl) gateEl.style.display = 'none';
            if (gridEl) { gridEl.removeAttribute('hidden'); gridEl.style.display = ''; }
        } else {
            try { sessionStorage.removeItem(INVITED_STORAGE_KEY); } catch (e) {}
            if (gateEl) gateEl.style.display = '';
            if (gridEl) { gridEl.setAttribute('hidden', ''); gridEl.style.display = 'none'; }
        }
        refreshAppsFilterFromUI();
    }

    if (sessionStorage.getItem(INVITED_STORAGE_KEY) === '1') {
        setInvitedUnlocked(true);
    }

    if (unlockBtn && passwordInput && errorEl) {
        unlockBtn.addEventListener('click', function() {
            const value = (passwordInput.value || '').trim();
            if (value === INVITED_PASSWORD) {
                errorEl.textContent = '';
                setInvitedUnlocked(true);
            } else {
                const lang = document.documentElement.lang && document.documentElement.lang.startsWith('zh') ? 'zh' : 'en';
                const t = translations[lang];
                errorEl.textContent = (t && t['apps.invitation.wrongPassword']) || 'Incorrect password';
            }
        });
        passwordInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') unlockBtn.click();
        });
    }

    initWhatsNew();

    initializeBriefings();

    console.log('Personal homepage loaded successfully!');
});