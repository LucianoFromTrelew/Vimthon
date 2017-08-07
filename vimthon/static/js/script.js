$(document).ready(function(){
    $('#text_form').submit(function(event){
        var position = cursor();
        var datis;
        $.ajax({
            url: '/cursor',
            data: {
                'cursor':position,
            },
            dataType: 'json',
            success: function (data){
                window.alert('hol')    
            }
        });


    });
})


function cursor(){
    var pip = $('#id_text').val().substr($('#id_text')[0].electionEnd, $('#id_text')[0].selectionStart).split('\n').length;

    var start = $('#id_text')[0].selectionStart;
    var end = $('#id_text')[0].selectionEnd;

    return (start==end) ? start : -1;
}
