const { spawn } = require('child_process');
const path = require('path');

console.log('Starting Cafe & Ice Cream Parlor Menu Hub in development mode...');

const isWindows = process.platform === 'win32';
const npmCmd = isWindows ? 'npm.cmd' : 'npm';

// Start backend
const backendProcess = spawn('node', ['server.js'], {
  cwd: path.join(__dirname, '..', 'backend'),
  stdio: 'inherit'
});

// Start frontend
const frontendProcess = spawn(npmCmd, ['run', 'dev'], {
  cwd: path.join(__dirname, '..', 'frontend'),
  stdio: 'inherit'
});

// Handle exit of either process
backendProcess.on('exit', (code) => {
  console.log(`Backend process exited with code ${code}. Terminating frontend...`);
  frontendProcess.kill();
  process.exit(code);
});

frontendProcess.on('exit', (code) => {
  console.log(`Frontend process exited with code ${code}. Terminating backend...`);
  backendProcess.kill();
  process.exit(code);
});

// Clean up on parent exit
process.on('SIGINT', () => {
  backendProcess.kill();
  frontendProcess.kill();
  process.exit(0);
});

process.on('SIGTERM', () => {
  backendProcess.kill();
  frontendProcess.kill();
  process.exit(0);
});
