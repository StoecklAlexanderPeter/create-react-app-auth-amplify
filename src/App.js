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
        <Navigation />
        <div id="content-wrapper" class="d-flex flex-column">
          <Switch>
            <Route path="/companies">
              <Companies />
            </Route>
            <Route path="/analytics">
              <Analytics />
            </Route>
            <Route path="/companies/:company">
              <Company />
            </Route>
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

function Analytics() {
  return (
    <div id="content">
    <div class="container-fluid pt-5">
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Analytics</h1>
            <button onclick="exportCSV()" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                    class="fas fa-download fa-sm text-white-50"></i> Export Analytics CSV</button>
        </div>

        <div class="row">
            <div class="col-xl-3 col-md-6 mb-4">
                <div class="card border-left-primary shadow h-100 py-2">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                    PDF's generated</div>
                                <div class="h5 mb-0 font-weight-bold text-gray-800" id="overview_pdfs_generated">XXX</div>
                            </div>
                            <div class="col-auto">
                                <i class="fas fa-calendar fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-xl-3 col-md-6 mb-4">
                <div class="card border-left-success shadow h-100 py-2">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                                    PDF opened</div>
                                <div class="h5 mb-0 font-weight-bold text-gray-800" id="overview_pdfs_opened">XXX</div>
                            </div>
                            <div class="col-auto">
                                <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-xl-3 col-md-6 mb-4">
                <div class="card border-left-info shadow h-100 py-2">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-info text-uppercase mb-1">
                                    Email's collected
                                </div>
                                <div class="h5 mb-0 font-weight-bold text-gray-800" id="overview_emails_collected">XXX</div>
                            </div>
                            <div class="col-auto">
                                <i class="fas fa-clipboard-list fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-xl-3 col-md-6 mb-4">
                <div class="card border-left-warning shadow h-100 py-2">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                    Books Called</div>
                                <div class="h5 mb-0 font-weight-bold text-gray-800" id="overview_books_called">XXX</div>
                            </div>
                            <div class="col-auto">
                                <i class="fas fa-comments fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div class="row">
            <div class="col-md-4 mb-4">
                <div class="card border-left-primary shadow h-100 py-2">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col-12 mb-1">
                                <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                    Canton</div>
                            </div>
                            <div class="col-12">
                                <select id="selected_canton" class="form-select" aria-label="Select Company Type">
                                    <option value="all">All</option>
                                    <option value="SG">SG</option>
                                    <option value="ZH">ZH</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-4 mb-4">
                <div class="card border-left-success shadow h-100 py-2">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col-12 mb-1">
                                <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                                    Company Type</div>
                            </div>
                            <div class="col-12">
                                <select id="selected_company_type" class="form-select" aria-label="Select Canton">
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

            <div class="col-md-4 mb-4">
                <button onclick="filter()" type="button" class="btn btn-primary btn-lg btn-block">Filter</button>
            </div>

        </div>

        <div class="row">
            <div class="col-xl-8 col-lg-7">
                <div class="card shadow mb-4">
                    <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 class="m-0 font-weight-bold text-primary">Sales Pipeline</h6>
                    </div>
                    <div class="card-body">
                        <div class="chart-area" id="pdfs_total_container">
                            <canvas id="pdfs_total"></canvas>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-xl-4 col-lg-5">
                <div class="card shadow mb-4">
                    <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 class="m-0 font-weight-bold text-primary">PDF Conversion Rates </h6>
                    </div>
                    <div class="card-body">
                        <div class="chart-pie pt-4 pb-2" id="pdfs_conversion_rate_by_type_container">
                            <canvas id="pdfs_conversion_rate_by_type"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div class="row">
            <div class="col-12">
                <div class="card shadow mb-4">
                    <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 class="m-0 font-weight-bold text-primary">PDF's by Date</h6>
                    </div>
                    <div class="card-body">
                        <div class="chart-area" id="pdfs_by_date_container">
                            <canvas id="pdfs_by_date"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-xl-8 col-lg-7">
                <div class="card shadow mb-4">
                    <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 class="m-0 font-weight-bold text-primary">Website Conversion Rates</h6>
                    </div>
                    <div class="card-body">
                        <div class="chart-area" id="website_total_container">
                            <canvas id="website_total"></canvas>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-xl-4 col-lg-5">
                <div class="card shadow mb-4">
                    <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 class="m-0 font-weight-bold text-primary">Website Conversion Rates</h6>
                    </div>
                    <div class="card-body">
                        <div class="chart-pie pt-4 pb-2" id="website_conversion_rates_container">
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


function Companies() {
  return (
    <div id="content">

    <div class="container-fluid pt-5">

        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Firmenübersicht</h1>
            <div>
                <button onclick="exportCSV()" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i class="fas fa-download fa-sm text-white-50"></i> Export Companies CSV</button>
                <button onclick="createPDFs(1)" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i class="fas fa-download fa-sm text-white-50"></i> Create PDF's</button>
            </div>
        </div>

        <div class="row">
            <div class="col-12 mb-4">
                <div class="card border-left-primary shadow h-100 py-2">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                    Firmen gegründet (Monat)</div>
                                <div class="h5 mb-0 font-weight-bold text-gray-800" id="overview_companies_created">XXX</div>
                            </div>
                            <div class="col-auto">
                                <i class="fas fa-calendar fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-12">
                <div class="card shadow mb-4">
                    <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 class="m-0 font-weight-bold text-primary">Companies</h6>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col d-flex justify-content-center" id="loading">
                                <div class="spinner-border text-primary" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="table-responsive">
                                    <table class="table table-bordered" id="companies" width="100%" cellspacing="0"></table>
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


function Company() {
  let { companyID } = useParams();
  return <h3>Requested Company ID: {companyID}</h3>;
}

class Footer extends React.Component {
  render() {
    return (
      <footer class="sticky-footer bg-white">
        <div class="container my-auto">
            <div class="copyright text-center my-auto">
                <span>Copyright &copy; ALENI Webagentur bei Alexander Stöckl & Nikola Mitrovic 2021</span>
            </div>
        </div>
      </footer>);
  }
}

class Navigation extends React.Component {
  render() {
    return (
      <Router>
        <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                <div class="sidebar-brand-text mx-3">ALENI Zefix Screener</div>
            </a>
            <hr class="sidebar-divider" />
            <div class="sidebar-heading">
                Site Overview
            </div>
            <li class="nav-item">
                <Link class="nav-link" to="companies">
                    <i class="fas fa-fw fa-table"></i>
                    <span>Companies</span></Link>
            </li>
            <li class="nav-item">
                <Link class="nav-link" to="analytics">
                    <i class="fas fa-fw fa-chart-area"></i>
                    <span>Analytics</span></Link>
            </li>
            <hr class="sidebar-divider" />
            <li class="nav-item">
              <AmplifySignOut />
            </li>
        </ul>
      </Router>
    );

  }
}

export default withAuthenticator(App);
