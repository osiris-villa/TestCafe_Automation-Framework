import { Selector, t } from 'testcafe';

/**
 * Elements located in the Complete section and their manipulation
 **/

class CompletePage {

    // ------- ELEMENTS -------
    constructor() {
     this.logoPonyExpress = Selector('div.pony_express')
    }

    // ------- FUNCTIONS -------
    async isCompleteCheckouPageLoaded(){
        return await this.logoPonyExpress.exists;
    }
    
}

export default new CompletePage();