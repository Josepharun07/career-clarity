import { CachedConnection } from './lib/mongodb';

declare global {
  var mongoose: {
    conn: any;
    promise: any;
  };
}

export {};