import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
import { render } from 'react-dom';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


Amplify.configure(aws_exports);

class App extends Component {
  render() {
    return (
      <div id="wrapper">
        <Router>
          <Navigation />
          <div id="content-wrapper" className="d-flex flex-column">
            <Switch>
              <Route exact path="/">
                <Companies />
              </Route>
              <Route exact path="/analytics">
                <Analytics />
              </Route>
              <Route path="/company">
                <Company />
              </Route>
            </Switch>
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}


export class Analytics extends Route {

  exportCSV() {
    console.log("Yes i Export very much");
  }

  filter() {
    console.log("this is awesome ")
  }

  render() {
    return(
      <div id="content">
    <div className="container-fluid pt-5">
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Analytics</h1>
            <button onClick={this.exportCSV.bind(this)} className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                    className="fas fa-download fa-sm text-white-50"></i> Export Analytics CSV</button>
        </div>

        <div className="row">
            <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-primary shadow h-100 py-2">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                    PDF's generated</div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800" id="overview_pdfs_generated">XXX</div>
                            </div>
                            <div className="col-auto">
                                <i className="fas fa-calendar fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-success shadow h-100 py-2">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                    PDF opened</div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800" id="overview_pdfs_opened">XXX</div>
                            </div>
                            <div className="col-auto">
                                <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-info shadow h-100 py-2">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                                    Email's collected
                                </div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800" id="overview_emails_collected">XXX</div>
                            </div>
                            <div className="col-auto">
                                <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-warning shadow h-100 py-2">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                    Books Called</div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800" id="overview_books_called">XXX</div>
                            </div>
                            <div className="col-auto">
                                <i className="fas fa-comments fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div className="row">
            <div className="col-md-4 mb-4">
                <div className="card border-left-primary shadow h-100 py-2">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col-12 mb-1">
                                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                    Canton</div>
                            </div>
                            <div className="col-12">
                                <select id="selected_canton" className="form-select" aria-label="Select Company Type">
                                    <option value="all">All</option>
                                    <option value="SG">SG</option>
                                    <option value="ZH">ZH</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md-4 mb-4">
                <div className="card border-left-success shadow h-100 py-2">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col-12 mb-1">
                                <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                    Company Type</div>
                            </div>
                            <div className="col-12">
                                <select id="selected_company_type" className="form-select" aria-label="Select Canton">
                                    <option value="all">All</option>
                                    <option value="Aktiengesellschaft">Aktiengesellschaft</option>
                                    <option value="Gesellschaft mit beschränkter Haftung">GmbH</option>
                                    <option value="Einzelunternehmen">Einzelunternehmen</option>
                                    <option value="Kollektivgesellschaft">Kollektivgesellschaft</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md-4 mb-4">
                <button onClick={this.filter.bind(this)} type="button" className="btn btn-primary btn-lg btn-block">Filter</button>
            </div>

        </div>

        <div className="row">
            <div className="col-xl-8 col-lg-7">
                <div className="card shadow mb-4">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-primary">Sales Pipeline</h6>
                    </div>
                    <div className="card-body">
                        <div className="chart-area" id="pdfs_total_container">
                            <canvas id="pdfs_total"></canvas>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-xl-4 col-lg-5">
                <div className="card shadow mb-4">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-primary">PDF Conversion Rates </h6>
                    </div>
                    <div className="card-body">
                        <div className="chart-pie pt-4 pb-2" id="pdfs_conversion_rate_by_type_container">
                            <canvas id="pdfs_conversion_rate_by_type"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div className="row">
            <div className="col-12">
                <div className="card shadow mb-4">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-primary">PDF's by Date</h6>
                    </div>
                    <div className="card-body">
                        <div className="chart-area" id="pdfs_by_date_container">
                            <canvas id="pdfs_by_date"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="row">
            <div className="col-xl-8 col-lg-7">
                <div className="card shadow mb-4">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-primary">Website Conversion Rates</h6>
                    </div>
                    <div className="card-body">
                        <div className="chart-area" id="website_total_container">
                            <canvas id="website_total"></canvas>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-xl-4 col-lg-5">
                <div className="card shadow mb-4">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-primary">Website Conversion Rates</h6>
                    </div>
                    <div className="card-body">
                        <div className="chart-pie pt-4 pb-2" id="website_conversion_rates_container">
                            <canvas id="website_conversion_rates"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    );
  }
}



class Companies extends Route {

  createPDFs(number) {
    console.log(number);
  }

  exportCSV() {
    console.log("Yes");
  }

  render() {
    return (
      <div id="content">

    <div className="container-fluid pt-5">

        <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Firmenübersicht</h1>
            <div>
                <button onClick={this.exportCSV.bind(this)} className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i className="fas fa-download fa-sm text-white-50"></i> Export Companies CSV</button>
                <button onClick={this.createPDFs.bind(1)} className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i className="fas fa-download fa-sm text-white-50"></i> Create PDF's</button>
            </div>
        </div>

        <div className="row">
            <div className="col-12 mb-4">
                <div className="card border-left-primary shadow h-100 py-2">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                    Firmen gegründet (Monat)</div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800" id="overview_companies_created">XXX</div>
                            </div>
                            <div className="col-auto">
                                <i className="fas fa-calendar fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="row">
            <div className="col-12">
                <div className="card shadow mb-4">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-primary">Companies</h6>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col d-flex justify-content-center" id="loading">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="table-responsive">
                                    <table className="table table-bordered" id="companies" width="100%" cellSpacing="0"></table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    );
  }

}




class Company extends Route {
  render() {
    return <h3>Requested Company ID: </h3>;
  }
}

class Footer extends React.Component {
  render() {
    return (
      <footer className="sticky-footer bg-white">
        <div className="container my-auto">
            <div className="copyright text-center my-auto">
                <span>Copyright &copy; ALENI Webagentur bei Alexander Stöckl & Nikola Mitrovic 2021</span>
            </div>
        </div>
      </footer>);
  }
}

class Navigation extends React.Component {
  render() {
    return (
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
                <div className="sidebar-brand-text mx-3">ALENI Zefix Screener</div>
            </Link>
            <hr className="sidebar-divider" />
            <div className="sidebar-heading">
                Site Overview
            </div>
            <li className="nav-item">
                <Link className="nav-link" to="/"> 
                    <i className="fas fa-fw fa-table"></i>
                    <span>Companies</span></Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/analytics">
                    <i className="fas fa-fw fa-chart-area"></i>
                    <span>Analytics</span></Link>
            </li>
            <hr className="sidebar-divider" />
            <li className="nav-item">
              <AmplifySignOut />
            </li>
        </ul>
    );

  }
}

export default withAuthenticator(App);
