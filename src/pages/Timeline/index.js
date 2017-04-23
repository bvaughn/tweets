import { h, Component, options } from 'preact';
import LoadingIndicator from 'components/LoadingIndicator';
import TweetList from 'components/TweetList';
import TweetStream from './TweetStream';

// Use requestAnimationFrame by default but allow URL param to disable.
options.debounceRendering = location.search.indexOf('raf=false') < 0
  ? requestAnimationFrame
  : null;

export default class Timeline extends Component {
  state = { tweets: [] };

  componentWillMount = () => {
    this._tweetStream = new TweetStream();
    this._fetchTweets();
  };

  render() {
    const tweets = this.state.tweets;

    if (tweets.length === 0) {
      return <LoadingIndicator />;
    } else {
      return <TweetList fetchTweets={this._fetchTweets} tweets={tweets} />;
    }
  }

  _fetchTweets = () => {
    if (!this._tweetStream.loading) {
      this._tweetStream.load(tweets => {
        tweets = this.state.tweets.concat(tweets);
        this.setState({ tweets });
      });
    }
  };
}
