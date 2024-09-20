#!/bin/bash

# Loop through all directories in the current working directory
for dir in */; do
	# Remove the trailing slash
	new_name="${dir%/}"
	# Replace spaces with underscores
	new_name="${new_name// /_}"

	# Rename the directory if the new name is different
	if [[ "$dir" != "$new_name/" ]]; then
		mv "$dir" "$new_name/"
		echo "Renamed '$dir' to '$new_name/'"
	fi
done
