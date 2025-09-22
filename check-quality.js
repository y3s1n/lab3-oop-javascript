#!/usr/bin/env node
import { execSync } from 'child_process';

console.log('Running Quality checks...\n');

const checks = [
    { name: 'Tests', command: 'npm test'},
    { name: 'ESLint', command: 'npm run lint' },
    { name: 'Prettier', command: 'npm run format:check' }
];

let allPassed = true;

for (const check of checks) {
    try {
        console.log(`Running ${check.name}...`)
        execSync(check.command, { stdio: 'inherit' });
        console.log(` ${check.name} passed\n`);
    } catch (error) {
        console.log(`${check.name} failed\n`);
        allPassed = false;
    }
}

if (allPassed) {
    console.log('All quality checks passed!');
    process.exit(0);
} else {
    console.log('Some quality checks failed, Please fix the issues above.');
    process.exit(1);
}