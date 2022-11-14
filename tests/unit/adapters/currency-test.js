import { module, test } from 'qunit';
import { setupTest } from 'ember-app/tests/helpers';

module('Unit | Adapter | currency', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let adapter = this.owner.lookup('adapter:currency');
    assert.ok(adapter);
  });
});
