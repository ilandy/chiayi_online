import { Solustion1Page } from './app.po';

describe('solustion1 App', () => {
  let page: Solustion1Page;

  beforeEach(() => {
    page = new Solustion1Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
