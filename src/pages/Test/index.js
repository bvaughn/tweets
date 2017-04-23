import { h } from 'preact';
import Tweet from 'components/Tweet';
import styles from './Test.css';

export default function Test() {
  return (
    <div className={styles.Test}>
      <h5>Retweeted &amp; Liked</h5>
      <div className={styles.TweetWrapper}>
        <Tweet tweet={require('./retweeted-and-liked.json')} />
      </div>
      <h5>Verified</h5>
      <div className={styles.TweetWrapper}>
        <Tweet tweet={require('./verified.json')} />
      </div>
      <h5>Mentions</h5>
      <div className={styles.TweetWrapper}>
        <Tweet tweet={require('./mentions.json')} />
      </div>
      <h5>Replying to</h5>
      <div className={styles.TweetWrapper}>
        <Tweet tweet={require('./replying-to.json')} />
      </div>
      <h5>Hashtags</h5>
      <div className={styles.TweetWrapper}>
        <Tweet tweet={require('./hashtags.json')} />
      </div>
      <h5>Link with Preview</h5>
      <div className={styles.TweetWrapper}>
        <Tweet tweet={require('./link-with-preview.json')} />
      </div>
    </div>
  );
}