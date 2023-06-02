console.log('%c HI', 'color: firebrick')
const imgContainer = document.getElementById('dog-image-container');

document.addEventListener('DOMContentLoaded', () => {
    getDogsFromAPI()
    getBreedsFromAPI();
})

function getDogsFromAPI() {
    fetch('https://dog.ceo/api/breeds/image/random/4')
        .then(r => r.json())
        .then(dogsObj => {
            renderDogImgAll(dogsObj.message);
        })
}

function getBreedsFromAPI() {
    fetch("https://dog.ceo/api/breeds/list/all")
        .then(r => r.json())
        .then(breedsObj => {
            loadBreedToList(breedsObj.message);
            handleFiltering();
        })
}

function loadBreedToList(breedsObj) {
    const dogBreedList = document.getElementById('dog-breeds')
    for (breed in breedsObj) {
        const ul = document.createElement('ul');
        clickforColor(ul);
        if (breedsObj[breed].length === 0) {
            ul.textContent = breed;
            dogBreedList.append(ul);
        }
        else {
            for (element of breedsObj[breed]) {
                const ul = document.createElement('ul');
                clickforColor(ul);
                if (element === "shepherd") {
                    ul.textContent = `${breed} ${element}`;
                }
                else {
                    ul.textContent = `${element} ${breed}`;
                }
                dogBreedList.append(ul);
            }
        }
    }
}

function renderDogImgAll(imgUrlObj) {
    for (imgUrl of imgUrlObj) {
        renderDog(imgUrl);
    }
}

function renderDog(imgUrl) {
    const dImg = document.createElement('img');
    dImg.src = imgUrl;
    document.getElementById('dog-image-container').append(dImg);

}

function clickforColor(htmlElement) {
    htmlElement.addEventListener('click', e => {
        e.target.style.color = 'blue';
    })
}

//filter by letter
function handleFiltering() {
    const dogBreedList = document.getElementById('dog-breeds')
    const selector = document.getElementById('breed-dropdown')
    const htmlCollection = document.querySelector('ul#dog-breeds').children;
    const listOfBreedsArray = Array.from(htmlCollection);
    //console.log(selector.value);
    selector.addEventListener('change', e => {
        clearList(dogBreedList);
        filterByLetter(dogBreedList, listOfBreedsArray, e.target.value);
    })

}

function filterByLetter(parentList, array, letter) {
    const filteredArray = array.filter((breed) => {
        const string = breed.textContent;
        //console.log(string);
        return string.charAt(0) === letter;
    })
    filteredArray.forEach(ul => parentList.append(ul))
    //console.log(filteredArray);
}

function clearList(dogBreedList) {
    dogBreedList.innerHTML = "";
}


