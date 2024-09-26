#!/bin/bash

cd frontend
npm i
npm run dev &
cd ..
cd backend
npm i
npm run dev
