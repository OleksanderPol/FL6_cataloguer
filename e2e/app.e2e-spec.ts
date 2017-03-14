import { Fl6AppPage } from './app.po';

describe('fl6-app App', () => {
  let page: Fl6AppPage;

  beforeEach(() => {
    page = new Fl6AppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
