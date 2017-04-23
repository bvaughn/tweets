import { h } from 'preact';
import Tweet from 'components/Tweet';
import styles from './Test.css';

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
