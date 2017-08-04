$(document).ready(function(){
  window.setInterval(cursor, 2000)
})


function cursor(){
  var pip = $('#id_text').val().substr($('#id_text').selectionEnd, $('#id_text').selectionStart).split('\n').length;

  console.log(pip)
  return 0

}
