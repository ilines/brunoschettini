var httprequest = "http://localhost/brunoschettini/";
$(function () {
    $('input:submit').click(function () {
        var $this = $(this);
        $($this.get(0).form).submit(function (e) {
            e.preventDefault();
            $(this).sweet({'dataAction': $this.attr('id')});
            return false;
        });
    });
    $('.sweet-ready').ready(function () {
        $(this).sweet();
    });
    $('.sweet-click').click(function (e) {
        e.preventDefault();
        $(this).sweet();
    });
    $('.sweet-mouseup').mouseup(function () {
        $(this).sweet();
    });
    $('.sweet-mousedown').mousedown(function () {
        $(this).sweet();
    });
    $('.sweet-mousemove').mousemove(function () {
        $(this).sweet();
    });
    $('.sweet-keypress').keypress(function () {
        $(this).sweet();
    });
    $('.sweet-keyup').keyup(function () {
        $(this).sweet();
    });
    $('.sweet-keydown').keydown(function () {
        $(this).sweet();
    });
});

(function ($) {
    $.fn.sweet = function (parameters) {
        var showErros = false;
        parameters = $.extend({
            'id': '', // id
            'name': '', // name (form name)
            'method': 'post', // method (post / get)
            'controller': '', // class, bean, controller, processing
            'action': 'index.php', // selector
            'dataType': '*', // type
            'dataTable': 'false', // data grid
            'dataTypeRequest': '', // data type request (text, html, *, json)
            'selectorLoading': '', // selector loading show
            'dataLoadingClass': '', // selector loading class
            'dataLoadingText': '', // selector text
            'dataEvent': '', // event (click, change)
            'selector': '', // selector
            'selectorReturn': '', // selector return
            'class': '', // class
            'data': '', // data
            'isajax': 'true', // ajax
            'dataListener': '', // listener
            'dataAction': '', // action, method, page
            'updateArray': Array(), // events after request
            'this': '', // this - use exclusive of the plugin
            'console': '', // this - use exclusive of the plugin
            'inputs': Array() // inputs -  use exclusive of the plugin
        }, parameters);
        var methods = {
            success: function (object) {
                if (object.dataType === '*') {
                    return;
                }
                if (object.dataType === 'html') {
                    $(object.selectorReturn).html(object.data);
                    return;
                }
                if (object.dataType === 'append') {
                    $(object.selectorReturn).append(object.data);
                    return;
                }
                var node = '';
                var $this;
                try {
                    if ($(object.selectorReturn) !== '') {
                        $this = $(object.selectorReturn);
                        node = $this.get(0).nodeName;
                    }
                } catch (err) {
                    return;
                }
                if (node === 'TABLE' && $this.data('table') !== undefined) {
                    if (object.data === undefined) {
                        return;
                    }
                    var dataEdit = $(object.selectorReturn).data('edit') ? $(object.selectorReturn).data('edit') : false;
                    var dataEmpty = $(object.selectorReturn).data('empty-message') ? $(object.selectorReturn).data('empty-message') : 'No results search!';
                    var dataRowsCount = $(object.selectorReturn).data('rows-count') ? $(object.selectorReturn).data('rows-count') : 0;
                    if (dataEdit) {
                        dataEdit = '';
                        var result;
                        try {
                            result = JSON.parse(object.data) ? JSON.parse(object.data) : '';
                        } catch (err) {
                            return;
                        }
                        if (result.length === 0) {
                            $(object.selectorReturn).append('<tbody><tr><td colspan="500">' + dataEmpty + '</td></tr></tbody>');
                            return;
                        }
                        //                    $(object.selectorReturn + ' tbody tr').each(function(i, row) {
                        //                        if (row.attr('data-row').empty()) {
                        //                            $(row).parent('td').each(function(j, cel) {
                        //                                $.each(result, function(k) {
                        //                                    alert(result[k].usuario);
                        //                                });
                        //                            });
                        //                        }
                        //                    });
                    }
                    //                if (dataRowsCount > 0) {
                    //                    $(object.selectorReturn).prepend('<tfoot><tr><td colspan="500">' + dataRowsCount + '</td></tr></tbody>');
                    //                }
                    return;
                }
                var $tagsA = new Array('SPAN', 'DIV');
                var $tagsB = new Array('INPUT');
                for (var i = 0; i < $tagsB.length; i++) {
                    if (node === $tagsB[i]) {
                        $(object.selectorReturn).attr('value', object.data);
                        break;
                    }
                }
                if (object.dataType !== 'html' && object.dataType !== '*' && object.dataType !== 'append') {
                    for (var i = 0; i < $tagsA.length; i++) {
                        if (node === $tagsA[i]) {
                            $(object.selectorReturn).html(object.data);
                        }
                    }
                }
                return object;
            },
            input: function (object, input) {
                var dataRequest;
                var $this = input;
                if ($this.data('config') !== undefined) {
                    dataRequest = eval("(" + $this.data('config') + ")");
                    $.extend(object, dataRequest);
                }
                $.extend(object, {
                    'dataAction': $this.data('action'),
                    'updateArray': $this.data('update') ? $this.data('update').split(',') : Array(),
                    'dataTable': $this.data('table') ? $this.data('table') : 'false'
                });
                if ($this.data('loading') !== undefined) {
                    $.extend(object, {'dataLoading': $this.data('loading')});
                    $.extend(object, {
                        'dataLoadingClass': $this.data('loading-class') ? $this.data('loading-class') : '',
                        'dataLoadingText': $this.data('loading-text') ? $this.data('loading-text') : ''
                    });
                }
                if ($this.data('return') !== undefined) {
                    if ($this.data('return') === 'this' || $this.data('return') === undefined) {
                        $.extend(object, {'selectorReturn': $this});
                    } else {
                        $.extend(object, {'selectorReturn': $this.data('return')});
                    }
                }
                $.extend(object, {
                    'dataType': $this.data('return-type') ? $this.data('return-type') : '',
                    'dataListener': $this.data('listener') ? $this.data('listener') : '',
                    'dataTypeRequest': $this.data('type') ? $this.data('type') : ''
                });
                return object;
            },
            beforeSend: function (settings) {
                if (settings.selectorLoading !== '') {
                    $(settings.selectorLoading).addClass(settings.class);
                }
            },
            complete: function (settings) {
                if (settings.selectorLoading !== '') {
                    $(settings.selectorLoading).removeClass(settings.class);
                }
            },
            listener: function (settings) {
                if (settings) {
                    $.extend(parameters, eval("(" + settings + ")"));
                }
                var ajaxsettings = {
                    'type': parameters.method,
                    'url': httprequest + 'index.php',
                    'cache': 'false',
                    'dataType': parameters.dataType
                };
                var $dataForm = eval("(" + settings + ")");
                $.extend(ajaxsettings, parameters);
                $.ajaxSetup(ajaxsettings);
                $.ajax({data: $dataForm});
            },
            empty: function () {
                try {
                    return jQuery(this).length > 0;
                } catch (err) {
                    return false;
                }
            }
        };

        // VARIÁVEIS JSON

        var objectjson = {
            'redirect': '' // redirect
        };



        return this.each(function () {
            var $this = $(this);
            var nodeName = $this.get(0).nodeName;
            var isForm = false;
            if (nodeName === 'FORM') {
                if ($this.attr('name') === '') {
                    return;
                }
                isForm = true;
                alert($this.attr('name'));
                $.extend(parameters, {'name': $this.attr('name'), 'method': $this.attr('method') ? $this.attr('method') : 'post', 'action': $this.attr('action') ? $this.attr('action') : 'index.php'});
                $.extend(parameters, {'id': parameters.name.toLowerCase(), 'controller': parameters.name});
                $.extend(parameters, {'inputs': $('#' + parameters.id + ' :input')});
                parameters.inputs.each(function () {
                    if ($(this).attr('id') === parameters.dataAction) {
                        $.extend(parameters, methods.input(parameters, $(this)));
                    }
                });
                if (parameters.dataAction === undefined && parameters.dataAction === '') {
                    return;
                }
            } else {
                $.extend(parameters, methods.input(parameters, $(this)));
            }
            var ajaxsettings = {
                'type': parameters.method,
                'url': httprequest + parameters.action,
                'cache': 'false',
                'dataType': parameters.dataType
            };
            if (parameters.dataListener !== '') {
                methods.listener(parameters.dataListener);
            }
            if (isForm) {
                var $dataForm = $this.serialize();
                $dataForm = $dataForm + '&' + $.param({'controller': parameters.request, 'action': parameters.dataAction});
            } else {
                $dataForm = $.param({'controller': parameters.config});
            }
            $.extend(ajaxsettings, parameters);
            $.ajaxSetup(ajaxsettings);
            $.ajax({
                data: $dataForm,
                beforeSend: function () {
                    methods.beforeSend(parameters);
                },
                success: function (data) {
                    try {
                        var dataJSON = JSON.parse(data) ? JSON.parse(data) : 'null';
                    } catch (err) {
                        var dataJSON = null;
                    }
                    $.extend(objectjson, dataJSON);
                    if (objectjson !== null) {
                        if (objectjson.redirect !== '') {
                            window.location = objectjson.redirect;
                        }
                    }
                    if (parameters.dataTypeRequest === parameters.dataType) {
                        $.extend(parameters, methods.success({'selectorReturn': parameters.selectorReturn, 'dataType': parameters.dataType, 'data': data, 'this': $this}));
                    } else {
                        $.extend(parameters, methods.success({'selectorReturn': parameters.selectorReturn, 'dataType': parameters.dataTypeRequest, 'data': data, 'this': $this}));
                    }
                },
                complete: function () {
                    if (parameters.updateArray.length > 0) {
                        for (var i = 0; i < parameters.updateArray.length; i++) {
                            var f = $.trim('#' + parameters.updateArray[i]);
                            var fThis = $(f);
                            if (fThis.get(0).nodeName === 'SELECT') {
                                fThis.change();
                            } else {
                                fThis.click();
                            }
                        }
                    }
                    methods.complete(parameters);
                },
                statusCode: {
                    404: function () {
                        alert("page not found, required index.php");
                    }
                }
            }).done(function () {
                if (showErros) {
                    alert(console.error);
                }
            });
//            input.bind('sweet',keypressEvent);
//            input.bind('sweet',keydownEvent);
//            input.bind('sweet',blurEvent);
//            input.bind('sweet',focusEvent);        
            function preventDefault(e) {
                if (e.preventDefault) { //standard browsers
                    e.preventDefault();
                } else { // internet explorer
                    e.returnValue = false;
                }
            }
        });
        return this;
    };

})(jQuery);

$('.sweet-form').ready(function () {
    $('.sweet-form').each(function () {
        var name = $(this).attr('name');
        var id = $(this).attr('id') ? $(this).attr('id') : name.toLowerCase();
        var enctype = $(this).attr('enctype') ? $(this).attr('enctype') : 'application/x-www-form-urlencoded';
        var method = $(this).attr('method') ? $(this).attr('method') : 'post';
        $(this).attr({'data-action': name, 'data-id': name.toLowerCase(), 'id': id, 'action': 'index.php', 'method': method, 'enctype': enctype});
        var inputsButton = $('#' + id + ' :input[type="submit"]');
        var values = {};
        var idNumber = 1;
        inputsButton.each(function () {
            if ($(this).attr('id') === undefined) {
                values[this.name] = $(this).val();
                if (this.name === 'undefined') {
                    $(this).attr('id', id + ':inputsubmit:' + idNumber);
                } else {
                    $(this).attr('id', id + ':' + values[this.name]);
                }
            }
            idNumber++;
        });
        var inputsText = $('#' + id + ' :input[type="text"]');
        inputsText.each(function () {
            if ($(this).attr('id') === undefined) {
                $(this).attr('id', id + ':inputtext:' + idNumber);
            }
            idNumber++;
        });

    });
    return this;
});
$('.sweet-datatable').ready(function () {
    $('.sweet-datatable').each(function () {
        var dataEmpty = $(this).data('empty-message') ? $(this).data('empty-message') : 'No results search!';
        //$(this).append('<tbody><tr><td colspan="500">' + dataEmpty + '</td></tr></tbody>');
        var textHeader = $(this).data('table-header-text') ? $(this).data('table-header-text') : '';
        if (textHeader !== '') {
            $(this).prepend('<thead><tr><th colspan="500" style="text-align: center;">' + textHeader + '</th></tr></thead>');
        }
        var textFooter = $(this).data('table-header-text') ? $(this).data('table-footer-text') : '';
        if (textFooter !== '') {
            $(this).append('<tfoot><tr><th colspan="500" style="text-align: center;">' + textFooter + '</th></tr></tfoot>');
        }
        var dataConfig = $(this).data('config') ? $(this).data('config') : '';
        //eval("(" + dataConfig + ")");
        $(this).sweet(dataConfig);
    });
    return this;
});