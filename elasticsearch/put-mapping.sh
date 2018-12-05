#!/usr/bin/env bash

index=$1

curl -X PUT -H Content-type:application/json localhost:9200/$index?pretty -d @mapping_$index.json

