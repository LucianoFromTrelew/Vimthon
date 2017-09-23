GRAMMAR = grammar.ne
JS = grammar.js
OUT = derivacion.txt
Q_OUT = derivacion_quiet.txt
TEST_STRING = "asd = 123 + 879"

all: build full quiet

quiet: 
	nearleyc $(GRAMMAR) -o $(JS) && nearley-test -q -i $(TEST_STRING) $(JS) -o $(Q_OUT)

build:
	nearleyc $(GRAMMAR) -o $(JS)

full:
	nearley-test -i $(TEST_STRING) $(JS) -o $(OUT)