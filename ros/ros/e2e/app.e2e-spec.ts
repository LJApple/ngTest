import { RosPage } from './app.po';

describe('ros App', () => {
    let page: RosPage;

    beforeEach(() => {
        page = new RosPage();
    });

    it('should display welcome message', () => {
        page.navigateTo();
        expect(page.getParagraphText()).toEqual('Welcome to app!!');
    });
});
