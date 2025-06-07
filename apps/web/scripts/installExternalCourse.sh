#!/usr/bin/env bash

set -euo pipefail

source ../../config/vars.env
# IF THIS FAILED: check that LibreLingo/config/vars.env exists. if not, copy vars.env.example to vars.env
echo "Librelingo root dir: $LIBRELINGO_ROOT_DIR"

wget "$1" -O temp.zip
unzip temp.zip "*/course/*" -d $LIBRELINGO_ROOT_DIR/courses/"$2"
mv $LIBRELINGO_ROOT_DIR/courses/"$2"/*/course/* $LIBRELINGO_ROOT_DIR/courses/"$2"
rm temp.zip
