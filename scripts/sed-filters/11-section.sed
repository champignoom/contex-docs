:l /\\startsection[^]]*$/{N; t l}
s/\s*\\startsection.*title=([^]]*)].*/## \1/
s/\s*\\stopsection\s*$//