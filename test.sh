#!/usr/bin/env bash
pushd api
npm run test
popd
pushd frontend
npm run test
popd
