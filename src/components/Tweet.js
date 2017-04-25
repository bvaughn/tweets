import cn from 'classnames';
import { h, Component } from 'preact';
import shallowCompare from 'preact-shallow-compare';
import t from 'twitter-text';
import styles from './Tweet.css';

// TODO Support entities: https://dev.twitter.com/overview/api/entities
// + inline media ~ extended_tweet.entities.media

// TODO Show "Retweeted" header and icon
// TODO Handle retweeted case (with custom text or not)

const ROUGH_ESTIMATE_IMAGE_WIDTH = 550;

const AUTO_LINK_OPTIONS = {
  'urlClass':styles.Link,
  'listClass':styles.Link,
  'usernameClass':styles.Link,
  'hashtagClass':styles.Link,
  'cashtagClass': styles.Link
};

export default class Tweet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mediaExpanded: false
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const { disableMedia, isScrolling } = this.props;

    let tweet = this.props.tweet;
    let retweeter;
    if (tweet.retweeted_status) {
      retweeter = tweet.user;
      tweet = tweet.retweeted_status;
    }

    let text = tweet.extended_tweet
      ? tweet.extended_tweet.full_text
      : tweet.text;

    // Strip media placeholder text before converting remaining text to links,
    // Else the media indices will be misplaced.
    let media;
    if (
      !disableMedia &&
      tweet.extended_entities &&
      tweet.extended_entities.media.length
    ) {
      media = tweet.extended_entities.media[0];
      text = text.substr(0, media.indices[0]);
    }

    let replyingTo;
    if (text.indexOf('@') === 0) {
      const extractedMentions = t.extractMentionsWithIndices(text);
      const lastMention = extractedMentions[extractedMentions.length - 1];

      text = text.substr(lastMention.indices[1] + 1);

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

    // Upscale user profile images; for some reason the API sends blurry low-res pictures.
    let profileImageSource = tweet.user.profile_image_url_https;
    if (profileImageSource.indexOf('_normal.') >= 0) {
      profileImageSource = profileImageSource.replace('_normal.', '_bigger.');
    }

    return (
      <div className={styles.Tweet}>
        {retweeter && (
          <div className={styles.Retweeted}>
            <i
              aria-hidden='true'
              className={cn(
                'fa fa-retweet',
                styles.RetweetedIcon
              )}
            />
            {' '}
            <a
              className={styles.Link}
              href={`https://twitter.com/${retweeter.screen_name}`}
            >
              {retweeter.name}
            </a> Retweeted
          </div>
        )}
        <a
          className={styles.Link}
          href={`https://twitter.com/${tweet.user.screen_name}`}
        >
          <img
            className={styles.ProfileImage}
            src={profileImageSource}
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

        {this._renderMedia()}

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

  _renderMedia() {
    const { disableMedia, tweet } = this.props;
    const { mediaExpanded } = this.state;

    if (
      disableMedia ||
      !tweet.extended_entities ||
      !tweet.extended_entities.media.length
    ) {
      return null;
    } else {
      const media = tweet.extended_entities.media[0];

      switch(media.type) {
        case 'animated_gif':
        case 'photo':
          return this._renderMediaPhoto();
        default:
          console.warn(`Unknown media type: ${media.type}`)
      }
    }
  }

  _renderMediaPhoto() {
    const { tweet } = this.props;

    const media = tweet.extended_entities.media[0];
    const aspectRatio = media.sizes.small.h / media.sizes.small.w;
    const height = Math.min(
      250,
      ROUGH_ESTIMATE_IMAGE_WIDTH * aspectRatio
    );

    return (
      <a
        className={styles.ImageMedia}
        href={media.expanded_url}
        style={{
          backgroundImage: `url(${media.media_url_https})`,
          height
        }}
      ></a>
    );
  }

  _onExpandMediaButtonClicked = () => {
    this.setState({ mediaExpanded: true });
  };
}
