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
    tweets: []
  };

  componentDidMount() {
    this._tweetStream = new TweetStream();
    this._fetchTweets();
  }

  render() {
    const { disableMedia, tweets } = this.state;

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
              href='https://github.com/bvaughn/tweets'
            >
              <i className='fa fa-lg fa-code' />
            </a>

            <div className={styles.Right}>
              {/* TODO Add link to sign-in state */}
              <a
                className={cn(styles.IconButton, styles.SignInButton)}
                href={config.tweetsServerUrl + '/login'}
              >
                <i className='fa fa-lg fa-sign-in' />
              </a>
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
    let url = config.tweetsServerUrl + '/tweets/0';
    if (isLoggedIn && tweets.length) {
      const lastIndex = tweets.length - 1;
      const oldestTweet = tweets[lastIndex];
      url = config.tweetsServerUrl + '/tweets/' + oldestTweet.id;
    }
    fetch(url, { credentials: 'include' }).then(response => response.json())
    .then(loggedInTweets => {
      if (loggedInTweets.length) {
        if(isLoggedIn) {
          tweets = tweets.concat(loggedInTweets);
        } else {
          tweets = loggedInTweets;
        }
        isLoggedIn = true;
        this.setState({ isLoggedIn, tweets });
      } else {
        if (!this._tweetStream.loading) {
          this._tweetStream.load(tweets => {
            tweets = this.state.tweets.concat(tweets);
            this.setState({ tweets });
          });
        }
      }
    });
  };
}
