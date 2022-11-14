import { module, test } from 'qunit';
import { setupTest } from 'ember-app/tests/helpers';

module('Unit | Route | exchange', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:exchange');
    assert.ok(route);
  });
});
