:l /\\startsubsubsubject[^]]*$/{N; t l}
s/\s*\\startsubsubsubject.*title=([^]]*)].*/#### \1/
s/\s*\\stopsubsubsubject\s*$//