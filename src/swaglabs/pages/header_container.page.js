import { Selector, t } from 'testcafe';

/**
 * Elements that are not attached to a particular page 
 * and exist in multiple pages are located here
 */

class HeaderContainerPage {

    // ------- ELEMENTS -------
    constructor() {
        this.btnHamburguer = Selector('div.bm-burger-button');
        this.lnkLogout = Selector('a#logout_sidebar_link');
        this.iconShoppingCart = Selector('div#shopping_cart_container');
    }

    // ------- FUNCTIONS -------
    async performLogout() {
        await t.click(this.btnHamburguer)
            .click(this.lnkLogout)
    }

    async goToShoppingCart() {
        await t.click(this.iconShoppingCart);
    }
}

export default new HeaderContainerPage();