import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-app/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | currency-exchanger/currency-card',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await render(hbs`<CurrencyExchanger::CurrencyCard />`);

      assert.dom(this.element).hasText('');

      // Template block usage:
      await render(hbs`
      <CurrencyExchanger::CurrencyCard>
        template block text
      </CurrencyExchanger::CurrencyCard>
    `);

      assert.dom(this.element).hasText('template block text');
    });
  }
);
