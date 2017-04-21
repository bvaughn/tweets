import PubNub from 'pubnub';

const BATCH_SIZE = 20;

// TODO Replace this with something that consumes Twitter's OAUTH API
export default class TweetStream {
  constructor(batchSize = BATCH_SIZE) {
    this._batchSize = batchSize;
    this._loading = false;
  }

  load(callback) {
    if (this._loading) {
      return;
    }

    this._loading = true;
    this._callback = callback;
    this._tweets = [];

    this._stream = new PubNub({
      subscribeKey: 'sub-c-78806dd4-42a6-11e4-aed8-02ee2ddab7fe'
    });
    this._stream.addListener({
      message: this._message
    });
    this._stream.subscribe({
      channels: ['pubnub-twitter']
    });
  }

  get loading() {
    return this._loading;
  }

  _message = data => {
    if (!this._loading) {
      return;
    }

    this._tweets.push(data.message);

    if (this._tweets.length >= this._batchSize) {
      this._stream.stop();
      this._stream = null;
      this._loading = false;
      this._callback(this._tweets);
    }
  };
}