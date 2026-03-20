import assert from 'node:assert';
import test from 'node:test';
import {myFunction} from '#src/my-function.js';

test('MyFunction', (t) => {
    assert.ok(myFunction("JS").includes("JS"));
});