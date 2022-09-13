# Product Comparator PoC

[![Build Status](https://travis-ci.com/ConsumerDataStandardsAustralia/product-comparator-demo.svg?branch=master)](https://travis-ci.com/ConsumerDataStandardsAustralia/product-comparator-demo)
[![license](https://img.shields.io/github/license/ConsumerDataStandardsAustralia/product-comparator-demo)](https://github.com/ConsumerDataStandardsAustralia/product-comparator-demo/blob/master/LICENSE)
[![issues](https://img.shields.io/github/issues/ConsumerDataStandardsAustralia/product-comparator-demo)](https://github.com/ConsumerDataStandardsAustralia/product-comparator-demo/issues)

This proof-of-concept (PoC) shows how the unprotected CDR endpoints can be used for viewing and comparing CDR products, as well as the statuses and outages of different data sources. This solution uses the CDR product or “PRD” APIs implemented by registered providers from various sectors of the economy.

### Development requirements
* [NodeJS](https://nodejs.org/en/) [v10 - v16.13] - Javascript runtime (comes with [npm](https://www.npmjs.com/get-npm)) - used to build the application.
* [Yarn](https://yarnpkg.com) (Optional but preferred) - Javascript package manager

### Get started

* Run `yarn` to install dependencies
* Run `yarn start` to run locally at http://localhost:3000
* Run `yarn build` to build production release

or

* Run `npm install` to install dependencies
* Run `npm run start` to run locally at http://localhost:3000
* Run `npm run build` to build production release

See the CDR support portal article [Add your organisation to the Banking Product Comparator](https://cdr-support.zendesk.com/hc/en-us/articles/900002933263-Add-your-organisation-to-the-Banking-Product-Comparator) for details of adding a CDR participant organisation’s Product Reference Data to the comparator.

Here is a link to the currently running [CDS instance of the application](https://consumerdatastandardsaustralia.github.io/product-comparator-demo/).