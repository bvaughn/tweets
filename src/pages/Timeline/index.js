import cn from 'classnames';
import { h, Component, options } from 'preact';
import LoadingIndicator from 'components/LoadingIndicator';
import TweetList from 'components/TweetList';
import TweetStream from './TweetStream';
import styles from './Timeline.css';
import config from '../../config';

// Use requestAnimationFrame by default but allow URL param to disable.
options.debounceRendering = location.search.indexOf('raf=false') < 0
  ? requestAnimationFrame
  : null;

export default class Timeline extends Component {
  state = {
    isLoggedIn: false,
    tweets: [],
  };

  componentDidMount() {
    this._tweetStream = new TweetStream();
    this._fetchTweets();
  }

  render() {
    const { disableMedia, isLoggedIn, tweets } = this.state;

    let content;
    if (tweets.length === 0) {
      content = <LoadingIndicator />;
    } else {
      content = (
        <TweetList
          disableMedia={true /* TODO Add profile setting later? */}
          fetchTweets={this._fetchTweets}
          tweets={tweets}
        />
      );
    }

    return (
      <div className={styles.Timeline}>
        <div className={styles.Header}>
          <div className={styles.HeaderAlignment}>
            <a
              className={styles.IconButton}
              href="https://github.com/bvaughn/tweets"
            >
              <i className="fa fa-lg fa-code" />
            </a>

            <div className={styles.Right}>
              {isLoggedIn &&
                <a
                  className={cn(styles.IconButton, styles.SignInButton)}
                  href={config.tweetsServerUrl + '/logout'}
                >
                  <i className="fa fa-lg fa-sign-out" />
                </a>}
              {!isLoggedIn &&
                <a
                  className={cn(styles.IconButton, styles.SignInButton)}
                  href={config.tweetsServerUrl + '/login'}
                >
                  <i className="fa fa-lg fa-sign-in" />
                </a>}
            </div>
          </div>
        </div>

        <div className={styles.ContentWrapper}>
          {content}
        </div>
      </div>
    );
  }

  _fetchTweets = () => {
    let { isLoggedIn, tweets } = this.state;

    let url;
    if (isLoggedIn && tweets.length) {
      const lastIndex = tweets.length - 1;
      const oldestTweet = tweets[lastIndex];
      url = config.tweetsServerUrl + '/tweets/' + oldestTweet.id;
    } else {
      url = config.tweetsServerUrl + '/tweets/';
    }

    fetch(url, { credentials: 'include' })
      .then(response => {
        if (response.status === 401) {
          throw Error('Unauthorized');
        } else {
          return response.json();
        }
      })
      .then(newTweets => {
        tweets = isLoggedIn ? tweets.concat(newTweets) : newTweets;

        this.setState({
          isLoggedIn: true,
          tweets,
        });
      })
      .catch(this._fetchTweetStream);
  };

  _fetchTweetStream = () => {
    if (this._tweetStream.loading) {
      return;
    }

    this._tweetStream.load(newTweets => {
      const tweets = this.state.tweets.concat(newTweets);

      this.setState({ tweets });
    });
  };
}
