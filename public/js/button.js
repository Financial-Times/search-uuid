// client side
document.getElementsByClassName('search-button')[0].addEventListener('click', () => {    

  const http = new XMLHttpRequest();
  const data = document.getElementsByClassName('input-box')[0].value;
  const url = `http://localhost:3000/users?uuid=${data}`;
  console.log(url);

  http.open("GET", url, true);

  // console.log(`data collected:${data}`);

  http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  http.onreadystatechange = () => {
    if (http.readyState === 4 && http.status === 200) {
      let myRes = JSON.parse(http.responseText);
      // console.log(myRes.email);

      let details = document.getElementsByClassName('user-details')[0];
      details.innerHTML = myRes.email;
    };
  };

  http.send(data);
});
