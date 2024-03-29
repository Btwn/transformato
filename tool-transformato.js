const fs = require('fs')
const path = require('path')
const chardet = require('chardet')
const Filequeue = require('filequeue')
const fq = new Filequeue(1000)   // Maximo de numero de archivos abiertos a la vez
//const carpeta= 'Archivos/'
//const nuevaCarpeta= 'ArchivosNEW/'
const carpeta = 'C:/Users/lapena/Documents/Luis Angel/Intelisis/SQL3100/'
const nuevaCarpeta = 'C:/Users/lapena/Documents/Luis Angel/Intelisis/NuevoSQL3100/'
const codificaciones = ['ISO-8859-1','ISO-8859-2','ISO-8859-3','ISO-8859-4','ISO-8859-5','ISO-8859-6','ISO-8859-7','ISO-8859-8','ISO-8859-9']
let contador = 1

function comprobar (carpeta, archivos) {
  let contador1 = 1
  filtrarExtension(archivos).map(function(archivo) {
    return path.join(carpeta, archivo)
  }).filter(function(archivo) {
    console.log('Filtrando contenido:  ' + contador1++)
    return fs.statSync(archivo).isFile()
  }).forEach(function(archivo) {
    leerArchivo(archivo, detectarCodificacion(archivo))
  })
}

function leerArchivo (archivo, codificacionFinal) {
  let texto = ''
  fq.readFile(archivo, codificacionFinal, function(err, data) {
    if (err) {
      console.log('error: ', err)
    } else {
      texto = data
    }
    remplazarTexto(archivo, texto, codificacionFinal)
  })
}

function transformar (texto) {
  texto = texto.replace(/\/(\*)+(|\n+.*)([^*]*(?:\*(?!)[^*]*)*(\*+)(\/))/g, '')
  texto = texto.replace(/\/\*([^*]*)(|[*]+|(([*]+[^*]+)*?))\*\//g, '')
  texto = texto.replace(/(\-\-+).*/gm, '')
  texto = texto.replace(/with\(nolock\)|with \(nolock\)/mig, '')
  texto = texto.replace(/with\(rowlock\)|with \(rowlock\)/mig, '')
  texto = texto.replace(/((?=[\ \t])|^\s+|$)+/mg, '')
  texto = texto.replace(/\t/mg, ' ')
  texto = texto.replace(/((?=\s(\@|\(|\=|\<|\>|\[|\]|\*|\.|\&|\,|\'|\-|\,\@|\]\(|\#|\=\@|\(\@|\/|\+|\s\w+\+|\w+)))|((?=\n)|\s)/gm, '')
  texto = texto.replace(/((?=\s(\@|\(|\=|\<|\>|\[|\]|\*|\.|\&|\,|\'|\-|\,\@|\]\(|\#|\=\@|\(\@|\/|\+|\s\w+\+|\w+)))|((?=\n)|\s)/gm, '')
  return texto
}

function remplazarTexto (archivo, texto, codificacionFinal) {
  contador = 0
  fq.writeFile(nuevaCarpeta+archivo.replace(/(|.*?)(\\\w+)+\\|\w+\\/g, ''), transformar(texto), codificacionFinal, function (err) {
    if (err) {
      return console.log(err)
    }
    console.log(contador++ + '.- ' + archivo.replace(/(|.*?)(\\\w+)+\\|\w+\\/g, '')+' CODIFICACION:   ' + codificacionFinal +'*************')
  })
}

function codificarASCII (codificacionInicial) {
  for(let i = 0; i<codificaciones.length; i++) {
    if (codificacionInicial == codificaciones[i]) {
      return true
    } else {
      return false
    }
  }
}

function detectarCodificacion (archivo) {
  console.log('Detectando codificacion '+ contador++)
  let codificacionInicial = ''
  codificacionInicial  = chardet.detectFileSync(archivo)
  if (codificarASCII(codificacionInicial) == true) {
    return 'ASCII'
  } else if (codificacionInicial == 'UTF-8') {
    return 'UTF-8' 
  } else if (codificacionInicial == 'UTF-16LE' | codificacionInicial == 'UTF-32LE') {
    return 'UTF-16LE' 
  } else {
    return codificacionInicial
  }
}

function filtrarExtension (archivos) {
  return archivos.filter(archivo => /.\.txt|\.sql|\.vis|\.frm|\.esp|\.tbl|\.rep|\.dlg$/i.test(archivo))
}

fs.readdir(carpeta, function(error, archivos) {
  if (error) throw error
  console.log('Cargando espera...')
  comprobar(carpeta, archivos)
})