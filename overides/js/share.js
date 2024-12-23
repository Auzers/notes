// docs/javascripts/share.js
class ShareTracker {
    constructor() {
        this.storageKey = 'share_statistics';
        this.data = this.loadData();
        this.setupShareButtons();
    }

    loadData() {
        return JSON.parse(localStorage.getItem(this.storageKey) || '{}');
    }

    saveData() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    }

    setupShareButtons() {
        const shareButtons = document.querySelectorAll('.share-button');

        shareButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const platform = button.dataset.platform;
                this.shareContent(platform);
                this.recordShare(platform);
            });
        });
    }

    shareContent(platform) {
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(document.title);
        const description = encodeURIComponent(
            document.querySelector('meta[name="description"]')?.content || ''
        );

        let shareUrl;
        switch (platform) {
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
                break;
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                break;
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                break;
            case 'weibo':
                shareUrl = `http://service.weibo.com/share/share.php?url=${url}&title=${title}`;
                break;
        }

        if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=400');
        }
    }

    recordShare(platform) {
        const path = window.location.pathname;
        if (!this.data[path]) {
            this.data[path] = {};
        }
        if (!this.data[path][platform]) {
            this.data[path][platform] = 0;
        }
        this.data[path][platform]++;
        this.saveData();
        this.updateShareCount(platform);
    }

    updateShareCount(platform) {
        const countElement = document.querySelector(`.share-count[data-platform="${platform}"]`);
        if (countElement) {
            const path = window.location.pathname;
            countElement.textContent = this.data[path][platform] || 0;
        }
    }

    getShareStats() {
        return Object.entries(this.data).map(([path, platforms]) => ({
            path,
            total: Object.values(platforms).reduce((a, b) => a + b, 0),
            platforms
        }));
    }

    displayShareStats() {
        const stats = this.getShareStats();
        console.table(stats);
        return stats;
    }
}