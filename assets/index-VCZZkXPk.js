(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const t of o.addedNodes)t.tagName==="LINK"&&t.rel==="modulepreload"&&l(t)}).observe(document,{childList:!0,subtree:!0});function a(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function l(e){if(e.ep)return;e.ep=!0;const o=a(e);fetch(e.href,o)}})();document.addEventListener("DOMContentLoaded",function(){const i=document.querySelectorAll(".nav-menu a");i.forEach(t=>{t.addEventListener("click",function(n){n.preventDefault();const r=this.getAttribute("href"),c=document.querySelector(r);c&&c.scrollIntoView({behavior:"smooth",block:"start"})})});const s={threshold:.1,rootMargin:"0px 0px -50px 0px"},a=new IntersectionObserver(function(t){t.forEach(n=>{n.isIntersecting&&(n.target.style.opacity="1",n.target.style.transform="translateY(0)")})},s);document.querySelectorAll(".timeline-item, .experience-card, .skill-card, .contact-item, .vision-item").forEach(t=>{t.style.opacity="0",t.style.transform="translateY(20px)",t.style.transition="opacity 0.6s ease, transform 0.6s ease",a.observe(t)}),window.addEventListener("scroll",function(){let t="";document.querySelectorAll(".section").forEach(r=>{const c=r.offsetTop;r.clientHeight,pageYOffset>=c-200&&(t=r.getAttribute("id"))}),i.forEach(r=>{r.classList.remove("active"),r.getAttribute("href")==="#"+t&&r.classList.add("active")})});const e=document.querySelector(".nav-brand");e&&e.addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"})});const o=document.createElement("style");o.textContent=`
        .nav-menu a.active {
            color: var(--secondary-color);
            position: relative;
        }
        .nav-menu a.active::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 0;
            right: 0;
            height: 2px;
            background: var(--secondary-color);
            border-radius: 2px;
        }
    `,document.head.appendChild(o),console.log("Personal homepage loaded successfully! 🚀")});
