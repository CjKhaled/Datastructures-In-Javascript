class HashMap {
  constructor() {
    this.keys = new Array(16).fill(null).map(() => []);
    this.loadFactor = 0.75;
    this.capacity = this.keys.length;
    this.lengthMap = 0;
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

    oldArray.forEach((bucket) => {
      bucket.forEach(({ key, value }) => {
        this.set(key, value);
      });
    });
  }

  set(key, value) {
    if (this.lengthMap / this.capacity >= this.loadFactor) {
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
    this.lengthMap++;
  }

  get(key) {
    // hash of the key
    const id = this.hash(key);
    //   accessing the key/value pair
    const bucket = this.keys[id];
    for (const item of bucket) {
      if (item.key === key) {
        return item.value;
      }
    }
    return null;
  }

  has(key) {
    const id = this.hash(key);
    // bucket being empty means the key was never created
    const bucket = this.keys[id];
    if (bucket.length === 0 || key.length === 0) {
        return false;
    }

    for (const item of bucket) {
        if (item.key === key) {
            return true
        }
    }

    return false;
  }

  remove(key) {
    if (this.has(key)) {
        const id = this.hash(key);
        const bucket = this.keys[id];
        bucket.splice(0, 1)
        this.lengthMap--
        return true
        
    } else return false;
  }

  length() {
    return this.lengthMap
  }
}

const newTable = new HashMap();
newTable.set("first", "bob");
newTable.set("last", "phil");
newTable.set("hi", "chris");
console.log(newTable.remove('first'))
console.log(newTable.length())
console.log(newTable.has('first'))
console.log(newTable.get("first"));
console.log(newTable.get("last"));
console.log(newTable.get("hi"));
