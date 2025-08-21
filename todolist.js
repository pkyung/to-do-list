document.getElementById("add-button").addEventListener("click", add);

var close_btn = document.getElementById("close");

var modal = document.getElementById("add-modal");

var update_default_modal = document.getElementById("update-default-modal");

var update_modal = document.getElementById("update-modal");

var btn = document.getElementById("add");

var btn_done_update = document.getElementById("update-done-button");

var btn_delete = document.getElementById("delete-button");

var btn_cancel = document.getElementById("add-cancel-button");

var dow = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

var add_no = true;

btn.onclick = function () {
    modal.style.display = "block";
}

btn_cancel.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

close_btn.onclick = function () {
    modal.style.display = "none";
}


function add() {
    btn_cancel.onclick = function () {
        modal.style.display = "none";
    }
    
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            return;
        }
    }

    close_btn.onclick = function () {
        modal.style.display = "none";
    }

    var dow_first = document.getElementById("dow-first").value;
    var dow_last = document.getElementById("dow-last").value;
    var dow_return = false;
    var sche = document.getElementById("sche").value;
    var time_first = document.getElementById("time-first").value;
    var time_last = document.getElementById("time-last").value;
    var time_return = false;
    var importance = document.getElementById("importance").value;
    if (time_first.substr(0,2) < time_last.substr(0,2)) {
        time_return = true;    
    } else if (time_first.substr(0,2) == time_last.substr(0,2)) {
        if (time_first.substr(3,2) <= time_last.substr(3,2)) {
            time_return = true;
        }
    }
    var f;
    var l;
    for (var i in dow) {
        if (dow_first == dow[i]) {
            f = i;
        }
        if (dow_last == dow[i]) {
            l = i;
        }
        if (f <= l) dow_return = true;
    }
    if (!dow_return) {
        window.alert("요일 범위를 올바르게 입력해주세요.");
        modal.style.display = "none";
        return;
    }
    if (sche == "") {
        window.alert("일정을 입력해 주세요.");
        modal.style.display = "none";
        return;
    }
    if(!time_return) {
        window.alert("시간 범위를 올바르게 입력해 주세요.");
        modal.style.display = "none";
        return;
    }
    for (let i = f; i <= l; i++) {
        var div = document.createElement("div");
        div.setAttribute("id", "divtag");
        var li_sche = document.createElement("li");
        var li_time = document.createElement("li");
        var li_dow = document.createElement("li");
        var li_importance = document.createElement("li");
        var txt_sche = document.createTextNode(sche);
        var txt_time = document.createTextNode("시간 : "+time_first+"~"+time_last);
        var txt_dow = document.createTextNode(dow_first+dow_last);
        var txt_importance = document.createTextNode(importance);
        li_sche.appendChild(txt_sche);
        li_time.appendChild(txt_time);
        li_dow.appendChild(txt_dow);
        li_importance.appendChild(txt_importance);
        li_dow.style.display = "none";
        li_importance.style.display = "none";
        div.appendChild(li_sche);
        div.appendChild(li_time);
        div.appendChild(li_dow);
        div.appendChild(li_importance);
        div.style.backgroundColor = importance;
        div.style.padding = "30px";
        div.style.border = "2px solid "+ importance;
        div.style.borderRadius = "8px";
        div.style.marginTop = "10px";
        div.style.marginBottom = "10px";
        div.setAttribute("width", "100%");
        div.addEventListener("click", function (e) {
            update(e.currentTarget);
            console.log(e.currentTarget);
            return;
        });
        var schedule = document.getElementById(dow[i]+"-sche");
        schedule.appendChild(div);
    }
    modal.style.display = "none";
}
function update(event) {
    console.log(event);
    add_no = true;
    var time = event.childNodes[1].textContent;
    var s = event.childNodes[0].textContent;
    var i = event.childNodes[3].textContent;
    var t_f = event.childNodes[1].textContent.substr(5,5);
    var t_l = event.childNodes[1].textContent.substr(11,5);
    var d_f = event.childNodes[2].textContent.substr(0,3);
    var d_l = event.childNodes[2].textContent.substr(3,3);
    console.log(s, i, t_f, t_l, d_f, d_l);
    document.getElementById("sche-default-update").setAttribute("value", s);
    document.getElementsByClassName(i)[0].setAttribute("selected","selected");
    document.getElementsByClassName(d_f+"-f")[0].setAttribute("selected","selected");
    document.getElementsByClassName(d_l+"-l")[0].setAttribute("selected","selected");
    document.getElementById("time-first-default-update").setAttribute("value", t_f);
    document.getElementById("time-last-default-update").setAttribute("value", t_l);
    cancel_btn = document.getElementById("update-cancel-button");
    cancel_btn_default = document.getElementById("default-cancel-button");
    
    cancel_btn_default.onclick = function() {
        update_default_modal.style.display = "none";
        return;
    }
    window.onclick = function (event) {
        if (event.target == update_modal) {
            update_modal.style.display = "none";
            return;
        } else if (event.target == update_default_modal) {
            update_default_modal.style.display = "none";
            return;
        }
    }
    const delete_btn = document.getElementById("delete-defalut-button");
    update_default_modal.style.display = "block";
    delete_btn.onclick = function() {
        delete_obj(s, time);
        return;
    }

    update_btn = document.getElementById("update-button");
    update_btn.addEventListener("click", function () {
        document.getElementsByClassName(i)[1].setAttribute("selected","selected");
        document.getElementsByClassName(d_f+"-f")[1].setAttribute("selected","selected");
        document.getElementsByClassName(d_l+"-l")[1].setAttribute("selected","selected");
        document.getElementById("sche-update").setAttribute("value", s);
        document.getElementById("time-first-update").setAttribute("value", t_f);
        document.getElementById("time-last-update").setAttribute("value", t_l);
        update_default_modal.style.display = "none";
        update_modal.style.display = "block";
        btn_delete.onclick = function () {
            delete_obj(s, time);
            return;
        }
        cancel_btn.onclick = function() {
            update_modal.style.display = "none";
            return;
        }
        window.onclick = function (event) {
            if (event.target == update_modal) {
                update_modal.style.display = "none";
                return;
            } else if (event.target == update_default_modal) {
                update_default_modal.style.display = "none";
                return;
            }
        }
    }, {once : true});
    btn_done_update.onclick = function () {
        update_imf(s, time);
    }
    console.log(event);
    return;
}

function delete_obj(s, time) {
    for(var i = 1; i <= 13; i += 2) {
        console.log(s, time);
        var l = document.getElementById("search").childNodes[i].childNodes.length;
        for(var j = 0; j < l; j++) {
            if (Boolean(document.getElementById("search").childNodes[i].childNodes[j].childNodes[0].textContent == s &&
            document.getElementById("search").childNodes[i].childNodes[j].childNodes[1].textContent == time)) {
                console.log(document.getElementById("search").childNodes[i].childNodes[j]);
                document.getElementById("search").childNodes[i].childNodes[j].remove();
                l = document.getElementById("search").childNodes[i].childNodes.length;
            }
        }
    }
    update_modal.style.display = "none";
    update_default_modal.style.display = "none";
}


function update_imf(s, time) {
    var dow_first_update = document.getElementById("dow-first-update").value;
    var dow_last_update = document.getElementById("dow-last-update").value;
    var sche_update = document.getElementById("sche-update").value;
    var time_first_update = document.getElementById("time-first-update").value;
    var time_last_update = document.getElementById("time-last-update").value;
    var importance_update = document.getElementById("importance-update").value;
    var dow_return_update = false;
    var time_return_update = false;
    var first;
    var last;
    console.log(s, time);

    if (time_first_update.substr(0,2) < time_last_update.substr(0,2)) {
        time_return_update = true;    
    } else if (time_first_update.substr(0,2) == time_last_update.substr(0,2)) {
        if (time_first_update.substr(3,2) <= time_last_update.substr(3,2)) {
            time_return_update = true;
        }
    }
    var first;
    var last;
    for (var i in dow) {
        if (dow_first_update == dow[i]) {
            first = i;
        }
        if (dow_last_update == dow[i]) {
            last = i;
        }
        if (first <= last) dow_return_update = true;
    }

    if (!dow_return_update) {
        window.alert("요일 범위를 올바르게 입력해주세요.");
        update_modal.style.display = "none";
        add_no = false;
        return;
    }
    console.log(sche_update);
    if (sche_update == "") {
        window.alert("일정을 입력해 주세요.");
        update_modal.style.display = "none";
        add_no = false;
        return;
    }
    if(!time_return_update) {
        window.alert("시간 범위를 올바르게 입력해 주세요.");
        update_modal.style.display = "none";
        add_no = false;
        return;
    }
    
    console.log("delete 되기 전");
    console.log(s, time);
    delete_obj(s, time);
    console.log("delete 되고 나서");
    for (let k = first; k <= last; k++) {
        var div = document.createElement("div");
        div.setAttribute("id", "divtag");
        var li_sche = document.createElement("li");
        var li_time = document.createElement("li");
        var li_dow = document.createElement("li");
        var li_importance = document.createElement("li");
        var txt_sche = document.createTextNode(sche_update);
        var txt_time = document.createTextNode("시간 : "+time_first_update+"~"+time_last_update);
        var txt_dow = document.createTextNode(dow_first_update+dow_last_update);
        var txt_importance = document.createTextNode(importance_update);
        li_sche.appendChild(txt_sche);
        li_time.appendChild(txt_time);
        li_dow.appendChild(txt_dow);
        li_importance.appendChild(txt_importance);
        li_dow.style.display = "none";
        li_importance.style.display = "none";
        div.appendChild(li_sche);
        div.appendChild(li_time);
        div.appendChild(li_dow);
        div.appendChild(li_importance);
        div.style.backgroundColor = importance_update;
        div.style.padding = "30px";
        div.style.border = "2px solid "+ importance_update;
        div.style.borderRadius = "8px";
        div.style.marginTop = "10px";
        div.style.marginBottom = "10px";
        div.setAttribute("width", "100%");
        div.addEventListener("click", function (e) {
            update(e.currentTarget);
            console.log(e.currentTarget);
            return;
        });
        var schedule = document.getElementById(dow[k]+"-sche");
        schedule.appendChild(div);
    }
    update_modal.style.display = "none";
}

function changeSortSelect() {
    var select = document.getElementById("sorting");
    var sortValue = select.options[select.selectedIndex].value;
    console.log(sortValue);
    if (sortValue == "name") {
        for (var i = 1; i <= 13; i += 2) {
            var array = [];
            var l = document.getElementById("search").childNodes[i].childNodes.length;
            for (var j = 0; j < l; j++) {
                array.push(document.getElementById("search").childNodes[i].childNodes[j]);
            }
            for (var j = 0; j < l; j++) {
                document.getElementById("search").childNodes[i].childNodes[j].remove;
            }
            array.sort(function(a, b) {
                return a.childNodes[0].textContent < b.childNodes[0].textContent ? -1 : a.childNodes[0].textContent > b.childNodes[0].textContent ? 1 : 0;
            });
            for (var j = 0; j < l; j++) {
                document.getElementById("search").childNodes[i].appendChild(array[j]);
            }
        }
    }
    if (sortValue == "priority") {
        for (var i = 1; i <= 13; i += 2) {
            var array = [];
            var l = document.getElementById("search").childNodes[i].childNodes.length;
            for (var j = 0; j < l; j++) {
                array.push(document.getElementById("search").childNodes[i].childNodes[j]);
            }
            for (var j = 0; j < l; j++) {
                document.getElementById("search").childNodes[i].childNodes[j].remove;
            }
            array.sort(function(a, b) {
                if (a.childNodes[3].textContent == "green") {
                    if (b.childNodes[3].textContent == "red") return 1;
                    else if (b.childNodes[3].textContent == "green") return 0;
                    else return 1;
                } else if (a.childNodes[3].textContent == "red") {
                    if (b.childNodes[3].textContent == "red") return 0;
                    else if (b.childNodes[3].textContent == "yellow") return -1;
                    else return -1;
                } else if (a.childNodes[3].textContent == "yellow") {
                    if (b.childNodes[3].textContent == "red") return 1;
                    else if(b.childNodes[3].textContent == "green") return -1;
                    else return 0;
                }
            });
            for (var j = 0; j < l; j++) {
                document.getElementById("search").childNodes[i].appendChild(array[j]);
            }
        }
    }
    if (sortValue == "time") {
        for (var i = 1; i <= 13; i += 2) {
            var array = [];
            var l = document.getElementById("search").childNodes[i].childNodes.length;
            for (var j = 0; j < l; j++) {
                array.push(document.getElementById("search").childNodes[i].childNodes[j]);
            }
            for (var j = 0; j < l; j++) {
                document.getElementById("search").childNodes[i].childNodes[j].remove;
            }
            array.sort(function(a, b) {
                return a.childNodes[1].textContent < b.childNodes[1].textContent ? -1 : a.childNodes[1].textContent > b.childNodes[1].textContent ? 1 : 0;
            });
            for (var j = 0; j < l; j++) {
                document.getElementById("search").childNodes[i].appendChild(array[j]);
            }
        }
    }
    
}