// docs/javascripts/statistics-visualization.js
class StatisticsVisualizer {
    constructor(analytics, readTracker, shareTracker) {
        this.analytics = analytics;
        this.readTracker = readTracker;
        this.shareTracker = shareTracker;
    }

    createDashboard() {
        const dashboard = document.createElement('div');
        dashboard.className = 'statistics-dashboard';
        dashboard.innerHTML = `
            <div class="dashboard-section">
                <h3>访问统计</h3>
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-value">${this.analytics.data.totalVisits}</div>
                        <div class="stat-label">总访问量</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${this.readTracker.getReadTime()}</div>
                        <div class="stat-label">总阅读时长(分钟)</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${this.getTotalShares()}</div>
                        <div class="stat-label">总分享次数</div>
                    </div>
                </div>
                <div id="visitsChart"></div>
            </div>
        `;

        document.body.appendChild(dashboard);
        this.renderCharts();
    }

    renderCharts() {
        // 使用 Chart.js 绘制图表
        const ctx = document.getElementById('visitsChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.getTimeLabels(),
                datasets: [{
                    label: '访问趋势',
                    data: this.getVisitData(),
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    getTotalShares() {
        const stats = this.shareTracker.getShareStats();
        return stats.reduce((total, page) => total + page.total, 0);
    }

    getTimeLabels() {
        // 获取最近7天的日期标签
        return Array.from({ length: 7 }, (_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - i);
            return d.toLocaleDateString();
        }).reverse();
    }

    getVisitData() {
        // 处理访问数据
        return this.analytics.getVisitsByDate(7);
    }
}

// 样式
const styles = `
    .statistics-dashboard {
        padding: 2rem;
        background: var(--md-default-bg-color);
        border-radius: 8px;
        box-shadow: var(--md-shadow-z2);
    }

    .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
        margin: 1rem 0;
    }

    .stat-card {
        padding: 1rem;
        background: var(--md-code-bg-color);
        border-radius: 4px;
        text-align: center;
    }

    .stat-value {
        font-size: 2rem;
        font-weight: bold;
        color: var(--md-primary-fg-color);
    }

    .stat-label {
        font-size: 0.9rem;
        color: var(--md-default-fg-color--light);
        margin-top: 0.5rem;
    }
`;

// 将样式添加到文档
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

// 初始化统计可视化
const visualizer = new StatisticsVisualizer(analytics, readTracker, shareTracker);
visualizer.createDashboard();