/**
 * Copyright 2016, Jefferson González (https://github.com/jgmdev/sidemenu)
 * This file is licensed with the MIT License, check the LICENSE file
 * for version and details or visit https://opensource.org/licenses/MIT
 */

$.fn.sideMenu = function(options) {
    var defaults = {
        width: 300,
        position: "right",
        duration: 1000,
        button: null,
        hideButton: null,
        zIndex: 5000,
        onShow: null,
        onHide: null
    };

    var settings = $.extend({}, defaults, options);

    this.each(function() {
        var sideMenuParent = this;

        $(this).css({
            display: "none",
            position: "fixed",
            zIndex: settings.zIndex,
            top: 0,
            width: parseInt(settings.width) + "px"
        });

        if(settings.position == "right"){
            $(this).css({
                left: $(window).width()
            });
        } else {
            $(this).css({
                left: "-" + settings.width
            });
        }

        if(settings.button){
            $(settings.button).click(function(event){
                if($(sideMenuParent).css("display") == "none"){
                    showSideMenu(sideMenuParent);
                } else{
                    hideSideMenu(sideMenuParent);
                }
                event.preventDefault();
            });
        }

        if(settings.hideButton){
            $(settings.hideButton).click(function(event){
                hideSideMenu(sideMenuParent);
                event.preventDefault();
            });
        }

        $(window).resize(function(){
            if($(sideMenuParent).css("display") == "block"){
                if(settings.position == "right"){
                    $(sideMenuParent).css(
                        {
                            left: $(window).width() - settings.width
                        }
                    );
                } else{
                    $(sideMenuParent).css(
                        {
                            left: 0
                        }
                    );
                }
            } else{
                if(settings.position == "right"){
                    $(sideMenuParent).css(
                        {
                            left: $(window).width()
                        }
                    );
                } else{
                    $(sideMenuParent).css(
                        {
                            left: "-" + settings.width
                        }
                    );
                }
            }
        });
    });

    function showSideMenu(menu){
        $(menu).css({
            display: "block",
            height: $(window).height()
        });

        if(settings.position == "right"){
            $(menu).animate(
                {
                    left: $(window).width() - settings.width
                },
                settings.duration
            );
        } else{
            $(menu).animate(
                {
                    left: 0
                },
                settings.duration
            );
        }

        if(settings.onShow){
            settings.onShow();
        }
    }

    function hideSideMenu(menu){
        if(settings.position == "right"){
            $(menu).animate(
                {
                    left: $(window).width()
                },
                settings.duration,
                function(){
                    $(menu).css({display: "none"});
                }
            );
        } else{
            $(menu).animate(
                {
                    left: "-" + settings.width
                },
                settings.duration,
                function(){
                    $(menu).css({display: "none"});
                }
            );
        }

        if(settings.onHide){
            settings.onHide();
        }
    }

    return this;
};
