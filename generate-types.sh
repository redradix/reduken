#!/bin/bash
modules=(entities hash list pagination set requests)

for module in "${modules[@]}"
do
	npx tsc src/$module/*.ts -d --emitDeclarationOnly --outDir lib/$module/ --lib es6 && echo "Generated types for $module"
done