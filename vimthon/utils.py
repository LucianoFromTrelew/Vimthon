import re

REGEX = ':(%|\d+,\d+)?s/(.+)/(.*)/g(i)?$'
RE_PER = '%'
RE_RNG = '\d+,\d+'


def reemplazar(texto, matches, cursor):
    
    flags = 0

    if(matches.group(4) != None):
        flags = re.IGNORECASE

    regex = re.compile(matches.group(2), flags)
    
    try:
        if(re.search(RE_PER, matches.group(1))):
            #reemplazo en todo el texto
            # print("reemplazar todo")
            return regex.sub(matches.group(3), texto)
        else:
        # elif(re.search(RE_RNG, matches.group(1))):
            # print("reemplazo en rango")
            nums = matches.group(1).split(',')
            minimo = int(nums[0])
            maximo = int(nums[1])
            print(minimo,maximo)
            lineas = splitear_lineas(texto)
            print('splitie')
            # print(lineas)
            print('vamo a imprimir')
            print(lineas[minimo-1:maximo])
            reemp = []
            for l in lineas[minimo-1:maximo]:
                reemp.append(re.sub(matches.group(2), matches.group(3), l, flags))
            
            lineas[minimo-1:maximo] = reemp
            #reemplazo en rango
            return "\n".join(lineas)
    except TypeError:
        #si la expr no es un "%" y el rango, cuando la queremos acceder para preguntar qué es, nos lanza la
        #excepción de TypeError

        #reemplazo en linea
        # print("reemplazo linea, cursor en {}".format(cursor))
        print("reemplazo linea")
        cursor_actual = linea_columna(texto, cursor)[0]
        lineas = splitear_lineas(texto)
        lineas[cursor_actual] = regex.sub(matches.group(3), lineas[cursor_actual])
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
    return [c for i in texto.split('\r') for c in i.split('\n') if c != '']