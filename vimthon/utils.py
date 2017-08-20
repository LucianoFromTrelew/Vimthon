import re

VIM_REGEX = re.compile(r':(%|\d+,\d+)?s/(.+)/(.*)/g(i)?$')
RE_PER = re.compile(r'%')
RE_RNG = re.compile(r'\d+,\d+')


def reemplazar(texto, matches, cursor):
    
    def repl_all():
        return search.sub(repl, texto)

    def repl_range():
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
    
    def repl_line():
        cursor_actual = linea_columna(texto, cursor)[0]
        lineas = splitear_lineas(texto)
        lineas[cursor_actual] = search.sub(repl, lineas[cursor_actual])
        return "\n".join(lineas)

    flags = 0

    if(matches.group(4) != None):
        flags = re.IGNORECASE

    substitute = matches.group(1)
    search = re.compile(matches.group(2), flags)
    repl = matches.group(3)

    reemplazos = {RE_PER: repl_all, RE_RNG: repl_range}
    
    lista_func = []
    try:
        # Buscamos la opcion que matchee con la que nos pasaron
        lista_func = list(filter(lambda x: re.match(x[0], substitute), reemplazos.items()))
    except TypeError:
        # Si no es el % ni el rango, entonces es el reemplazo en linea
        lista_func.append(('', repl_line))
    
    # ejecutamos la funcion correspondiente
    return (lista_func[0])[1]()

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