import { Selector, t } from 'testcafe';

/**
 * Elements located in the Overview section and their manipulation
 **/

class OverviewPage {

    // ------- ELEMENTS -------
    constructor() {
     this.subHeader = Selector('div.subheader')
     this.btnFinish = Selector('a.cart_button')
    }

    // ------- FUNCTIONS -------
    async getSubHeaderText(){
        return await this.subHeader.innerText;
    }

    async clickFinishButton(){
        await t.click(this.btnFinish);
    }
    
}

export default new OverviewPage();