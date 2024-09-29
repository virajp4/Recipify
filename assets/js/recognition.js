const PAT = "e830d45b1e274301ac15300c7524e50f";
const USER_ID = "clarifai";
const APP_ID = "main";
const MODEL_ID = "food-item-recognition";
const MODEL_VERSION_ID = "1d5fd481e0cf4826aa72ec3ff049e044";

const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

document.getElementById("imageRecognitionForm").addEventListener("submit", function (event) {
  event.preventDefault();
  let uploadImage = document.getElementById("uploadImage").files[0];

  if (uploadImage) {
    let reader = new FileReader();
    reader.onload = function (e) {
      let outputDiv = document.getElementById("imageRecognitionOutput");
      let nameDiv = document.getElementById("recognizedRecipeName");
      let image = document.getElementById("recognizedImage");
      outputDiv.style.display = "none";
      image.src = e.target.result;
      image.style.maxWidth = "500px";

      // Perform image recognition using Clarifai
      const raw = JSON.stringify({
        user_app_id: {
          user_id: USER_ID,
          app_id: APP_ID,
        },
        inputs: [
          {
            data: {
              image: {
                base64: e.target.result.split(",")[1],
              },
            },
          },
        ],
      });

      fetch(CORS_PROXY + "https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: "Key " + PAT,
          "Content-Type": "application/json",
        },
        body: raw,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.outputs.length > 0 && data.outputs[0].data.concepts.length > 0) {
            let concepts = data.outputs[0].data.concepts;
            let recipeName = concepts[0].name; // Adjust based on actual response
            recipeName = recipeName.charAt(0).toUpperCase() + recipeName.slice(1);

            nameDiv.innerText = recipeName;
            outputDiv.style.display = "block";
            image.style.display = "block";
          } else {
            alert("No recognizable items found in the image.");
          }
        })
        .catch((error) => {
          console.error("Error performing image recognition:", error);
          alert("An error occurred while recognizing the image.");
        });
    };
    reader.readAsDataURL(uploadImage);
  } else {
    alert("Please upload an image to proceed.");
  }
});
