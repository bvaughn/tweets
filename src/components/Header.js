import cn from 'classnames';
import { h } from 'preact';
import styles from './Header.css';
import config from '../config';

export default ({
  authenticated
}) => (
  <div className={styles.Header}>
    <div className={styles.HeaderAlignment}>
      <a
        className={styles.IconButton}
        href="https://github.com/bvaughn/tweets"
      >
        <i className="fa fa-lg fa-code" />
      </a>

      <div className={styles.Right}>
        {authenticated &&
          <a
            className={cn(styles.IconButton, styles.SignInButton)}
            href={config.tweetsServerUrl + '/logout'}
          >
            <i className="fa fa-lg fa-sign-out" />
          </a>}
        {!authenticated &&
          <a
            className={cn(styles.IconButton, styles.SignInButton)}
            href={config.tweetsServerUrl + '/login'}
          >
            <i className="fa fa-lg fa-sign-in" />
          </a>}
      </div>
    </div>
  </div>
);