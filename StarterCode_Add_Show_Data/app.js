// console.log(firebase);

document.querySelector("#submit").addEventListener("click", () => {
  let name = document.querySelector("#name").value;
  let age = document.querySelector("#age").value;
  let color = document.querySelector("#favcolor").value;

  let user = {
    name: name,
    age: parseInt(age),
    color: color,
  };

  //save user into the database

  db.collection("mypeople")
    .add(user)
    .then(() => {
      alert("New User Added");
    });
});

// updtae documents

function update_doc(ele, id) {
  ele.parentNode.querySelectorAll("input").forEach((e) => {
    e.type = "text";
  });

  ele.parentNode.querySelector("button").hidden = "";
}

//save doc
function save_doc(ele, id) {
  let inputs = ele.parentNode.querySelectorAll("input");
  // console.log(inputs[0].value);
  // console.log(inputs[1].value);

  //call the update function on the db

  db.collection("mypeople")
    .doc(id)
    .update({
      name: inputs[0].value,
      age: inputs[1].value,
    })
    .then(() => {
      alert("data updated");
      show_people();
    });
}

// show people stored in our database

function show_people() {
  db.collection("mypeople")
    .get()
    .then((mydata) => {
      let docs = mydata.docs;

      let html = ``;

      //loop thorugh the docs array
      docs.forEach((d) => {
        // console.log(d.data());
        html += `<p> Name: ${d.data().name}  <input type="hidden" value= "${d.data().name}" /> . Age: ${
          d.data().age
        } <input type="hidden" value= "${d.data().age}" />.<button hidden="hidden" onclick="save_doc(this, '${d.id}')">Save</button> <span class= "subtitle m-4"> ${
          d.id
        }</span>  <button class = "is-pulled-right" onclick="del_doc("${
          d.id
        }")"> Delete </button> 
        
        <button class="is-pulled-right" onclick="update_doc(this, '${d.id}')"> Update </button>


        </p>`;
      });
      document.querySelector("#all_people").innerHTML = html;
    });
}

//call the function
show_people();

// delete user test
// delete()

function del_doc(docid) {
  db.collection("mypeople")
    .doc(docid)
    .delete()
    .then(() => {
      alert("user_deleted");
      show_people();
    });
}

// update the age of jackie to 50 from 49
// update() ... need to provide fB with a the doc ID and the new field:value

// db.collection("mypeople")
//   .doc("IHIHZBcXkV7LtcrFBrwf")
//   .update({
//     age: 40,
//     name: "jackie G",
//     color: "aqua",
//     city: "madison",
//     friends: {
//       sport: "soccer",
//       movie: "Star Wars",
//     },
//   });

//jackie's new fav color is white

// db.collection("mypeople").doc("IHIHZBcXkV7LtcrFBrwf").update({
//   //   color: "white",
//   "favorites.color": "white",
// });

// add joe as a frinedds for jackie
//friends are stored in an array on Firebase

db.collection("mypeople")
  .doc("IHIHZBcXkV7LtcrFBrwf")
  .update({
    friends: firebase.firestore.FieldValue.arrayUnion("joe"),
  });

// remove tom as a frinedds for jackie
//friends are stored in an array on Firebase

db.collection("mypeople")
  .doc("IHIHZBcXkV7LtcrFBrwf")
  .update({
    friends: firebase.firestore.FieldValue.arrayRemove("tom"),
  });

//show how many friends sally has

// db.collection("mypeople")
//   .get()
//   .then((mydata) => {
//     let mydocs = mydata.docs;
//     mydocs.forEach((d) => {
//       if (d.id == "IHIHZBcXkV7LtcrFBrwf") {
//         console.log(d.data().friends.length);
//       }
//     });
//   });

//show people whos name is john
//  filter based on name

// db.collection("mypeople")
//   .where("name", "==", "test2")
//   .get()
//   .then((data) => {
//     let mydocs = data.docs;
//     if (mydocs.length == 0) {
//       console.log("no user found");
//       return;
//     }
//     console.log(`${mydocs.length} users found`);
//     mydocs.forEach((d) => {
//       console.log(d.data());
//     });
//   });

//show users who are younger than 25

// db.collection("mypeople")
//   .where("name", "==", "test2")
//   .where("age", "<", 25)
//   .get()
//   .then((data) => {
//     let mydocs = data.docs;
//     if (mydocs.length == 0) {
//       console.log("no user found");
//       return;
//     }
//     console.log(`${mydocs.length} users found`);
//     mydocs.forEach((d) => {
//       console.log(d.data());
//     });
//   });

// SHow all people who arent john

// db.collection("mypeople")
//   .where("name", "not-in", ["test2", "jackie G"])
//   .get()
//   .then((data) => {
//     let mydocs = data.docs;
//     if (mydocs.length == 0) {
//       console.log("no user found");
//       return;
//     }
//     console.log(`${mydocs.length} users found`);
//     mydocs.forEach((d) => {
//       console.log(d.data());
//     });
//   });

// SHow all people who are jackie or john

// db.collection("mypeople")
//   .where("name", "in", ["test2", "jackie G"])
//   .get()
//   .then((data) => {
//     let mydocs = data.docs;
//     if (mydocs.length == 0) {
//       console.log("no user found");
//       return;
//     }
//     console.log(`${mydocs.length} users found`);
//     mydocs.forEach((d) => {
//       console.log(d.data());
//     });
//   });

// SHow all people who have joe or jack

// db.collection("mypeople")
//   .where("friends", "array-contains-any", ["jack", "joe"])
//   .get()
//   .then((data) => {
//     let mydocs = data.docs;
//     if (mydocs.length == 0) {
//       console.log("no user found");
//       return;
//     }
//     console.log(`${mydocs.length} users found`);
//     mydocs.forEach((d) => {
//       console.log(d.data());
//     });
//   });

//1. Show all teams in Spain

// db.collection("teams")
//   .where("country", "==", "Spain")
//   .get()
//   .then((data) => {
//     let mydocs = data.docs;
//     if (mydocs.length == 0) {
//       console.log("no user found");
//       return;
//     }
//     console.log(`${mydocs.length} teams found`);
//     mydocs.forEach((d) => {
//       console.log(d.data());
//     });
//   });

// //2. Show all teams in Madrid
// db.collection("teams")
//   .where("city", "==", "Madrid")
//   .get()
//   .then((data) => {
//     let mydocs = data.docs;
//     if (mydocs.length == 0) {
//       console.log("no user found");
//       return;
//     }
//     console.log(`${mydocs.length} teams found`);
//     mydocs.forEach((d) => {
//       console.log(d.data());
//     });
//   });

// // 3. Show all national teams (Remember there might be new national teams added later)
// db.collection("teams")
//   .where("teamName", "==", "Argentina National Team")
//   .where("teamName", "==", "Brazil National Team")
//   .get()
//   .then((data) => {
//     let mydocs = data.docs;
//     if (mydocs.length == 0) {
//       console.log("no user found");
//       return;
//     }
//     console.log(`${mydocs.length} teams found`);
//     mydocs.forEach((d) => {
//       console.log(d.data());
//     });
//   });

// // 4. Show all teams that are not in Spain
// db.collection("teams")
//   .where("country", "!=", "Spain")
//   .get()
//   .then((data) => {
//     let mydocs = data.docs;
//     if (mydocs.length == 0) {
//       console.log("no user found");
//       return;
//     }
//     console.log(`${mydocs.length} teams found`);
//     mydocs.forEach((d) => {
//       console.log(d.data());
//     });
//   });
// // 5. Show all teams that are not in Spain or England
// db.collection("teams")
//   .where("country", "not-in", ["Spain", "England"])
//   .get()
//   .then((data) => {
//     let mydocs = data.docs;
//     if (mydocs.length == 0) {
//       console.log("no user found");
//       return;
//     }
//     console.log(`${mydocs.length} teams found`);
//     mydocs.forEach((d) => {
//       console.log(d.data());
//     });
//   });

// // 6. Show all teams in Spain with more than 700M fans
// db.collection("teams")
//   .where("worldwideFansInMillions", ">=", 700)
//   .where("country", "==", "Spain")
//   .get()
//   .then((data) => {
//     let mydocs = data.docs;
//     if (mydocs.length == 0) {
//       console.log("no user found");
//       return;
//     }
//     console.log(`${mydocs.length} teams found`);
//     mydocs.forEach((d) => {
//       console.log(d.data());
//     });
//   });

// // 7. Show all teams with a number of fans in the range of 500M and 600M

// db.collection("teams")
//   .where("worldwideFansInMillions", ">=", 500)
//   .where("worldwideFansInMillions", "<=", 600)
//   .get()
//   .then((data) => {
//     let mydocs = data.docs;
//     if (mydocs.length == 0) {
//       console.log("no user found");
//       return;
//     }
//     console.log(`${mydocs.length} teams found`);
//     mydocs.forEach((d) => {
//       console.log(d.data());
//     });
//   });

// // 8. Show all teams where Ronaldo is a top scorer
// db.collection("teams")
//   .where("topScorers", "array-contains", "Ronaldo")
//   .get()
//   .then((data) => {
//     let mydocs = data.docs;
//     if (mydocs.length == 0) {
//       console.log("no user found");
//       return;
//     }
//     console.log(`${mydocs.length} teams found`);
//     mydocs.forEach((d) => {
//       console.log(d.data());
//     });
//   });

// // 9. Show all teams where Ronaldo, Maradona, or Messi is a top scorer
// db.collection("teams")
//   .where("topScorers", "array-contains-any", ["Ronaldo", "Maradona", "Messi"])
//   .get()
//   .then((data) => {
//     let mydocs = data.docs;
//     if (mydocs.length == 0) {
//       console.log("no user found");
//       return;
//     }
//     console.log(`${mydocs.length} teams found`);
//     mydocs.forEach((d) => {
//       console.log(d.data());
//     });
//   });

// // a. Update Existing Data
// db.collection("teams").doc("bqtVk1ejp5REyXkvU4YK").update({
//   teamName: "Real Madrid FC",
//   worldwideFansInMillions: 811,
// });
// db.collection("teams").doc("jp44fMB1mTlf8YZUbuT6").update({
//   teamName: "FC Barcelona",
//   worldwideFansInMillions: 747,
// });

// db.collection("teams")
//   .doc("bqtVk1ejp5REyXkvU4YK")
//   .update({
//     scorers: firebase.firestore.FieldValue.arrayRemove("Hazard"),
//   })
//   .then(() => {
//     return db
//       .collection("teams")
//       .doc("bqtVk1ejp5REyXkvU4YK")
//       .update({
//         scorers: firebase.firestore.FieldValue.arrayUnion("Crispo"),
//       });
//   });

// db.collection("teams")
//   .doc("jp44fMB1mTlf8YZUbuT6")
//   .update({
//     scorers: firebase.firestore.FieldValue.arrayRemove("Puyol"),
//   })
//   .then(() => {
//     return db
//       .collection("teams")
//       .doc("jp44fMB1mTlf8YZUbuT6")
//       .update({
//         scorers: firebase.firestore.FieldValue.arrayUnion("Deco"),
//       });
//   });

//b. Adding new fields

// let realMadridColor = {
//   color: {
//     home: "White",
//     away: "Black",
//   },
// };

// let barcelonaColor = {
//   color: {
//     home: "Red",
//     away: "Gold",
//   },
// };

// db.collection("teams").doc("bqtVk1ejp5REyXkvU4YK").update(realMadridColor);
// db.collection("teams").doc("jp44fMB1mTlf8YZUbuT6").update(barcelonaColor);

db.collection("teams").doc("bqtVk1ejp5REyXkvU4YK").update({
  "color.away": "Purple",
});

db.collection("teams").doc("jp44fMB1mTlf8YZUbuT6").update({
  "color.away": "Pink",
});
