import { h } from 'preact';
import Router from 'preact-router';
import Test from './Test';
import Timeline from './Timeline';

export default function Routes() {
  return (
    <Router>
      <Test path="/test" />
      <Timeline path="/" />
    </Router>
  );
}
