// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления
const minWeightInput = document.querySelector('.minweight__input'); // поле с минимальным весом
const maxWeightInput = document.querySelector('.maxweight__input'); // поле с максимальным весом

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);
let fruitsModified = [];
//Добавляем в объект карточек фруктов значение index.
for(let i = 0; i < fruits.length; i++) {
fruitsModified.push({'index': i, ...fruits[i]});
}


/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = () => {
  // TODO: очищаем fruitsList от вложенных элементов,
  // чтобы заполнить актуальными данными из fruits


  while(fruitsList.firstChild) {
    fruitsList.removeChild(fruitsList.firstChild);
  }

  for (let i = 0; i < fruitsModified.length; i++) {
    // TODO: формируем новый элемент <li> при помощи document.createElement,
    // и добавляем в конец списка fruitsList при помощи document.appendChild
    let li = document.createElement('li');
    let divInfo = document.createElement('div');
    li.classList.add('fruit__item');
    if(fruitsModified[i].color === "фиолетовый") {
    li.classList.add('fruit_violet');
    }
     else if(fruitsModified[i].color === "зеленый") {
        li.classList.add('fruit_green');
        }
      else if(fruitsModified[i].color === "розово-красный") {
          li.classList.add('fruit_carmazin');
          }
        else if(fruitsModified[i].color === "желтый") {
            li.classList.add('fruit_yellow');
            }
            else {
              li.classList.add('fruit_lightbrown');
              }
    divInfo.classList.add('fruit__info');
    fruitsList.appendChild(li);
    li.appendChild(divInfo);
  const fruitInfo = document.querySelectorAll('.fruit__info');
    let text;  
    for(let j = 0; j < 4; j++) {
      let div = document.createElement('div');
       fruitInfo[i].appendChild(div);
       if(j === 0) {text = document.createTextNode(Object.keys(fruitsModified[i])[j] + ': ' + fruitsModified[i].index);}
       else if(j === 1) { text = document.createTextNode(Object.keys(fruitsModified[i])[j] + ': ' + fruitsModified[i].kind); }
       else if(j === 2) { text = document.createTextNode(Object.keys(fruitsModified[i])[j] + ': ' + fruitsModified[i].color); }
       else if(j === 3) { text = document.createTextNode(Object.keys(fruitsModified[i])[j] + ' (кг): ' + 
       fruitsModified[i].weight); }
       div.appendChild(text);
    }
  }
};

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// перемешивание массива
const shuffleFruits = () => {
 // Используем для перемешивания элементов массива алгоритм тасования Фишера — Йетса 
  let randomIndex; 
  let n = fruitsModified.length;
  let temp;
  while (n > 0) {
  randomIndex = Math.floor(Math.random() * n--);
  temp = fruitsModified[n];
  fruitsModified[n] = fruitsModified[randomIndex];
  fruitsModified[randomIndex] = temp;
  }
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/
// фильтрация массива
const filterFruits = (a, b) => {
  fruitsModified = fruitsModified.filter((item) => {
            return item.weight >= Number(a) && item.weight <= Number(b);
    // TODO: допишите функцию
  });
};

filterButton.addEventListener('click', () => {
  //Защита от непправильного ввода данных
  if(Number(minWeightInput.value > Number(maxWeightInput.value))) {
    alert('Вы ввели минимальное значение веса, больше максимального, исправьте ошибку.');
  }  else if(minWeightInput.value === '' || maxWeightInput.value === '')  {
    alert('Ошибка, у вас не все поля ввода заполнены, проверьте всё ещё раз');
  } else if(!Number(minWeightInput.value) && !Number(maxWeightInput.value)){ 
    alert('Ошибка, в поля ввода min weight и max weight надо ввести число');
  } else if(!Number(minWeightInput.value)){ 
    alert('Ошибка, в поле ввода min weight надо ввести число');
  } else if(!Number(maxWeightInput.value)){ 
    alert('Ошибка, в поле ввода max weight надо ввести число');
  } else  if(Number(minWeightInput.value) <= 0 || Number(maxWeightInput.value) <= 0 || 
  (Number(minWeightInput.value) <= 0 && Number(maxWeightInput.value) <= 0)) {
    alert('Ошибка, вес не может быть отецательным или равным 0');
  } else {
  filterFruits(minWeightInput.value, maxWeightInput.value);
  }
  display();
  //Очищаем поля ввода
  minWeightInput.value = '';
  maxWeightInput.value = '';
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (a, b) => {
  /*Элементы по цвету сравниваются исходя из расположения цветов в радуге, светло-коричневый идёт
     после фиолетового цвета*/
  const priority = ['розово-красный', 'желтый', 'зеленый', 'фиолетовый', 'светло-коричневый'];
  const fruitColorA = priority.indexOf(a.color);
  const fruitColorB = priority.indexOf(b.color);
  return fruitColorA > fruitColorB;
  // TODO: допишите функцию сравнения двух элементов по цвету
};

const sortAPI = {
  bubbleSort(arr, comparation) {
    // TODO: допишите функцию сортировки пузырьком
    const n = arr.length;
   // внешняя итерация по элементам
   for (let i = 0; i < n-1; i++) { 
       // внутренняя итерация для перестановки элемента в конец массива
       for (let j = 0; j < n-1-i; j++) { 
           // сравниваем элементы
           if (comparation(arr[j], arr[j+1])) { 
               // делаем обмен элементов
               let temp = arr[j+1]; 
               arr[j+1] = arr[j]; 
               arr[j] = temp; 
           }
       }
   }                  
  },
 
  quickSort(arr, comparation) {
    // TODO: допишите функцию быстрой сортировки
    if (arr.length < 2) return arr;
    // Выбираем опорный элемент
    let pivot = arr[0];
    // Определяем массивы для тех, что меньше и больше опорного
    const left = [];
    const right = [];

    /* Проходим циклом по всем элементам из массива и разносим их в массивы созданные ранее 
    согласно условию, больше опорного - в правый, меньше - в левый  */
    for (let i = 1; i < arr.length; i++) {
      if (comparation(pivot, arr[i])) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }
    /* Рекурсивно повторяем процесс для новых двух массивов, текущий опорный элемент - кладем как 
    первый в правый массив.*/
      return quickSort(left, comparation).concat(pivot, quickSort(right, comparation));
      },

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
  sortKindLabel.textContent === 'bubbleSort' ? sortKindLabel.textContent = 'quickSort' :
  sortKindLabel.textContent = 'bubbleSort'; 
});

sortActionButton.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  sortTimeLabel.textContent = 'sorting...';
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruitsModified, comparationColor);
  display();
  sortTimeLabel.textContent = sortTime;
  // TODO: вывести в sortTimeLabel значение sortTime
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {

  let newfruitsModified = {};
  let newkindValue = kindInput.value; 
  let newcolorValue = colorInput.value; 
  let newWeightValue =  Number(weightInput.value);
  //Защита от непправильного ввода данных
  if(kindInput.value === '' || colorInput.value === '' || weightInput.value === '')  {
    alert('Ошибка, у вас не все поля ввода заполнены, проверьте всё ещё раз');
  } else if(!Number(weightInput.value)){ 
    alert('Ошибка, в поле ввода weight надо ввести число');
  } else  if(Number(weightInput.value) <= 0) {
    alert('Ошибка, вес не может быть отецательным или равным 0');
  } else {
  newfruitsModified.index = fruitsModified.length;
  newfruitsModified.kind = newkindValue;
  newfruitsModified.color = newcolorValue;
  newfruitsModified.weight = newWeightValue;
  fruitsModified.push(newfruitsModified);
  }
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
  display();
  //Очищаем поля ввода
  kindInput.value = ''; 
  colorInput.value = ''; 
  weightInput.value = '';
});