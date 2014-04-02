function load_kk_lrc(playerid) {
    var kk_lrc = new Object();
    kk_lrc.extra_top = 1;
    kk_lrc.current = -1;
    kk_lrc.next_update_time = -1;
    kk_lrc.lrc = [];
    kk_lrc.player_obj = document.getElementById(playerid);
    kk_lrc.lrc_obj = document.getElementById(playerid + '_lrc');

    kk_lrc.scroll_lrc = function() {
        if (typeof kk_lrc.lrc[kk_lrc.current + 2] != "undefined") {
            var lrc = kk_lrc.lrc_obj.getElementsByTagName('li');
            for (id in lrc) lrc[id].className = '';
            lrc[kk_lrc.current + 3].className = 'current';
        }
        kk_lrc.current++;
        kk_lrc.next_update_time = kk_lrc.lrc[kk_lrc.current];
        kk_lrc.lrc_obj.scrollTop = kk_lrc.current * 20;
    };
    kk_lrc.check_lrc_update = function() {
        if (kk_lrc.player_obj.currentTime >= kk_lrc.next_update_time - 0.2) {
            kk_lrc.scroll_lrc();
            kk_lrc.check_lrc_update();
        }
        if (typeof kk_lrc.lrc[kk_lrc.current - 1] != "undefined") {
            kk_lrc.extra_top = (kk_lrc.next_update_time - kk_lrc.player_obj.currentTime) / (kk_lrc.lrc[kk_lrc.current] - kk_lrc.lrc[kk_lrc.current - 1]);
        }
        kk_lrc.lrc_obj.scrollTop = (kk_lrc.current - kk_lrc.extra_top + 0.7) * 20;
    };
    kk_lrc.init = function() {
        kk_lrc.add_lrc('999999', '');
        kk_lrc.add_lrc('999999', '');
        kk_lrc.current = -1;
        kk_lrc.scroll_lrc();
        kk_lrc.check_lrc_update();
        kk_lrc.player_obj.addEventListener("timeupdate", function() {
            if (kk_lrc.next_update_time < kk_lrc.player_obj.currentTime) {
                // reset
                kk_lrc.current = -1;
                kk_lrc.scroll_lrc();
                kk_lrc.check_lrc_update();
            } else {
                kk_lrc.check_lrc_update();
            }
        });
        kk_lrc.player_obj.addEventListener("seeked", function() {
            kk_lrc.current = -1;
            kk_lrc.scroll_lrc();
            kk_lrc.check_lrc_update();
        });
        kk_lrc.player_obj.addEventListener("durationchange", function() {
            kk_lrc.current = -1;
            kk_lrc.scroll_lrc();
            kk_lrc.check_lrc_update();
        });
    };
    kk_lrc.add_lrc = function(time, lrc) {
        kk_lrc.lrc.push(time);
        var lrc_line = document.createElement("li");
        lrc_line.innerHTML = lrc;
        kk_lrc.lrc_obj.appendChild(lrc_line);
    };
    kk_lrc.get_lrc = function(num) {
        if (typeof kk_lrc.lrc[num] != "undefined") {
            return kk_lrc.lrc[num][1];
        } else {
            return '';
        }
    }
    return kk_lrc;
}