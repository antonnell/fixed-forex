import AccountStore from './accountStore';
import FixedForexStore from './fixedForexStore';

const Dispatcher = require('flux').Dispatcher;
const Emitter = require('events').EventEmitter;

const dispatcher = new Dispatcher();
const emitter = new Emitter();

const accountStore = new AccountStore(dispatcher, emitter);
const fixedForexStore = new FixedForexStore(dispatcher, emitter);

export default {
  accountStore: accountStore,
  fixedForexStore: fixedForexStore,
  dispatcher: dispatcher,
  emitter: emitter,
};
