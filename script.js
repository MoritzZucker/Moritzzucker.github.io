(function () {
    'use strict';

    /* Jahr im Footer */
    var year = document.getElementById('year');
    if (year) {
        year.textContent = new Date().getFullYear();
    }

    /* Kontaktformular: per fetch senden, ohne Seitenwechsel (ohne JS greift das normale Formular) */
    var form = document.getElementById('contact-form');
    if (!form || !window.fetch || !window.FormData) return;

    var status = form.querySelector('.form__status');
    var submit = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        status.textContent = 'Wird gesendet …';
        submit.disabled = true;

        fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: { Accept: 'application/json' }
        }).then(function (res) {
            if (!res.ok) throw new Error('HTTP ' + res.status);
            form.reset();
            status.textContent = 'Danke, Ihre Nachricht ist angekommen. Ich melde mich bald.';
        }).catch(function () {
            status.textContent = 'Das hat leider nicht geklappt. Bitte versuchen Sie es später erneut oder schreiben Sie mir über LinkedIn.';
        }).then(function () {
            submit.disabled = false;
        });
    });
})();
