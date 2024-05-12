class HashMap {
    constructor() {
      this.keys = new Array(16).fill(null).map(() => []);
      this.loadFactor = 0.75;
      this.capacity = this.keys.length;
      this.length = 0;
    }
  
    hash(key) {
      let hashCode = 0;
      const primeNumber = 31;
      for (let i = 0; i < key.length; i++) {
        hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
      }
      return hashCode;
    }
  
    resize() {
      const oldArray = this.keys;
      this.capacity *= 2;
      this.keys = new Array(this.capacity).fill(null).map(() => []);
  
      oldArray.forEach(bucket => {
        bucket.forEach(({ key, value }) => {
          this.set(key, value);
        });
      });
    }
  
    set(key, value) {
      if (this.length / this.capacity >= this.loadFactor) {
        this.resize();
      }
      const id = this.hash(key);
      const bucket = this.keys[id];
      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i].key === key) {
          bucket[i].value = value;
          return;
        }
      }
      bucket.push({ key, value });
      this.length++;
    }
  
    get(key) {
      const id = this.hash(key);
      const bucket = this.keys[id];
      for (const item of bucket) {
        if (item.key === key) {
          return item.value;
        }
      }
      return undefined;
    }
  }
  
  const newTable = new HashMap();
  newTable.set('first', 'bob');
  newTable.set('last', 'phil');
  newTable.set('hi', 'chris');
  console.log(newTable.get('first'));
  console.log(newTable.get('last'));
  console.log(newTable.get('hi'));