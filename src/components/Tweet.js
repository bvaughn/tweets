import cn from 'classnames';
import { h } from 'preact';
import t from 'twitter-text';
import styles from './Tweet.css';

// TODO Support entities: https://dev.twitter.com/overview/api/entities
// + inline media ~ extended_tweet.entities.media

// TODO Show "Retweeted" header and icon
// TODO Handle retweeted case (with custom text or not)

const AUTO_LINK_OPTIONS = {
  'urlClass':styles.Link,
  'listClass':styles.Link,
  'usernameClass':styles.Link,
  'hashtagClass':styles.Link,
  'cashtagClass': styles.Link
};

export default function Tweet({ isScrolling, tweet }) {
  let text = tweet.extended_tweet
    ? tweet.extended_tweet.full_text
    : tweet.text;

  let replyingTo;
  if (text.indexOf('@') === 0) {
    const extractedMentions = t.extractMentionsWithIndices(text);
    const lastMention = extractedMentions[extractedMentions.length - 1];

    text = text.substr(lastMention.indices[1]);

    if (isScrolling) {
      replyingTo = extractedMentions.map(mention => `@${mention.screenName} `);
    } else {
      replyingTo = extractedMentions.reduce((reduced, mention) => {
        reduced.push(
          <a
            className={styles.Link}
            href={`https://twitter.com/${mention.screenName}`}
          >
            @{mention.screenName}
          </a>
        );
        reduced.push(' ');
        return reduced;
      }, []);
    }
  }

  if (!isScrolling) {
    text = t.autoLink(text, AUTO_LINK_OPTIONS)
  }

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
        {tweet.user.verified && (
          <i
            aria-hidden='true'
            className={cn(
              'fa fa-check-circle',
              styles.VerifiedIcon
            )}
          />
        )}
        {' '}
        <span className={styles.Username}>
          @{tweet.user.screen_name}
          {' • '}
          <a
            className={styles.Link}
            href={`https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`}
          >
            {tweet.timestring}
          </a>
        </span>
      </a>
      {replyingTo && (
        <div className={styles.ReplyingTo}>
          Replying to {replyingTo}
        </div>
      )}
      <div
        className={styles.Text}
        dangerouslySetInnerHTML={{ __html: text}}
      ></div>
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
