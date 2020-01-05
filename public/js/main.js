var hideMessage;

$(document).on('click', 'form button', function(event) {
    event.preventDefault();
});

$(document).ready(function() {
    $(document).on('click', 'form button[type="submit"]', function(event) {
        let form = $(this).closest('form');
        if (form.data('is-ajax') === true) {
            let data = {};
            let url = $(this).data('url') ? $(this).data('url') : form.attr('action');
            let method = form.attr('method');

            // input
            form.find('input').map((i, e) => {
                let name = $(e).attr('name');
                let value = $(e).attr('data-value') ? $(e).attr('data-value') : $(e).val();
                let type = $(e).attr('type');

                if ((type === 'radio' || type === 'checkbox')) {
                    if ($(e).is(':checked')) {
                        data[name] = value;
                    }
                } else {
                    if (name === '_method') {
                        method = value;
                    } else {
                        data[name] = value;
                    }
                }
            });
            // select
            form.find('select').map((i, e) => {
                let name = $(e).attr('name');
                let value = '';
                $(e).children('option').map((i, child) => {
                    if ($(child).is(':checked')) {
                        value = $(child).val();
                    }
                });
                data[name] = value;
            });
            // textarea
            form.find('textarea').map((i, e) => {
                let name = $(e).attr('name');
                let value = $(e).val();
                data[name] = value;
            });

            callApi(url, method, data).then((data) => {
                if (typeof data !== 'object') {
                    return;
                }
                if (data.status === 0) {
                    if (data.message) {
                        showNotificationMessage(data.message);
                    }
                    if (data.errors) {
                        clearErrorInput(form);
                        showErrorForm(form, data.errors);
                    }
                } else if (data.status === 1) {
                    if (data.message) {
                        showNotificationMessage(data.message, 'success');
                    }
                }
            });
        } else {
            form.submit();
        }
        // chặn click liên tiếp nhiều lần
        $(this).attr('disabled', 'disabled');
        setTimeout(() => $(this).removeAttr('disabled'), 2500);
    });

    // reset form
    $(document).on('click', 'form button.btn-danger', function () {
        if (confirm('Bạn chắc chắn muốn reset dữ liệu')) {
            let form = $(this).closest('form');
            clearInput(form);
        }
    });

    // tắt tin nhắn thông báo sau khi click vào x
    $(document).on('click', '.close-icon', function() {
        hideNotificationMessage(0);
    });
});

// hàm gọi api server
let callApi = (url, method = 'GET', data = {}, header = {}) => {
    return $.ajax({
        url: url,
        method: method,
        dataType: 'json',
        data: data,
        header: header,
    }).catch(function() {
        showNotificationMessage('Đã có lỗi tại máy chủ!');
    });
};

// ẩn thông báo lỗi/thành công
let hideNotificationMessage = (time = 5000) => {
    if (hideMessage) {
        clearTimeout(hideMessage);
    }
    hideMessage = setTimeout(function() {
        let notifyContainer = $('.notification-message');
        if (notifyContainer.length !== 0) {
            notifyContainer.remove();
        }
    }, time);
};

// hiển thị tin nhắn thông báo
let showNotificationMessage = (message = '', type = 'error', time = 5000) => {
    type = type === 'success' ? 'success' : 'error';
    let notificationMessageDom = $('.notification-message');
    if (notificationMessageDom.length === 1) {
        notificationMessageDom.html(`
            <div class="${type}">${message}</div>
            <span class="close-icon">&times</span>
        `);
    } else {
        $('body').append(`
            <div class="notification-message">
                <div class="${type}">${message}</div>
                <span class="close-icon">&times</span>
            </div>
        `);
    }
    hideNotificationMessage(time);
};


// xóa dữ liệu input form
let clearInput = (form) => {
    form.find('input').map((key, inputDom) => {
        if ($(inputDom).attr('type') !== 'hidden' && $(inputDom).prop('disabled') === false) {
            $(inputDom).val('');
        }
    });
    form.find('select').map((key, selectDom) => {
        $(selectDom).val('');
    });
    form.find('textarea').map((key, textareaDom) => {
        $(textareaDom).val('');
    });
};

// xóa dữ liệu lỗi input
let clearErrorInput = (form) => {
    form.find('.error-input').map((key, errorInputDom) => {
        $(errorInputDom).remove();
    });
};

// hiển thị lỗi input trong form
let showErrorForm = (form, errors = {}) => {
    $('.error-input').text('');
    let $hasError = false;
    Array.from(Object.keys(errors), key => {
        if (errors[key]) {
            $hasError = true;
            let input = form.find(`input[name="${key}"]`);
            // select
            if (input.length === 0) {
                input = form.find(`select[name="${key}"]`);
            }
            // textarea
            if (input.length === 0) {
                input = form.find(`textarea[name="${key}"]`);
            }

            let errorInput = input.siblings('span.error-input');
            let message = Array.isArray(errors[key]) ? errors[key][0] : errors[key];

            if (errorInput.length === 1) {
                errorInput.text(message);
            } else {
                input.after(`<span class="error-input">${message}</span>`);
            }
        }
    });

    return $hasError;
};
