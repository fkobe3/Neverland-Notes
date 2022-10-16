import { openDB } from 'idb';

// initdb ... Initializes the database.
const initdb = async () =>
  // uses the database named 'jate'
  // uses version 1
  // looks for a database already named 'jate' and uses it, or creates a new one
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      // makes 'id' the keyPath in the newly-created database
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// ADDS data to the database.
export const putDb = async (content) => {
  console.log('Post/PUT to the database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log('🚀 - data saved to the jate database', result);
};

// GETS all data from the database.
export const getDb = async () => {
  console.log('GET from the database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.get(1);
  const result = await request;
  console.log('result.value', result);
  result
    ? console.log('Data retrieved from database')
    : console.log('Data not found in the database.');
  // If there is a result, the return will show its value.
  return result?.value;
};

// calls initialize-function on load
initdb();
