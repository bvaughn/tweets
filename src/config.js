function config() {
  return {
    tweetsServerUrl: process.env.NODE_ENV === 'development'
      ? 'http://localhost:5001'
      : 'https://tweets-server.now.sh',
  };
}

export default config();
