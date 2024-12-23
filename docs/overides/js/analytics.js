// docs/javascripts/analytics.js
class Analytics {
    constructor() {
        this.storageKey = 'site_analytics';
        this.data = this.loadData();
    }

    loadData() {
        const stored = localStorage.getItem(this.storageKey);
        return stored ? JSON.parse(stored) : {
            pageViews: {},
            totalVisits: 0,
            firstVisit: Date.now(),
            lastVisit: Date.now()
        };
    }

    saveData() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    }

    recordPageView() {
        const path = window.location.pathname;
        this.data.pageViews[path] = (this.data.pageViews[path] || 0) + 1;
        this.data.totalVisits++;
        this.data.lastVisit = Date.now();
        this.saveData();
    }

    getStats() {
        return {
            totalVisits: this.data.totalVisits,
            uniquePages: Object.keys(this.data.pageViews).length,
            mostViewed: this.getMostViewedPages(5)
        };
    }

    getMostViewedPages(limit = 5) {
        return Object.entries(this.data.pageViews)
            .sort(([, a], [, b]) => b - a)
            .slice(0, limit);
    }
}