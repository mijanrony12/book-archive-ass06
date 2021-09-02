// custom js code starts here.
const displayBook = document.getElementById('display-book');
const serachResult = document.getElementById('total-result');
const error = document.getElementById('error');
error.style.display = 'none';

// handler add with button.
document.getElementById('button').addEventListener('click', (e) => {
    e.preventDefault()
    displayBook.textContent = '';
    serachResult.textContent = '';
    //access input feild
    const inputField = document.getElementById('input-field');
    const inputValue = inputField.value;
    inputField.value = '';

    //check input feild length
    if (inputValue.length >= 1)
    {
        receiveInputValue(inputValue);
    } else
    {
        alert('give me some text')
    }
});

// doing Api load
const receiveInputValue = async bookName => {
    const url = `http://openlibrary.org/search.json?q=${bookName}`;
    try
    {
        const res = await fetch(url)
        const data= await res.json()
        displayData(data.docs);
    } catch (err)
    {
       error.style.display = 'block';
    }
}
//display data on HTML Page.
const displayData = (book) => {
    // console.log(book.length);
    if (book.length === 0)
    {
        error.style.display = 'block';
      
    }
    
    else if (book.length >= 1)
    {
        //image load on UI
       const searchDiv = document.createElement('div');
       searchDiv.innerHTML = `
         <h3 class="text-center">i have ${book.length} result</h3>
       `;
        serachResult.appendChild(searchDiv);

        // loop through in array
       book.forEach( everyBook => {
          const div = document.createElement('div');
          div.innerHTML = `
            <div class="col">
              <div class="card">
                <img height="300" src="https://covers.openlibrary.org/b/id/${everyBook.cover_i}-M.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">bookTitle:-${everyBook.title}</h5>
                    <p class="card-text">Author:-${everyBook.author_name}</p>
                    <p class="card-text">publisher:-${everyBook.publisher}</p>
                    <p class="card-text">first_publish_year:-${everyBook.first_publish_year}</p>
                </div>
              </div>
          </div>
         `;
        displayBook.appendChild(div);
       });  
    }
  
}

// custom js code ends here.
