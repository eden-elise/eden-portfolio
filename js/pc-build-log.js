import { entries } from './pc-build-entries.js';

const log = document.getElementById('pc-build-log');

if (!log) throw new Error('[pc-build-log] #pc-build-log element not found');

if (entries.length === 0) {
    const empty = document.createElement('p');
    empty.textContent = 'No entries yet — stay tuned.';
    log.append(empty);
} else {
    const sorted = [...entries].sort((a, b) => new Date(b.date) - new Date(a.date));

    for (const entry of sorted) {
        const article = document.createElement('article');
        article.className = 'build-entry';
        article.id = entry.id;

        const formattedDate = new Date(entry.date + 'T00:00:00').toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        const header = document.createElement('header');
        header.className = 'build-entry__header';
        header.innerHTML = `
            <span class="build-entry__label">${entry.label}</span>
            <h3 class="build-entry__title">${entry.title}</h3>
            <time class="build-entry__date" datetime="${entry.date}">${formattedDate}</time>
        `;

        const body = document.createElement('div');
        body.className = 'build-entry__body';
        body.innerHTML = entry.body;

        article.append(header, body);
        log.append(article);
    }
}
