import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-app/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | weather-component/tabs', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<WeatherComponent::Tabs />`);

    assert.dom(this.element).hasText('');

    // Template block usage:
    await render(hbs`
      <WeatherComponent::Tabs>
        template block text
      </WeatherComponent::Tabs>
    `);

    assert.dom(this.element).hasText('template block text');
  });
});
