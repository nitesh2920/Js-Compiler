
  import { WebContainer } from "https://cdn.skypack.dev/@webcontainer/api";
  
  // Now you can use WebContainer API here
  let webContainer;

  async function init() {
    try {
      webContainer = await WebContainer.boot();
      console.log('WebContainer initialized');
    } catch (error) {
      console.error('Error initializing WebContainer:', error);
    }
  }

  // Execute JS/TS code
  async function runCode(code) {
    if (!webContainer) {
      console.error('WebContainer not initialized!');
      return;
    }

    try {
      console.log('Mounting code inside WebContainer');
      await webContainer.mount({
        '/index.js': code, // Mount the code from the textarea as "index.js"
      });

      // Run the code with Node.js inside WebContainer
      console.log('Running the code inside WebContainer');
      const result = await webContainer.run('node /index.js'); // Execute JS code
      console.log('Code executed:', result);

      document.getElementById('output').textContent = result.stdout || result.stderr;
    } catch (error) {
      console.error('Error running the code:', error);
      document.getElementById('output').textContent = 'Error executing code';
    }
  }

  document.getElementById('runCodeButton').addEventListener('click', () => {
    const code = document.getElementById('codeInput').value;
    runCode(code);
  });

  window.onload = init;
