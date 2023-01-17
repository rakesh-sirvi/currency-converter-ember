import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class IndexController extends Controller {
  @tracked theme = localStorage.getItem('currencyAppTheme') ?? this.systemTheme;

  get systemTheme() {
    return window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  @action
  changeTheme() {
    if (this.theme === 'light') this.theme = 'dark';
    else this.theme = 'light';
  }
}
