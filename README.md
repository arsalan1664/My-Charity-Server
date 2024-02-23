# Charity Donation Website

Welcome to the Charity Donation Website project! This web application is designed to collect donations for your charity and provide an admin panel for managing donations.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Setting Up Stripe](#setting-up-stripe)
- [Admin Panel](#admin-panel)
- [GraphQL API](#graphql-api)
- [Contribution Guidelines](#contribution-guidelines)
- [License](#license)

## Features

- **Donation Collection**: Accept online donations securely using Stripe.
- **Admin Panel**: Manage donations, perform CRUD operations, and update admin credentials.
- **Authentication**: Secure admin authentication for accessing the admin panel.
- **GraphQL API**: Utilize GraphQL for efficient and flexible data queries.

## Tech Stack

- **Express**: Web application framework for Node.js.
- **GraphQL**: Query language for APIs, used for efficient data retrieval.
- **Stripe**: Payment processing integration for collecting donations.
- **MongoDB**: NoSQL database for storing donation and admin information.

## Getting Started

1.  Clone the repository:

    ```bash
    git clone https://github.com/your-username/charity-donation-website.git
    cd charity-donation-website

    ```

2.  Install dependencies:

    npm install

3.  Set up environment variables (see Environment Variables):

4.  Run the application:

    npm run dev

5.  Create a .env file in the root directory and configure the following variables::

    ## Express Server

    PORT=3000

    ## MongoDB

    MONGODB_URI=mongodb://localhost:27017/charity-donation

    ## JWT Secret Key for Admin Authentication

    JWT_SECRET=your-secret-key

    ## Stripe API Key

    STRIPE_SECRET_KEY=your-stripe-secret-key
    STRIPE_PUBLIC_KEY=your-stripe-public-key
    STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret

    Setting Up Stripe

    Create a Stripe account: Stripe Dashboard.
    Obtain your Stripe API keys and webhook secret.
    Set the STRIPE_SECRET_KEY, STRIPE_PUBLIC_KEY, and STRIPE_WEBHOOK_SECRET in the .env file.

6.  Admin Panel:

    Access the admin panel at http://localhost:5173/panel:

        Username: admin (initially)
        Password: admin (initially)

    You can change the admin username and password from the admin panel.
    GraphQL API

    Access the GraphQL Playground at http://localhost:4000/graphql to interact with the GraphQL API.
    Contribution Guidelines

    Feel free to contribute by opening issues or submitting pull requests. Please follow the contribution guidelines.

7.  Admin Panel:

    This project is licensed under the MIT License - see the LICENSE file for details.

    Customize this template according to your project's specific details and features. Additionally, consider adding sections like deployment instructions, testing procedures, or any other relevant information for contributors and users.
