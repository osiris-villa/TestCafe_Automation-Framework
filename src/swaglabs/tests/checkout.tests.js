import { t } from 'testcafe';
import LoginPage from '../pages/login.page.js'
import ProductsPage from '../pages/products.page.js'
import CartPage from '../pages/cart.page.js'
import HeaderContainerPage from '../pages/header_container.page.js'
import CheckoutPage from '../pages/checkout.page.js'
import OverviewPage from '../pages/overview.page.js'
import ItemPage from '../pages/item.page.js'
import CompletePage from '../pages/complete.page.js'

var userData = require('../utils/data.json');

/**
 * Created some constants here that retrieve data
 * from the data.json file and use them in the tests
 * below
 */
const BASE_URL = userData.Url.basePage;
const VALID_USER = userData.credentials.validUser;
const PASSWORD = userData.credentials.password;
const ITEM_1 = userData.Items.item1;
const ITEM_2 = userData.Items.item2;
const ERROR_MESSAGE = userData.ErrorMessages.checkoutFirstName;
const CHECKOUT_OVERVIEW_COPY = userData.Copies.checkoutOverview;

/**
 * For all the tests it is necessary to login
 * and add multiple items to the car so include them
 * into the beforeEach so we do not re write the 
 * same code multiple times
 */
fixture('Checkout Tests')
    .page(BASE_URL)
    .beforeEach(async t => {
        await t.maximizeWindow();
        await LoginPage.isLoginPageLoaded();
        await LoginPage.performLogin(VALID_USER, PASSWORD);
        await ProductsPage.isProductPageLoaded();
        await ProductsPage.addItemToCart(ITEM_1);
        await ItemPage.clickBackButton();
        await ProductsPage.addItemToCart(ITEM_2);
        await HeaderContainerPage.goToShoppingCart();
        await CartPage.clickCheckoutButton();
    });

/*
There's no email field 
instead I used the first name filed
*/
test('Continue with missing mail information', async t => {
    await CheckoutPage.fillCheckoutInfoWithoutFirstName('villa', '49000');
    await t.expect(await LoginPage.errorMessage()).eql(ERROR_MESSAGE);
});

test('Fill user’s information', async t => {
    await CheckoutPage.fillCheckoutInfo('Osiris', 'villa', '49000');
    await t.expect(await OverviewPage.getSubHeaderText()).eql(CHECKOUT_OVERVIEW_COPY);
});

test('Final order items', async t => {
    await CheckoutPage.fillCheckoutInfo('Osiris', 'villa', '49000');
    await t.expect(await CartPage.isItemInTheCart(ITEM_1)).ok();
    await t.expect(await CartPage.isItemInTheCart(ITEM_2)).ok();
});

test('Complete a purchase', async t => {
    await CheckoutPage.fillCheckoutInfo('Osiris', 'villa', '49000');
    await OverviewPage.clickFinishButton();
    await t.expect(await CompletePage.logoPonyExpress()).ok();
});