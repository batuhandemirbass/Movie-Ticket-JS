const container = document.querySelector('.container');
const count = document.getElementById('count');
const amount = document.getElementById('amount');
const  select = document.getElementById('movie');
const seats = document.querySelectorAll(".seat:not(.reserved)");
container.addEventListener('click',function (e) {
  if (e.target.classList.contains("seat")&& !e.target.classList.contains("reserved")){
 /*   if (select.selectedIndex == 0){
      alert("Please Select Type Of Room");
    }else{*/
      e.target.classList.toggle('selected');
      calculateTotal();
    }
  /*}*/
})
select.addEventListener('change',function (e) {
  calculateTotal();
})
const calculateTotal = () => {
  const selectedSeats = container.querySelectorAll('.seat.selected');
  const selectedSeatindexs = [...selectedSeats].map(seat =>{
    return [...seats].indexOf(seat);
  });

  /*
    const selectedSeatsarray = [];
    const seatsArray = [];

   selectedSeats.forEach(function (seat) {
      selectedSeatsarray.push(seat);
    })
    seats.forEach(function (seat) {
      seatsArray.push(seat);
    })

    let selectedSeatindexs = selectedSeatsarray.map(function (seat) {
      return seatsArray.indexOf(seat);
    });*/



  saveLocalStorage(selectedSeatindexs);

  let selectedSeatCount = selectedSeats.length;
  count.innerText = selectedSeatCount;
  amount.innerText = selectedSeatCount * select.value;
}
const saveLocalStorage = (index) => {
  localStorage.setItem('selectedSeats',JSON.stringify(index));
  localStorage.setItem('selectedMovieIndex',select.selectedIndex);
}
const getFromLocalStorage = () => {
 const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
 if (selectedSeats != null && selectedSeats.length>0){
   seats.forEach(function (seat,index) {
     if (selectedSeats.indexOf(index)>-1){
       seat.classList.add('selected');
     }
   })
 }
 const selectedMovieIndex = JSON.parse(localStorage.getItem('selectedMovieIndex'));
 if (selectedMovieIndex != null){
   select.selectedIndex = selectedMovieIndex;
  }
}
getFromLocalStorage();
calculateTotal();
