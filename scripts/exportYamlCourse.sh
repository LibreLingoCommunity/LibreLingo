#!/bin/bash

set -euo pipefail

source config/vars.env
echo "Librelingo root directory: $LIBRELINGO_ROOT_DIR"

cd $LIBRELINGO_ROOT_DIR/src/

echo -en "⏳ Exporting course $1"

if pdm run export-course $LIBRELINGO_ROOT_DIR/courses/"$1" $LIBRELINGO_ROOT_DIR/apps/web/src/courses/"$1"; then
  echo -en "\r\033[K✅ Exported course $1"
else
  echo -en "\r⚠️  Couldn't export course $1"
  exit 1
fi
echo
