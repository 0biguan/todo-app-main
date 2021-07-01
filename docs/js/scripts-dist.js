const newTodoForm=document.getElementById("new-todo-form"),formTodos=document.getElementById("todo-list-form"),todosList=document.getElementById("todo-list"),todosListItems=document.querySelectorAll(".todo-list__item"),filterRemaining=document.getElementById("filter-remaining"),filterRemove=document.getElementById("filter-remove"),filterList=document.getElementById("filter-list"),filterButtons=document.querySelectorAll(".filter__button"),toast=document.getElementById("toast"),toggleMode=document.getElementById("toggle-icon");let allTodos=[],mode=!1;const newTodo=e=>[...allTodos,e],renderTodos=e=>{todosList.textContent="";const t=document.createDocumentFragment();for(todo of e){const e=document.createElement("li");e.classList.add("todo-list__item"),e.draggable=!0;const o=document.createElement("div");o.classList.add("form__field"),o.id=todo.id;const d=document.createElement("input");d.type="checkbox",d.name="todo",d.id=`todo-item-${todo.id}`,d.checked=todo.completed,d.classList.add("form__input","form__input--checkbox"),o.appendChild(d);const l=document.createElement("label");l.htmlFor=d.id,l.classList.add("form__label"),o.appendChild(l);const s=document.createElement("input");s.type="text",s.value=todo.todo,s.classList.add("form__input"),s.disabled=todo.completed,o.appendChild(s);const a=document.createElement("button");a.classList.add("form__button");const n=document.createElement("img");n.src="./assets/icons/icon-cross.svg",n.alt="cross",a.appendChild(n),o.appendChild(a),e.appendChild(o),t.appendChild(e)}todosList.appendChild(t),todoIncomplete()},deleteTodo=e=>[...allTodos.filter((t=>t.id!=e))],updateTodo=(e,t)=>{const o=allTodos.findIndex((t=>t.id==e));t?allTodos[o].todo=t:allTodos[o].completed=!allTodos[o].completed,todoIncomplete(allTodos)},todoIncomplete=()=>{const e=allTodos.filter((e=>!e.completed)).length;filterRemaining.innerHTML=`${e} items left`},removeCompleted=()=>allTodos.filter((e=>!e.completed)),filterOptions=e=>(filterButtons.forEach((e=>{e.classList.remove("filter__button--active")})),e.classList.add("filter__button--active"),"active"===e.value?allTodos.filter((e=>!e.completed)):"completed"===e.value?allTodos.filter((e=>e.completed)):allTodos),toastShow=e=>{toast.innerText=e,toast.classList.add("toast--show"),setTimeout((()=>toast.classList.remove("toast--show")),2e3)},disabledFormEnter=e=>(e=e||event,/textarea/i.test((e.target||e.srcElement).tagName)||13!==(e.keyCode||e.which||e.charCode||0)),setLocalStorage=()=>{localStorage.setItem("todos",JSON.stringify(allTodos))},getLocalStorage=()=>{allTodos=JSON.parse(localStorage.getItem("todos"))};formTodos.onkeypress=disabledFormEnter,newTodoForm.addEventListener("submit",(e=>{if(e.preventDefault(),""==newTodoForm.todoValue.value)return toastShow("INSERT NEW VALUE");allTodos=newTodo({id:Date.now(),todo:newTodoForm.todoValue.value,completed:newTodoForm.todoCompleted.checked}),setLocalStorage(),renderTodos(allTodos),newTodoForm.todoCompleted.checked=!1,newTodoForm.todoValue.value="",toastShow("ITEM ADDED")})),todosList.addEventListener("click",(e=>{var t;e.target.classList.contains("form__button")&&(e.preventDefault(),t=e.target.parentElement.id,allTodos=[...allTodos.filter((e=>e.id!=t))],document.getElementById(e.target.parentElement.id).parentElement.remove(),todoIncomplete(),toastShow("ITEM REMOVED")),e.target.classList.contains("form__label")&&(updateTodo(e.target.parentElement.id),renderTodos(allTodos)),setLocalStorage()})),todosList.addEventListener("keyup",(e=>{e.target.classList.contains("form__input")&&"Enter"===e.key&&(updateTodo(e.target.parentElement.id,e.target.value),setLocalStorage(),e.target.blur(),toastShow("ITEM UPDATED"))})),filterRemove.addEventListener("click",(()=>{allTodos=allTodos.filter((e=>!e.completed)),setLocalStorage(),renderTodos(allTodos),toastShow("COMPLETED CLEARED")})),filterList.addEventListener("click",(e=>{if(e.target.classList.contains("filter__button")){const o=(t=e.target,filterButtons.forEach((e=>{e.classList.remove("filter__button--active")})),t.classList.add("filter__button--active"),"active"===t.value?allTodos.filter((e=>!e.completed)):"completed"===t.value?allTodos.filter((e=>e.completed)):allTodos);renderTodos(o)}var t})),toggleMode.addEventListener("click",(e=>{e.target.src=mode?"assets/icons/icon-sun.svg":"assets/icons/icon-moon.svg",mode=!mode,document.body.classList.toggle("light-mode")})),todosList.addEventListener("dragstart",(e=>{e.target.classList.add("dragging")})),todosList.addEventListener("dragend",(e=>{e.target.classList.remove("dragging")})),todosList.addEventListener("dragover",(e=>{e.preventDefault();const t=getDragAfterElement(todosList,e.clientY),o=document.querySelector(".dragging");null==t?todosList.appendChild(o):todosList.insertBefore(o,t)}));const getDragAfterElement=(e,t)=>{const o=[...e.querySelectorAll(".todo-list__item:not(.dragging)")];return console.log(o),o.reduce(((e,o)=>{const d=o.getBoundingClientRect(),l=t-d.top-d.height/2;return l<0&&l>e.offset?{offset:l,element:o}:e}),{offset:Number.NEGATIVE_INFINITY}).element};window.addEventListener("load",(()=>{localStorage.getItem("todos")?allTodos=JSON.parse(localStorage.getItem("todos")):localStorage.setItem("todos",JSON.stringify([])),renderTodos(allTodos)}));