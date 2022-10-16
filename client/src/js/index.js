// all imports
import { Workbox } from 'workbox-window';
import Editor from './editor';
import './database';
import '../css/style.css';

// sets the main div to blank
const main = document.querySelector('#main');
main.innerHTML = '';

// creates a div with the classname "spinner"
const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  main.appendChild(spinner);
};

const editor = new Editor();

if (typeof editor === 'undefined') {
  loadSpinner();
}

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  // register workbox service worker
  const workboxSW = new Workbox('/service-worker.js');
  workboxSW.register();
  console.log("The Service Worker was successfully registered.  FINALLY!")
} else {
  console.error('Service workers are not supported in this browser.');
}
