session = null;
QiSession(connected, disconnected, location.host);

function connected(s) {
    session = s;
    subscribe_to_events();
}
function disconnected(error) {
    console.log("Session disconnected");
}

function subscribe_to_events() {
    session.service("ALMemory").then(function (memory) {
        memory.subscriber("THM_HRI/pokerhand").then(function (subscriber) {
            subscriber.signal.connect(function (hand) {
                for(i = 0; i<5; i++){
                    element = "karte" + String(i + 1)
                    document.getElementById(element).innerHTML=element;
                    wert = hand[i];
                    document.getElementById(element).src = "PNG_Cards/" + wert + ".png";
//                    karte.src = "../PNG_Cards/" + wert + ".png";
//                    document.getElementById("error_message" + String(i+1)).innerHTML=document.getElementById(element).src;
                };
            });
        });

        memory.subscriber("THM_HRI/poker_gewinn").then(function (subscriber) {
          subscriber.signal.connect(function (gewinn) {
//            alert("Du hast einen " + gewinn[0] + " und gewinnst " + gewinn[1])
            if (gewinn[1] > 0) {
              document.getElementById('popup').style.cssText = 'display: block; background: linear-gradient(145deg, #6e0000, #200);  box-shadow: 0 0 20px #ffd700;  color: #ffd700; border: 4px solid #ffd700;';
              document.getElementById('youwin').innerHTML= "Du gewinnst";
              document.getElementById('youwin').style.cssText= "color: #FFD700;";
              document.getElementById('handtyp').innerHTML=gewinn[0];
              document.getElementById('gewinn').innerHTML= " + " + String(gewinn[1]);

            } else {
              document.getElementById('popup').style.cssText = 'display: block; background: rgb(9,9,121); background: linear-gradient(145deg, rgba(9,9,121,1) 0%, rgba(170,241,255,1) 100%);box-shadow: 0 0 20px #aaf1ff;  color: #aaf1ff; border: 4px solid #aaf1ff;';
              document.getElementById('youwin').innerHTML= "Verloren";
              document.getElementById('youwin').style.cssText= "  color: #aaf1ff;";
              document.getElementById('handtyp').innerHTML="";
              document.getElementById('gewinn').innerHTML= " + 0";
//              document.getElementById('popup').style.background = "blue";

            }
          });
      });
      memory.subscriber("THM_HRI/poker_guthaben").then(function (subscriber) {
        subscriber.signal.connect(function (guthaben) {
          document.getElementById("Guthaben").innerHTML = guthaben;
          if(guthaben < 0){
            alert("Leider hast du kein Guthaben mehr. Das Spiel wird nun beendet")
          }
        });
    });

        
/*    
        memory.subscriber("THM_HRI/poker_gewinn").then(function (subscriber) {
          subscriber.signal.connect(function (gewinn) {
              alert(gewinn)
          });
      });
      */
    });
}



function raiseTabletEvent(event,content) {
    session.service("ALMemory").then(
        function(memory){
            memory.raiseEvent(event, content);
    },
        function(error){
            console.log("An error occurred:", error);
    });
}


function checkOccurrences(list, value) {
  var count = 0;
  for (var i = 0; i < list.length; i++) {
      if (list[i] === value) {
          count++; // Inkrementiere den Zähler, wenn der Wert gefunden wurde
      }
  }
  return count > 3;
}

var hand = [0,0,0,0,0]

//document.getElementById("karten_austauschen").onclick = kartenAustauschen()

function closePopup(){
  document.getElementById('popup').style.display = 'none';
}


function kartenAustauschen() {
  if (checkOccurrences(hand, 1) == true) {
    alert("Bitte nur maximal 3 Karten auswählen")
  } else {
//    document.getElementById("handkarten_ausgabe").innerHTML = hand;
    raiseTabletEvent("THM_HRI/karten_austauschen", hand);
    hand = [0,0,0,0,0];
    for(var i = 1; i < 6; i++){
      document.getElementById("karte" + String(i)).classList.remove("kartevorausgewaehlt")
    }
  }
}


function karteAuswaehlen(karte){
  if (hand[karte] == 0) {
    document.getElementById("karte" + String(karte + 1)).classList.add("kartevorausgewaehlt")
    hand[karte] = 1;
  } else {
    document.getElementById("karte" + String(karte + 1)).classList.remove("kartevorausgewaehlt")
    hand[karte] = 0;
  }
}


 /*


document.addEventListener("DOMContentLoaded", function() {
    const hand = document.getElementById("hand");
    const ergebnis = document.getElementById("ergebnis");
    let karten = ["2 Herz", "3 Pik", "4 Kreuz", "5 Karo", "6 Herz"]; // Beispiel-Karten
  
    karten.forEach((karte, index) => {
      let kartenDiv = document.createElement("div");
      kartenDiv.classList.add("karte");
      kartenDiv.textContent = karte;
      kartenDiv.onclick = function() {
        this.classList.toggle("vorausgewaehlt");
      };
      hand.appendChild(kartenDiv);
    });
  
    document.getElementById("austauschBtn").onclick = function() {
      let vorausgewaehlteKarten = document.querySelectorAll(".karte.vorausgewaehlt");
      if (vorausgewaehlteKarten.length > 0) {
        // Logik zum Austauschen der vorausgewählten Karten
        ergebnis.textContent = "Karten ausgetauscht!";
      } else {
        ergebnis.textContent = "Keine Karten ausgewählt!";
      }
    };
  
    document.getElementById("weiterBtn").onclick = function() {
      // Logik, um ohne Austausch fortzufahren
      ergebnis.textContent = "Fortfahren ohne Austausch.";
    };
  });


  */
