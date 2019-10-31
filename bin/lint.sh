#!/bin/bash

SCRIPT_NAME="lint.sh"

HELP=false
FIX=false

# Parse command line args
POSITIONAL=()
while [[ $# -gt 0 ]]
do
    key="$1"

    case $key in
        --fix)
            FIX=true
            shift # past argument
            ;;
        -h|--help)
            # Clobber everything
            HELP=true
            shift # past argument
            ;;
        *)    # unknown option
            POSITIONAL+=("$1") # save it in an array for later
            shift # past argument
            ;;
    esac
done
set -- "${POSITIONAL[@]}" # restore positional parameters

# Unofficial Strict mode
set -euo pipefail
IFS=$'\n\t'

SCRIPTPATH="$( cd "$(dirname "$0")" ; pwd -P )"

if $HELP ; then
    echo "$SCRIPT_NAME initializes the imagine-grinnell rails application"
    echo "$SCRIPT_NAME [no parameters]"
    echo "  -h or --help         Print this message"
    echo "  --fix                Attempt to fix some of the errors found"
    exit 0
fi

ESLINT_COMMAND="yarn run eslint $SCRIPTPATH/../app"

if $FIX ; then
    eval $ESLINT_COMMAND --fix
else
    eval $ESLINT_COMMAND
fi
