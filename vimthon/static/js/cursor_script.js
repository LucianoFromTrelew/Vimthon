$(document).ready(function(){
    $('#text_form').submit(function(event){
        var position = cursor();
        $.ajax({
            type: "POST",
            url: '/cursor',
            data: {
                'cursor':position,
            },
            dataType: 'json',
            success: function (data){}
        });


    });
})


function cursor(){
    var start = $('#text')[0].selectionStart;
    var end = $('#text')[0].selectionEnd;
    return (start==end) ? start : -1;
}
