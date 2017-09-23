GRAMMAR = grammar.ne
JS = grammar.js
OUT = derivacion.txt
TEST_STRING = "asd = 123 + 879"

all: build test

build:
	nearleyc $(GRAMMAR) -o $(JS)

test:
	nearley-test -i $(TEST_STRING) $(JS) -o $(OUT)