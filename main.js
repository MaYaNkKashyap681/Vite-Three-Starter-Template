import startApp from './app.js';
import { initEngine } from './src/render/init.js';

(async () => {
    await initEngine()
    startApp()
})()