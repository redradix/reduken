#!/bin/bash
modules=(batch entities hash list requests)

for module in "${modules[@]}"
do
	npx tsc src/$module/*.ts -d --emitDeclarationOnly --outDir ./$module/ --lib es6,es2017 && echo "Generated types for $module"
done