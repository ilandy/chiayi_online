import { SolutionPage } from './app.po';

describe('solution App', function() {
  let page: SolutionPage;

  beforeEach(() => {
    page = new SolutionPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
