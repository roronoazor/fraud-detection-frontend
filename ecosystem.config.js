module.exports = {
    apps : [{
      name: 'spoutTMSFrontend',
      script: 'serve',
      env: {
        PM2_SERVE_PATH: './build',
        PM2_SERVE_PORT: 3001,
        NODE_ENV: 'production',
      },
    }],
  };
  
  