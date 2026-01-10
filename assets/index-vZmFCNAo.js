(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const r of t.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function c(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=c(e);fetch(e.href,t)}})();(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))c(o);new MutationObserver(o=>{for(const e of o)if(e.type==="childList")for(const t of e.addedNodes)t.tagName==="LINK"&&t.rel==="modulepreload"&&c(t)}).observe(document,{childList:!0,subtree:!0});function i(o){const e={};return o.integrity&&(e.integrity=o.integrity),o.referrerPolicy&&(e.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?e.credentials="include":o.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function c(o){if(o.ep)return;o.ep=!0;const e=i(o);fetch(o.href,e)}})();document.addEventListener("DOMContentLoaded",function(){const n=document.querySelectorAll(".nav-menu a");n.forEach(t=>{t.addEventListener("click",function(r){r.preventDefault();const s=this.getAttribute("href"),l=document.querySelector(s);l&&l.scrollIntoView({behavior:"smooth",block:"start"})})});const i={threshold:.1,rootMargin:"0px 0px -50px 0px"},c=new IntersectionObserver(function(t){t.forEach(r=>{r.isIntersecting&&(r.target.style.opacity="1",r.target.style.transform="translateY(0)")})},i);document.querySelectorAll(".timeline-item, .experience-card, .skill-card, .contact-item, .vision-item").forEach(t=>{t.style.opacity="0",t.style.transform="translateY(20px)",t.style.transition="opacity 0.6s ease, transform 0.6s ease",c.observe(t)}),window.addEventListener("scroll",function(){let t="";document.querySelectorAll(".section").forEach(r=>{const s=r.offsetTop;r.clientHeight,pageYOffset>=s-200&&(t=r.getAttribute("id"))}),n.forEach(r=>{r.classList.remove("active"),r.getAttribute("href")==="#"+t&&r.classList.add("active")})});const o=document.querySelector(".nav-brand");o&&o.addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"})});const e=document.createElement("style");e.textContent=`
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
    `,document.head.appendChild(e),console.log("Personal homepage loaded successfully! 🚀")});
