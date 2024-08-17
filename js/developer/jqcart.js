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
        contactForm = '<div class="orderPreview" id="orderPreview"></div>',
        label = $('<div class="jqcart-cart-label"><span class="jqcart-title">Оформить заказ</span><span class="jqcart-total-cnt">0</span></div>'),
        modal = '<div class="jqcart-layout"><div class="jqcart-checkout">123</div></div>',
        blockTrip = ' <div class="blockTrip" id="blockTrip"></div>',
        orderform = ' <div class="orderPreview"><form class="jqcart-orderform"><div class="form_order_wrapper"><div class="location_details_wrapper" id="location_details_wrapper"><h2>Location <span>Details</span> </h2><label for="pick_up_location_one_way">Your pick-up location </label><input type="text" name="pick_up_location_one_way" id="pick_up_location_one_way" placeholder="Enter your address"><label for="drop_off_location_one_way">Your drop-off location </label><input type="text" name="drop_off_location_one_way" id="drop_off_location_one_way" placeholder="Enter your address"><label for="message_ditails">Your message </label><textarea name="message_ditails" id="message_ditails" placeholder="Please share any information that you think we should know...   "></textarea></div><hr class="verticalLine_in_form" id="verticalLine_in_form"  /><div class="passenger_details_wrapper" id="passenger_details_wrapper"><h2>Passenger <span>Details</span> </h2><label for="full_name_client">Your full name  </label><input type="text" name="full_name_client" id="full_name_client" placeholder="Enter your name"><label for="phone_client">Your phone number </label><input type="tel" name="phone_client" id="phone_client" placeholder="Enter your phone number" pattern="^[\+][0-9]+$" minlength="9" maxlength="18"><label for="email_client">Your email address </label><input type="email" name="email_client" id="email_client" placeholder="Enter your email address"> <div id="error_block"></div><div class="button_order_wrapper"><input class="button_order" type="submit" value="Send Request" id="button_order" ></div></div></div><div hidden id="total_sum"></div><div hidden name="order_form"></div></form></div>';
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
                

                    orderPreview += '<div class="trip_order_info">';
                    orderPreview += '<div class="one_way_part">'
                    orderPreview += '<div class="way"> '+ cartData[key].from + '</div>';
                    orderPreview += '<div class="way_pass">Passengers: '+ cartData[key].pass + ' </div>';
                    orderPreview += '<div class="way_info">Date and Time: '+ cartData[key].date +' from ' + cartData[key].timedeparture +' </div>';
                    orderPreview += '<div class="way_info" data-value="'+ cartData[key].hours +'" id="trip_hours">Duration: '+ cartData[key].hours +'h</div>';
                   
                    orderPreview += '<div class="typecar" data-value="'+ cartData[key].type +'"></div>';
                    
                    
                }
            }
         
                orderPreview += '</div>';
                 orderPreview += '</div>';
                 orderPreview += '</div>';
                 orderPreview += '<div id="hide_type_car" data-select="'+cartData[key].select+'" data-typecar = "'+cartData[key].infovalue+'">hide</div>'
                 
                 
        //openTripview ToyotaCommuter start
                openTripview += '<div class="order_list" id="toyotaCommuter">';
                openTripview += ' <div class="trip_order_select" id="trip_order_select">';
                openTripview += '<div>';
                for (key in cartData) {
                    if (cartData.hasOwnProperty(key)) {

                        openTripview += '<p class="time_trip">'+ cartData[key].hours + 'h </p>'
                    }
                }
                openTripview += '  <div class="wrapper_from_to">';
                openTripview += '<div class="wrapper_from_to">';
                openTripview += '<div class="block_from_to">';
                openTripview += '<p>HiAce<span> Commuter </span> </p>';
                openTripview += '</div>';
                openTripview += ' <div class="line_from_to">';
                openTripview += ' <div class="ellips"><img src="img/Ellipse1.svg" alt=""></div>';
                openTripview += '<div class="ellips"><img src="img/Ellipse2.svg" alt=""></div>';
                openTripview += '<div class="ellips"><img src="img/Ellipse3.svg" alt=""></div>';
                openTripview += ' <div class="line1"><img src="img/line1.svg" alt=""></div>';
                openTripview += ' </div>';
                openTripview += ' <div class="cost_from_to">';
           for (key in cartData){
            if (cartData.hasOwnProperty(key)){

                openTripview += ' <p >IDR <span id="costViewCommuter"> '+ cartData[key].pricecommuter * cartData[key].hours +' </span>*</p>';
             }} 
                openTripview += ' </div>';
                openTripview += '</div>';
                openTripview += '</div>';
                openTripview += ' <div class="trip_order_distance_block">';
                openTripview += '<div class="trip_order_distance_from">Your Location in '+ cartData[key].from + '</div>';
                openTripview += '<div class="trip_order_distance_to">Your Desired Location</div>';
                openTripview += ' </div>';
                openTripview += '</div>';
                 openTripview += '<p class="note">* The stated price is approximate, as the actual price will be shared upon contacting you </p>'
                openTripview += '</div>';
                openTripview += '</div>';
                
         //openTripview ToyotaCommuter end  

           //openTripview ToyotaHiAce start
           openTripview += '<div class="order_list" id="toyotaHiAce">';
           openTripview += ' <div class="trip_order_select" id="trip_order_select">';
           openTripview += '<div>';
           for (key in cartData) {
               if (cartData.hasOwnProperty(key)) {

                   openTripview += '<p class="time_trip">'+ cartData[key].hours + 'h </p>'
               }
           }
           openTripview += '  <div class="wrapper_from_to">';
           openTripview += '<div class="wrapper_from_to">';
           openTripview += '<div class="block_from_to">';
           openTripview += '<p>HiAce <span>Premio</span> </p>';
           openTripview += '</div>';
           openTripview += ' <div class="line_from_to">';
           openTripview += ' <div class="ellips"><img src="img/Ellipse1.svg" alt=""></div>';
           openTripview += '<div class="ellips"><img src="img/Ellipse2.svg" alt=""></div>';
           openTripview += '<div class="ellips"><img src="img/Ellipse3.svg" alt=""></div>';
           openTripview += ' <div class="line1"><img src="img/line1.svg" alt=""></div>';
           openTripview += ' </div>';
           openTripview += ' <div class="cost_from_to">';
      for (key in cartData){
       if (cartData.hasOwnProperty(key)){

           openTripview += ' <p >IDR <span id="costViewHiAce"> '+ cartData[key].pricepremio * cartData[key].hours +'</span>*</p>';
        }} 
           openTripview += ' </div>';
           openTripview += '</div>';
          
           openTripview += '</div>';
           openTripview += ' <div class="trip_order_distance_block">';
           openTripview += '<div class="trip_order_distance_from">Your Location in '+ cartData[key].from + '</div>';
           openTripview += '<div class="trip_order_distance_to">Your Desired Location</div>';
           openTripview += ' </div>';
           openTripview += '</div>';
            openTripview += '<p class="note">* The stated price is approximate, as the actual price will be shared upon contacting you </p>'
           openTripview += '</div>';
           openTripview += '</div>';
    //openTripview ToyotaHiAce end 

    //openTripview ToyotaInnova start
    openTripview += '<div class="order_list" id="toyotaInnova">';
    openTripview += ' <div class="trip_order_select" id="trip_order_select">';
    openTripview += '<div>';
    for (key in cartData) {
        if (cartData.hasOwnProperty(key)) {

            openTripview += '<p class="time_trip">'+ cartData[key].hours + 'h </p>'
        }
    }
    openTripview += '  <div class="wrapper_from_to">';
    openTripview += '<div class="wrapper_from_to">';
    openTripview += '<div class="block_from_to">';
    openTripview += '<p>Innova <span>Reborn</span> </p>';
    openTripview += '</div>';
    openTripview += ' <div class="line_from_to">';
    openTripview += ' <div class="ellips"><img src="img/Ellipse1.svg" alt=""></div>';
    openTripview += '<div class="ellips"><img src="img/Ellipse2.svg" alt=""></div>';
    openTripview += '<div class="ellips"><img src="img/Ellipse3.svg" alt=""></div>';
    openTripview += ' <div class="line1"><img src="img/line1.svg" alt=""></div>';
    openTripview += ' </div>';
    openTripview += ' <div class="cost_from_to">';
for (key in cartData){
if (cartData.hasOwnProperty(key)){

    openTripview += ' <p >IDR <span id="costViewInnova"> '+ cartData[key].pricereborn * cartData[key].hours +'</span>*</p>';
 }} 
    openTripview += ' </div>';
    openTripview += '</div>';
   
    openTripview += '</div>';
    openTripview += ' <div class="trip_order_distance_block">';
    openTripview += '<div class="trip_order_distance_from">Your Location in '+ cartData[key].from + '</div>';
    openTripview += '<div class="trip_order_distance_to">Your Desired Location</div>';
    openTripview += ' </div>';
     openTripview += '<p class="note">* The stated price is approximate, as the actual price will be shared upon contacting you </p>'
    openTripview += '</div>';
    openTripview += '</div>';
//openTripview ToyotaInnova end 
           
           

            var discountSum = actions.calcDiscount(subtotal),
                savedPromo = sessionStorage.getItem('promocode');
            orderPreview += '<div class="jqcart-discount" style="display:' + (discountSum > 0 ? 'block' : 'none') + ';">Скидка <span>' + opts.discount + '</span>%: <strong>' + discountSum + '</strong> ' + opts.currency + '</div>';
       //     orderPreview += '<div class="jqcart-subtotal">Итого: <strong>' + (subtotal - discountSum) + '</strong> ' + opts.currency + '</div>';

            orderBlock = orderform;
            openTrip = openTripview;
            cartHtml = subtotal ? (orderPreview) : '<h2 class="jqcart-empty-cart">Корзина пуста</h2>';
            $(modal).appendTo('.order').find('.jqcart-checkout').html(cartHtml).find('[name="promo_code"]').val(savedPromo);
           $(blockTrip).appendTo('#order_distance').html(openTrip);
           $(contactForm).appendTo('#order_distance').html(orderBlock)
        },
        openCart1: function(){
            $(location).attr('href','./box.html')
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
               $('<p class="jqcart-error">Please, enter your pick-up location!</p>').appendTo('#error_block').delay(1000).fadeOut();
                return false;
            }
            if ($.trim($('[name=drop_off_location_one_way]', $that).val()) === '') {
                $('<p class="jqcart-error">Please, enter your drop-off location!</p>').appendTo('#error_block').delay(1000).fadeOut();
                 return false;
             }
             if ($.trim($('[name=message_ditails]', $that).val()) === '') {
                $('<p class="jqcart-error">Please, enter your message!</p>').appendTo('#error_block').delay(1000).fadeOut();
                 return false;
             }
             if ($.trim($('[name=full_name_client]', $that).val()) === '') {
                $('<p class="jqcart-error">Please, enter your full name!</p>').appendTo('#error_block').delay(1000).fadeOut();
                 return false;
             }  
             if ($.trim($('[name=phone_client]', $that).val()) === '') {
                $('<p class="jqcart-error">Please, enter your phone number!</p>').appendTo('#error_block').delay(1000).fadeOut();
                 return false;
             }
             if ($.trim($('[name=email_client]', $that).val()) === '') {
                $('<p class="jqcart-error">Please, enter your email address!</p>').appendTo('#error_block').delay(1000).fadeOut();
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

