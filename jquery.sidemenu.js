$.fn.sideMenu = function(options) {
    var defaults = {
        width: 300,
        position: "right",
        button: null,
        hideButton: null,
        zIndex: 5000,
        onShow: null,
        onHide: null
    };

    var settings = $.extend({}, defaults, options);

    this.each(function() {
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

        $(window).resize(function(){

        });

        var sideMenuParent = this;

        if(settings.button){
            $(settings.button).click(function(event){
                if($(sideMenuParent).css("display") == "none"){
                    showSideMenu(sideMenuParent);
                } else{
                    hideSideMenu(sideMenuParent);
                }
                event.preventDefault();
            });

            /*$(settings.button).hover(
                function(){
                    showSideMenu(sideMenuParent);
                }
            );*/
        }

        if(settings.hideButton){
            $(settings.hideButton).click(function(event){
                hideSideMenu(sideMenuParent);
                event.preventDefault();
            });
        }
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
                1000
            );
        } else{
            $(menu).animate(
                {
                    left: 0
                },
                1000
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
                1000,
                function(){
                    $(menu).css({display: "none"});
                }
            );
        } else{
            $(menu).animate(
                {
                    left: "-" + settings.width
                },
                1000,
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
