function addListenerToButton(button, uuid, listId) {
  button.addEventListener('click', () => {
    const http = new XMLHttpRequest();
    const url = 'http://localhost:3000/users';
    const params = `uuid=${uuid}&listId=${listId}`;
    http.open('post', url, true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.onreadystatechange = () => {
      if (http.readyState === 4 && http.status === 200) {
        const lists = document.getElementsByClassName('user-lists')[0];
        const listItem = document.querySelector(`[data-id="${listId}"]`);
        lists.removeChild(listItem);
      }
    };
    http.send(params);
  });
}

document.getElementsByClassName('search-button')[0].addEventListener('click', () => {
  const http = new XMLHttpRequest();
  const data = document.getElementsByClassName('input-box')[0].value;
  const url = `http://localhost:3000/users?uuid=${data}`;

  http.open('get', url, true);

  http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  http.onreadystatechange = () => {
    if (http.readyState === 4 && http.status === 200) {
      const myRes = JSON.parse(http.responseText);
      const userDetails = document.getElementsByClassName('user-details')[0];
      userDetails.innerHTML = '';

      const infoText = document.createElement('p');
      infoText.innerHTML = `email: ${myRes.email} <br> uuid: ${myRes.uuid}`;
      infoText.className = 'user-info';
      userDetails.appendChild(infoText);

      const listDetails = document.getElementsByClassName('user-lists')[0];
      listDetails.innerHTML = '';

      for (const listObj of myRes.lists) {
        const listItem = document.createElement('div');
        const listId = document.createElement('span');
        listId.innerHTML = `mailing list: ${listObj.list}`;
        listItem.className = 'one-list-item';
        listItem.dataset.id = listObj.list;
        listItem.appendChild(listId);

        const unsubscribeBtn = document.createElement('button');
        unsubscribeBtn.className = 'unsubscribe';
        unsubscribeBtn.innerHTML = 'unsubscribe';
        listItem.appendChild(unsubscribeBtn);
        listDetails.appendChild(listItem);

        addListenerToButton(unsubscribeBtn, data, listObj.list);
      }
    }
  };
  http.send();
});
