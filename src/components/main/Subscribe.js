import React, { Component } from 'react';
import subscribtion from '../../assets/img/subscribtion.jpg';

export default class Subscribe extends Component {
    render() {
        return (
        <div className="subscribe-line subscribe-line-image" style={{ backgroundImage: `url(${subscribtion})`
    }}>
            <div className="container">
            <div className="row">
                <div className="col-md-6">
                <h3 className="title">Subscribe to Our Newsletter</h3>
                <p className="description">
                    Join our newsletter and get news in your inbox every week! We hate spam too, so no worries about this.
                </p>
                </div>
                <div className="col-md-6">
                <div className="card card-plain card-form-horizontal">
                    <div className="card-body">
                    <form method="" action="">
                        <div className="row">
                        <div className="col-md-8">
                            <div className="input-group no-border input-lg">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                <i className="now-ui-icons ui-1_email-85"></i>
                                </span>
                            </div>
                            <input type="text" className="form-control" placeholder="Your Email..." />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <button type="button" className="btn btn-primary btn-round btn-block btn-lg">Subscribe</button>
                        </div>
                        </div>
                    </form>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        )
    }
    }
