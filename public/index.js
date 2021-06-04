async function getUserData(){
  const url = 'https://5dc588200bbd050014fb8ae1.mockapi.io/assessment';
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
        return await response.json();
      
    } catch (error) {
      console.error('error', error);
    }
}

function transformFunction(item){
  return {
    ...item,
    isShow: false
  }
}

function toggleShow(item){
  return {
    ...item,
    isShow: !item.isShow
  }
}

function draw (array) {
  array.forEach(element => {
    let year = moment(new Date(element.createdAt)).format("YYYY-MM-DD")
    return element.createdAt = year
  });
  var template = document.getElementById('cat-list-template').innerHTML;
  var renderCats = Handlebars.compile(template);
  console.log(renderCats({
    user: array,
  }))
  document.querySelector('#e').innerHTML = renderCats({
    user: array,
  });
}

async function init () {
  const array = await getUserData()
  let newArray = array.map(transformFunction)
  
  function handleShowClick(){
    newArray = newArray.map(toggleShow)
    draw(newArray)
  }
  
  document.querySelector('#btn').addEventListener('click', handleShowClick)
  draw(newArray)
}

init()
