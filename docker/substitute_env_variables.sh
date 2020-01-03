#!/bin/bash

# The first parameter is the path to the file which should be substituted
if [[ -z $1 ]]; then
    echo 'ERROR: No target file given.'
    exit 1
fi

# Parse variables.ini file for variable names to form a substitution string for envsubst
# e.g.
# $ cat variables.ini
# URL
# USER
# KEY
# will produce VARIABLES="\$URL \$USER \$KEY"
VARIABLES=""
while IFS= read -r line; do
   VARIABLES="${VARIABLES}\\"
   VARIABLES="${VARIABLES}\$${line} "
done < variables.ini

# The included envsubst command (not available in every docker container) will substitute the variables for us.
# They should have the format ${TEST_ENV} or $TEST_ENV
# For more information look up the command here: https://www.gnu.org/software/gettext/manual/html_node/envsubst-Invocation.html
envsubst "${VARIABLES}" < "$1" > "$1".tmp && mv "$1".tmp "$1"

# Set DEBUG=true in order to log the replaced file
if [[ "$DEBUG" = true ]] ; then
  exec cat $1
fi

# Execute all other commands with parameters
exec "${@:2}"
