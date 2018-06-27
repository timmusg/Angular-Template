import { EnterpriseProfilerPage } from './app.po';

describe('enterprise-profiler App', () => {
  let page: EnterpriseProfilerPage;

  beforeEach(() => {
    page = new EnterpriseProfilerPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
