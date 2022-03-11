import Header from "./components/Header";
import Footer from "./components/Footer";
import {Container} from "react-bootstrap";
import HomePage from "./pages/HomePage";
import {BrowserRouter as Router, Route} from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import CartScreen from "./pages/cartScreen";
import LoginPage from "./pages/LoginPage";
import Regiterpage from "./pages/Regiterpage";
import ProfilePage from "./pages/ProfilePage";
import ShippingPage from "./pages/ShippingPage";
import PaymentPage from "./pages/PaymentPage";
import PlaceorderPage from "./pages/PlaceorderPage";
import OrderPage from "./pages/orderPage";
import ListUsersScreen from "./pages/ListUsersScreen";
import EditUserScreen from './pages/EditUserScreen'
import ProductListPage from "./pages/ProductListPage";
import EditProductPage from "./pages/EditProductPage";
import ListOrdersPage from "./pages/ListOrdersPage";
import SearchPage from "./pages/SearchPage";

function App() {
  return (
      <>
          <Router>

          <Header />

              <main className='py-3' >
                  <Container>
                      <Route path='/login' exact>
                          <LoginPage/>
                      </Route>
                      <Route path='/register' exact>
                          <Regiterpage/>
                      </Route>
                      <Route path='/profile' exact>
                          <ProfilePage/>
                      </Route>

                      <Route path='/shipping'>
                          <ShippingPage/>
                      </Route>

                      <Route path='/payment'>
                          <PaymentPage/>
                      </Route>

                      <Route path='/placeorder'>
                          <PlaceorderPage/>
                      </Route>

                      <Route path='/order/:id'>
                          <OrderPage/>
                      </Route>

                    {/* admin routes */}
                      <Route path='/admin/userslist'>
                          <ListUsersScreen/>
                      </Route>
                      <Route path='/admin/user/:id/edit'>
                          <EditUserScreen />
                      </Route>
                      <Route path='/admin/products/:id/edit' exact>
                          <EditProductPage />
                      </Route>

                      <Route path='/admin/products' exact>
                          <ProductListPage/>
                      </Route>
                      <Route path='/admin/products/:pageNumber' exact>
                          <ProductListPage/>
                      </Route>
                      <Route path='/admin/orders' exact>
                          <ListOrdersPage/>
                      </Route>
                    {/* end admin routes */}


                      <Route path='/' exact>
                      <HomePage/>
                  </Route>
                      <Route path='/product/:id'>
                          <ProductPage />
                      </Route>
                      <Route path='/search/:keyword' exact>
                          <HomePage />
                      </Route>
                      <Route path='/page/:pageNumber' exact>
                          <HomePage />
                      </Route>
                      <Route path='/search/:keyword/page/:pageNumber' exact>
                          <HomePage />
                      </Route>
                      <Route path='/cart/:id?'>
                          <CartScreen />
                      </Route>

                  </Container>

              </main>

             <Footer />
          </Router>
      </>
  );
}

export default App;
