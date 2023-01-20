# 1,/\\startchapter/{/\\startchapter/!d}
# :l /\\startchapter[^]]*$/{N; t l}
# s/\s*\\startchapter.*title=([^]]*)].*/# \1/
# s/\s*\\stopchapter\s*$//
# s/\s*\\TocChap\s*$//