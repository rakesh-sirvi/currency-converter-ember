import { module, test } from 'qunit';
import { setupTest } from 'ember-rsl/tests/helpers';

module('Unit | Controller | exchange', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:exchange');
    assert.ok(controller);
  });
});
