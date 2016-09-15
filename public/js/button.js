document.getElementsByClassName('search-button')[0].addEventListener('click', () => {
  const http = new XMLHttpRequest();
  const data = document.getElementsByClassName('input-box')[0].value;
  const url = `http://localhost:3000/users?uuid=${data}`;

  http.open('get', url, true);

  http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  http.onreadystatechange = () => {
    if (http.readyState === 4 && http.status === 200) {
      const myRes = JSON.parse(http.responseText);
      const details = document.getElementsByClassName('user-details')[0];
      const infoText = document.createElement('p');
      infoText.innerHTML = `email: ${myRes.email} <br> uuid: ${myRes.uuid}`;
      infoText.className = 'user-info';

      // const mailingList = 'mailing list: '
      // stuff = document.getElementsByClassName('mm');
      // mailingList = document.createElement('div');
      // mailingList.className = 'mm';
      // stuff.appendChild(infoText);

      for (const listObj of myRes.lists) {
        console.log(listObj.list);
        let listArray = listObj.list;
        const deets = document.getElementsByClassName('user-lists')[0];
        listArray = document.createElement('div');
        listArray.innerHTML = `mailing list: ${listObj.list }`;
        // Each list will have a button associated with it that unsubscribes the user from the list.
        listArray.className = 'user-lists';
        deets.appendChild(listArray);
      }

      details.appendChild(infoText);
    }
  };

  http.send(data);
});
