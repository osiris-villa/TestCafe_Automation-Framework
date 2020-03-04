import { Selector, t } from 'testcafe';

/**
 * Elements located in the Cart section and their manipulation
 **/

class CartPage {

    // ------- ELEMENTS -------
    constructor() {
        this.listItemsInCart = Selector('div.inventory_item_name')
        this.btnCheckout = Selector('a.checkout_button')
    }

    // ------- FUNCTIONS -------

    /**
     * Function that check if an item is in the cart 
     * by iterating in the cart list and returning 
     * true if item matches the text of the item in the cart
     */
    async isItemInTheCart(item) {

        var count = await this.listItemsInCart.count;

        for (var i = 0; i < count; i++) {
            var text = await this.listItemsInCart.nth(i).innerText;
            if (text == item) {
                return await this.listItemsInCart.nth(i).exists;

            }
        }
    }

    async clickCheckoutButton() {
        await t.click(this.btnCheckout);
    }

}

export default new CartPage();