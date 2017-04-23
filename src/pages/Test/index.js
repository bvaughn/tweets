import { h } from 'preact';
import tinytime from 'tinytime';
import Tweet from 'components/Tweet';
import styles from './Test.css';

const timeTemplate = tinytime('{Mo}/{DD} {h}:{mm}:{ss} {a}');

export default function Test() {
  return (
    <div className={styles.Test}>
      <Demo
        title='Retweeted &amp; Liked'
        tweet={require('./retweeted-and-liked.json')}
      />
      <Demo
        title='Verified'
        tweet={require('./verified.json')}
      />
      <Demo
        title='Mentions'
        tweet={require('./mentions.json')}
      />
      <Demo
        title='Replying to'
        tweet={require('./replying-to.json')}
      />
      <Demo
        title='Hashtags'
        tweet={require('./hashtags.json')}
      />
      <Demo
        title='Link with Preview'
        tweet={require('./link-with-preview.json')}
      />
    </div>
  );
}

function Demo({ title, tweet }) {
  // Pre-format time (once) to mimic TweetStream
  tweet.timestring = timeTemplate.render(
    new Date(tweet.created_at)
  );

  return (
    <div>
      <h5>{title}</h5>
      <div className={styles.TweetWrapper}>
        <Tweet tweet={tweet} isScrolling={true} />
        <Tweet tweet={tweet} isScrolling={false} />
      </div>
    </div>
  )
}
