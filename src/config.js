function config() {
  return {
    tweetsUrl: process.env.NODE_ENV === 'development'
      ? 'http://localhost:5000'
      : 'https://tweets-dev.now.sh',
    tweetsServerUrl: process.env.NODE_ENV === 'development'
      ? 'http://localhost:5001'
      : 'https://tweets-server.now.sh',
  };
}

export default config();
