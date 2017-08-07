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
    var start = $('#id_text')[0].selectionStart;
    var end = $('#id_text')[0].selectionEnd;
    return (start==end) ? start : -1;
}
