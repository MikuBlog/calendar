        let
            year = document.querySelector("#year"),
            month = document.querySelector("#month"),
            date = document.querySelector("#date"),
            weekLi = document.querySelectorAll("#weekday>li"),
            background = document.querySelector("#background"),
            one = document.querySelector("#one"),
            two = document.querySelector("#two"),
            three = document.querySelector("#three"),
            four = document.querySelector("#four"),
            width = window.innerWidth,
            height = window.innerHeight,
            pattern = /^[0-9]+$/,
            li,
            img;
			
        function judge() {//封装一个判断函数，用于判断年和月是否为有效的数字
            if (pattern.test(year.value) && pattern.test(month.value)) {
                each({ "start": 0, "end": li.length - 1 }, function (num) {
                    li[num].removeEventListener("mouseover", event1);
                    li[num].removeEventListener("mouseout", event2);
                })
                getMonthDay(year.value * 1, month.value * 1);
            } else {
                each({ "start": 0, "end": li.length - 1 }, function (num) {
                    li[num].innerText = "";
                })
            }
        }

        function getMonthDay(year, month) {//封装一个更新日期的表格，包括各种UI
            let
                Month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
                firstDay = new Date(year, month - 1).getDay(),
                record = firstDay;
            if (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)) {
                Month[1] = 29;
            }
            each({ "start": 0, "end": li.length - 1 }, function (num) {
                li[num].innerText = "";
                li[num].addEventListener("mouseover", event3);
            })
            check(year,month);
            if (firstDay !== 0) {
                each({ "start": 1, "end": Month[month - 1] }, function (num) {
                    li[firstDay + num - 1].innerText = num;
                    if (num === new Date().getDate() && month === new Date().getMonth() + 1 && year === new Date().getFullYear()) {
                        li[firstDay + num - 1].style.color = "red";
                        li[firstDay + num - 1].style.background = "rgba(0, 0, 0, .5)";
                    }
                    else {
                        li[firstDay + num - 1].style.color = "white";
                        weekLi[new Date(year, month - 1, num).getDay()].style.color = "white";
                        li[firstDay + num - 1].style.background = "transparent";
                    }
                })
                neach({ "end": Month[month - 2], "start": Month[month - 2] - firstDay + 1 }, function (num) {
                    li[record -= 1].innerText = num;
                    li[record].style.color = "rgb(200,200,200)";
                    li[record].style.background = "transparent";
                    li[record].addEventListener('mouseover', event1);
                })
                each({ "start": Month[month - 1], "end": li.length - firstDay - 1 }, function (num) {
                    li[firstDay + num].innerText = num - Month[month - 1] + 1;
                    li[firstDay + num].style.color = "rgb(200,200,200)";
                    li[firstDay + num].style.background = "transparent";
                    li[firstDay + num].addEventListener("mouseover", event1);
                })
            } else {
                record = 7;
                each({ "start": 1, "end": Month[month - 1] }, function (num) {
                    li[firstDay + num + 6].innerText = num;
                    if (num === new Date().getDate() && month === new Date().getMonth() + 1 && year === new Date().getFullYear()) {
                        li[firstDay + num + 6].style.color = "red";
                        li[firstDay + num + 6].style.background = "rgba(0, 0, 0, .5)";
                    }
                    else {
                        li[firstDay + num + 6].style.color = "white";
                        li[firstDay + num + 6].style.background = "transparent";
                    }
                })
                neach({ "end": Month[month - 2], "start": Month[month - 2] - 6 }, function (num) {
                    li[record -= 1].innerText = num;
                    li[record].style.color = "rgb(200,200,200)";
                    li[record].style.background = "transparent";
                    li[record].addEventListener('mouseover', event1);
                })
                each({ "start": Month[month - 1] + 7, "end": li.length - firstDay - 1 }, function (num) {
                    li[firstDay + num].innerText = num - Month[month - 1] - 6;
                    li[firstDay + num].style.color = "rgb(200,200,200)";
                    li[firstDay + num].style.background = "transparent";
                    li[firstDay + num].addEventListener("mouseover", event1);
                })
            }
        }

        function each(json, callback) {//封装一个循环函数，第一个参数为对象，对象中包含i的初始条件和i终止时的条件，的第二个为回调函数，即每次循环都干些什么
            for (let i = json.start; i <= json.end; i++) {
                callback(i);
            }
        }
        function neach(json, callback) {//封装一个循环函数，同上，只是调换了一下顺序
            for (let i = json.end; i >= json.start; i--) {
                callback(i);
            }
        }

        function event1() {//封装一个ui事件函数
            this.style.color = "white";
            this.addEventListener('mouseout', event2);
        }

        function event2() {//封装一个ui事件函数
            this.style.color = "rgb(200,200,200)";
        }

        function event3() {//封装一个ui事件函数
            this.style.background = "rgba(0,0,0,.5)";
            this.addEventListener("mouseout", event4);
        }

        function event4() {//封装一个ui事件函数
            this.style.background = "transparent";
        }

        function check(year,month){//检查今天是否处于第几年第几月，并且将对应星期几改变UI
            if(new Date().getFullYear() == year && new Date().getMonth() == month-1){
                weekLi[new Date(year, month - 1, new Date().getDate()).getDay()].style.background = "rgba(0, 0, 0, .5)";
                weekLi[new Date(year, month - 1, new Date().getDate()).getDay()].style.color = "red";
            }else{//如果不是对应月，则将星期的UI全部置为默认
                each({"start":0,"end":weekLi.length-1},function(num){
                    weekLi[new Date(year, month - 1, num).getDay()].style.background = "transparent";
                    weekLi[new Date(year, month - 1, new Date().getDate()).getDay()].style.color = "white";
                })
            }
        }

        function bubble(img){//判断浏览器的大小从而改变气泡的大小
            if (height < width) {
                img.style.width = width * 0.03 + "px";
                img.style.height = width * 0.03 + "px";
            } else {
                img.style.width = height * 0.03 + "px";
                img.style.height = height * 0.03 + "px";
            }
        }

        each({ "start": 1, "end": 12 }, function (num) {//创建12个泡泡
            let img = new Image();
            img.src = "source/泡泡.png";
            img.className = "img";
            bubble(img);
            background.appendChild(img);
        })

        each({ "start": 1900, "end": 2100 }, function (num) {//创建一个含有1900-2100年份的列表
            let option = document.createElement("option");
            option.innerText = num;
            option.value = num;
            year.appendChild(option);
        })

        each({ "start": 1, "end": 12 }, function (num) {//创建一个含有1-12月份的列表
            let option = document.createElement("option");
            option.innerText = num;
            option.value = num;
            month.appendChild(option);
        })
        each({ "start": 1, "end": 42 }, function () {//创建一个能装下42个日期的格子
            let li = document.createElement("li");
            date.appendChild(li);
        })

        li = document.querySelectorAll("#date>li");

        year.addEventListener('change', function () {//监听年份select的值是否改变
            let Year = this.value;
            judge();
        });

        month.addEventListener('change', function () {//监听月份select的值是否改变
            let Month = this.value;
            judge();
        })

        one.addEventListener('click', function () {//点击箭头改变日期并判断是否改变
            if (year.value == 1900) {
                return;
            }
            year.value = year.value - 1;
            judge();
        });
		
        two.addEventListener('click', function () {
            if (year.value == 2100) {
                return;
            }
            if(year.value == "年份"){
                year.value = 1900;
                judge();
                return;
            }
            year.value = +year.value + 1;
            judge();
        });
		
        three.addEventListener('click', function () {
            if (month.value == 1 && year.value != 1900) {
                month.value = 12;
                year.value = year.value - 1;
                judge();
                return;
            }
            month.value = month.value - 1;
            judge();
        });
		
        four.addEventListener('click', function () {
            if (month.value == 12) {
                month.value = 1;
                year.value = +year.value + 1;
                judge();
                return;
            }
            if(month.value == "月份"){
                month.value = 1;
                judge();
                return;
            }
            month.value = month.value * 1 + 1;
            judge();
        });

        window.addEventListener('resize',function(){//监听浏览器大小的变化，如果浏览器大小改变，气泡就跟着改变
            height = window.innerHeight;
            width = window.innerWidth;
            each({"start":0,"end":img.length-1},function(num){
                bubble(img[num]);
            })
        });

        getMonthDay(year.value = new Date().getFullYear(), month.value = new Date().getMonth() + 1);
		
        img = document.querySelectorAll("#background>img");
		
        setTimeout(function () {//泡泡位置随机
            each({ "start": 0, "end": img.length - 1 }, function (num) {
                img[num].style.top = Math.random() * height + "px";
                img[num].style.left = Math.random() * width + "px";
                img[num].style.transform = `rotate(${Math.random() * 1080}deg)`;
            })
        })
		
        setInterval(function () {
            each({ "start": 0, "end": img.length - 1 }, function (num) {
                img[num].style.top = Math.random() * height + "px";
                img[num].style.left = Math.random() * width + "px";
                img[num].style.transform = `rotate(${Math.random() * 1080}deg)`;
            })
        }, 5000)