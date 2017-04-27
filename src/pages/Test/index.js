import { h } from 'preact';
import tinytime from 'tinytime';
import Tweet from 'components/Tweet';
import styles from './Test.css';

const timeTemplate = tinytime('{Mo}/{DD} {h}:{mm}:{ss} {a}');

const EXAMPLES = {
  Hashtags: require('./data/hashtags.json'),
  Image: require('./data/image.json'),
  'Linkwith Preview': require('./data/link-with-preview.json'),
  Mentions: require('./data/mentions.json'),
  'Replying to': require('./data/replying-to.json'),
  Retweet: require('./data/retweet.json'),
  'Retweeted &amp; Liked': require('./data/retweeted-and-liked.json'),
  Verified: require('./data/verified.json'),
  Video: require('./data/video.json'),
};

export default function Test() {
  return (
    <div className={styles.Test}>
      {Object.keys(EXAMPLES).map(key => (
        <Demo title={key} tweet={EXAMPLES[key]} />
      ))}
    </div>
  );
}

function Demo({ title, tweet }) {
  // Pre-format time (once) to mimic TweetStream
  tweet.timestring = timeTemplate.render(new Date(tweet.created_at));

  return (
    <div>
      <h3 className={styles.Header}>{title}</h3>
      <h5>Loading</h5>
      <div className={styles.TweetWrapper}>
        <Tweet disableMedia={false} isScrolling={true} tweet={tweet} />
      </div>
      <h5>Media disabled</h5>
      <div className={styles.TweetWrapper}>
        <Tweet disableMedia={true} isScrolling={false} tweet={tweet} />
      </div>
      <h5>Loaded</h5>
      <div className={styles.TweetWrapper}>
        <Tweet disableMedia={false} isScrolling={false} tweet={tweet} />
      </div>
    </div>
  );
}
