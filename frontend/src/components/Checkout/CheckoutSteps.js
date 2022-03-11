import React from 'react';
import {Nav, NavItem, NavLink} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';
const CheckoutSteps = ({step1,step2,step3,step4}) => {
    return (
       <Nav className='justify-content-center py-3 my-2'>
           <NavItem>
               {step1 ? (
                   <LinkContainer to='/login'>
                       <NavLink>
                           Sign In
                       </NavLink>
                   </LinkContainer>
               ):(
                   <NavLink disabled>
                       Sign In
                   </NavLink>
               )}
           </NavItem>

           <NavItem>
               {step2 ? (
                   <LinkContainer to='/payment'>
                       <NavLink>
                Payment
                       </NavLink>
                   </LinkContainer>
               ):(
                   <NavLink disabled>
                      Payment
                   </NavLink>
               )}
           </NavItem>



           <NavItem>
               {step3 ? (
                   <LinkContainer to='/placeorder'>
                       <NavLink>
                           Place Order
                       </NavLink>
                   </LinkContainer>
               ):(
                   <NavLink disabled>
                       Place Order
                   </NavLink>
               )}
           </NavItem>




           <NavItem>
               {step4 ? (
                   <LinkContainer to='/shipping'>
                       <NavLink>
                            Shipping
                       </NavLink>
                   </LinkContainer>
               ):(
                   <NavLink disabled>
                       Shipping
                   </NavLink>
               )}
           </NavItem>
       </Nav>
    );
};

export default CheckoutSteps;