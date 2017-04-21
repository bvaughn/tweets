import { h } from 'preact';
import styles from './LoadingIndicator.css';

export default function LoadingIndicator({ tweet }) {
  return (
    <div className={styles.LoadingIndicator}>
      <i className="fa fa-twitter" /> Streaming some tweets...
    </div>
  );
}
