#!/bin/bash

(
    cd app
    npm install
    npm run dev
) &

(
    cd server
    npm install
    npm run start:dev
) &

wait