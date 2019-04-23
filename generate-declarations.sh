#!/bin/bash
modules=(hash)

for module in "${modules[@]}"
do
	npx tsc src/$module/*.ts -d --emitDeclarationOnly --outDir lib/$module/ --lib es6 && cat lib/$module/actions.d.ts lib/$module/selectors.d.ts >> lib/$module/index.d.ts
done