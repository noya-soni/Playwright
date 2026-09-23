const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './',

  use: {
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure'
  },

  retries: 2,

  reporter: 'html'
});