# Product Comparator (Demo)

## Overview

The Consumer Data Right (CDR) Product Comparator is an [open-source](https://opensource.com/resources/what-open-source), proof of concept (PoC) project, developed in React, for the CDR community. This tool allows users to compare financial products by accessing data directly from unauthenticated APIs of registered Data Holders.

## Using the Product Comparator

The Data Standards Body offers a [live demo](https://consumerdatastandardsaustralia.github.io/product-comparator-demo/) of the Product Comparator, accessible online for immediate use without any setup. This instance enables users to:

- View a comprehensive list of registered Data Holder Brands and their public details, automatically sourced from the CDR Register and updated within the tool.
- Temporarily add Data Holder brands and their server URLs using the 'Add' button.
- Fetch product data from the unauthenticated CDR product APIs (PRD), health check status data from the Status APIs and scheduled outage data from the Outages APIs for testing and verification.
- Compare products openly offered to the market by the Data Holders, displayed on a user-friendly, responsive webpage.
- Access a detailed log of API calls and responses for debugging Data Holder implementations.

Additionally, you can set up a local instance of the Product Comparator demo for customised and extended use cases. For more information, refer to the **Local Setup and Customisation** section below.

## Local Setup and Customisation

### Prerequisites

Before you begin, ensure you have the following installed:

- Git, for cloning the repository.
- [Node.js](https://nodejs.org/en/) (v10 or higher).
- npm (Node Package Manager) - **included with Node.js installation**.
- [Yarn](https://yarnpkg.com/) (Optional but preferred) - Javascript package manager

### Installation

1. Create a fork of this repository. To do this, click the **Fork** button in the top right corner of the GitHub [repository home page](https://consumerdatastandardsaustralia.github.io/product-comparator-demo/).
    
2. After forking the repository, clone it to your local machine. You can do this by running the following command in your terminal or command prompt:
    
    ```shell
    git clone https://github.com/your-username/project-name.git
    ```
    
    Replace **`your-username`** with your GitHub username and **`project-name`** with the name of your repository.
    
3. Once the repository is cloned, navigate to the project directory by running:
    
    ```
    cd project-name
    ```
    
    Replace **`project-name`** with the name of the repository.
    
4. Finally, install all necessary dependencies by running the following command in the project directory:
    
    ```shell
    npm install
    ```
    
    Or, if you prefer using Yarn:
    
    ```shell
    yarn install
    ```
    

### Run

1. Start the development server locally by running the following command in the project directory:
    
    ```shell
    npm run start
    ```
    
    Or, if you are using Yarn:
    
    ```shell
    yarn start
    ```
    
2. Open your web browser and navigate to http://localhost:3000 to access the CDR Product Comparator (Demo) application.

### Build

1. Customise the project as needed for your specific use case.
2. Run `npm run build` OR `yarn build` to build production release

## Contribution Process

We welcome contributions from the community! If you'd like to contribute to this project, please follow these simple steps:

1. Create a new branch for your work from the `master` branch:
    
    ```
    git checkout -b feature/your-feature-name
    ```
    
2. Begin making your changes or contributions.
3. Follow the instructions in the project repository to run and test your changes locally.
4. Commit your changes with clear and concise commit messages.
5. Push your changes to your forked repository.
6. Open a pull request (PR) using the _master_ branch in the [original repository](https://github.com/ConsumerDataStandardsAustralia/product-comparator-demo) as the destination branch. Include a detailed description of your changes and the problem you are addressing.
7. Engage in the discussion on your PR and make any necessary adjustments based on feedback from maintainers and other contributors.
8. Once your PR is approved and all tests pass, it will be merged into the project.

### Note:

Please ensure your contributions align with our project's objectives and [guidelines](https://d61cds.notion.site/Contribution-Guidelines-8b99d030fea946668fbc75444197e68b?pvs=4).

## Reporting Issues

Encountered an issue? We're here to help. Please visit our [issue reporting guidelines](https://d61cds.notion.site/Issue-Reporting-Guidelines-71a329a0658c4b69a232eab95822509b?pvs=4) for submitting an issue.

## Stay Updated

Join our newsletter to receive the latest updates, release notes, and alerts. [Subscribe here](https://consumerdatastandards.us18.list-manage.com/subscribe?u=fb3bcb1ec5662d9767ab3c414&id=a4414b3906).

## License

The artefact is released under the [MIT License](https://github.com/ConsumerDataRight/mock-register/blob/main/LICENSE), which allows the community to use and modify it freely.

## Disclaimer

The artefacts in this repository are offered without warranty or liability, in accordance with the [MIT licence.](https://github.com/ConsumerDataStandardsAustralia/java-artefacts/blob/master/LICENSE)

[The Data Standards Body](https://www.csiro.au/en/News/News-releases/2018/Data61-appointed-to-Data-Standards-Body-role) (DSB) develops these artefacts in the course of its work, in order to perform quality assurance on the Australian Consumer Data Right Standards (Data Standards).

The DSB makes this repository, and its artefacts, public [on a non-commercial basis](https://github.com/ConsumerDataStandardsAustralia/java-artefacts/blob/master/LICENSE) in the interest of supporting the participants in the CDR ecosystem.

The resources of the DSB are primarily directed towards assisting the [Data Standards Chair](https://consumerdatastandards.gov.au/about/) for [developing the Data Standards](https://github.com/ConsumerDataStandardsAustralia/standards).

Consequently, the development work provided on the artefacts in this repository is on a best-effort basis, and the DSB acknowledges the use of these tools alone is not sufficient for, nor should they be relied upon with respect to [accreditation](https://www.accc.gov.au/focus-areas/consumer-data-right-cdr-0/cdr-draft-accreditation-guidelines), conformance, or compliance purposes.