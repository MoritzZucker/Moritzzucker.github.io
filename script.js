(function () {
    'use strict';

    const doc = document.documentElement;
    doc.classList.add('js');

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    /* ---------- Jahr im Footer ---------- */
    const year = document.getElementById('year');
    if (year) {
        year.textContent = new Date().getFullYear();
    }

    /* ---------- Navigation: Scroll-Zustand, Fortschritt, mobiles Menü ---------- */
    const nav = document.querySelector('.nav');
    const toggle = document.querySelector('.nav__toggle');
    const navLinks = document.querySelectorAll('.nav__links a');

    function onScroll() {
        const scrollTop = window.scrollY;
        const max = doc.scrollHeight - window.innerHeight;
        doc.style.setProperty('--progress', max > 0 ? (scrollTop / max).toFixed(4) : 0);
        if (nav) {
            nav.classList.toggle('is-scrolled', scrollTop > 20);
        }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    function closeMenu() {
        if (!nav || !toggle) return;
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Menü öffnen');
    }

    if (toggle && nav) {
        toggle.addEventListener('click', function () {
            const open = nav.classList.toggle('is-open');
            toggle.setAttribute('aria-expanded', String(open));
            toggle.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
        });
        navLinks.forEach(function (link) {
            link.addEventListener('click', closeMenu);
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeMenu();
        });
        document.addEventListener('click', function (e) {
            if (!nav.contains(e.target)) closeMenu();
        });
    }

    /* Aktiven Abschnitt in der Navigation hervorheben */
    const sections = Array.prototype.map.call(navLinks, function (link) {
        const id = link.getAttribute('href');
        return id && id.charAt(0) === '#' ? document.querySelector(id) : null;
    });

    if ('IntersectionObserver' in window && sections.some(Boolean)) {
        const sectionObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                navLinks.forEach(function (link, i) {
                    link.classList.toggle('is-active', sections[i] === entry.target);
                });
            });
        }, { rootMargin: '-45% 0px -50% 0px' });
        sections.forEach(function (s) { if (s) sectionObserver.observe(s); });
    }

    /* ---------- Scroll-Reveal ---------- */
    const reveals = document.querySelectorAll('.reveal');

    // Geschwister in einem Raster leicht versetzt einblenden
    reveals.forEach(function (el) {
        const siblings = Array.prototype.filter.call(el.parentElement.children, function (c) {
            return c.classList.contains('reveal');
        });
        const index = siblings.indexOf(el);
        if (index > 0) {
            el.style.setProperty('--delay', Math.min(index * 0.08, 0.5) + 's');
        }
    });

    if ('IntersectionObserver' in window && !reduceMotion) {
        const revealObserver = new IntersectionObserver(function (entries, obs) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        reveals.forEach(function (el) { revealObserver.observe(el); });
    } else {
        reveals.forEach(function (el) { el.classList.add('is-visible'); });
    }

    /* ---------- Typewriter ---------- */
    const typewriterText = document.querySelector('.typewriter-text');
    const roles = [
        'IT-Consultant',
        'Software-Developer',
        'Web-Developer',
        'App-Developer'
    ];

    if (typewriterText && !reduceMotion) {
        let roleIndex = 0;
        let charIndex = roles[0].length;
        let deleting = true;

        function tick() {
            const current = roles[roleIndex];
            if (deleting) {
                charIndex--;
                typewriterText.textContent = current.slice(0, charIndex);
                if (charIndex === 0) {
                    deleting = false;
                    roleIndex = (roleIndex + 1) % roles.length;
                    return setTimeout(tick, 350);
                }
                return setTimeout(tick, 45);
            }
            const next = roles[roleIndex];
            charIndex++;
            typewriterText.textContent = next.slice(0, charIndex);
            if (charIndex === next.length) {
                deleting = true;
                return setTimeout(tick, 2200);
            }
            return setTimeout(tick, 90);
        }
        setTimeout(tick, 2400);
    }

    /* ---------- Marquee: Inhalt verdoppeln für Endlosschleife ---------- */
    const track = document.querySelector('.marquee__track');
    if (track && !reduceMotion) {
        track.innerHTML += track.innerHTML;
    }

    /* ---------- Zähler ---------- */
    const counters = document.querySelectorAll('.counter');
    if ('IntersectionObserver' in window && !reduceMotion && counters.length) {
        const counterObserver = new IntersectionObserver(function (entries, obs) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                obs.unobserve(entry.target);
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'), 10) || 0;
                const duration = 1400;
                const start = performance.now();
                (function step(now) {
                    const t = Math.min((now - start) / duration, 1);
                    const eased = 1 - Math.pow(1 - t, 3);
                    el.textContent = Math.round(eased * target);
                    if (t < 1) requestAnimationFrame(step);
                })(start);
            });
        }, { threshold: 0.6 });
        counters.forEach(function (c) { c.textContent = '0'; counterObserver.observe(c); });
    }

    /* ---------- Pointer-Effekte (nur mit Maus) ---------- */
    if (finePointer && !reduceMotion) {
        // Cursor-Glow
        const glow = document.querySelector('.cursor-glow');
        if (glow) {
            let gx = -999, gy = -999, cx = gx, cy = gy, running = false;
            function animateGlow() {
                cx += (gx - cx) * 0.15;
                cy += (gy - cy) * 0.15;
                glow.style.setProperty('--cx', cx.toFixed(1) + 'px');
                glow.style.setProperty('--cy', cy.toFixed(1) + 'px');
                if (Math.abs(gx - cx) > 0.5 || Math.abs(gy - cy) > 0.5) {
                    requestAnimationFrame(animateGlow);
                } else {
                    running = false;
                }
            }
            window.addEventListener('pointermove', function (e) {
                gx = e.clientX;
                gy = e.clientY;
                if (cx === -999) { cx = gx; cy = gy; }
                if (!running) { running = true; requestAnimationFrame(animateGlow); }
            }, { passive: true });
        }

        // Spotlight auf Karten
        document.querySelectorAll('.spotlight').forEach(function (card) {
            card.addEventListener('pointermove', function (e) {
                const r = card.getBoundingClientRect();
                card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
                card.style.setProperty('--my', (e.clientY - r.top) + 'px');
            });
        });

        // 3D-Tilt für Projekte
        document.querySelectorAll('.tilt').forEach(function (card) {
            card.addEventListener('pointerenter', function () {
                card.classList.add('is-tilting');
            });
            card.addEventListener('pointermove', function (e) {
                const r = card.getBoundingClientRect();
                const px = (e.clientX - r.left) / r.width;
                const py = (e.clientY - r.top) / r.height;
                card.style.setProperty('--ry', ((px - 0.5) * 10).toFixed(2) + 'deg');
                card.style.setProperty('--rx', ((0.5 - py) * 8).toFixed(2) + 'deg');
                card.style.setProperty('--gx', (px * 100).toFixed(1) + '%');
                card.style.setProperty('--gy', (py * 100).toFixed(1) + '%');
            });
            card.addEventListener('pointerleave', function () {
                card.classList.remove('is-tilting');
                card.style.setProperty('--rx', '0deg');
                card.style.setProperty('--ry', '0deg');
            });
        });

        // Magnetische Buttons
        document.querySelectorAll('.magnetic').forEach(function (btn) {
            btn.addEventListener('pointermove', function (e) {
                const r = btn.getBoundingClientRect();
                const x = (e.clientX - r.left - r.width / 2) * 0.25;
                const y = (e.clientY - r.top - r.height / 2) * 0.35;
                btn.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px)';
            });
            btn.addEventListener('pointerleave', function () {
                btn.style.transform = '';
            });
        });
    }

    /* ---------- Kontaktformular (AJAX mit Fallback) ---------- */
    const form = document.getElementById('contact-form');
    if (form && window.fetch && window.FormData) {
        const status = form.querySelector('.form__status');
        const submit = form.querySelector('button[type="submit"]');

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            status.textContent = 'Wird gesendet …';
            status.className = 'form__status';
            submit.disabled = true;

            fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { Accept: 'application/json' }
            }).then(function (res) {
                if (!res.ok) throw new Error('HTTP ' + res.status);
                form.reset();
                status.textContent = 'Danke! Ihre Nachricht ist angekommen – ich melde mich bald.';
                status.classList.add('is-success');
            }).catch(function () {
                status.textContent = 'Das hat leider nicht geklappt. Bitte versuchen Sie es später erneut oder kontaktieren Sie mich über LinkedIn.';
                status.classList.add('is-error');
            }).then(function () {
                submit.disabled = false;
            });
        });
    }
})();
