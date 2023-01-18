#/usr/bin/bash

DIR="$(dirname "$0")"

if [ "$#" -ne 1 ]; then echo "format: SCRIPT input-file.tex" 1>&2; exit 1; fi

tmpfile=$(mktemp)
cat $1 >"$tmpfile"

for filter in $DIR/sed-filters/*; do
    echo "filtering with script $filter" 1>&2
    sed -Ef "$filter" -i "$tmpfile"
done

cat "$tmpfile"
rm "$tmpfile"