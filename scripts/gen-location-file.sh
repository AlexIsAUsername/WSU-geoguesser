#!/bin/bash

IMAGE_DIR="../backend/images"
OUTPUT_FILE="locations.json"

echo "[" > $OUTPUT_FILE # want array of json so we can index it (hopefully?)
for file in "$IMAGE_DIR"/*; do
    filename=$(basename "$file")
    
    echo "    {" >> $OUTPUT_FILE
    echo "        \"path\": \"$IMAGE_DIR/$filename\"," >> $OUTPUT_FILE
    echo "        \"point\": {" >> $OUTPUT_FILE
    echo "              \"x\": 0.00000," >> $OUTPUT_FILE # will still have to manually label of these things, but better than doing all this manually
    echo "              \"y\": 0.00000," >> $OUTPUT_FILE
    echo "              \"z\": 0.00000" >> $OUTPUT_FILE
    echo "        }" >> $OUTPUT_FILE
    echo "    }," >> $OUTPUT_FILE
done

# aparrently this sed will delete the last comma according to the internet
sed -i '$ s/,$//' $OUTPUT_FILE


echo "]" >> $OUTPUT_FILE 


mv $OUTPUT_FILE ../backend

#! STILL NEED TO MANUALLY REPLACE '../backend' with nothing.
# im sure there is some sed command that could fix this, but id rather not tbh


# im leaving it as '/images/[image].png' so hopefully its less to parse if we keep
# the '/' at the start of the path, even tho its not abs