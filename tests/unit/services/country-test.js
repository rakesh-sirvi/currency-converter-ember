import { module, test } from 'qunit';
import { setupTest } from 'ember-app/tests/helpers';

module('Unit | Service | country', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:country');
    assert.ok(service);
  });
});
