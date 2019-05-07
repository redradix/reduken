#!/bin/bash

# Define all the modules
modules=(batch entities hash list requests)

# For each module generate the types
for module in "${modules[@]}"
do
	npx tsc src/$module/*.ts -d --emitDeclarationOnly --outDir ./$module/ --lib es6,es2017 && echo "Generated types for $module"
done

echo "Finish generating types"