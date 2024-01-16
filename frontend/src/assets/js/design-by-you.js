//Thêm phụ kiện cho gấu
function addAcc() {
    $(document).ready(function() {
        var accessoryImg;
    
        $(".accessory").on("click", function() {
            var imgSrc = $(this).attr("src");
            accessoryImg = $("<img>").attr("src", imgSrc).addClass("accessory-img");
    
            // Remove any previously added accessory imag es
            $(".accessory-img").remove();
    
            // Get the position of the product image
            var productImg = $("#product-img-main");
            var offset = productImg.offset();
    
            // Set the accessory image position relative to the product image
            accessoryImg.css({
                "position": "absolute",
                "top": offset.top + 10, // Adjust top position as needed
                "left": offset.left + 10, // Adjust left position as needed
                "z-index": "9999",
                "max-width": "7%" // Make the accessory image unclickable
            });
    
            // Append the accessory image to the body
            $("body.mat-typography").append(accessoryImg);
        });
    
        // Allow adjusting position by clicking and dragging the accessory image
        $(document).on("mousedown", ".accessory-img", function(e) {
            var imgWidth = accessoryImg.width();
            var imgHeight = accessoryImg.height();
    
            var cardLeft = $(".card").offset().left;    
            var cardRight = $(".card").offset().left  + $(".card").width()- imgWidth;
            var cardTop = $(".card").offset().top;
            var cardBottom = $(".card").offset().top +   + $(".card").height()  - imgHeight;
    
            $(document).on("mousemove", function(ev) {
                var newY = ev.clientY - imgHeight/2;
                var newX = ev.clientX - imgWidth/2;
    
                if (newX < cardLeft) {
                    newX = cardLeft;
                } else if (newX > cardRight) {
                    newX = cardRight;
                }
    
                if (newY < cardTop) {
                    newY = cardTop;
                } else if (newY > cardBottom) {
                    newY = cardBottom;
                }
    
                accessoryImg.offset({
                    top: newY,
                    left: newX
                });
                
            });
            
            $(document).on("mouseup", function() {
                $(document).off("mousemove");
                $(document).off("mouseup");
            });
        });
    });
}
//xóa phụ kiện
function removeAcc() {
    $(".accessory-img").remove();
}
//thêm tên
function addName(){
    $(document).ready(function () {
        $("#userName").on("input", function () {
            var userInput = $(this).val().substring(0, 5); // Limit to 5 characters
            $("#userText").text(userInput);
        });

        $(document).on("mousedown", "#userText", function(e) {
                    
            var cardLeft = $(".card").offset().left;    
            var cardRight = $(".card").offset().left  + $(".card").width();
            var cardTop = $(".card").offset().top;
            var cardBottom = $(".card").offset().top +   + $(".card").height();
            
            $(document).on("mousemove", function(ev) {
                var newY = ev.clientY;
                var newX = ev.clientX;
                
                if (newX < cardLeft) {
                    newX = cardLeft;
                } else if (newX > cardRight) {
                    newX = cardRight;
                }
    
                if (newY < cardTop) {
                    newY = cardTop;
                } else if (newY > cardBottom) {
                    newY = cardBottom;
                }
    
                $('#userText').offset({
                    top: newY,
                    left: newX
                });
                
            });
            
            $(document).on("mouseup", function() {
                $(document).off("mousemove");
                $(document).off("mouseup");
            });
        });
    });
}