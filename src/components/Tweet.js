import cn from 'classnames';
import { h } from 'preact';
import Linkify from 'react-linkify';
import styles from './Tweet.css';

export default function Tweet({ tweet }) {
  const text = tweet.extended_tweet
    ? tweet.extended_tweet.full_text
    : tweet.text;

  const date = new Date(parseInt(tweet.timestamp_ms));
  const datetime = date.toLocaleTimeString().toLowerCase();

  let imageSource = tweet.user.profile_image_url_https;
  if (imageSource.indexOf('_normal') >= 0) {
    imageSource = imageSource.replace('_normal', '_bigger');
  }

  return (
    <div className={styles.Tweet}>
      <a
        className={styles.Link}
        href={`https://twitter.com/${tweet.user.screen_name}`}
      >
        <img
          className={styles.ProfileImage}
          src={imageSource}
        />
        <strong>{tweet.user.name}</strong>
        {' '}
        <span className={styles.Username}>
          @{tweet.user.screen_name} • {datetime}
        </span>
      </a>
      <br/>
      <Linkify>{text}</Linkify>
      <div className={styles.Icons}>
        <i
          aria-hidden='true'
          className={cn(
            'fa fa-reply',
            styles.ReplyIcon
          )}
        />
        {' '}
        0
        <i
          aria-hidden='true'
          className={cn(
            'fa fa-retweet',
            styles.RetweetIcon,
            {
              [styles.RetweetIconActive]: tweet.retweeted
            }
          )}
        />
        {' '}
        {tweet.retweet_count}
        <i
          aria-hidden='true'
          className={cn(
            'fa fa-heart',
            styles.FavoriteIcon,
            {
              [styles.FavoriteIconActive]: tweet.favorited
            }
          )}
        />
        {' '}
        {tweet.favorite_count}
      </div>
    </div>
  );
}
