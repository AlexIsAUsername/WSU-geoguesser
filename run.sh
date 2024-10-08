#!/bin/bash

if which tmux >/dev/null; then
	echo "You are running in tmux"
	tmux new-session -d -s geo

	tmux send-keys -t geo "cd backend" ENTER
	tmux send-keys -t geo "npm i" ENTER
	tmux send-keys -t geo "npm run dev" ENTER

	tmux split-window -h -t geo
	tmux send-keys -t geo:0 "cd frontend" ENTER
	tmux send-keys -t geo:0 "npm i" ENTER
	tmux send-keys -t geo:0 "npm run dev" ENTER

	tmux attach-session -t geo
else
	echo "Running normally"
	cd backend
	npm i
	npm run dev &
	cd ../frontend
	npm i
	npm run dev
fi
