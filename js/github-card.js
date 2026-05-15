/**
 * <github-card username="eden-elise">
 *
 * A custom element that fetches a GitHub user's public profile
 * and their most recently-updated repos, then renders them.
 *
 * Attributes:
 *   username  — GitHub username to look up (required)
 *   max-repos — how many repos to show, default 3
 *
 * Events fired (bubbling, composed):
 *   github-card:loaded — data fetched successfully
 *   github-card:error  — fetch failed
 */
class GitHubCard extends HTMLElement {
    static get observedAttributes() {
        return ['username', 'max-repos'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    // ── Lifecycle hooks ──────────────────────────────────────────

    connectedCallback() {
        this._fetch();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue && this.shadowRoot.innerHTML) {
            this._fetch();
        }
    }

    // ── Convenience getters ──────────────────────────────────────

    get username() {
        return this.getAttribute('username') || '';
    }

    get maxRepos() {
        return parseInt(this.getAttribute('max-repos') || '3', 10);
    }

    // ── Data fetching ────────────────────────────────────────────

    async _fetch() {
        if (!this.username) {
            this._renderError('No username provided.');
            return;
        }

        this._renderLoading();

        try {
            const [userRes, reposRes] = await Promise.all([
                fetch(`https://api.github.com/users/${this.username}`),
                fetch(`https://api.github.com/users/${this.username}/repos?sort=updated&per_page=100`)
            ]);

            // The GitHub API returns 404 for unknown users, 403 when
            // rate-limited, etc. Treat any non-OK status as an error.
            if (!userRes.ok) throw new Error(`GitHub API: ${userRes.status}`);
            if (!reposRes.ok) throw new Error(`GitHub API: ${reposRes.status}`);

            const user  = await userRes.json();
            const repos = await reposRes.json();

            const ownRepos = repos
                .filter(r => !r.fork)
                .slice(0, this.maxRepos);

            this._renderCard(user, ownRepos);

            this.dispatchEvent(new CustomEvent('github-card:loaded', {
                bubbles: true, composed: true,
                detail: { username: this.username }
            }));

        } catch (err) {
            console.error('[github-card]', err);
            this._renderError('Could not load GitHub data. Try again later.');

            this.dispatchEvent(new CustomEvent('github-card:error', {
                bubbles: true, composed: true,
                detail: { error: err.message }
            }));
        }
    }

    // ── Render helpers ───────────────────────────────────────────

    _renderLoading() {
        this.shadowRoot.innerHTML = `
            ${this._styles()}
            <p class="status" role="status" aria-live="polite">
                Loading GitHub profile…
            </p>`;
    }

    _renderError(message) {
        this.shadowRoot.innerHTML = `
            ${this._styles()}
            <p class="status status--error" role="alert">
                ${message}
            </p>`;
    }

    _renderCard(user, repos) {
        // Structure is yours — innerHTML is fine here
        this.shadowRoot.innerHTML = `
        ${this._styles()}
        <div class="card">
            <div class="profile">
                <img class="avatar" width="64" height="64" />
                <div class="profile__info">
                    <a class="profile__name" target="_blank" rel="noopener noreferrer"></a>
                    <p class="profile__bio"></p>
                    <p class="profile__stats">
                        <span class="stat-repos"></span>
                        <span class="stat-followers"></span>
                    </p>
                </div>
            </div>
            <ul class="repo-list" aria-label="Recent repositories"></ul>
            <a class="view-all" target="_blank" rel="noopener noreferrer">View all on GitHub →</a>
        </div>`;

        // Data from the API — textContent only, never innerHTML
        const root = this.shadowRoot;

        const avatar = root.querySelector('.avatar');
        avatar.src = user.avatar_url;
        avatar.alt = `${user.login}'s GitHub avatar`;

        const nameLink = root.querySelector('.profile__name');
        nameLink.href = user.html_url;
        nameLink.textContent = user.name || user.login;

        const bio = root.querySelector('.profile__bio');
        if (user.bio) {
            bio.textContent = user.bio;
        } else {
            bio.remove();
        }

        root.querySelector('.stat-repos').textContent = `${user.public_repos} repos`;
        root.querySelector('.stat-followers').textContent = `${user.followers} followers`;

        root.querySelector('.view-all').href = user.html_url;

        // Build repo items the same way
        const list = root.querySelector('.repo-list');
        if (repos.length === 0) {
            const li = document.createElement('li');
            li.className = 'repo repo--empty';
            li.textContent = 'No public repos yet.';
            list.append(li);
            return;
        }

        for (const r of repos) {
            const li = document.createElement('li');
            li.className = 'repo';

            const link = document.createElement('a');
            link.href = r.html_url;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.textContent = r.name;           // API data → textContent
            li.append(link);

            if (r.description) {
                const desc = document.createElement('p');
                desc.className = 'repo__desc';
                desc.textContent = r.description; // API data → textContent
                li.append(desc);
            }

            const meta = document.createElement('p');
            meta.className = 'repo__meta';
            if (r.language) {
                const lang = document.createElement('span');
                lang.textContent = r.language;    // API data → textContent
                meta.append(lang);
            }
            const stars = document.createElement('span');
            stars.textContent = `⭐ ${r.stargazers_count}`;
            meta.append(stars);
            li.append(meta);

            list.append(li);
        }
    }

    // ── Styles ───────────────────────────────────────────────────
    // CSS custom properties inherit through the shadow boundary,
    // so all your --color-* and --spacing-* tokens still work here.

    _styles() {
        return `<style>
            :host {
                display: block;
            }

            .status {
                font-size: var(--font-size-sm);
                color: var(--color-text-secondary);
                padding: var(--spacing-md);
            }

            .status--error {
                color: #b00020;
            }

            .card {
                display: flex;
                flex-direction: column;
                gap: var(--spacing-md);
            }

            /* ── Profile row ── */
            .profile {
                display: flex;
                gap: var(--spacing-md);
                align-items: flex-start;
            }

            .avatar {
                border-radius: 50%;
                flex-shrink: 0;
                border: 2px solid var(--color-border);
            }

            .profile__info {
                display: flex;
                flex-direction: column;
                gap: var(--spacing-xs);
                min-width: 0;
            }

            .profile__name {
                font-weight: var(--font-weight-bold);
                color: var(--color-link);
                font-size: var(--font-size-lg);
                text-decoration: none;
            }

            .profile__name:hover {
                text-decoration: underline;
                color: var(--color-link-hover);
            }

            .profile__bio {
                font-size: var(--font-size-sm);
                color: var(--color-text-secondary);
                margin: 0;
                line-height: var(--line-height-base);
            }

            .profile__stats {
                display: flex;
                gap: var(--spacing-md);
                font-size: var(--font-size-sm);
                color: var(--color-text-secondary);
                margin: 0;
            }

            /* ── Repo list ── */
            .repo-list {
                list-style: none;
                padding: 0;
                margin: 0;
                display: flex;
                flex-direction: column;
                gap: var(--spacing-sm);
            }

            .repo {
                display: flex;
                flex-direction: column;
                gap: 0.15rem;
                padding: var(--spacing-sm);
                border-radius: var(--border-radius-sm);
                background-color: var(--color-bg-primary);
                border: 1px solid var(--color-border);
            }

            .repo a {
                font-weight: var(--font-weight-bold);
                font-size: var(--font-size-sm);
                color: var(--color-link);
                text-decoration: none;
            }

            .repo a:hover {
                text-decoration: underline;
                color: var(--color-link-hover);
            }

            .repo__desc {
                font-size: var(--font-size-xs);
                color: var(--color-text-secondary);
                margin: 0;
                line-height: var(--line-height-base);
            }

            .repo__meta {
                display: flex;
                gap: var(--spacing-sm);
                font-size: var(--font-size-xs);
                color: var(--color-text-secondary);
                margin: 0;
            }

            .repo--empty {
                font-size: var(--font-size-sm);
                color: var(--color-text-secondary);
            }

            /* ── Footer link ── */
            .view-all {
                font-size: var(--font-size-sm);
                font-weight: var(--font-weight-bold);
                color: var(--color-link);
                text-decoration: none;
                align-self: flex-start;
            }

            .view-all:hover {
                text-decoration: underline;
                color: var(--color-link-hover);
            }
        </style>`;
    }
}

customElements.define('github-card', GitHubCard);