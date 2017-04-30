import { h, Component } from 'preact';
import Router from 'preact-router';
import Header from 'components/Header';
import Test from './Test';
import Timeline from './Timeline';
import styles from './index.css';

export default class Application extends Component {
  state = {
    authenticated: false
  };

  render() {
    const { authenticated } = this.state;

    return (
      <div className={styles.Outer}>
        <div className={styles.Header}>
          <Header authenticated={authenticated} />
        </div>
        <div className={styles.Body}>
          <div className={styles.BodyWrapper}>
            <div className={styles.Content}>
              <Router>
                <Test path="/test" />
                <Timeline path="/" />
              </Router>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
