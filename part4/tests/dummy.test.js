const { test } = require('node:test')
const assert = require('node:assert')
const { dummy } = require('../utils/for_testing')

test('dummy testing', () => {
  const blogs = []
  const result = dummy(blogs)

  assert.strictEqual(result, 1)
})