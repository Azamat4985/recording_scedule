(() => {
  document.addEventListener("DOMContentLoaded", () => {
    let hoursBox = document.getElementById("hoursBox");
    let selectAll = document.getElementById("allHours");
    let saveBtn = document.getElementById("saveBtn");
    let closeBtn = document.getElementById("closeBtn");
    let openBtn = document.getElementById("openModal");
    let resetBtn = document.getElementById("resetBtn");

    let weekDays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

    let timeTable = {
      mon: [],
      tue: [],
      wed: [],
      thu: [],
      fri: [],
      sat: [],
      sun: [],
    };

    let selectedIndexes = [];

    let iter = 0;
    for (const weekDay of weekDays) {
      let hourLine = document.createElement("div");
      hourLine.classList.add("d-flex");
      hourLine.classList.add("hourLine");
      for (let i = 0; i < 24; i++) {
        let hour;
        let hourText = document.createElement("p");
        hourText.setAttribute("weekDay", weekDay);
        hourText.setAttribute("number", i);
        hourText.setAttribute("index", iter);
        iter++;
        if (i < 10) {
          hour = "0" + i;
        } else {
          hour = i;
        }
        hourText.classList.add("hourText");
        hourText.textContent = hour;
        hourText.addEventListener("click", () => {
          selectHour(hourText);
        });
        hourLine.append(hourText);
      }
      hoursBox.append(hourLine);
    }

    selectAll.addEventListener("change", () => {
      let children = timesBox.getElementsByClassName("hourText");
      if (selectAll.checked) {
        timeTable = {
          mon: [],
          tue: [],
          wed: [],
          thu: [],
          fri: [],
          sat: [],
          sun: [],
        };

        for (const child of children) {
          let weekDay = child.getAttribute("weekday");
          for (const key in timeTable) {
            if (weekDay == key) {
              if (!timeTable[key].includes(parseInt(child.getAttribute("number")))) {
                timeTable[key].push(parseInt(child.getAttribute("number")));
              } else {
                timeTable[key].splice(parseInt(child.getAttribute("number")), 1);
              }
            }
          }

          child.classList.add("hourText--mouseover");
        }
      } else {
        for (const child of children) {
          child.classList.remove("hourText--active");
          child.classList.remove("hourText--mouseover");
          timeTable = {
            mon: [],
            tue: [],
            wed: [],
            thu: [],
            fri: [],
            sat: [],
            sun: [],
          };
        }
      }
    });

    saveBtn.addEventListener("click", async () => {
      let finishArr = Object.assign({}, timeTable);
      for (const key in finishArr) {
        let currentArr = finishArr[key];
        if (currentArr.length != 0) {
          currentArr.sort(function (a, b) {
            return a - b;
          });
        } else {
          delete finishArr[key];
        }
      }
      console.log(finishArr);
      // let res = await fetch('http://localhost:3000/sendData', {
      //   method: 'POST', 
      //   body: JSON.stringify(finishArr),
      //   headers: {
      //     'Content-Type': 'application/json',
      //   }
      // }).then(data => console.log(data))
    });

    openBtn.addEventListener("click", () => {
      document.getElementById("wrapper").style.display = "block";
    });

    closeBtn.addEventListener("click", () => {
      document.getElementById("wrapper").style.display = "none";
    });

    resetBtn.addEventListener("click", () => {
      for (const key in timeTable) {
        timeTable[key] = [];
      }
      let children = timesBox.getElementsByClassName("hourText");
      for (const child of children) {
        child.classList.remove("hourText--mouseover");
        child.classList.remove("hourText--active");
      }
    });

    document.getElementById("clearMon").addEventListener("click", () => {
      clear('mon')
    });
    document.getElementById("clearTue").addEventListener("click", () => {
      clear('tue')
    });
    document.getElementById("clearWed").addEventListener("click", () => {
      clear('wed')
    });
    document.getElementById("clearThu").addEventListener("click", () => {
      clear('thu')
    });
    document.getElementById("clearFri").addEventListener("click", () => {
      clear('fri')
    });
    document.getElementById("clearSat").addEventListener("click", () => {
      clear('sat')
    });
    document.getElementById("clearSun").addEventListener("click", () => {
      clear('sun')
    });
    document.getElementById("clearMonBtn").addEventListener("click", () => {
      clear('mon')
    });
    document.getElementById("clearTueBtn").addEventListener("click", () => {
      clear('tue')
    });
    document.getElementById("clearWedBtn").addEventListener("click", () => {
      clear('wed')
    });
    document.getElementById("clearThuBtn").addEventListener("click", () => {
      clear('thu')
    });
    document.getElementById("clearFriBtn").addEventListener("click", () => {
      clear('fri')
    });
    document.getElementById("clearSatBtn").addEventListener("click", () => {
      clear('sat')
    });
    document.getElementById("clearSunBtn").addEventListener("click", () => {
      clear('sun')
    });

    function clear(day){
      let hourLine = hoursBox.getElementsByClassName("hourText");
      for (const item of hourLine) {
        if (item.getAttribute("weekday") == day) {
          item.classList.remove("hourText--mouseover");
          item.classList.remove("hourText--active");
        }
      }
      timeTable[day] = [];
    }

    function selectHour(hourText) {
      hourText.classList.toggle("hourText--active");
      let hoursArr = hoursBox.getElementsByClassName("hourText");
      let weekDay = hourText.getAttribute("weekday");

      for (const key in timeTable) {
        if (key == weekDay) {
          let currentArr = timeTable[key];
          let number = parseInt(hourText.getAttribute("number"));
          if (currentArr.includes(number)) {
            hourText.classList.remove("hourText--mouseover");
            hourText.classList.remove("hourText--active");
            currentArr.splice(currentArr.indexOf(number), 1);
            return;
          }
        }
      }

      if (selectedIndexes.length != 2) {
        selectedIndexes.push(hourText.getAttribute("index"));
      }
      if (selectedIndexes.length == 2) {
        for (const hoursText of hoursArr) {
          if (parseInt(hoursText.getAttribute("index")) >= selectedIndexes[0] && parseInt(hoursText.getAttribute("index")) <= selectedIndexes[1]) {
            hoursText.classList.add("hourText--mouseover");
            let weekday = hoursText.getAttribute("weekday");

            for (const key in timeTable) {
              if (weekday == key) {
                if (!timeTable[key].includes(parseInt(hoursText.getAttribute("number")))) {
                  timeTable[key].push(parseInt(hoursText.getAttribute("number")));
                }
              }
            }
          }
          if (parseInt(hoursText.getAttribute("index")) <= selectedIndexes[0] && parseInt(hoursText.getAttribute("index")) >= selectedIndexes[1]) {
            hoursText.classList.add("hourText--mouseover");
            let weekday = hoursText.getAttribute("weekday");

            for (const key in timeTable) {
              if (weekday == key) {
                if (!timeTable[key].includes(parseInt(hoursText.getAttribute("number")))) {
                  timeTable[key].push(parseInt(hoursText.getAttribute("number")));
                }
              }
            }
          }
        }
        selectedIndexes = [];
      }
    }
  });
})();
