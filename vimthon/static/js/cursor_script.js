$(document).ready(function(){
    $('#text_form').submit(function(event){
        var position = cursor();
        console.log('hola k ase');
        $.ajax({
            type: "POST",
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
    var start = $('#text')[0].selectionStart;
    var end = $('#text')[0].selectionEnd;
    return (start==end) ? start : -1;
}
