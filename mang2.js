"use strict";

function renderMang2(dt) {
    if (!dt) return;
    document.getElementById('setup-screen').style.display = 'none';
    document.getElementById('dashboard-screen').style.display = 'flex';
    let chiNam = dt.cNam.split('-')[1], chiThang = dt.cThang.split('-')[1], chiNgay = dt.cNgay.split('-')[1];
    let theHao = null, ungHao = null, dungThanOpts = [], dongArrList = [], amDongArrList = [];
    dt.haoData.forEach(h => {
        if (h.the) theHao = h;
        if (h.ung) ungHao = h;
        dungThanOpts.push({ value: h.i, label: `Hào ${h.i+1}: ${h.lt} ${h.can}-${h.chi}`, data: h, type: 'chinh' });
        if (h.dong) dongArrList.push({ hao: h, bHao: dt.bqData[h.i] });
        else {
            if (XUNG_MAP[h.chi] === chiNgay) {
                const isVuongForAmDong = (h.vs === 'Vượng' || h.vs === 'Tướng' || phanTich1YeuTo(h, chiThang, true).score > 0);
                const isKhongVongForAmDong = (h.tk === 'K');
                if (isVuongForAmDong || isKhongVongForAmDong) { h.amDongReason = isKhongVongForAmDong && !isVuongForAmDong ? 'Lâm Không Vong' : 'Vượng/Tướng gặp Nhật Xung'; amDongArrList.push(h); }
            }
        }
    });
    Object.keys(dt.phucThanData).forEach(idx => {
        let ptObj = dt.phucThanData[idx];
        dungThanOpts.push({ value: `pt_${idx}`, label: `[Phục Thần] Hào ${parseInt(idx)+1}: ${ptObj.lt} ${ptObj.can}-${ptObj.chi}`, data: { chi: ptObj.chi, lt: ptObj.lt, nh: ptObj.nh, i: parseInt(idx), isPhuc: true, phiHao: dt.haoData[idx], tk: dt.tkArr.includes(ptObj.chi) ? 'K' : '', tsThang: getTruongSinh(ptObj.nh, chiThang), tsNgay: getTruongSinh(ptObj.nh, chiNgay) }, type: 'phuc' });
    });
    const selDungThan = document.getElementById('sel-dung-than');
    selDungThan.innerHTML = '';
    dungThanOpts.forEach(opt => { let option = document.createElement('option'); option.value = opt.value; option.textContent = opt.label; selDungThan.appendChild(option) });

    function evaluateVS(hao, isPhuc, phiHao) {
        let html = `<ul>`;
        let totalScore = 0;
        let namStr = (hao.chi === chiNam) ? "Thái Tuế" : (XUNG_MAP[hao.chi] === chiNam) ? "Tuế Phá (Xung Thái Tuế)" : "Không";
        html += `<li><b>Năm:</b> ${namStr}</li>`;
        let resThang = phanTich1YeuTo(hao, chiThang, true);
        totalScore += resThang.score;
        html += `<li><b>Tháng:</b> ${resThang.reason}</li>`;
        let resNgay = phanTich1YeuTo(hao, chiNgay, false);
        totalScore += resNgay.score;
        html += `<li><b>Ngày:</b> ${resNgay.reason}</li>`;
        if (isPhuc) {
            let pScore = 0, pReason = "";
            if (NH_SINH[phiHao.nh] === hao.nh) { pScore = 1; pReason = `Được Phi thần (${phiHao.nh}) Sinh Trợ` }
            else if (phiHao.nh === hao.nh) { pScore = 1; pReason = `Được Phi thần (${phiHao.nh}) Tỉ Hòa` }
            else if (NH_KHAC[phiHao.nh] === hao.nh) { pScore = -1; pReason = `Bị Phi thần (${phiHao.nh}) Khắc` }
            else { pReason = "Phi thần Không Sinh Khắc Trực Tiếp" }
            totalScore += pScore;
            html += `<li><b>Phi thần:</b> ${pReason}</li>`;
        }
        let klLabel = "", klBadge = "";
        if (totalScore > 0) { klLabel = "VƯỢNG"; klBadge = "badge-vuong"; hao.isVuong = true }
        else if (totalScore < 0) { klLabel = "SUY"; klBadge = "badge-suy"; hao.isVuong = false }
        else { klLabel = "BÌNH HÒA"; klBadge = "badge-binh"; hao.isVuong = true }
        hao.totalScore = totalScore;
        html += `</ul><div style="margin-top:4px">➜ KẾT LUẬN: <span class="${klBadge}">${klLabel}</span></div>`;
        return html;
    }
    function getTacDong(haoTacDong, lucObj, dungThan, type) {
        if (haoTacDong.i === dungThan.i && !dungThan.isPhuc) return null;
        let action = "";
        let isTamHop = false;
        let tamHopDetail = "";
        if (haoTacDong.chi !== dungThan.chi) {
            for (let cuc of TAM_HOP_CUCS) {
                if (cuc.includes(haoTacDong.chi) && cuc.includes(dungThan.chi)) {
                    let missing = cuc.find(c => c !== haoTacDong.chi && c !== dungThan.chi);
                    if (missing === chiNgay) { isTamHop = true; tamHopDetail = `(cùng Ngày ${chiNgay})`; break; }
                    else if (missing === chiThang) { isTamHop = true; tamHopDetail = `(cùng Tháng ${chiThang})`; break; }
                    else if (dongArrList.some(d => d.hao.chi === missing && d.hao.i !== haoTacDong.i && d.hao.i !== dungThan.i)) { isTamHop = true; tamHopDetail = `(cùng Hào động ${missing})`; break; }
                }
            }
        }
        const moMap = { 'Mộc': 'Mùi', 'Hỏa': 'Tuất', 'Kim': 'Sửu', 'Thủy': 'Thìn', 'Thổ': 'Thìn' };
        if (isTamHop) action = `Tam Hợp ${tamHopDetail} với`;
        else if (XUNG_MAP[haoTacDong.chi] === dungThan.chi) action = "Xung";
        else if (moMap[dungThan.nh] === haoTacDong.chi) action = "Thu Mộ (Nhập mộ)";
        else if (NH_SINH[haoTacDong.nh] === dungThan.nh) action = "Sinh";
        else if (haoTacDong.nh === dungThan.nh) action = "Trợ";
        else if (NH_KHAC[haoTacDong.nh] === dungThan.nh) action = "Khắc";
        else return null;
        let strength = lucObj ? (lucObj.hasPower ? "Mạnh" : "Yếu") : "Mạnh";
        let label = type === 'dong' ? 'Hào động' : 'Hào ám động';
        return `• <b>${label}:</b> Hào ${haoTacDong.i+1} (${haoTacDong.chi}) ➜ <b>${action}</b> Dụng thần (Lực: <span style="color:${lucObj?.hasPower===false?'#999':'var(--red)'}">${strength}</span>)`;
    }
    selDungThan.onchange = function() {
        let selectedVal = this.value;
        let selectedHao = dungThanOpts.find(o => o.value == selectedVal).data;
        let dtHtml = evaluateVS(selectedHao, selectedHao.isPhuc, selectedHao.phiHao);
        let tacDongArr = [];
        dongArrList.forEach(d => { let ld = danhGiaLucDong(d.hao, d.bHao); let td = getTacDong(d.hao, ld, selectedHao, 'dong'); if (td) tacDongArr.push(td) });
        amDongArrList.forEach(a => { let td = getTacDong(a, null, selectedHao, 'amdong'); if (td) tacDongArr.push(td) });
        if (tacDongArr.length > 0) dtHtml += `<div style="margin-top:6px;border-top:1px dashed #ddd;padding-top:4px">` + tacDongArr.map(t => `<div style="margin-bottom:2px">${t}</div>`).join('') + `</div>`;
        document.getElementById('m2-dungthan-detail').innerHTML = dtHtml;
        let isTriThe = selectedHao.i === theHao.i && !selectedHao.isPhuc;
        if (selectedHao.isPhuc && selectedHao.phiHao.the) isTriThe = true;
        document.getElementById('m2-quanhe-dt-the').innerHTML = `Thế (${theHao.nh}) và Dụng thần (${selectedHao.nh}): <b>${tuongTotXau(selectedHao.nh,theHao.nh,isTriThe)}</b>`;
        let isQueTinh = !dt.coDong;
        let listNT = [], listKT = [];
        dt.haoData.forEach(h => {
            if (h.i === selectedHao.i) return;
            let isDong = h.dong;
            let tScore = calcTotalScore(h, chiThang, chiNgay);
            let strength = tScore > 0 ? "Vượng" : (tScore < 0 ? "Suy" : "Bình hòa");
            let descBase = `Hào ${h.i+1} (${h.chi}-${h.nh}) [${strength}]`;
            let evalText = "", validForUngKy = false;
            if (!isQueTinh) {
                if (isDong) { if (tScore > 0) { evalText = `<span class="color-ok">➜ <b>Động + Vượng tướng</b> (Tác dụng lớn)</span>`; validForUngKy = true } else evalText = `<span class="color-bad">➜ <b>Động + Hưu tù</b> (Vô lực)</span>`; }
                else evalText = `<span style="color:#999">➜ Tĩnh (Vô dụng)</span>`;
            } else {
                if (tScore > 0) { evalText = `<span class="color-ok">➜ Tĩnh + Vượng <b>(Xem như Động)</b></span>`; validForUngKy = true }
                else evalText = `<span style="color:#999">➜ Tĩnh + Hưu tù <b>(Bỏ qua)</b></span>`;
            }
            let finalDesc = `${descBase} ${evalText}`;
            if (NH_SINH[h.nh] === selectedHao.nh) listNT.push({ hao: h, desc: finalDesc, valid: validForUngKy });
            if (NH_KHAC[h.nh] === selectedHao.nh) listKT.push({ hao: h, desc: finalDesc, valid: validForUngKy });
        });
        let ntktHtml = ``;
        ntktHtml += `<b>Nguyên Thần:</b><ul class="m2-list-ntkt">`;
        if (listNT.length > 0) listNT.forEach(nt => ntktHtml += `<li>${nt.desc}</li>`);
        else ntktHtml += `<li><i style="color:#888">Không xuất hiện</i></li>`;
        ntktHtml += `</ul><b style="margin-top:6px;display:block">Kỵ Thần:</b><ul class="m2-list-ntkt">`;
        if (listKT.length > 0) listKT.forEach(kt => ntktHtml += `<li>${kt.desc}</li>`);
        else ntktHtml += `<li><i style="color:#888">Không xuất hiện</i></li>`;
        ntktHtml += `</ul>`;
        document.getElementById('m2-ntkt-detail').innerHTML = ntktHtml;
        tinhUngKy(selectedHao, { chiNgay, chiThang, bqData: dt.bqData, theHao, dongArrList, listNT, listKT });
        
        window.currentDt = dt;
        window.currentSelDt = selectedHao;
        window.currentTheHao = theHao;
        window.currentUngHao = ungHao;
        window.currentListNT = listNT;
        window.currentListKT = listKT;
        window.currentDongArr = dongArrList;

        if(typeof renderMang5 === 'function') {
            renderMang5(dt, selectedHao, theHao, ungHao, listNT, listKT, dongArrList);
        }
    };
    document.getElementById('m2-the-detail').innerHTML = `<div class="m2-box-title">Hào Thế (${theHao.chi} - ${theHao.nh})</div>` + evaluateVS(theHao, false, null);
    document.getElementById('m2-ung-detail').innerHTML = `<div class="m2-box-title">Hào Ứng (${ungHao.chi} - ${ungHao.nh})</div>`;
    document.getElementById('m2-quanhe-the-ung').innerHTML = quanHeTheUngGiaTang(theHao.chi, ungHao.chi, theHao.nh, ungHao.nh);
    let dongHtml = dongArrList.map(d => { let luc = danhGiaLucDong(d.hao, d.bHao); let pClass = luc.hasPower ? "c-hoa" : "c-text-gray"; return `<li>Hào ${d.hao.i+1} (${d.hao.chi}) biến (${d.bHao.chi}) ➜ <span class="${pClass}"><b>${luc.hasPower?'Có Lực':'Không Lực'}</b></span></li>`; }).join('');
    document.getElementById('m2-haodong-detail').innerHTML = dongHtml ? `<ul>${dongHtml}</ul>` : `<i>Quẻ Tĩnh (Không có hào động)</i>`;
    let amDongHtml = amDongArrList.map(a => `<li>Hào ${a.i+1} (${a.chi}) Ám động</li>`).join('');
    document.getElementById('m2-amdong-detail').innerHTML = amDongHtml ? `<ul>${amDongHtml}</ul>` : `<i>Không có hào ám động</i>`;
    selDungThan.value = theHao.i;
    selDungThan.onchange();
}

function tinhUngKy(dungThan, dt) {
    let ukArr = [];
    let chiNgay = dt.chiNgay;
    let chiThang = dt.chiThang;
    if (dungThan.isPhuc) { ukArr.push(`<b>Dụng Thần Phục:</b> Chờ xuất hiện vào <b>${dungThan.chi}</b> hoặc <b>${XUNG_MAP[dungThan.phiHao.chi]}</b> (Xung Phi thần). Nếu vượng mà Không thì chờ Điền Không, xuất Không.`); }
    else {
        if (dungThan.tk === 'K') { if (dungThan.isVuong || dungThan.dong) ukArr.push(`<b>Tuần Không (Giả Không):</b> Vượng hoặc động nên chờ xuất Không điền thực vào <b>${dungThan.chi}</b> hoặc xung Không <b>${XUNG_MAP[dungThan.chi]}</b>.`); else ukArr.push(`<b>Tuần Không (Chân Không):</b> Suy yếu lại lâm Không, khó ứng. Nếu được sinh trợ thì đợi <b>${dungThan.chi}</b> (Điền thực). Việc hung chờ ngày xuất Không là họa tới.`); }
        if (XUNG_MAP[dungThan.chi] === chiThang) ukArr.push(`<b>Nguyệt Phá:</b> Chờ lúc <b>${HOP_MAP[dungThan.chi]}</b> (Hợp) hoặc <b>${dungThan.chi}</b> (Điền thực).`);
        if (dungThan.tsThang === 'Mộ' || dungThan.tsNgay === 'Mộ') { let chiMo = dungThan.tsThang === 'Mộ' ? chiThang : chiNgay; ukArr.push(`<b>Nhập Mộ (Tam Mộ):</b> Nhập mộ tại <b>${chiMo}</b>, cần xung khởi. Ứng kỳ chờ vào <b>${XUNG_MAP[chiMo]}</b> (Xung Mộ) hoặc <b>${dungThan.chi}</b>.`); }
        if (dungThan.dong) {
            let bHaoChi = dt.bqData[dungThan.i].chi;
            let tienThoai = getTienThoai(dungThan.chi, bHaoChi);
            if (tienThoai === 'Tiến thần') ukArr.push(`<b>Động hóa Tiến thần:</b> Ứng vào ngày tháng Trị <b>${dungThan.chi}</b>, <b>${bHaoChi}</b> hoặc gặp Hợp.`);
            else if (tienThoai === 'Thoái thần') ukArr.push(`<b>Động hóa Thoái thần:</b> Ứng vào ngày tháng Trị hoặc Xung <b>${XUNG_MAP[dungThan.chi]}</b>.`);
            else ukArr.push(`<b>Hào Động:</b> Gặp Động thì chờ Trị <b>${dungThan.chi}</b>, hoặc Hợp <b>${HOP_MAP[dungThan.chi]}</b>. Có khi ứng ngay vào Biến hào <b>${bHaoChi}</b>.`);
            if (HOP_MAP[dungThan.chi] === bHaoChi || HOP_MAP[dungThan.chi] === chiNgay || HOP_MAP[dungThan.chi] === chiThang) { ukArr.push(`<b>Gặp Hợp (Lục Hợp/Động Hợp):</b> Đợi xung khai <b>${XUNG_MAP[dungThan.chi]}</b> hoặc <b>${XUNG_MAP[HOP_MAP[dungThan.chi]]}</b>. <i>(Lưu ý: Xem việc cát thì thành công, việc hung/bệnh tật thì dây dưa kéo dài, xem người đi xa thì vướng chân)</i>.`); }
        } else { if (dungThan.tk !== 'K' && XUNG_MAP[dungThan.chi] !== chiThang && XUNG_MAP[dungThan.chi] !== chiNgay && dungThan.tsThang !== 'Mộ' && dungThan.tsNgay !== 'Mộ') { if (dungThan.isVuong) ukArr.push(`<b>Hào Tĩnh Vượng:</b> Gặp Tĩnh chờ Trị hoặc Xung. Ứng kỳ thường vào <b>${dungThan.chi}</b> (Trị) hoặc <b>${XUNG_MAP[dungThan.chi]}</b> (Xung).`); else ukArr.push(`<b>Suy Tuyệt:</b> Hào yếu chờ sinh vượng. Ứng kỳ vào ngày tháng có ngũ hành <b>${Object.keys(NH_SINH).find(key=>NH_SINH[key]===dungThan.nh)}</b> (Sinh) hoặc <b>${dungThan.chi}</b> (Đế vượng).`); } }
        if (XUNG_MAP[dungThan.chi] === chiNgay) { if (dungThan.isVuong) ukArr.push(`<b>Ám Động (Nhật Xung vượng):</b> Chờ lúc gặp Hợp <b>${HOP_MAP[dungThan.chi]}</b> là lúc ứng nghiệm.`); else ukArr.push(`<b>Nhật Phá (Nhật Xung suy):</b> Suy yếu bị xung tán. <i>(Lưu ý: Việc hung lo âu gặp xung thì tán là cát. Bệnh lâu gặp xung là nguy. Việc cầu mưu gặp xung phá là hỏng)</i>.`); }
        if (HINH_MAP[dungThan.chi] === chiNgay || HINH_MAP[chiNgay] === dungThan.chi || HINH_MAP[dungThan.chi] === chiThang || HINH_MAP[chiThang] === dungThan.chi || (dungThan.chi === chiNgay && ['Thìn', 'Ngọ', 'Dậu', 'Hợi'].includes(dungThan.chi))) { ukArr.push(`<b>Gặp Tam Hình:</b> Cẩn thận tai hung. Tới ngày đó là ứng nghiệm sự hung, nếu có tuần Không hoặc nhập Mộ thì đợi lúc điền thực, xung Mộ.`); }
        if (dungThan.chi === chiNgay && dungThan.chi === chiThang) { let chiMoKho = { "Mộc": "Mùi", "Hỏa": "Tuất", "Thổ": "Thìn", "Kim": "Sửu", "Thủy": "Thìn" } [dungThan.nh]; ukArr.push(`<b>Quá Vượng:</b> Gặp Mộ, gặp Xung. Đợi <b>${chiMoKho}</b> (Mộ kho) hoặc <b>${XUNG_MAP[dungThan.chi]}</b> (Xung).`); }
        if (dt.theHao && dt.theHao.tk === 'K' && dt.theHao.i === dungThan.i) { ukArr.push(`<b>Thế Lâm Không:</b> Chờ Nguyên thần trực nhật (Trị) hoặc lúc xuất Không. Đoán mưu cầu đợi Nguyên thần đến phò trợ.`); }
        let activeChi = new Set([chiNgay, chiThang, dungThan.chi]);
        dt.dongArrList.forEach(d => { activeChi.add(d.hao.chi); activeChi.add(d.bHao.chi) });
        for (let cuc of TAM_HOP_CUCS) { if (cuc.includes(dungThan.chi)) { let matches = 0, missing = null; for (let c of cuc) { if (activeChi.has(c)) matches++; else missing = c } if (matches === 2 && missing) { ukArr.push(`<b>Khuyết Tam Hợp Cục:</b> Đang thiếu 1 chữ để thành cục. Ứng kỳ rơi vào ngày/tháng <b>${missing}</b>.`); break } } }
        let ntValid = dt.listNT.find(x => x.valid), ktValid = dt.listKT.find(x => x.valid);
        if (!dungThan.isVuong) { if (ntValid) ukArr.push(`<b>Ứng theo Nguyên Thần:</b> Dụng thần suy, nhưng có Nguyên thần đủ lực phò trợ. Đợi lúc Trị/Xung Nguyên thần là <b>${ntValid.hao.chi}</b> / <b>${XUNG_MAP[ntValid.hao.chi]}</b> thì thành sự.`) }
        if (ktValid) ukArr.push(`<b>Ứng theo Kỵ Thần:</b> Bị Kỵ thần đủ lực khắc chế (Đại tượng hung). Ứng kỳ chờ lúc Kỵ thần vượng tướng <b>${ktValid.hao.chi}</b> thì họa tới. Nếu đợi việc cát, phải chờ lúc xung/khắc mất Kỵ thần là ngày/tháng <b>${XUNG_MAP[ktValid.hao.chi]}</b> hoặc <b>${Object.keys(NH_KHAC).find(key=>NH_KHAC[key]===ktValid.hao.nh)}</b>.`);
    }
    if (ukArr.length === 0) ukArr.push(`Hành sự theo diễn biến tự nhiên, ứng kỳ thường vào Trị <b>${dungThan.chi}</b>, Hợp <b>${HOP_MAP[dungThan.chi]}</b> hoặc Xung <b>${XUNG_MAP[dungThan.chi]}</b>.`);
    document.getElementById('m2-ungky-detail').innerHTML = `<ul>` + ukArr.map(u => `<li style="margin-bottom:3px">${u}</li>`).join('') + `</ul>`;
}
