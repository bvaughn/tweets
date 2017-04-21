import { h } from 'preact';
import styles from './Tweet.css';

export default function Tweet({ tweet }) {
  const text = tweet.extended_tweet
    ? tweet.extended_tweet.full_text
    : tweet.text;

  const date = new Date(parseInt(tweet.timestamp_ms));
  const datetime = date.toLocaleTimeString().toLowerCase();

  return (
    <div className={styles.Tweet}>
      <a
        className={styles.Link}
        href={`https://twitter.com/${tweet.user.screen_name}`}
      >
        <img
          className={styles.ProfileImage}
          src={tweet.user.profile_image_url_https}
        />
        <strong>{tweet.user.name}</strong>
        {' '}
        <span className={styles.Username}>
          @{tweet.user.screen_name} • {datetime}
        </span>
      </a>
      <div>{text}</div>
      <div className={styles.Icons}>
        <i className="fa fa-reply" aria-hidden="true" /> 0
        <i className={`fa fa-retweet ${styles.Icon}`} aria-hidden="true" />
        {' '}
        {tweet.retweet_count}
        <i className={`fa fa-heart ${styles.Icon}`} aria-hidden="true" />
        {' '}
        {tweet.favorite_count}
      </div>
    </div>
  );
}
