import React, { Component } from 'react'
import Stripecheckout from 'react-stripe-checkout'
import { connect } from 'react-redux'
import * as actions from '../actions'

export class Payments extends Component {
    render() {
        return (
            <Stripecheckout
              name ='Emaily'
              description ='$5 for 5 credits'
              amount = {500}
              token = {token => this.props.handleToken(token)}
              stripeKey = {process.env.REACT_APP_STRIPE_KEY}
            >
                <button className ='btn'>Add Credits</button>
            </Stripecheckout>
        )
    }
}

export default connect(null,actions)(Payments)

