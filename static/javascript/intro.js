let src = window.location.search
strAry = src.split("&")
let info = []
for(let i = 0; i< strAry.length; i++){
    strAry2 = (strAry[i].split("="))[1]
    info.push(strAry2)
}
city = info[0]
activityID = info[1]
// console.log(city)
// console.log(activityID)

fetchEventApiNew(city, activityID)

function fetchEventApiNew(city, activityID){
    fetch("/api/intro/activities", {
        method: "post",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "city": city,
            "id": activityID,
        }),
    })
    .then(res => res.json())
    .then(data => {
        if(data){
            // console.log(data);
            data = data.data;
            let html = `
            <div class="top">
                <div class="event_info">
                    <div class="event_category">${data.Class1}</div>
                    <div class="event_activityName">${data.ActivityName}</div>
                    <div class="event_location">${data.Location}</div>
                    <div class="event_description">${data.Description}</div>
                </div>
                <div class="event_img">
                    <img src="${data.Picture.PictureUrl1}">
                </div>
            </div>
            <div class="middle">
                <div class="middle_container">
                    <div class="more_info">
                        <div class="more_img">
                            <img src="${data.Picture.PictureUrl2}">
                        </div>
                        <span>${data.Picture.PictureDescription2}</span>
                    </div>
                    <div class="more_info">
                        <div class="more_img">
                            <img src="${data.Picture.PictureUrl3}">
                        </div>
                        <span>${data.Picture.PictureDescription3}</span>
                    </div>
                </div>
            </div>
            <div class="buttom">
                <div class="details_info">
                    <div class="details_location">
                        <h3>活動位址</h3>
                        <h4>${data.Location} ${data.Address}</h4>
                    </div>
                    <div class="details_startTime">
                        <h3>開始時間</h3>
                        <h4>${data.StartTime}</h4>  
                    </div>
                    <div class="details_endTime">
                        <h3>結束時間</h3>
                        <h4>${data.EndTime}</h4>
                    </div>
                    <div class="details_organizer">
                        <h3>主辦單位</h3>
                        <h4>${data.Organizer}</h4>
                    </div>
                </div>
            </div>
            <div class="back_to_list">
                <button>總覽</button>
            </div>
            `

            const main = document.querySelector("main");
            main.insertAdjacentHTML('beforeEnd', html);

            let button = document.querySelector("button");
            button.onclick = ()=>{
                window.location = "/";
            }
        }
    })
}


// fetchEventApi(city, activityID)

function fetchEventApi(city, activityID){
    fetchURL = "https://tdx.transportdata.tw/api/basic/v2/Tourism/Activity/" + city + "?%24top=30&%24format=JSON"
    fetch(fetchURL)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        for(let i = 0; i < data.length; i++){
            if(data[i].ActivityID === activityID){
                const event_category = document.querySelector(".event_category")
                event_category.textContent = data[i].Class1
                
                const event_activityName = document.querySelector(".event_activityName")
                event_activityName.textContent = data[i].ActivityName

                const event_location = document.querySelector(".event_location")
                event_location.textContent = data[i].Location

                const event_description = document.querySelector(".event_description")
                event_description.textContent = data[i].Description

                const event_img = document.querySelector(".event_img")
                const event_imgIMG = document.createElement("img")
                event_imgIMG.src = data[i].Picture.PictureUrl1
                event_img.appendChild(event_imgIMG)

                const more_img = document.querySelectorAll(".more_img img")
                more_img[0].src = data[i].Picture.PictureUrl2
                more_img[1].src = data[i].Picture.PictureUrl3

                const more_infoSpan = document.querySelectorAll("span")
                more_infoSpan[0].textContent = data[i].Picture.PictureDescription2
                more_infoSpan[1].textContent = data[i].Picture.PictureDescription3

                const details_location = document.querySelector(".details_location")
                const details_locationH4 = document.createElement("h4")
                details_locationH4.textContent = data[i].Location + data[i].Address
                details_location.appendChild(details_locationH4)

                const details_startTime = document.querySelector(".details_startTime")
                const details_startTimeH4 = document.createElement("h4")
                details_startTimeH4.textContent = data[i].StartTime
                details_startTime.appendChild(details_startTimeH4)

                const details_endTime = document.querySelector(".details_endTime")
                const details_endTimeH4 = document.createElement("h4")
                details_endTimeH4.textContent = data[i].EndTime
                details_endTime.appendChild(details_endTimeH4)

                const details_organizer = document.querySelector(".details_organizer")
                const details_organizerH4 = document.createElement("h4")
                details_organizerH4.textContent = data[i].Organizer
                details_organizer.appendChild(details_organizerH4)
            }
        }
    })
}


// const back_to_list = document.querySelector(".buttom")
// console.log(back_to_list)
// back_to_list.addEventListener("click", function(){
//     console.log("123")
//     window.location = "/"
// })