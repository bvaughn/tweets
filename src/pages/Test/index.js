import { h } from 'preact';
import Tweet from 'components/Tweet';
import styles from './Test.css';
import tweetWithLink from './tweet-with-link.json';
import retweetedAndLiked from './retweeted-and-liked.json';

export default function Test() {
  return (
    <div className={styles.Test}>
      <Tweet tweet={tweetWithLink} />
      <Tweet tweet={retweetedAndLiked} />
    </div>
  );
}