import { Selector, t } from 'testcafe';
/**
 * Elements located in the Item section and their manipulation
 **/

class ItemPage {

    // ------- ELEMENTS -------
    constructor() {
        this.btnAddToCart = Selector('button.btn_inventory');
        this.btnBack = Selector('button.inventory_details_back_button');
    }

    // ------- FUNCTIONS -------
    async clickAddToCart() {
        await t.click(this.btnAddToCart);
    }

    async clickBackButton(){
        await t.click(this.btnBack);
    }
}

export default new ItemPage();