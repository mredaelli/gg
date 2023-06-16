## Frontend

A [SolidJS](https://www.solidjs.com/) application configured 
to be deployed as an Azure Static Web application.

## Api

Azure Functions to support the frontend in a serverless fashion.

Initially they were supposed to be deployed as managed functions 
in the same static web app, but apparently those do not support SQL
bindings, so they are deployed separately.

## Express

Turns out it was faster to write a super-simple express microservice
to test the frontend than to figure out how to run the Azure functions
locally, managing database connection and authentication (and working 
around errors running them in NixOS).
