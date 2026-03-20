import assert from 'node:assert';
import test from 'node:test';

test('MyServer', async (t) => {
    let response = await fetch("http://localhost:8081/generichttpws");

    assert(response.status === 200);

    let body = await response.text();
    assert(body.includes("Service description here."));
});