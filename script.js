// ==========================
// DARK MODE
// ==========================

const darkBtn = document.getElementById("darkMode");

if (darkBtn) {
    darkBtn.onclick = () => {
        document.body.classList.toggle("light");

        localStorage.setItem(
            "theme",
            document.body.classList.contains("light")
        );
    };
}

if(localStorage.getItem("theme") === "true"){

    document.body.classList.add("light");

}
// ==========================
// LIVE CLOCK
// ==========================

function updateClock(){

    const clock = document.getElementById("clock");

    if(!clock) return;

    clock.innerHTML = new Date().toLocaleTimeString();

}

setInterval(updateClock,1000);

updateClock();
// ==========================
// MOTIVATION QUOTE
// ==========================

const quotes=[

"Discipline beats motivation.",

"Every workout counts.",

"Stay strong, stay healthy.",

"Consistency is the key.",

"Small progress is still progress.",

"Your only competition is yourself.",

];

const quote = document.getElementById("quote");

if(quote){

    quote.innerHTML =
    quotes[Math.floor(Math.random()*quotes.length)];

}
// ==========================
// WATER TRACKER
// ==========================

let water=

Number(localStorage.getItem("water")) || 6;

const waterText = document.getElementById("water");

if(waterText){
    waterText.innerHTML = water;
}
function saveWater(){

    localStorage.setItem("water", water);

    if(waterText){
        waterText.innerHTML = water;
    }

}
const plus = document.getElementById("plusWater");

if(plus){

    plus.onclick = () => {

        if(water < 8){

            water++;

            saveWater();

            showToast();

        }

    }

}
const minus = document.getElementById("minusWater");

if(minus){

    minus.onclick = () => {

        if(water > 0){

            water--;

            saveWater();

            showToast();

        }

    }

}
// ==========================
// TOAST
// ==========================

function showToast(message){

    const toast = document.getElementById("toast");

    if(!toast) return;

    toast.innerHTML = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    },2000);

}
// ======================
// CRUD WORKOUT
// ======================

// ======================
// CRUD WORKOUT
// ======================

let workouts = JSON.parse(localStorage.getItem("workouts")) || [];

const list = document.getElementById("workoutList");

function tampilkanWorkout(){

    if(!list) return;

    list.innerHTML = "";

    workouts.forEach((item,index)=>{

        list.innerHTML += `
        <div class="workout">

            <div>
                <h3>${item.exercise}</h3>
                <p>${item.reps} Reps</p>
            </div>

            <div>
                <button class="edit"
                    onclick="editWorkout(${index})">
                    Edit
                </button>

                <button class="delete"
                    onclick="hapusWorkout(${index})">
                    Delete
                </button>
            </div>

        </div>
        `;

    });

    localStorage.setItem(
        "workouts",
        JSON.stringify(workouts)
    );

}

tampilkanWorkout();

const addBtn = document.getElementById("addBtn");

if(addBtn){

    addBtn.onclick = ()=>{

        const exercise = document.getElementById("exercise");
        const reps = document.getElementById("reps");

        if(exercise.value == "") return;

        workouts.push({

            exercise: exercise.value,

            reps: reps.value

        });

        exercise.value = "";
        reps.value = "";

        tampilkanWorkout();

        showToast("✅ Workout berhasil ditambahkan!");

    };

}

function hapusWorkout(index){

    workouts.splice(index,1);

    tampilkanWorkout();

    const toast = document.getElementById("toast");

    if(toast){

    toast.innerHTML = "🗑️ Workout berhasil dihapus!";

    showToast();

}

}

function editWorkout(index){

    const nama = prompt(
        "Edit Exercise",
        workouts[index].exercise
    );

    const jumlah = prompt(
        "Edit Reps",
        workouts[index].reps
    );

    if(nama != null){

        workouts[index].exercise = nama;

        workouts[index].reps = jumlah;

        tampilkanWorkout();

        showToast("✏️ Workout berhasil diubah!");

    }

}