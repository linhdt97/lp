<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title></title>
    <link rel="stylesheet" type="text/css" href="{!! asset('css/bootstrap.min.css') !!}">
    <link rel="stylesheet" type="text/css" href="{!! asset('css/style.css') !!}">
</head>
<body id="app-layout" class="login-page">
    <nav class="navbar navbar-default navbar-static-top">
        <div class="container">
            <div class="navbar-header"></div>
        </div>
    </nav>
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <div class="panel-heading">&nbsp</div>
                    <div class="panel-body">
                        <form class="form-horizontal"
                              role="form"
                              method="POST"
                              action="{!! route('execute') !!}"
                              data-is-ajax="true">
                            {{ csrf_field() }}
                            <div class="form-group">
                                <label for="aluminum_length" class="control-label">Nhập chiều dài thanh nhôm (centimet)</label>
                                <div class="form-input">
                                    <input id="aluminum_length"
                                           type="number"
                                           class="form-control"
                                           name="aluminum_length">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="quantity" class="control-label">Nhập số lượng thanh nhôm</label>
                                <div class="form-input">
                                    <input id="quantity"
                                           type="number"
                                           class="form-control"
                                           name="quantity">
                                </div>
                            </div>
                            <div class="form-group" id="aluminum-container"></div>
                            <div class="form-group">
                                <div class="text-center">
                                    <button class="btn btn-danger">Reset</button>
                                    <button type="submit" class="btn btn-primary">Thực hiện</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="{!! asset('js/jquery.min.js') !!}"></script>
    <script src="{!! asset('js/main.js') !!}"></script>
    <script>
        $(document).on('focusout', 'input[name="quantity"]', function() {
            let quantity = parseInt($(this).val());
            let domAlContainer = '';
            let lengthAlChild = $('.length-al');
            let length = lengthAlChild.length;
            if (length < quantity) {
                for (let i = 0; i < quantity - length; i++) {
                    let index = length + i;
                    domAlContainer += `
                    <div class="form-group">
                        <label for="length[${index}]" class="control-label">Số đo thanh nhôm ${index + 1}:</label>
                        <div class="form-input">
                            <input id="length[${index}]"
                                   type="number"
                                   class="form-control length-al"
                                   name="length[${index}]">
                        </div>
                    </div>`;
                }
                $('#aluminum-container').append(domAlContainer);
            } else if (length > quantity) {
                lengthAlChild.map((i, e) => {
                    if (i + 1 > quantity) {
                        $(e).closest('.form-group').remove();
                    }
                });
            }
        });
    </script>
</body>
</html>
