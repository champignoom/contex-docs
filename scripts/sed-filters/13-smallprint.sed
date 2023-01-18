/\\startSmallPrint/,/\\stopSmallPrint/ {
s/^\s*\\startSmallPrint.*/!!! note ""/; t
s/^\s*\\stopSmallPrint.*//; t
s/^/    /
}