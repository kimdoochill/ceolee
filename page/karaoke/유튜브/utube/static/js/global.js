"use strict";
/// <reference path="./@types.d.ts" />
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// dev
let log = console.log;
// selectors
function $(q) { return document.querySelector(q); }
function $$(q) { return document.querySelectorAll(q); }
class Luxon {
    static now() { return luxon.DateTime.now(); }
    static seoul() { return this.now().setZone("Asia/Seoul"); }
}
class Time {
    constructor() {
        let seoul = Luxon.seoul();
        let c = seoul.c;
        this.year = Time.numToTimeString(c.year);
        this.month = Time.numToTimeString(c.month);
        this.day = Time.numToTimeString(c.day);
        this.weekday = Time.numToWeekdayKO(seoul.weekday);
        this.hour = Time.numToTimeString(c.hour);
        this.minute = Time.numToTimeString(c.minute);
        this.second = Time.numToTimeString(c.second);
    }
    static numToTimeString(n) {
        let nString = String(n);
        if (n < 10) {
            return "0" + nString;
        }
        return nString;
    }
    static numToWeekdayKO(n) {
        switch (n) {
            case 1:
                return "월";
            case 2:
                return "화";
            case 3:
                return "수";
            case 4:
                return "목";
            case 5:
                return "금";
            case 6:
                return "토";
            case 7:
                return "일";
            default:
                return "<err>";
        }
    }
    static sleep(ms) {
        return new Promise((rsv) => { setTimeout(rsv, ms); });
    }
}
var Header;
(function (Header) {
    class Clock {
        static queryBase(attr) { return `header > div[clock] > div[${attr}]`; }
        static queryDate(attr) {
            return `${this.queryBase("date")} > span[${attr}]`;
        }
        static queryTime(attr) {
            return `${this.queryBase("time")} > span[${attr}]`;
        }
        static printYear(year) { $(this.queryDate("year")).innerText = year; }
        static printMonth(month) { $(this.queryDate("month")).innerText = month; }
        static printDay(day) { $(this.queryDate("day")).innerText = day; }
        static printWeekday(weekday) { $(this.queryDate("weekday")).innerText = weekday; }
        static printHour(hour) { $(this.queryTime("hour")).innerText = hour; }
        static printMinute(minute) { $(this.queryTime("minute")).innerText = minute; }
        static printSecond(second) { $(this.queryTime("second")).innerText = second; }
        static run() {
            return __awaiter(this, void 0, void 0, function* () {
                while (true) {
                    let now = new Time();
                    this.printYear(now.year);
                    this.printMonth(now.month);
                    this.printDay(now.day);
                    this.printWeekday(now.weekday);
                    this.printHour(now.hour);
                    this.printMinute(now.minute);
                    this.printSecond(now.second);
                    yield Time.sleep(300);
                }
            });
        }
    }
    function run() {
        Clock.run();
    }
    Header.run = run;
})(Header || (Header = {}));
class Calculator {
    static queryBase() { return "section[calculator] > div[body] > form"; }
    static querySelect(attr) { return `${this.queryBase()} > select[${attr}]`; }
    static $form() { return $(this.queryBase()); }
    static $selectTimeType() { return $(this.querySelect("time-type")); }
    static $selectHeadCount() { return $(this.querySelect("headcount")); }
    static submitHandler(evt) {
        evt.preventDefault();
        let timeType = Number(Calculator.$selectTimeType().value);
        let headcount = Number(Calculator.$selectHeadCount().value);
        Modals.Calculator.show(timeType, headcount);
    }
    static events() {
        this.$form().addEventListener("submit", this.submitHandler);
    }
    static run() {
        this.events();
    }
}
class Body {
    static lock() { $("body").setAttribute("lock", ""); }
    static unlock() { $("body").removeAttribute("lock"); }
}
var Price;
(function (Price) {
    Price.LIST_WHISKIES = [
        { timeType: 1, price: 350000 },
        { timeType: 2, price: 160000 },
    ];
    Price.TC_GIRL = 120000;
    Price.TC_ROOM = 50000;
})(Price || (Price = {}));
class Comma {
    static money(n) {
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}
var Modals;
(function (Modals) {
    let $divModals = $("body > div[modals]");
    function show() {
        Body.lock();
        $divModals.setAttribute("show", "");
    }
    Modals.show = show;
    function close() {
        Body.unlock();
        $divModals.removeAttribute("show");
    }
    Modals.close = close;
    class Calculator {
        static queryBase() { return "div[modal][calculator]"; }
        static queryPrice() { return `${this.queryBase()} > div[body] > div[price]`; }
        static queryDetail() { return `${this.queryPrice()} > div[detail]`; }
        static queryWhisky() { return `${this.queryDetail()} > div[whisky]`; }
        static queryGirlTC() { return `${this.queryDetail()} > div[girl-tc]`; }
        static queryTotal() { return `${this.queryPrice()} > div[total]`; }
        static $divModalCalculator() { return $(this.queryBase()); }
        static $buttonConfirm() {
            return $(`${this.queryBase()} > div[footer] > button[confirm]`);
        }
        static printTimeType(timeType) {
            $(`${this.queryWhisky()} > span[timetype]`).innerText = `${timeType}부`;
        }
        static calcWhiskyPrice(timeType) {
            let price = 0;
            for (let w of Price.LIST_WHISKIES) {
                if (w.timeType == timeType) {
                    price = w.price;
                    break;
                }
            }
            return price;
        }
        static printWhiskyPrice(price) {
            $(`${this.queryWhisky()} > span[price]`).innerText = Comma.money(price);
        }
        static printHeadCount(headcount) {
            $(`${this.queryGirlTC()} > span[headcount]`).innerText = `${headcount}명`;
        }
        static calcGirlTCPrice(headcount) {
            return Price.TC_GIRL * headcount;
        }
        static printGirlTCPrice(price) {
            $(`${this.queryGirlTC()} > span[price]`).innerText = Comma.money(price);
        }
        static printRoomTCPrice(price) {
            $(`${this.queryDetail()} > div[room-tc] > span[price]`).innerText = Comma.money(price);
        }
        static printTotalPrice(price) {
            $(`${this.queryTotal()} > span[price]`).innerText = Comma.money(price);
        }
        static show(timeType, headcount) {
            this.printTimeType(timeType);
            let whiskyPrice = this.calcWhiskyPrice(timeType);
            this.printWhiskyPrice(whiskyPrice);
            this.printHeadCount(headcount);
            let girlTCPrice = this.calcGirlTCPrice(headcount);
            this.printGirlTCPrice(girlTCPrice);
            let roomTCPrice = Price.TC_ROOM;
            this.printRoomTCPrice(roomTCPrice);
            let totalPrice = whiskyPrice + girlTCPrice + roomTCPrice;
            this.printTotalPrice(totalPrice);
            Modals.show();
            this.$divModalCalculator().setAttribute("show", "");
        }
        static close() {
            Modals.close();
            Modals.Calculator.$divModalCalculator().removeAttribute("show");
        }
        static events() {
            this.$buttonConfirm().addEventListener("click", this.close);
        }
        static run() {
            this.events();
        }
    }
    Modals.Calculator = Calculator;
    function run() {
        Calculator.run();
    }
    Modals.run = run;
})(Modals || (Modals = {}));
// Run
Header.run();
Modals.run();
