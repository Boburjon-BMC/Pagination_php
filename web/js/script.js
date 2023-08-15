document.addEventListener("DOMContentLoaded", function(){
   function getPage(totalPage,page,maxlength){
      function range(start, end) {
         return Array.from(Array(end-start+1), (_, i) => i+start);
      }
      let sideWidth = maxlength < 9 ? 1 : 2;
      let leftWidth = (maxlength - sideWidth * 2 - 3) >> 1; 
      let rightWidth = (maxlength - sideWidth * 2 - 3) >> 1; 

      if(totalPage <= maxlength){
         return range(1,totalPage)
      }
      if(page <= maxlength - sideWidth - 1 - rightWidth){
         return range(1,maxlength - sideWidth - 1).concat(0,range(totalPage - sideWidth+1, totalPage));

      }

      if(page >= totalPage - sideWidth - 1 - rightWidth - 1 - rightWidth){
         return range(1,sideWidth).concat(0,range(totalPage - sideWidth - 1 -rightWidth - leftWidth, totalPage));
      }
      return range(1, sideWidth).concat(0,range(page - leftWidth, page - rightWidth), 0, range(totalPage - sideWidth + 1, totalPage))
   }

   $(function(){
      var numberOfItems = $(".card-content .card").length
      var limitPerPage = 3;
      var totalPages = Math.ceil(numberOfItems /  limitPerPage);
      var paginationSize = 7;
      var currentPage;



      function showPage(withPage){
         if(withPage < 1 || withPage > totalPages) return false;

         currentPage = withPage;

         $(".card-content .card").hide().slice((currentPage - 1)*limitPerPage, currentPage*limitPerPage).show();

         $(".pagination li").slice(1,-1).remove();

         getPage(totalPages,currentPage, paginationSize).forEach(item => {
            $('<li>').addClass('page-item').addClass(item ? "current-page" : "dots").toggleClass("active", item == currentPage).append($('<a>').addClass('page-link').attr({href:"script:void(0)"}).text(item || "...")).insertBefore(".next-page"); 
         });
         $(".previous-page").toggleClass("disabled", currentPage == 1); 
         $(".next-page").toggleClass("disabled", currentPage == totalPages); 
         return true;
         
      }
      $(".pagination").append(
         $('<li>').addClass('page-item').addClass('previous-page').append($('<a>').addClass('page-link').attr({href:'script:void(0)'}).text("Prev")),
         $('<li>').addClass('page-item').addClass('next-page').append($('<a>').addClass('page-link').attr({href:'script:void(0)'}).text("Next"))
      );

      $('.card-content').show();
      showPage(3);
   });
});   