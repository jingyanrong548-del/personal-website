import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
let html = readFileSync(join(ROOT, 'index.html'), 'utf-8');

const briefingsPortal = `    <!-- Briefings Section (portal) -->
    <section id="briefings" class="section briefings-section briefings-section--portal">
        <div class="container">
            <div class="briefings-header">
                <h2 class="section-title" data-i18n="briefings.title">Refrigeration &amp; Heat Pump Briefings</h2>
                <p class="section-description" data-i18n="briefings.description">Manually curated, updated weekly</p>
            </div>
            <article class="portal-briefing-card featured-insight-card" id="portal-briefing-card">
                <div class="featured-insight-header">
                    <h3 class="featured-insight-title" id="briefing-week-title"></h3>
                    <p class="briefing-subtitle u-hidden" id="briefing-subtitle"></p>
                </div>
                <div class="featured-insight-content">
                    <div class="featured-insight-preview" id="briefing-preview"></div>
                </div>
                <div class="featured-insight-footer portal-briefing-footer">
                    <a href="./briefings/2026-w21.html" class="portal-briefing-cta" id="portal-briefing-full-link" data-i18n="briefings.readMore">Read Full Report</a>
                    <span class="briefing-update-time" id="briefing-update-time"></span>
                </div>
            </article>
            <div class="portal-content-links">
                <a href="./articles.html" class="portal-explore-link" data-i18n="portal.exploreAll">Explore all articles</a>
                <span class="portal-content-links-sep">·</span>
                <a href="./briefings/annex68-iea-hpt.html" data-i18n="briefings.panel.annex68">Annex 68 &amp; IEA HPT</a>
                <span class="portal-content-links-sep">·</span>
                <a href="./briefings/conferences.html" data-i18n="briefings.panel.conferences">Conferences &amp; forums</a>
            </div>
        </div>
    </section>`;

const insightsPortal = `    <!-- Insights Section -->
    <section id="insights" class="insights-section">
        <div class="container">
            <div class="insights-header-row">
                <h2 class="section-title" data-i18n="insights.title">Engineering Insights</h2>
                <a href="./articles.html" class="portal-explore-link" data-i18n="portal.viewInsights">View all articles</a>
            </div>
            <div class="insights-grid">
                <article class="insight-card insight-card--portal">
                    <div class="insight-meta">
                        <span class="insight-tag insight-tag--field" data-i18n="insights.article1.tag">Critical Troubleshooting</span>
                        <span class="insight-date" data-i18n="insights.article1.date">Oct 2023</span>
                    </div>
                    <h3 class="insight-title"><a href="./insights/liquid-trap-45c.html" data-i18n="insights.article1.title">5 Site Visits to Solve a "Mystery" Seizure: The -45°C Liquid Trap</a></h3>
                    <p class="insight-excerpt insight-excerpt--short" data-i18n="insights.article1.teaser">Five site visits traced compressor seizures to system-side liquid slugging—not manufacturing defects.</p>
                    <a href="./insights/liquid-trap-45c.html" class="insight-read-more" data-i18n="insights.article1.readMore">Read Analysis <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
                </article>
                <article class="insight-card insight-card--portal">
                    <div class="insight-meta">
                        <span class="insight-tag insight-tag--deep" data-i18n="insights.article2.tag">Deep Failure Review</span>
                        <span class="insight-date" data-i18n="insights.article2.date">Jun 2024</span>
                    </div>
                    <h3 class="insight-title"><a href="./insights/screw-seizure-tolerance.html" data-i18n="insights.article2.title">Large Screw Compressor Seizure: Not "Oil Starvation", but "Deadly Stacking of Tolerance & Thermal Deformation"</a></h3>
                    <p class="insight-excerpt insight-excerpt--short" data-i18n="insights.article2.teaser">Oil level alone does not guarantee lubrication—tolerance stack-up and thermal deformation can collapse the sealing line.</p>
                    <a href="./insights/screw-seizure-tolerance.html" class="insight-read-more" data-i18n="insights.article2.readMore">Read Analysis <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
                </article>
                <article class="insight-card insight-card--portal">
                    <div class="insight-meta">
                        <span class="insight-tag insight-tag--outlook" data-i18n="insights.article3.tag">Industry Outlook</span>
                        <span class="insight-date" data-i18n="insights.article3.date">Sep 2025</span>
                    </div>
                    <h3 class="insight-title"><a href="./insights/extreme-testing-moat.html" data-i18n="insights.article3.title">Beyond the Hype: The Real Moat is Extreme Testing (-40°C to +300°C)</a></h3>
                    <p class="insight-excerpt insight-excerpt--short" data-i18n="insights.article3.teaser">Claims of 160°C capability matter less than CNAS-level proof under extreme load boundaries.</p>
                    <a href="./insights/extreme-testing-moat.html" class="insight-read-more" data-i18n="insights.article3.readMore">Read Analysis <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
                </article>
            </div>
            <article class="insight-card mentorship-card" id="mentorship">
                <h3 class="mentorship-title" data-i18n="mentorship.title">Open Mentorship for Young Engineers</h3>
                <p class="mentorship-body" data-i18n="mentorship.body">Technology has no barriers—experience must be passed on. I offer three decades of hands-on lessons spanning deep cold and high temperature, plus foundational thermodynamic logic, at no cost. Refrigeration, HVAC, and thermal-energy students, young engineers, and university research teams are welcome to reach out by email to explore the physical limits of system design together.</p>
                <a href="mailto:jingyanrong548@gmail.com" class="mentorship-email-btn" data-i18n="mentorship.cta">Send Email</a>
            </article>
        </div>
    </section>`;

const bStart = '    <!-- Briefings Section -->';
const bEnd = '    <!-- Insights Section -->';
const iEnd = '    <!-- About Section -->';

const b0 = html.indexOf(bStart);
const b1 = html.indexOf(bEnd);
const i0 = html.indexOf(bEnd);
const i1 = html.indexOf(iEnd);

if (b0 === -1 || b1 === -1 || i1 === -1) {
  console.error('markers not found', b0, b1, i0, i1);
  process.exit(1);
}

html = html.slice(0, b0) + briefingsPortal + '\n\n' + insightsPortal + '\n\n' + html.slice(i1);

if (!html.includes('</div>\n\n    <footer')) {
  html = html.replace('    <footer class="footer">', '    </div>\n\n    <footer class="footer">');
}

writeFileSync(join(ROOT, 'index.html'), html);
console.log('portalized index.html');
