import { t } from 'testcafe';
import LoginPage from '../pages/login.page.js'
import ProductsPage from '../pages/products.page.js'
import CartPage from '../pages/cart.page.js'
import HeaderContainerPage from '../pages/header_container.page.js'
import ItemPage from '../pages/item.page.js'

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
const ITEM_3 = userData.Items.item3;

/**
 * For all the tests it is necessary to login
 * so the function is added to the beforeEach
 * so we do not re write the same code multiple
 * times
 */
fixture('Shopping Cart Tests')
    .page(BASE_URL)
    .beforeEach(async t => {
        await t.maximizeWindow();
        await LoginPage.isLoginPageLoaded();
        await LoginPage.performLogin(VALID_USER, PASSWORD);
    });

test('Navigate to the shopping cart', async t => {
    await HeaderContainerPage.goToShoppingCart();
    await t.expect(await ProductsPage.isCartPageLoaded()).ok();
});

test('Add a single item to the shopping cart', async t => {
    await ProductsPage.isProductPageLoaded();
    await ProductsPage.addItemToCart(ITEM_1);
    await HeaderContainerPage.goToShoppingCart();
    await t.expect(await CartPage.isItemInTheCart(ITEM_1)).ok();
});

test('Add multiple items to the shopping cart', async t => {
    await ProductsPage.isProductPageLoaded();
    await ProductsPage.addItemToCart(ITEM_1);
    await ItemPage.clickBackButton();
    await ProductsPage.addItemToCart(ITEM_2);
    await ItemPage.clickBackButton();
    await ProductsPage.addItemToCart(ITEM_3);
    await HeaderContainerPage.goToShoppingCart();
    await t.expect(await CartPage.isItemInTheCart(ITEM_1)).ok();
    await t.expect(await CartPage.isItemInTheCart(ITEM_2)).ok();
    await t.expect(await CartPage.isItemInTheCart(ITEM_3)).ok();
});
