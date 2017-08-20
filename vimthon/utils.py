import re

VIM_REGEX = re.compile(r':(%|\d+,\d+)?s/(.+)/(.*)/g(i)?$')
RE_PER = re.compile(r'%')
RE_RNG = re.compile(r'\d+,\d+')


def reemplazar(texto, matches, cursor):
    
    flags = 0

    if(matches.group(4) != None):
        flags = re.IGNORECASE

    substitute = matches.group(1)
    search = re.compile(matches.group(2), flags)
    repl = matches.group(3)

    try:
        if(RE_PER.search(substitute)):
            #reemplazo en todo el texto
            return search.sub(repl, texto)
        else:
            nums = substitute.split(',')
            minimo = int(nums[0])
            maximo = int(nums[1])
            lineas = splitear_lineas(texto)
            reemp = []
            for l in lineas[minimo-1:maximo]:
                reemp.append(search.sub(repl, l, flags))
            
            lineas[minimo-1:maximo] = reemp
            #reemplazo en rango
            return "\n".join(lineas)
    except TypeError:
        #si la expr no es un "%" y el rango, cuando la queremos acceder para preguntar qué es, nos lanza la
        #excepción de TypeError

        #reemplazo en linea
        cursor_actual = linea_columna(texto, cursor)[0]
        lineas = splitear_lineas(texto)
        lineas[cursor_actual] = search.sub(repl, lineas[cursor_actual])
        return "\n".join(lineas)

def linea_columna(cadena, pos):
    linea = 0
    todo = splitear_lineas(cadena)
    col = pos
    while (col - (len(todo[linea]))) > 0:
        col = col-(len(todo[linea])+1)
        linea+=1
    return (linea,col+1)

def splitear_lineas(texto):
    return [c for c in texto.split('\r' + '\n') ]