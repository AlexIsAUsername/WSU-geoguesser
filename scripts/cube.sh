#!/bin/bash
OUTPUT=../output
# Create output directory if it doesn't exist
mkdir -p output
# Loop through each item in the current directory
for dir in */; do
	# Check if it's a directory
	if [ -d "$dir" ]; then
		# Navigate into the directory
		cd "$dir" || continue
		echo $(pwd)
		# Run the cube2sphere command with specified image files
		cube2sphere b.jpg f.jpg r.jpg l.jpg u.jpg d.jpg -o ${OUTPUT}/${dir%?}
		# Navigate back to the previous directory
		cd ..
		# Print the directory name
		echo "$dir"
		echo ""
	fi
done
cd output || return
for file in *0001*; do
	if [[ -e "$file" ]]; then
		new_name=$(echo "$file" | sed 's/0001//g')
		mv "$file" "$new_name"
	fi
done
