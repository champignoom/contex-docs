:l /\\quotation[{]([^{}}]*)$/{N; t l}
s#\\quotation[{]([^{}}]*)[}]#“\1”#g