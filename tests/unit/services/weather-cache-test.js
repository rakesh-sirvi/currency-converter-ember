import { module, test } from 'qunit';
import { setupTest } from 'ember-app/tests/helpers';

module('Unit | Service | weather-cache', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:weather-cache');
    assert.ok(service);
  });
});
