"use strict";

function render(dt) {
    if (!dt) return;
    const hoTrai = `HỌ ${dt.cungTrai} ${dt.qTinhChat?'('+dt.qTinhChat+')':''}`;
    const hoPhai = dt.bq ? `HỌ ${dt.bq.cung} ${dt.bq.tc?'('+dt.bq.tc+')':''}` : '';
    function getBigHex(arr, isBien) {
        let h = '<div class="dq-big-hex">';
        for (let i = 5; i >= 0; i--) { let duong = (arr[i] === 1 || arr[i] === 3); let dong = !isBien && (arr[i] === 2 || arr[i] === 3); h += duong ? `<div class="dq-b-yang${dong?' dq-red':''}"></div>` : `<div class="dq-b-yin${dong?' dq-red':''}"></div>` }
        return h + '</div>';
    }
    function getSmallHex(v, isDong) { let duong = (v === 1 || v === 3); return duong ? `<div class="dq-s-yang${isDong?' dq-red':''}"></div>` : `<div class="dq-s-yin${isDong?' dq-red':''}"></div>` }
    const th_class = getElementClass(dt.nhThang), ng_class = getElementClass(dt.nhNgay);
    let html = `
    <div class="dq-container" id="capture-zone">
      <div class="dq-header-title">TRANG DỊCH QUÁI</div>
      <div class="dq-info-wrap">
        <div class="dq-info-row"><span class="dq-info-label">Thời gian lập:</span><span class="dq-info-val">${dt.tg} (giờ ${dt.cGio.split('-')[1]}, ${dt.amLichStr})</span></div>
        <div class="dq-info-row"><span class="dq-info-label">Can Chi:</span><span class="dq-info-val">Giờ ${dt.cGio.replace('-',' ')}, ngày ${dt.cNgay.replace('-',' ')}, tháng ${dt.cThang.replace('-',' ')}, năm ${dt.cNam.replace('-',' ')}</span></div>
        <div class="dq-info-inline">
          <div class="dq-info-inline-item"><span class="dq-info-label" style="min-width:auto">Tiết khí:</span><span class="dq-info-val bold">${dt.tietKhi}</span></div>
          <div class="dq-info-inline-item"><span class="dq-info-label" style="min-width:auto">Thời thần:</span><span class="dq-info-val bold">${dt.cGio.split('-')[1]}-${DC_NH[dt.cGio.split('-')[1]]}</span></div>
          <div class="dq-info-inline-item"><span class="dq-info-label" style="min-width:auto">Nhật thần:</span><span class="dq-info-val bold">${dt.cNgay.split('-')[1]}-<span class="${ng_class}">${dt.nhNgay}</span></span></div>
          <div class="dq-info-inline-item"><span class="dq-info-label" style="min-width:auto">Nguyệt lệnh:</span><span class="dq-info-val bold">${dt.cThang.split('-')[1]}-<span class="${th_class}">${dt.nhThang}</span></span></div>
          <div class="dq-info-inline-item"><span class="dq-info-label" style="min-width:auto">Thái tuế:</span><span class="dq-info-val bold">${dt.cNam.split('-')[1]}-${DC_NH[dt.cNam.split('-')[1]]}</span></div>
        </div>
        <div class="dq-info-row" style="margin-bottom:5px"><span class="dq-info-label">Tuần Không:</span><span class="tk-mark" style="font-size:12px">${dt.tkArr.join(', ')}</span></div>
        <div class="dq-info-row"><span class="dq-info-label">Phương pháp:</span><span class="dq-info-val">Lục hào</span></div>
        <div class="dq-info-row"><span class="dq-info-label">Việc cần xem:</span><span class="dq-info-val dq-purple-text">${dt.viec||'...'}</span></div>
      </div>
      <hr class="dq-divider">
      <div class="dq-title-row"><div>${dt.tenQue}</div><div>${dt.bq?dt.bq.ten:''}</div></div>
      <div class="dq-big-diagrams">${getBigHex(dt.haoData.map(h=>h.v),false)}${dt.bq?getBigHex(dt.bq.arr,true):'<div></div>'}</div>
      <div class="dq-subtitle-row"><div>${hoTrai}</div><div>${hoPhai}</div></div>
      <div class="dq-loitrierow"><div>${dt.loiTrieu}</div><div>${dt.bq?dt.bq.trieu:''}</div></div>
      <div class="dq-table-wrap">
        <table class="dq-main-table">
          <colgroup>
            <col style="width:6%"><col style="width:6%"><col style="width:13%"><col style="width:12%"><col style="width:8%"><col style="width:5%">
            <col style="width:13%" class="col-split"><col style="width:12%"><col style="width:5%"><col style="width:12%"><col style="width:8%">
          </colgroup>
          <thead>
            <tr>
              <th>Hào</th><th>T/Ứ</th><th class="text-left">Lục Thân</th><th class="text-left">Can Chi</th><th class="text-left">Phục thần</th><th>TK</th>
              <th class="col-split text-left">Lục Thân (B)</th><th class="text-left">Can Chi (B)</th><th>TK</th><th class="text-left">Lục Thú</th><th>Hào</th>
            </tr>
          </thead>
          <tbody>`;
    for (let ri = 5; ri >= 0; ri--) {
        let h = dt.haoData[ri];
        let hb = dt.bqData ? dt.bqData[ri] : null;
        let trCls = h.dong ? ' class="dq-row-red"' : '';
        let ptStr = dt.phucThanData[ri] ? `<span class="${dt.phucThanData[ri].cls}">${dt.phucThanData[ri].lt} ${dt.phucThanData[ri].can}-${dt.phucThanData[ri].chi}</span>` : '';
        html += `
      <tr${trCls}>
        <td><div class="dq-s-wrap">${getSmallHex(h.v,h.dong)}</div></td>
        <td>${h.the?'Thế':h.ung?'Ứng':''}</td>
        <td class="text-left ${h.cls}">${h.lt}</td>
        <td class="text-left ${h.cls}">${h.can}-${h.chi}</td>
        <td class="text-left" style="font-size:.9em">${ptStr}</td>
        <td class="tk-mark">${h.tk}</td>
        <td class="col-split text-left ${hb?hb.cls:''}">${dt.bq?hb.lt:''}</td>
        <td class="text-left ${hb?hb.cls:''}">${dt.bq?hb.can+'-'+hb.chi:''}</td>
        <td class="tk-mark">${dt.bq?hb.tk:''}</td>
        <td class="text-left">${h.ltt}</td>
        <td><div class="dq-s-wrap">${getSmallHex(dt.bq?hb.v:h.v,false)}</div></td>
      </tr>`;
    }
    html += `</tbody></table></div>
      <div class="dq-table-wrap" style="border-top:none">
        <table class="dq-main-table">
          <colgroup>
            <col style="width:11%"><col style="width:5%"><col style="width:6%"><col style="width:6%"><col style="width:6%"><col style="width:4%"><col style="width:4%"><col style="width:4%"><col style="width:4%">
            <col style="width:12%" class="col-split"><col style="width:6%"><col style="width:6%"><col style="width:6%"><col style="width:5%"><col style="width:5%"><col style="width:5%"><col style="width:5%">
          </colgroup>
          <thead>
            <tr><th class="text-left">Hào</th><th>QT</th><th>V-S</th><th>TS.Ng</th><th>TS.Th</th><th>L</th><th>M</th><th>Q</th><th>Đ</th><th class="col-split text-left">Hào (BV)</th><th>V-S</th><th>TS.Ng</th><th>TS.Th</th><th>L</th><th>M</th><th>Q</th><th>Đ</th></tr>
          </thead>
          <tbody>`;
    for (let ri = 5; ri >= 0; ri--) {
        let h = dt.haoData[ri];
        let hb = dt.bqData ? dt.bqData[ri] : null;
        let trCls = h.dong ? ' class="dq-row-red"' : '';
        html += `
      <tr${trCls}>
        <td class="text-left ${h.cls}">${h.can}-${h.chi}</td><td class="qt-mark">${h.qt}</td>
        <td>${h.vs}</td><td>${h.tsNgay}</td><td>${h.tsThang}</td>
        <td>${h.sat.loc||'-'}</td><td>${h.sat.ma||'-'}</td><td>${h.sat.quy||'-'}</td><td>${h.sat.dao||'-'}</td>
        <td class="col-split text-left ${hb?hb.cls:''}">${dt.bq?hb.can+'-'+hb.chi:'-'}</td>
        <td>${dt.bq?hb.vs:''}</td><td>${dt.bq?hb.tsNgay:'-'}</td><td>${dt.bq?hb.tsThang:'-'}</td>
        <td>${dt.bq?(hb.sat.loc||'-'):'-'}</td><td>${dt.bq?(hb.sat.ma||'-'):'-'}</td><td>${dt.bq?(hb.sat.quy||'-'):'-'}</td><td>${dt.bq?(hb.sat.dao||'-'):'-'}</td>
      </tr>`;
    }
    html += `</tbody></table></div>
      <div class="dq-footer">Được lập bởi thuật toán chuẩn xác 100% Tiết Khí & Kinh Phòng Nạp Giáp.</div>
    </div>`;
    document.getElementById('capture-area').innerHTML = html;
    document.getElementById('result-area').style.display = 'block';
}
