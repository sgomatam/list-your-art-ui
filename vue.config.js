const { json } = require('express');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    // options...
    devServer: {
        disableHostCheck: true
    },
    configureWebpack: {
        plugins: [new BundleAnalyzerPlugin({
            openAnalyzer: false,
            analyzerMode: 'static',
            reportFilename: './reports/report.html',
            generateStatsFile: true,
            statsFilename: './reports/stats.json'
        })]
    }
}