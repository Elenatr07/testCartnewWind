/*!
 * jQuery jqCart Plugin v1.1.2.1 (discount)
 * requires jQuery v1.9 or later
 *
 * http://incode.pro/
 *
 * Date: Date: 2016-05-18 19:15
 */
;(function ($) {
    'use strict';
    var cartData,
        itemData,
        orderPreview = '',
        openTripview ='',
        
        totalCnt = 0,
        visibleLabel = false,
        contactForm = '<div class="orderPreview"></div>',
        label = $('<div class="jqcart-cart-label"><span class="jqcart-title">Оформить заказ</span><span class="jqcart-total-cnt">0</span></div>'),
        modal = '<div class="jqcart-layout"><div class="jqcart-checkout">123</div></div>',
        blockTrip = ' <div class="blockTrip" id="blockTrip"></div>',
        orderform = '<p class="jqcart-cart-title">Контактная информация:</p><form class="jqcart-orderform"><p><label>ФИО:</label><input type="text" name="user_name"></p><p><label>Телефон:</label><input type="text" name="user_phone"></p><p><label>Email:</label><input type="text" name="user_mail"></p><p><label>Адрес:</label><input type="text" name="user_address"></p><p><label>Промо-код:</label><input type="text" name="promo_code"></p><p><label>Коментарий:</label><textarea name="user_comment"></textarea></p><p><input type="submit" value="Отправить заказ"></p></form>';
    var opts = {
        buttons: '.add_item',
        cartLabel: 'body',
        visibleLabel: false,
        openByAdding: false,
        handler: '/',
        promoHandler: '/',
        discount: 0,
        currency: '$'
    };
    var actions = {
        init: function (o) {
            opts = $.extend(opts, o);
            cartData = actions.getStorage();
            if (cartData !== null && Object.keys(cartData).length) {
                for (var key in cartData) {
                    if (cartData.hasOwnProperty(key)) {
                       totalCnt += cartData[key].count;
                    }
                }
                visibleLabel = true;
                 
            }
            label.prependTo(opts.cartLabel)[visibleLabel || opts.visibleLabel ? 'show' : 'hide']()
                .on('click', actions.openCart)
                .find('.jqcart-total-cnt').text(totalCnt);
            opts.discount = opts.discount > 0 ? opts.discount : (sessionStorage.getItem('discount') || 0);
            $(document )
                .on('click', opts.buttons, actions.addToCart)
                .on('click', '.jqcart-layout', function (e) {
                    if (e.target === this) {
                        actions.hideCart();
                    }
                })
                .on('click', '.jqcart-incr', actions.changeAmount)
                .on('input keyup', '.jqcart-amount', actions.changeAmount)
                .on('click', '.jqcart-del-item', actions.delFromCart)
                .on('submit', '.jqcart-orderform', actions.sendOrder)
                .on('reset', '.jqcart-orderform', actions.hideCart)
                .on('click', '.jqcart-print-order', actions.printOrder)
                .on('change', '.jqcart-orderform input[name="promo_code"]', actions.checkPromo);
            return false;
        },
        addToCart: function (e) {
            e.preventDefault();
            itemData = $(this).data();
            if (typeof itemData.id === 'undefined') {
                console.log('Отсутствует ID товара');
                return false;
            }
            cartData = actions.getStorage() || {};
         //   if (cartData.hasOwnProperty(itemData.id)) {
                
                itemData.count = 1;
                cartData[itemData.id] = itemData;
         //   } 
            console.log(itemData)
            actions.setStorage(cartData);
            actions.changeTotalCnt(1);
            label.show();
            if (opts.openByAdding) {
                actions.openCart();
            }
            return false;
        },
        delFromCart: function () {
            var $that = $(this),
                line = $that.closest('.jqcart-tr'),
                itemId = line.data('id');
            cartData = actions.getStorage();
            actions.changeTotalCnt(-cartData[itemId].count);
            delete cartData[itemId];
            actions.setStorage(cartData);
            line.remove();
            actions.recalcSum();
            return false;
        },
        changeAmount: function () {
            var $that = $(this),
                manually = $that.hasClass('jqcart-amount'),
                amount = +(manually ? $that.val() : $that.data('incr')),
                itemId = $that.closest('.jqcart-tr').data('id');
            cartData = actions.getStorage();
            if (manually) {
                cartData[itemId].count = isNaN(amount) || amount < 1 ? 1 : amount;
            } else {
                cartData[itemId].count += amount;
            }
            if (cartData[itemId].count < 1) {
                cartData[itemId].count = 1;
            }
            if (manually) {
                $that.val(cartData[itemId].count);
            } else {
                $that.siblings('input').val(cartData[itemId].count);
            }
            actions.setStorage(cartData);
            actions.recalcSum();
            return false;
        },
        recalcSum: function () {
            var subtotal = 0,
                amount,
                sum = 0,
                totalCnt = 0;
            $('.jqcart-tr').each(function () {
                amount = +$('.jqcart-amount', this).val();
                sum = Math.ceil((amount * $('.jqcart-price', this).text()) * 100) / 100;
                $('.jqcart-sum', this).html(sum + ' ' + opts.currency);
                subtotal = Math.ceil((subtotal + sum) * 100) / 100;
                totalCnt += amount;
            });
            var discountSum = actions.calcDiscount(subtotal),
                jqcartDiscount = $('.jqcart-discount')[discountSum > 0 ? 'show' : 'hide']();
            jqcartDiscount.find('span').text(opts.discount);
            jqcartDiscount.find('strong').text(discountSum);
            $('.jqcart-subtotal strong').text(subtotal - discountSum);
            $('.jqcart-total-cnt').text(totalCnt);
            if (totalCnt <= 0) {
                actions.hideCart();
                if (!opts.visibleLabel) {
                    label.hide();
                }
            }
            return false;
        },
        changeTotalCnt: function (n) {
            var cntOutput = $('.jqcart-total-cnt');
            cntOutput.text((+cntOutput.text() + n));
            return false;
        },
        openCart: function () {
            var subtotal = 0,
            cartHtml = '';
            var openTrip ='';
            var orderBlock='';
            cartData = actions.getStorage();
           // orderPreview = '<p class="jqcart-cart-title">Корзина <span class="jqcart-print-order"></span></p><div class="jqcart-table-wrapper"><div class="jqcart-manage-order"><div class="jqcart-thead"><div>ID</div><div></div><div>Наименование</div><div>Цена</div><div>Кол-во</div><div>Сумма</div><div></div></div>';
           orderPreview = '<div class="trip_order" id="trip_order"> <button type="button" class="edit" id="edit_trip"><img src="img/pen.svg" alt=""></button>   '
            
            var key, sum = 0;
            for (key in cartData) {
                if (cartData.hasOwnProperty(key)) {
                    sum = Math.ceil((cartData[key].count * cartData[key].price) * 100) / 100;
                    subtotal = Math.ceil((subtotal + sum) * 100) / 100;
                    /*
                    orderPreview += '<div class="jqcart-tr" data-id="' + cartData[key].id + '">';
                    orderPreview += '<div class="jqcart-small-td">' + cartData[key].id + '</div>';
                    orderPreview += '<div class="jqcart-small-td jqcart-item-img"><img src="' + cartData[key].img + '" alt=""></div>';
                    orderPreview += '<div>' + cartData[key].title + '</div>';
                    orderPreview += '<div class="jqcart-price">' + cartData[key].price + '</div>';
                    orderPreview += '<div><span class="jqcart-incr" data-incr="-1">&#8211;</span><input type="text" class="jqcart-amount" value="' + cartData[key].count + '"><span class="jqcart-incr" data-incr="1">+</span></div>';
                    orderPreview += '<div class="jqcart-sum">' + sum + ' ' + opts.currency + '</div>';
                    orderPreview += '<div class="jqcart-small-td"><span class="jqcart-del-item"></span></div>';
                    orderPreview += '</div>';*/

                    orderPreview += '<div class="trip_order_info">  <div class="way">';
                    orderPreview += '<div class="one_way_part"> '+ cartData[key].from + ' <span>  - '+ cartData[key].to + '</span> </div>';
                    orderPreview += '<div class="way_info"> '+ cartData[key].dateOneWay + ' </div>';
                    orderPreview += '<div class="way_info pass_ending" data-value="'+ cartData[key].pass +'" id="pass_ending">  </div>';
                    orderPreview += ' <div class="way_info">'+cartData[key].timedeparture+'</div>';
                    orderPreview += '</div>';
                    orderPreview += ' <hr class="verticalLine" id="verticalLine" />';
                    orderPreview += '<div class="two_way_part" id="two_way_part">';
                    orderPreview += '<div class="way"> '+ cartData[key].to + ' <span>  - '+ cartData[key].from + '</span> </div>';
                    orderPreview += ' <div class="way_info"> '+ cartData[key].dateReturnWay + ' </div>';
                    orderPreview += ' <div class="way_info pass_ending" data-value="'+ cartData[key].pass + '" id="pass_ending1"> </div>';    
                    orderPreview += ' <div class="way_info">'+cartData[key].timereturn+'</div>';
                    orderPreview += '</div>';
                    orderPreview += '<div class="hide_return_trip" hidden data-return="'+ cartData[key].return +'" id="hide_return_trip"></div>'
                }
            }
           // orderPreview += '</div></div>';
                 orderPreview += '</div>';
        //openTripview
                 openTripview += '<div class="trip_order_select">';
                openTripview += ' <div>';
                openTripview += ' <p class="time_trip">9h*</p>';
                openTripview += '<div class="wrapper_from_to">';
                openTripview += '<div class="block_from_to">';
                openTripview += '<p>Travel <span>Regular</span> </p>';
                openTripview += '</div>';
                openTripview += ' <div class="line_from_to">';
                openTripview += ' <div><img src="img/Ellipse1.svg" alt=""></div>';
                openTripview += '<div><img src="img/Ellipse2.svg" alt=""></div>';
                openTripview += '<div><img src="img/Ellipse3.svg" alt=""></div>';
                openTripview += ' </div>';
                openTripview += ' <div class="cost_from_to">';
           for (key in cartData){
            if (cartData.hasOwnProperty(key)){

                openTripview += ' <p> <span>RP '+ cartData[key].cost +'</span> / Seat</p>';
                openTripview += ' </div>';
                openTripview += '</div>';
                openTripview += ' <div class="line1"><img src="img/line1.svg" alt=""></div>';
                openTripview += '</div>';
                openTripview += ' <div class="trip_order_distance_block">';
                openTripview += '<div class="trip_order_distance_from">Your Location at '+ cartData[key].from + '</div>';
                openTripview += '<div class="trip_order_distance_to">Your Location in '+ cartData[key].to + '</div>';

            }}
           
            openTripview += ' </div>';
            openTripview += '<div class="about_time_in_trip">* The stated hours are approximate, as the actual duration will depend on your specific location </div>';
            openTripview += '</div>';
            openTripview += '<hr class="horizontalline" id="horizontalline">';
            openTripview += ' <div class="return_trip_order_select" id="return_trip_order_select">';
            openTripview += '<div>';
            openTripview += '<p class="time_trip">9h*</p>';
            openTripview += '<div class="wrapper_from_to">';
            openTripview += '<div class="block_from_to">';
            openTripview += '<p>Travel <span>Regular</span> </p>';
            openTripview += '</div>';
            openTripview += '<div class="line_from_to">';
            openTripview += '<div><img src="img/Ellipse1.svg" alt=""></div>';
            openTripview += '<div><img src="img/Ellipse2.svg" alt=""></div>';
            openTripview += ' <div><img src="img/Ellipse3.svg" alt=""></div>';
            openTripview += '</div>';
            openTripview += '<div class="cost_from_to">';

            for (key in cartData){
                if (cartData.hasOwnProperty(key)){
                    openTripview +='<p> <span>RP '+ cartData[key].cost +'</span> / Seat</p>' ;
                    openTripview += '</div>';
                    openTripview += '</div>';
                    openTripview += '<div class="line1"><img src="img/line1.svg" alt=""></div>';
                    openTripview += '</div>';
                    openTripview += ' <div class="trip_order_distance_block">';
                    openTripview += '<div class="trip_order_distance_from">Your Location at '+ cartData[key].to + '</div>';
                    openTripview += '<div class="trip_order_distance_to">Your Location in '+ cartData[key].from + '</div>';
                    

                }}
            openTripview += '</div>';
            openTripview += ' <div class="about_time_in_trip">* The stated hours are approximate, as the actual duration will depend on your specific location </div>';
            openTripview += '</div>';
           

            var discountSum = actions.calcDiscount(subtotal),
                savedPromo = sessionStorage.getItem('promocode');
            orderPreview += '<div class="jqcart-discount" style="display:' + (discountSum > 0 ? 'block' : 'none') + ';">Скидка <span>' + opts.discount + '</span>%: <strong>' + discountSum + '</strong> ' + opts.currency + '</div>';
            orderPreview += '<div class="jqcart-subtotal">Итого: <strong>' + (subtotal - discountSum) + '</strong> ' + opts.currency + '</div>';

            orderBlock = orderform;
            openTrip = openTripview;
            cartHtml = subtotal ? (orderPreview) : '<h2 class="jqcart-empty-cart">Корзина пуста</h2>';
            $(modal).appendTo('.order').find('.jqcart-checkout').html(cartHtml).find('[name="promo_code"]').val(savedPromo);
           $(blockTrip).appendTo('#order_distance').html(openTrip);
           $(contactForm).appendTo('#order_distance').html(orderBlock)
        },
        openCart1: function(){
            $(location).attr('href','/box.html')
        },
        hideCart: function () {
            $('.jqcart-layout').fadeOut('fast', function () {
                $(this).remove();
            });
            return false;
        },
        sendOrder: function (e) {
            e.preventDefault();
            var $that = $(this);
            if ($.trim($('[name=pick_up_location_one_way]', $that).val()) === '') {
               // $('<p class="jqcart-error">Пожалуйста, укажите свое имя и контактный телефон!</p>').insertBefore($that).delay(3000).fadeOut();
               $('<p class="jqcart-error">Please, enter your pick-up location!</p>').appendTo('#location_details_wrapper').delay(3000).fadeOut();
                return false;
            }
            if ($.trim($('[name=drop_off_location_one_way]', $that).val()) === '') {
                $('<p class="jqcart-error">Please, enter your drop-off location!</p>').appendTo('#location_details_wrapper').delay(3000).fadeOut();
                 return false;
             }
             if ($.trim($('[name=full_name_client]', $that).val()) === '') {
                $('<p class="jqcart-error">Please, enter your full name!</p>').appendTo('#passenger_details_wrapper').delay(3000).fadeOut();
                 return false;
             }  
             if ($.trim($('[name=phone_client]', $that).val()) === '') {
                $('<p class="jqcart-error">Please, enter your phone number!</p>').appendTo('#passenger_details_wrapper').delay(3000).fadeOut();
                 return false;
             }
             if ($.trim($('[name=email_client]', $that).val()) === '') {
                $('<p class="jqcart-error">Please, enter your email address!</p>').appendTo('#passenger_details_wrapper').delay(3000).fadeOut();
                 return false;
             }

            $.ajax({
                url: opts.handler,
                type: 'POST',
                dataType: 'json',
                data: {
                    orderlist: $.param(actions.getStorage()),
                    userdata: $that.serialize()
                },
                error: function (jqXHR, text, error) {
                    console.log('Error: ' + text + ' | ' + error);
                },
                success: function (resp) {
                    $('.jqcart-checkout').html('<p>' + resp.message + '</p>');
                    if (!resp.errors) {
                        opts.discount = 0;
                        sessionStorage.setItem('promocode', '');
                        sessionStorage.setItem('discount', 0);
                        setTimeout(methods.clearCart, 2000);
                    }
                }
            });
        },
        checkPromo: function () {
            var promoCode = $.trim($(this).val());
            if (promoCode === '') {
                return false;
            }
            $.ajax({
                url: opts.promoHandler,
                type: 'POST',
                dataType: 'json',
                data: {
                    promo_code: promoCode
                },
                error: function (jqXHR, text, error) {
                    console.log('Error: ' + text + ' | ' + error);
                },
                success: function (discount) {
                    console.log(discount);
                    opts.discount = discount || 0;
                    sessionStorage.setItem('promocode', (opts.discount > 0 ? promoCode : ''));
                    sessionStorage.setItem('discount', opts.discount);
                    actions.recalcSum();
                }
            });
        },
        calcDiscount(sum){
            var percent = isNaN(+opts.discount) ? 0 : +opts.discount;
            return sum * percent / 100;
        },
        printOrder: function () {
            var data = $(this).closest('.jqcart-checkout').prop('outerHTML');
            if (!data) {
                return false;
            }
            var win = window.open('', 'Печать заказа', 'width=' + screen.width + ',height=' + screen.height),
                cssHref = $(win.opener.document).find('link[href$="jqcart.css"]').attr('href'),
                d = new Date(),
                curDate = ('0' + d.getDate()).slice(-2) + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + d.getFullYear() + ' ' + ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2) + ':' + ('0' + d.getSeconds()).slice(-2);


            win.document.write('<html><head><title>Заказ ' + curDate + '</title>');
            win.document.write('<link rel="stylesheet" href="' + cssHref + '" type="text/css" />');
            win.document.write('</head><body >');
            win.document.write(data);
            win.document.write('</body></html>');

            setTimeout(function () {
                win.document.close(); // нужно для IE >= 10
                win.focus(); // нужно для IE >= 10
                win.print();
                win.close();
            }, 100);

            return true;
        },
        setStorage: function (o) {
            localStorage.setItem('jqcart', JSON.stringify(o));
            return false;
        },
        getStorage: function () {
            return JSON.parse(localStorage.getItem('jqcart'));
        }
    };
    var methods = {
        clearCart: function () {
            localStorage.removeItem('jqcart');
            label[opts.visibleLabel ? 'show' : 'hide']().find('.jqcart-total-cnt').text(0);
            actions.hideCart();
        },
        openCart: actions.openCart,
        openCart1: actions.openCart1,
        printOrder: actions.printOrder,
        test: function () {
            actions.getStorage();
        }
    };
    $.jqCart = function (opts) {
        if (methods[opts]) {
            return methods[opts].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof opts === 'object' || !opts) {
            return actions.init.apply(this, arguments);
        } else {
            $.error('Метод с именем "' + opts + '" не существует!');
        }
    };



})(jQuery);

