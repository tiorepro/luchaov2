"use strict";

/* =========================================
   HẰNG SỐ & DỮ LIỆU BỔ SUNG MẢNG 5
========================================= */
const QUE_QUY_HON = ["Hỏa Thiên Đại Hữu", "Lôi Trạch Quy Muội", "Thiên Hỏa Đồng Nhân", "Trạch Lôi Tùy", "Sơn Phong Cổ", "Địa Thủy Sư", "Phong Sơn Tiệm", "Thủy Địa Tỷ"];
const QUE_DU_HON = ["Hỏa Địa Tấn", "Lôi Sơn Tiểu Quá", "Thiên Thủy Tụng", "Trạch Phong Đại Quá", "Sơn Lôi Di", "Địa Hỏa Minh Di", "Phong Trạch Trung Phu", "Thủy Thiên Nhu"];
const QUE_VONG = ["Thiên Lôi Vô Vọng", "Hỏa Thủy Vị Tế", "Lôi Sơn Tiểu Quá", "Địa Hỏa Minh Di", "Thiên Sơn Độn", "Khôn Vi Địa", "Địa Lôi Phục", "Lôi Trạch Quy Muội", "Thiên Phong Cấu", "Thiên Địa Bĩ", "Sơn Thủy Mông", "Cấn Vi Sơn", "Trạch Thủy Khốn", "Địa Sơn Khiêm", "Thủy Phong Tỉnh", "Địa Phong Thăng", "Phong Thiên Tiểu Súc", "Sơn Phong Cổ", "Trạch Địa Tụy", "Trạch Phong Đại Quá", "Sơn Trạch Tổn", "Thiên Thủy Tụng", "Sơn Hỏa Bí", "Phong Hỏa Gia Nhân"];

const PHONG_THUY_DATA = {
    "Cấn Vi Sơn": { trong: "Phòng ngủ, bàn thờ, giường, tủ, vách ngăn", ngoai: "Mái nhà, núi đồi", xung: "Nhà tù, bệnh viện, mộ phần", nguoi: "Mũi, lưng, mặt chữ điền, người cứng nhắc", khac: "Đồi núi, bảng cấm, bao bì, sự ngưng trệ" },
    "Càn Vi Thiên": { trong: "Nhà có người lớn tuổi, chủ gia đình quyền uy", ngoai: "Khu vực cao ráo, thoáng đãng", xung: "Gần cơ quan hành chính, trụ sở", nguoi: "Con trưởng gánh vác trọng trách", khac: "Đầu não, quyền lực, kim tiền" },
    "Khôn Vi Địa": { trong: "Nhà rộng, nhiều phòng, có người già", ngoai: "Đất đai rộng, vườn tược", xung: "Gần chợ, khu dân cư đông đúc", nguoi: "Người mẹ, phụ nữ lớn tuổi nắm quyền", khac: "Đất đai, bất động sản, sự bao dung" },
    "Ly Vi Hỏa": { trong: "Bóng đèn, bếp nấu, lò sưởi, phòng rỗng", ngoai: "Cửa sổ, nơi có ánh sáng", xung: "Quảng cáo, biển hiệu", nguoi: "", khac: "Mắt, tim, trí óc, mặt trời, bom đạn, rau muống, dừa, vòng tròn, sự phô trương" },
    "Khảm Vi Thủy": { trong: "Cột, tường thấm, nền thấp", ngoai: "Kênh rạch, ao hồ", xung: "Chuyên gia, người hiểu biết sâu", nguoi: "", khac: "Ghe thuyền, xương, tai, thận, chìa khóa, dây thun, sự nguy hiểm" },
    "Tốn Vi Phong": { trong: "Máy hút, quạt, điều hòa, két sắt. <b>Kiểm tra cửa!</b>", ngoai: "Cửa chính, cổng", xung: "Rừng cây, vườn cây", nguoi: "Người con gái lớn", khac: "Gió, sự thâm nhập, túi xách, nhập khẩu" },
    "Chấn Vi Lôi": { trong: "Cửa chính, cánh cửa", ngoai: "Lối đi, đường đi, nhà xưởng", xung: "Chân, tay", nguoi: "Con trai trưởng, người năng động", khac: "Hợp đồng, bánh răng, xe cộ, cây xanh, sự khởi đầu" },
    "Đoài Vi Trạch": { trong: "Cửa sổ, cửa ra vào", ngoai: "Khẩu khí, cổng chính", xung: "Hồ, ao, đầm lầy", nguoi: "Phụ nữ trẻ, xinh đẹp, thiếu nữ", khac: "Lời nói, lý thuyết, ổ gà, sự vui vẻ" },
    "Thiên Trạch Lý": { trong: "Bàn thờ, nơi thờ cúng cần xem lại (Càn-Trời; Đoài-Lễ)", ngoai: "Cổng chính, miệng nhà", xung: "Hồ nước, ao, đầm lầy", nguoi: "Người trẻ nói nhiều, nhanh nhẹn", khac: "Lễ nghi, quy tắc, phép tắc" },
    "Thiên Hỏa Đồng Nhân": { trong: "Nhà bếp, nơi có lửa, bóng đèn", ngoai: "Sân rộng, quảng trường", xung: "Đồng nghiệp, hàng xóm, cộng đồng", nguoi: "Người cùng chí hướng, đồng đội", khac: "Sự hợp tác, đoàn kết" },
    "Thiên Phong Cấu": { trong: "Nhà kết nối, nhà đôi, có cửa thông gió", ngoai: "Gió lùa, cửa đối diện", xung: "", nguoi: "Phụ nữ, người vợ", khac: "Sự gặp gỡ bất ngờ" },
    "Thiên Thủy Tụng": { trong: "Xà bần, chuông mõ, nơi có nước", ngoai: "Kênh rạch, sông nước", xung: "Tòa án, cơ quan pháp luật", nguoi: "Người hay tranh chấp", khac: "Kiện tụng, tranh cãi" },
    "Hỏa Thiên Đại Hữu": { trong: "Nhà giàu có, đèn đuốc sáng sủa", ngoai: "Công trình lớn, nhà cao tầng", xung: "", nguoi: "Người thành đạt, giàu sang", khac: "Sự giàu có, thành tựu lớn" },
    "Địa Lôi Phục": { trong: "Nền móng, tầng hầm", ngoai: "Tường ngoài, hàng rào", xung: "Ngoại thành, ngoại tỉnh", nguoi: "", khac: "Sự quay về, phục hồi, trang phục" },
    "Địa Thủy Sư": { trong: "Nơi có nước trong nhà", ngoai: "Sông, kênh, mương", xung: "Gần chùa, nhà thờ, nơi tập trung đông người", nguoi: "Lãnh đạo, tướng lĩnh", khac: "Quân sự, tổ chức, đội nhóm" },
    "Địa Phong Thăng": { trong: "Cầu thang, thang máy", ngoai: "Cây cao, đồi dốc", xung: "Gần mộ, nghĩa trang", nguoi: "", khac: "Sự thăng tiến, đi lên, máy bay" },
    "Phong Sơn Tiệm": { trong: "Cầu thang, bàn thờ thổ địa, thần tài", ngoai: "Đồi núi thoai thoải", xung: "", nguoi: "", khac: "Xe lu, xe tải, sự từ từ tiến tới, vàng bạc" },
    "Lôi Địa Dự": { trong: "Phòng khách, nơi giải trí", ngoai: "Hàng rào, mặt tiền", xung: "", nguoi: "Người vui vẻ, hoạt bát", khac: "Sự chuẩn bị, dự phòng" },
    "Địa Thiên Thái": { trong: "Nhà thông thoáng, hài hòa", ngoai: "Cửa chính rộng mở", xung: "Ngã ba, ngã tư, thủy khẩu", nguoi: "Người trong nước", khac: "Sự thông suốt, hanh thông, bằng cấp, điện thoại" },
    "Hỏa Sơn Lữ": { trong: "Phòng khách, gác lửng", ngoai: "Hiên nhà, hành lang", xung: "Cấp phó, phụ tá", nguoi: "Người đi xa, lữ khách", khac: "Du lịch, xa nhà" },
    "Hỏa Lôi Phệ Hạp": { trong: "Phòng ăn, nhà bếp", ngoai: "", xung: "", nguoi: "", khac: "Máy giặt, máy xay, quán ăn, kềm, máy xúc, sự nhai nuốt" },
    "Thủy Địa Tỷ": { trong: "Nóc nhà, phòng chủ", ngoai: "Mặt nước rộng", xung: "Sếp, giám đốc, lãnh đạo", nguoi: "Con trưởng, bạn thân, người thân cận", khac: "So sánh, cạnh tranh" },
    "Sơn Hỏa Bí": { trong: "Bóng đèn, gương, di ảnh, đồ trang trí", ngoai: "Mặt tiền trang trí", xung: "", nguoi: "", khac: "Hột xoàn, trang sức, sự trang hoàng bề ngoài" },
    "Lôi Trạch Quy Muội": { trong: "Đồ đạc lộn xộn, nhà có vong", ngoai: "", xung: "Tóc quăn, người xoăn", nguoi: "Phụ nữ về nhà chồng", khac: "Cây chen đá, đồ cũ, đồ nữ, vũng nước, sự gượng ép" },
    "Địa Hỏa Minh Di": { trong: "Phòng tối, ít ánh sáng", ngoai: "Trong hẻm, bị che khuất", xung: "Nghĩa trang, nơi u ám", nguoi: "Người da tối màu, bị bệnh, có sẹo", khac: "Sự tổn thương, che giấu, bóng tối" },
    "Hỏa Địa Tấn": { trong: "Mặt tiền nhà sáng sủa", ngoai: "Thành thị, phố xá", xung: "", nguoi: "", khac: "Dép, đèn, xe, lối đi, sự tiến lên" },
    "Địa Sơn Khiêm": { trong: "Nhà thấp, khiêm tốn", ngoai: "Phía sau nhà, sau lưng", xung: "Núi đất", nguoi: "Người khiêm nhường", khac: "Sự khiêm tốn, nhún nhường" },
    "Thủy Lôi Truân": { trong: "Nhà tắm, WC dột", ngoai: "Hồ có nước, vũng nước", xung: "", nguoi: "", khac: "Xe kéo, xe bò, sự gian nan lúc đầu" },
    "Trạch Lôi Tùy": { trong: "Lối đi, thang máy, cầu thang", ngoai: "", xung: "Tay chân, bộ phận phụ", nguoi: "Cấp phó, tay sai", khac: "Chiếc xe, sự đi theo, tùy tùng" },
    "Phong Thủy Hoán": { trong: "Vòi nước, hồ nước, bồn rửa", ngoai: "Sông, biển", xung: "", nguoi: "", khac: "Tàu thuyền, phao, máy bay, cột buồm, nước đá, nước hoa, sự tan rã, chia lìa" },
    "Thủy Trạch Tiết": { trong: "Lưới, lược, vách ngăn, màn cửa, van nước", ngoai: "Cửa sổ, cửa lưới", xung: "Hệ bài tiết, tiết niệu", nguoi: "", khac: "Tủ lạnh, khẩu trang, điều hòa, bình xăng con, sự tiết chế" },
    "Phong Địa Quan": { trong: "Phòng khách, nơi quan sát", ngoai: "Đài quan sát, điểm cao", xung: "", nguoi: "", khac: "Kính, đèn, màn hình, ống nhòm, dễ tai nạn đi đứng, sự quan sát" },
    "Thiên Lôi Vô Vọng": { trong: "", ngoai: "", xung: "", nguoi: "", khac: "Xe tăng, sự bất ngờ, không mong đợi" },
    "Trạch Địa Tụy": { trong: "Phòng lớn, kho, đồ đạc lộn xộn", ngoai: "", xung: "Đám cưới, biểu tình, siêu thị, lớp học", nguoi: "Tiếp viên, người tiếp thị, quảng cáo", khac: "Cục xôi, cuộc đất, sự tụ tập" },
    "Thiên Địa Bĩ": { trong: "Nhà bế tắc, không thông thoáng", ngoai: "", xung: "", nguoi: "Người nước ngoài", khac: "Sự bế tắc, không hanh thông" },
    "Phong Trạch Trung Phu": { trong: "Bàn thờ (tín ngưỡng quan trọng)", ngoai: "", xung: "", nguoi: "", khac: "Lòng tin, sự chân thành" },
    "Trạch Hỏa Cách": { trong: "Vách ngăn, bàn thờ thổ địa, bàn thờ bếp", ngoai: "", xung: "", nguoi: "", khac: "Y phục, sự thay đổi, cải cách" },
    "Trạch Sơn Hàm": { trong: "Phòng tình cảm, phòng ngủ", ngoai: "", xung: "", nguoi: "", khac: "Tranh ảnh, sự cảm ứng, tình yêu" },
    "Sơn Địa Bác": { trong: "", ngoai: "", xung: "", nguoi: "", khac: "Nghĩa địa, thùng rác, WC, sự bóc lột, suy tàn" },
    "Sơn Thủy Mông": { trong: "", ngoai: "Mái che, mái nhà, bồn nước", xung: "", nguoi: "", khac: "Nón, quần áo, vỏ, bao bì, sự ngu muội" },
    "Sơn Lôi Di": { trong: "Giường tủ, phòng ngủ, phòng ăn", ngoai: "Bồn chứa", xung: "Tử cung, đầu bếp", nguoi: "", khac: "Quán ăn, tủ lạnh, gạo, cái túi, sự nuôi dưỡng" },
    "Lôi Thủy Giải": { trong: "Nhà gần ngã ba, ngã tư", ngoai: "", xung: "Vòng xoay, ngã rẽ", nguoi: "", khac: "Sự giải thoát, giải phóng khỏi khó khăn" },
    "Trạch Thủy Khốn": { trong: "Bồn rửa, toilet", ngoai: "Ao tù, nước đọng", xung: "", nguoi: "", khac: "Sự khốn đốn, bế tắc" },
    "Thủy Sơn Kiển": { trong: "", ngoai: "Cầu thang ngoài, bậc thang", xung: "Hòn non bộ, bình phong", nguoi: "Người què, nói ngọng", khac: "Điện trở, sự khó khăn, trở ngại" },
    "Hỏa Trạch Khuê": { trong: "Phòng khách", ngoai: "Vách tạm, tường giả", xung: "", nguoi: "", khac: "Hàng nhái, sự ly tán, mâu thuẫn" },
    "Lôi Phong Hằng": { trong: "", ngoai: "", xung: "", nguoi: "", khac: "Đạo vợ chồng bền vững. Sự nghiệp khó phát, đứng yên." },
    "Lôi Thiên Đại Tráng": { trong: "", ngoai: "", xung: "", nguoi: "", khac: "Dễ gãy vỡ giữa chừng, quá mạnh mẽ" },
    "Phong Thiên Tiểu Súc": { trong: "Nhà có nhiều vong, vong theo, vong đói", ngoai: "", xung: "", nguoi: "", khac: "Sự tích lũy nhỏ, chờ đợi" },
    "Thủy Phong Tỉnh": { trong: "Giếng nước, nơi có nước ngầm", ngoai: "", xung: "", nguoi: "", khac: "Cái giếng, sự ngưng trệ, đứng một chỗ" },
    "Sơn Phong Cổ": { trong: "Cửa hư, kiểm tra cửa", ngoai: "", xung: "", nguoi: "", khac: "Sự hư hỏng, đổ nát cần sửa chữa" },
    "Địa Trạch Lâm": { trong: "Phòng ngủ người lớn tuổi", ngoai: "Phòng khách, phòng gia đình", xung: "Hàng rào", nguoi: "Con trưởng gánh vác gia đình", khac: "Sự đến gần, giám sát" },
    "Sơn Thiên Đại Súc": { trong: "Nhà nhiều đồ, kho chứa", ngoai: "Sân rộng", xung: "Cơ quan nhà nước, thư viện", nguoi: "Người có học thức uyên thâm", khac: "Sự tích lũy lớn, chờ thời" },
    "Lôi Sơn Tiểu Quá": { trong: "Nhà có nhiều vong", ngoai: "Mộ phần, gò đống", xung: "", nguoi: "Người hay sai lỗi nhỏ", khac: "Sai sót nhỏ, quá mức một chút" },
    "Phong Lôi Ích": { trong: "Cửa thông gió tốt", ngoai: "Cây cối xanh tươi", xung: "", nguoi: "Người giúp đỡ mình", khac: "Sự có lợi, gia tăng, được giúp đỡ" },
    "Thủy Hỏa Ký Tế": { trong: "Bếp và nước hài hòa", ngoai: "", xung: "", nguoi: "", khac: "Sự hoàn thành, đã xong việc" },
    "Hỏa Thủy Vị Tế": { trong: "Nhà bếp, nơi ẩm thấp", ngoai: "", xung: "", nguoi: "", khac: "Sự chưa hoàn thành, đang dang dở" }
};

/* =========================================
   CÁC HÀM PHÂN TÍCH CHUYÊN SÂU CHO MẢNG 5
========================================= */
function tinhTongQuanDaiCuoc(dt, dtHao, theHao, ungHao) {
    let html = `<div style="font-weight:700; color:#1b4d82; margin-bottom:3px; font-size:clamp(10px,0.85vw,12px); background:#e8f0fe;padding:4px 8px;border-radius:3px">📊 TỔNG QUAN ĐẠI TƯỢNG</div><ul style="padding-left:16px;margin-top:2px;list-style-type:disc">`;
    let cungNguHanh = '';
    for (let t of TRIGRAMS) { if (t.ten === dt.cungTrai) { cungNguHanh = t.nh; break; } }
    let cungVsThang = tinhVuongSuyThang(cungNguHanh, dt.nhThang);
    let cungVsThangStr = cungVsThang === 'Vượng' ? '🟢' : (cungVsThang === 'Tướng' ? '🟢' : (cungVsThang === 'Hưu' ? '🟡' : '🔴'));
    html += `<li><b>Cung quẻ:</b> <b>${dt.cungTrai}</b> (${cungNguHanh}) tại tháng <b>${dt.cThang.split('-')[1]}</b> (${dt.nhThang}) → ${cungVsThangStr} <span class="${getVSClass(cungVsThang)}">${cungVsThang}</span>. `;
    if (cungVsThang === 'Tù' || cungVsThang === 'Tử') { html += `<span class="color-bad">⚠️ Cung quẻ suy yếu, đại cục bất lợi, mọi sự khó thành hoặc cần nhiều nỗ lực.</span>`; }
    else { html += `<span class="color-ok">✅ Cung có khí, nền móng tốt, sự việc có cơ sở để phát triển.</span>`; }
    html += `</li>`;
    const soHaoDong = dt.haoData.filter(h => h.dong).length;
    if (soHaoDong === 0) { html += `<li><b>Quẻ Tĩnh (0 hào động):</b> Sự việc chưa có biến chuyển, cần thời gian. Luận đoán chủ yếu dựa vào <b>Vượng Suy</b> của Dụng thần và Thế. <i>(Tĩnh thì xem Dụng - Dụng vượng là cát, suy là hung).</i></li>`; }
    else if (soHaoDong === 1) { let haoDoc = dt.haoData.find(h => h.dong); html += `<li><b>Độc Phát (1 hào động):</b> Biến động tập trung, dễ luận đoán. Hào <b>${haoDoc.lt} (H${haoDoc.i+1})</b> là chìa khóa giải quyết mọi vấn đề.</li>`; }
    else if (soHaoDong >= 3) { html += `<li><b>Hỗn động (≥3 hào động):</b> Sự việc <b>phức tạp, nhiều biến số</b>. Cần ưu tiên xét hào Thế và Dụng thần động trước, sau đó mới đến các hào khác.</li>`; }
    if (QUE_QUY_HON.includes(dt.tenQue)) { html += `<li><b>🔄 Quẻ Quy Hồn:</b> Có sự <b>quay về, trở lại</b>. <i>Tìm người: sẽ về. Tình duyên: quay lại với người cũ. Công việc: trở về vị trí cũ. Tìm vật: đồ ở nhà hoặc gần nhà.</i></li>`; }
    if (QUE_DU_HON.includes(dt.tenQue)) { html += `<li><b>🌊 Quẻ Du Hồn:</b> <b>Phiêu bạt, chưa ổn định</b>. <i>Tìm người: chưa về. Tình duyên: lòng còn lang bạt, khó cố định. Công việc: chưa định hướng rõ, hay thay đổi.</i></li>`; }
    const theVs = theHao.isVuong ? 'Vượng' : 'Suy';
    const ungVs = ungHao.isVuong ? 'Vượng' : 'Suy';
    html += `<li><b>Thế (mình):</b> <b>${theVs}</b> - ${theHao.lt} ${theHao.can}-${theHao.chi} tại Hào ${theHao.i+1}. <b>Ứng (đối phương):</b> <b>${ungVs}</b> - ${ungHao.lt} ${ungHao.can}-${ungHao.chi} tại Hào ${ungHao.i+1}.`;
    if (theHao.dong && ungHao.dong) html += ` ⚡ <b>Thế và Ứng CÙNG ĐỘNG</b> → Biến động mạnh từ cả hai phía.`;
    html += `</li></ul>`;
    return html;
}

function phanTichTamHop(dt, dtHao, dongArrList) {
    let html = '';
    const chiNgay = dt.cNgay.split('-')[1];
    const chiThang = dt.cThang.split('-')[1];
    let activeChi = new Set([chiNgay, chiThang]);
    dongArrList.forEach(d => { activeChi.add(d.hao.chi); activeChi.add(d.bHao.chi); });
    if (dtHao) activeChi.add(dtHao.chi);
    if (dtHao && dtHao.isPhuc && dtHao.phiHao) activeChi.add(dtHao.phiHao.chi);
    let foundAny = false;
    for (let cuc of TAM_HOP_CUCS) {
        let matches = [];
        for (let c of cuc) { if (activeChi.has(c)) matches.push(c); }
        if (matches.length === 3) {
            foundAny = true;
            let cucNhanh = cuc[0] === 'Thân' ? 'Thủy' : (cuc[0] === 'Hợi' ? 'Mộc' : (cuc[0] === 'Dần' ? 'Hỏa' : 'Kim'));
            let cucTen = cuc.join('-');
            html += `<li><b>🔺 TAM HỢP CỤC THÀNH (${cucTen} → ${cucNhanh}):</b> Cục diện đặc biệt! `;
            if (dtHao && dtHao.nh === cucNhanh) { html += `Dụng thần (${dtHao.nh}) được Tam Hợp trực tiếp → <span class="color-ok"><b>SIÊU VƯỢNG</b>, đại cát!</span>`; }
            else if (dtHao && NH_SINH[cucNhanh] === dtHao.nh) { html += `Tam Hợp sinh Dụng → <span class="color-ok">Rất tốt, có lực lượng mạnh ủng hộ.</span>`; }
            else if (dtHao && NH_KHAC[cucNhanh] === dtHao.nh) { html += `Tam Hợp khắc Dụng → <span class="color-bad"><b>Rất xấu!</b> Cần Nguyên thần hoặc Nhật/Nguyệt cứu giải.</span>`; }
            else { html += `Tam Hợp tạo ra thế cục mạnh mẽ, cần xét tổng thể để đánh giá lợi hại.`; }
            html += `</li>`;
        } else if (matches.length === 2) {
            foundAny = true;
            let missing = cuc.find(c => !activeChi.has(c));
            html += `<li><b>🟡 Bán Tam Hợp (Thiếu ${missing}):</b> Chưa thành cục. Chờ ngày/tháng <b>${missing}</b> sẽ thành → <b>đây là Ứng Kỳ quan trọng!</b></li>`;
        }
    }
    if (foundAny) { return `<div style="margin-top:5px;padding:5px;background:#fff9e6;border:1px solid #ffe082;border-radius:4px"><b>🔺 PHÂN TÍCH TAM HỢP CỤC:</b><ul style="padding-left:16px;margin:3px 0 0">${html}</ul></div>`; }
    return '';
}

function phanTichXungHinhHai(dt, dtHao, theHao, ungHao) {
    let issues = [];
    const chiNgay = dt.cNgay.split('-')[1];
    const chiThang = dt.cThang.split('-')[1];
    let quanTrong = [];
    if (dtHao) quanTrong.push({ hao: dtHao, label: 'Dụng thần' });
    if (theHao && theHao.i !== dtHao?.i) quanTrong.push({ hao: theHao, label: 'Hào Thế' });
    if (ungHao && ungHao.i !== dtHao?.i && ungHao.i !== theHao?.i) quanTrong.push({ hao: ungHao, label: 'Hào Ứng' });
    quanTrong.forEach(({ hao, label }) => {
        if (!hao) return;
        if (XUNG_MAP[hao.chi] === chiNgay) { if (hao.isVuong || hao.dong) { issues.push(`<span class="color-warn">⚡</span> ${label} (${hao.chi}) bị Nhật Xung nhưng <b>VƯỢNG</b> → <b>Ám Động</b> (biến chuyển bất ngờ, có lợi).`); } else { issues.push(`<span class="color-bad">💔</span> ${label} (${hao.chi}) bị Nhật Xung + <b>SUY</b> → <b>Nhật Phá</b> (tan vỡ, hỏng việc).`); } }
        if (XUNG_MAP[hao.chi] === chiThang) { issues.push(`<span class="color-bad">⚠️</span> ${label} (${hao.chi}) bị <b>Nguyệt Phá</b> → Vô dụng trong tháng này, mọi sự khó thành.`); }
        if (HINH_MAP[hao.chi] === chiNgay || HINH_MAP[chiNgay] === hao.chi) { issues.push(`<span class="color-bad">🔪</span> ${label} (${hao.chi}) bị <b>Nhật Hình</b> → Tổn thương, rắc rối pháp lý hoặc xung đột ngày hôm đó.`); }
        if (HINH_MAP[hao.chi] === chiThang || HINH_MAP[chiThang] === hao.chi) { issues.push(`<span class="color-bad">🔪</span> ${label} (${hao.chi}) bị <b>Nguyệt Hình</b> → Cả tháng có rắc rối, đề phòng kiện tụng.`); }
    });
    dt.haoData.filter(h => h.dong).forEach(hDong => {
        if (dtHao && XUNG_MAP[hDong.chi] === dtHao.chi && hDong.i !== dtHao.i) { issues.push(`<span class="color-bad">⚔️</span> Hào động ${hDong.lt} (H${hDong.i+1}, ${hDong.chi}) <b>XUNG</b> Dụng thần → Lực lượng chống đối trực tiếp!`); }
        if (theHao && XUNG_MAP[hDong.chi] === theHao.chi && hDong.i !== theHao.i) { issues.push(`<span class="color-bad">⚔️</span> Hào động ${hDong.lt} (H${hDong.i+1}, ${hDong.chi}) <b>XUNG</b> Hào Thế → Trực tiếp hại đến bản thân!`); }
    });
    if (issues.length > 0) { return `<div style="margin-top:5px;padding:5px;background:#fff5f5;border:1px solid #fed7d7;border-radius:4px"><b>⚠️ CẢNH BÁO XUNG - HÌNH - HẠI:</b><ul style="padding-left:16px;margin:3px 0 0">${issues.map(i => `<li style="margin-bottom:1px">${i}</li>`).join('')}</ul></div>`; }
    return '';
}

function luanLucThanDongBien(dt, dtHao, theHao, dongArrList) {
    if (dongArrList.length === 0) return '';
    let html = `<div style="margin-top:6px;padding:5px;background:#f0f6fc;border:1px solid #d4e3f3;border-radius:4px"><b>🎯 LỤC THÂN & LỤC THẦN ĐỘNG BIẾN:</b><ul style="padding-left:16px;margin:3px 0 0">`;
    dongArrList.forEach(d => {
        let h = d.hao, bH = d.bHao;
        html += `<li style="margin-bottom:6px"><b>Hào ${h.i+1} [${h.lt}] ${h.can}-${h.chi} (${h.isVuong?'Vượng':'Suy'})</b> động → Biến <b>[${bH.lt}] ${bH.can}-${bH.chi}</b><br>`;
        let bienLuan = '';
        if (h.lt === 'Thê Tài' && bH.lt === 'Phụ Mẫu') bienLuan = '💰→📜 Tiền biến thành giấy tờ/tài sản: mua nhà, mua xe, đầu tư bất động sản.';
        else if (h.lt === 'Thê Tài' && bH.lt === 'Quan Quỷ') bienLuan = '💰→👮 Tiền sinh họa: đầu tư rủi ro, hoặc phải chi tiền cho công việc/pháp lý.';
        else if (h.lt === 'Thê Tài' && bH.lt === 'Huynh Đệ') bienLuan = '💰→👥 Tiền bị chia bớt, cạnh tranh, hao tài.';
        else if (h.lt === 'Quan Quỷ' && bH.lt === 'Tử Tôn') bienLuan = '👮→😊 Thoát khỏi áp lực, giải quyết vấn đề, vượt qua khó khăn.';
        else if (h.lt === 'Quan Quỷ' && bH.lt === 'Phụ Mẫu') bienLuan = '👮→📜 Công việc chuyển thành giấy tờ, thủ tục, hoặc liên quan đến cấp trên.';
        else if (h.lt === 'Phụ Mẫu' && bH.lt === 'Quan Quỷ') bienLuan = '📜→👮 Giấy tờ/thủ tục gặp trở ngại, hoặc có biến về công việc.';
        else if (h.lt === 'Tử Tôn' && bH.lt === 'Thê Tài') bienLuan = '😊→💰 Niềm vui sinh tài lộc, đầu tư sinh lời, sáng tạo mang lại tiền.';
        else if (h.lt === 'Huynh Đệ' && bH.lt === 'Tử Tôn') bienLuan = '👥→😊 Bạn bè/đồng nghiệp mang lại niềm vui, hoặc cạnh tranh giảm bớt.';
        else bienLuan = `Động hóa ${getTienThoai(h.chi, bH.chi) || 'bình thường'}.`;
        html += `<span style="color:#555">→ ${bienLuan}</span>`;
        if (h.ltt === 'Thanh Long' && h.lt === 'Thê Tài') html += `<br><span class="color-ok">🐉 + Thanh Long + Tài: Tài lộc chính đáng, có hỷ sự về tiền bạc.</span>`;
        if (h.ltt === 'Bạch Hổ' && h.lt === 'Quan Quỷ') html += `<br><span class="color-bad">🐯 + Bạch Hổ + Quan: Cực hung! Tai nạn, kiện tụng, quan phi, cần cẩn trọng.</span>`;
        if (h.ltt === 'Huyền Vũ' && h.lt === 'Thê Tài') html += `<br><span class="color-warn">🐢 + Huyền Vũ + Tài: Tiền bạc mờ ám, phi pháp, hoặc bị lừa đảo, trộm cắp.</span>`;
        if (h.ltt === 'Chu Tước' && h.lt === 'Quan Quỷ') html += `<br><span class="color-warn">🐦 + Chu Tước + Quan: Kiện tụng, tranh chấp bằng lời nói, thị phi.</span>`;
        if (h.ltt === 'Đằng Xà' && h.dong) html += `<br><span class="color-warn">🐍 + Đằng Xà + Động: Việc lạ, bất ngờ, có yếu tố tâm linh hoặc lo lắng.</span>`;
        html += `</li>`;
    });
    html += `</ul></div>`;
    return html;
}

function phanTichDoiTac(ungHao) {
    let html = `<div style="margin-top:5px;padding:5px;background:#f9f9f9;border:1px solid #e0e0e0;border-radius:4px"><b>👤 ĐỐI TÁC / ĐỐI PHƯƠNG (Hào Ứng):</b><ul style="padding-left:16px;margin:3px 0 0">`;
    let vs = ungHao.isVuong ? 'VƯỢNG' : 'SUY';
    html += `<li><b>Trạng thái:</b> <b>${vs}</b>. ${ungHao.isVuong ? 'Đối phương mạnh, có lợi thế, nắm thế chủ động.' : 'Đối phương yếu thế, thiếu năng lực hoặc không đáng ngại.'}</li>`;
    if (ungHao.tk === 'K') { html += `<li><b>⚠️ Lâm Không Vong:</b> Đối phương <b>không thực lòng</b>, hứa suông, hoặc không có khả năng thực hiện cam kết.</li>`; }
    if (ungHao.dong) { html += `<li><b>🔹 Đang động:</b> Đối phương đang có hành động, biến chuyển. Cần theo dõi sát.</li>`; }
    const UNG_LUAN = { 'Phụ Mẫu': 'Có thể là người lớn tuổi, cấp trên, hoặc liên quan đến giấy tờ, thủ tục, văn bản.', 'Huynh Đệ': 'Là đồng nghiệp, bạn bè, đối thủ cạnh tranh. Có thể có sự tranh giành.', 'Quan Quỷ': 'Là người có chức quyền, cơ quan nhà nước, hoặc là nguồn gây áp lực, khó khăn.', 'Thê Tài': 'Liên quan đến tiền bạc, tài chính, hoặc là một người phụ nữ.', 'Tử Tôn': 'Là người dưới quyền, trẻ tuổi, hoặc là nguồn vui, giải trí, sáng tạo.' };
    html += `<li><b>Bản chất (Lục Thân - ${ungHao.lt}):</b> ${UNG_LUAN[ungHao.lt] || 'Không xác định.'}</li>`;
    html += `</ul></div>`;
    return html;
}

function moTaKeTrom(quanQuyV) {
    if (!quanQuyV) return '';
    const CHAN_DUNG = { 'Thanh Long': 'Ưa nhìn, lịch sự, dễ gây thiện cảm → Trộm có kế hoạch, không manh động.', 'Chu Tước': 'Hay nói, mồm mép, có thể giả danh nhân viên → Lừa đảo kết hợp.', 'Câu Trần': 'Chậm chạp, thấp đậm, có vẻ thật thà → Người quen, hàng xóm.', 'Đằng Xà': 'Gầy, nhanh nhẹn, vẻ gian xảo → Trộm vặt, cơ hội.', 'Bạch Hổ': 'To khỏe, dữ dằn, có hung khí → Cướp giật, manh động, NGUY HIỂM!', 'Huyền Vũ': 'Lén lút, khó đoán → Trộm chuyên nghiệp, có tổ chức.' };
    const MAU_SAC = { 'Mộc': 'Xanh lá', 'Hỏa': 'Đỏ/Cam', 'Thổ': 'Vàng/Nâu', 'Kim': 'Trắng/Xám', 'Thủy': 'Đen/Xanh dương' };
    const HUONG = { 'Tý': 'Bắc', 'Sửu': 'Đông Bắc', 'Dần': 'Đông Bắc', 'Mão': 'Đông', 'Thìn': 'Đông Nam', 'Tỵ': 'Đông Nam', 'Ngọ': 'Nam', 'Mùi': 'Tây Nam', 'Thân': 'Tây Nam', 'Dậu': 'Tây', 'Tuất': 'Tây Bắc', 'Hợi': 'Tây Bắc' };
    let lt = quanQuyV.ltt;
    let cd = CHAN_DUNG[lt] || 'Không rõ đặc điểm.';
    let html = '';
    html += `<li><b>Lục Thần (${lt}):</b> ${cd}</li>`;
    html += `<li><b>Màu sắc áo/quần:</b> Có thể mặc đồ <b>${MAU_SAC[quanQuyV.nh]}</b> (theo Ngũ Hành).</li>`;
    html += `<li><b>Hướng trốn:</b> Khoảng <b>${HUONG[quanQuyV.chi] || 'chưa xác định'}</b>.</li>`;
    return html;
}

function renderMang5(dt, dtHao, theHao, ungHao, listNT, listKT, dongArrList) {
    let h = "";
    h += `<div class="m5-section">`;
    h += `<div class="m5-h3">1. Thông tin chung & Luận giải nhanh</div>`;
    h += `<div class="m5-text">`;
    h += tinhTongQuanDaiCuoc(dt, dtHao, theHao, ungHao);
    if (dt.qTinhChat.includes("Lục Xung")) { h += `<p class="m5-p color-bad" style="margin-top:4px"><b>⚡ Quẻ Lục Xung:</b> Mọi việc dễ đổ vỡ, chia ly, biến động đột ngột. <i>Hôn nhân: bất hòa. Sinh đẻ: dễ sinh. Kiện tụng: ly tán. Tìm người: không quay về.</i></p>`; }
    if (dt.qTinhChat.includes("Lục Hợp")) { h += `<p class="m5-p color-warn"><b>🔗 Quẻ Lục Hợp:</b> Sự việc dùng dằng, níu kéo, khó dứt điểm. <i>Hôn nhân: ổn định. Sinh đẻ: khó sinh. Tìm người: bị níu chân. Bán hàng: khó chốt deal.</i></p>`; }
    if (dt.qTinhChat.includes("Phục Ngâm")) { h += `<p class="m5-p color-warn"><b>🔄 Phục Ngâm:</b> Sự việc trì trệ, lặp lại, không tiến triển. Người đi xa bôn ba bất an.</p>`; }
    if (dt.qTinhChat.includes("Phản Ngâm")) { h += `<p class="m5-p color-warn"><b>🔀 Phản Ngâm:</b> Biến động đảo lộn, sự việc thay đổi chóng mặt, khó lường trước.</p>`; }
    if (QUE_VONG.includes(dt.tenQue)) { h += `<p class="m5-p m5-highlight"><b>👻 Quẻ phần Âm (Nhà có vong):</b> Quẻ này thuộc 24 quẻ Âm, dễ có sự can thiệp của vong linh, vong theo. Kiểm tra mồ mả, bàn thờ gia tiên, có thể cần cúng lễ hoặc giải hạn.</p>`; }
    let bhDong = dt.haoData.find(ha => ha.ltt === 'Bạch Hổ' && (ha.dong || ha.i === theHao.i || ha.i === dtHao.i));
    if (bhDong) { let bhLabel = bhDong.i === theHao.i ? 'Thế' : (bhDong.i === dtHao.i ? 'Dụng thần' : 'Hào động'); h += `<p class="m5-p color-bad"><b>🐯 Cảnh báo Bạch Hổ:</b> Bạch Hổ lâm ${bhLabel}. Cẩn thận <b>tang tóc, đổ máu, tai nạn, phẫu thuật!</b> Cần đi đứng cẩn thận, tránh xung đột.</p>`; }
    const checkNhapMo = (hao) => hao && hao.lt === 'Quan Quỷ' && (hao.tsNgay === 'Mộ' || hao.tsThang === 'Mộ');
    if (checkNhapMo(theHao)) { h += `<p class="m5-p color-bad"><b>⚰️ Tùy Quỷ Nhập Mộ (Hào Thế):</b> Hào Thế lâm Quan Quỷ nhập Mộ → <b>Cực kỳ hung hiểm, bế tắc toàn diện!</b> Mọi việc đình trệ, bản thân dễ gặp nạn.</p>`; }
    if (checkNhapMo(dtHao) && dtHao.i !== theHao.i) { h += `<p class="m5-p color-bad"><b>⚰️ Tùy Quỷ Nhập Mộ (Dụng Thần):</b> Dụng Thần lâm Quan Quỷ nhập Mộ → Điềm bế tắc cùng cực, khó xoay chuyển.</p>`; }
    h += phanTichTamHop(dt, dtHao, dongArrList);
    h += phanTichXungHinhHai(dt, dtHao, theHao, ungHao);
    let isTriThe = dtHao.i === theHao.i && !dtHao.isPhuc;
    let dtVsLabel = dtHao.isVuong ? "VƯỢNG" : "SUY";
    let dtVsColor = dtHao.isVuong ? "color-ok" : "color-bad";
    h += `<p class="m5-p" style="margin-top:6px"><b>📋 Tóm tắt Thế - Dụng:</b> Dụng thần (<span class="${dtVsColor}">${dtVsLabel}</span>)`;
    if (isTriThe) h += `, <span class="color-ok">Dụng thần trì Thế (Cát - sự việc trong tầm tay)</span>`;
    else { let tuong = tuongTotXau(dtHao.nh, theHao.nh, false); h += `, Quan hệ với Thế: <b>${tuong}</b>`; }
    if (dtHao.tk === 'K') h += ` | ⚠️ Đang lâm Không Vong.`;
    if (dtHao.dong) h += ` | ⚡ Hào Dụng đang ĐỘNG.`;
    h += `</p></div></div>`;

    h += `<div class="m5-section">`;
    h += `<div class="m5-h3">2. Phân tích Phong thủy & Môi trường</div>`;
    h += `<div class="m5-text">`;
    let pt = PHONG_THUY_DATA[dt.tenQue];
    if (pt && (pt.trong || pt.ngoai || pt.xung || pt.nguoi || pt.khac)) {
        h += `<p class="m5-p" style="margin-bottom:4px"><b>[Tượng quẻ ${dt.tenQue}]:</b></p><ul style="padding-left:16px;margin-top:2px">`;
        if (pt.trong) h += `<li style="margin-bottom:2px"><b>🏠 Trong nhà:</b> ${pt.trong}</li>`;
        if (pt.ngoai) h += `<li style="margin-bottom:2px"><b>🏡 Ngoài nhà:</b> ${pt.ngoai}</li>`;
        if (pt.xung) h += `<li style="margin-bottom:2px"><b>🌍 Xung quanh:</b> ${pt.xung}</li>`;
        if (pt.nguoi) h += `<li style="margin-bottom:2px"><b>👤 Con người:</b> ${pt.nguoi}</li>`;
        if (pt.khac) h += `<li style="margin-bottom:2px"><b>💡 Ý nghĩa khác:</b> ${pt.khac}</li>`;
        h += `</ul>`;
    } else { h += `<p class="m5-p"><i>(Chưa có dữ liệu phong thủy đặc thù cho quẻ này)</i></p>`; }
    h += `<p class="m5-p" style="margin-top:6px;margin-bottom:2px"><b>[Tượng Hào kết hợp]:</b></p><ul style="padding-left:16px;margin-top:2px">`;
    let hao2 = dt.haoData[1];
    if (hao2 && hao2.lt === 'Thê Tài') { h += `<li style="margin-bottom:2px"><b>Hào 2 (Thê Tài):</b> Khu vực <b>Nhà bếp</b>. Cần kiểm tra bếp núc, nơi nấu nướng, có thể có vấn đề về gas/lửa hoặc tài chính trong bếp.</li>`; }
    if (hao2 && hao2.lt === 'Quan Quỷ' && hao2.ltt === 'Bạch Hổ') { h += `<li style="margin-bottom:2px"><b>Hào 2 (Quan + Bạch Hổ):</b> Cần kiểm tra khu vực <b>nhà bếp/bếp gas</b>, đề phòng hỏa hoạn hoặc tai nạn trong nhà.</li>`; }
    let hao3 = dt.haoData[2], hao4 = dt.haoData[3];
    if (hao3 && hao4 && (hao3.chi === hao4.chi)) { h += `<li style="margin-bottom:2px"><b>Hào 3-4 đồng chi (${hao3.chi}):</b> Khu vực <b>cửa ra vào, cổng</b>. Cần chú ý tình trạng cửa, khóa, an ninh.</li>`; }
    if (hao3 && hao4 && XUNG_MAP[hao3.chi] === hao4.chi) { h += `<li style="margin-bottom:2px"><b>⚠️ Hào 3-4 tương xung (${hao3.chi}-${hao4.chi}):</b> Môn hộ bất an! Cửa ra vào có vấn đề phong thủy, dễ xảy ra xung đột.</li>`; }
    let hao5 = dt.haoData[4];
    if (hao5 && hao5.ltt === 'Thanh Long' && hao5.isVuong) { h += `<li style="margin-bottom:2px"><b>Hào 5 (Thanh Long + Vượng):</b> Vị trí tôn quý có điềm lành. Nhà có người tài, sắp đón hỷ sự hoặc tin vui từ xa.</li>`; }
    let hao6 = dt.haoData[5];
    if (hao6 && hao6.ltt === 'Bạch Hổ' && hao6.dong) { h += `<li style="margin-bottom:2px"><b>⚠️ Hào 6 (Bạch Hổ + Động):</b> Mái nhà hoặc khu vực trên cao có vấn đề. Kiểm tra mái, trần nhà, đề phòng sét đánh hoặc vật rơi.</li>`; }
    h += `</ul></div></div>`;

    h += `<div class="m5-section" style="border:none; padding-bottom:0;">`;
    h += `<div class="m5-h3">3. Phân tích Chủ đề (Chuyên sâu)</div>`;
    h += luanLucThanDongBien(dt, dtHao, theHao, dongArrList);
    h += phanTichDoiTac(ungHao);
    
    // Đã thêm Chủ đề Cầu Tài độc lập
    h += `<select id="sel-chu-de" style="width:100%;padding:5px;border:1px solid #dcdfe4;border-radius:4px;font-size:clamp(9px,0.72vw,11px);background:#fff;cursor:pointer;margin:6px 0 4px">
        <option value="">-- Chọn chủ đề để luận giải chi tiết --</option>
        <option value="hon_nhan">💍 Hôn Nhân / Tình Duyên</option>
        <option value="cau_tai">💰 Cầu Tài / Kinh Doanh / Đòi Nợ</option>
        <option value="ban_hang">📦 Bán Hàng / Tồn Kho</option>
        <option value="tim_nguoi">🧭 Tìm Người / Đi Xa</option>
        <option value="tim_vat">🔍 Tìm Vật Thất Lạc</option>
        <option value="thai_nghen">🤰 Thai Nghén / Sinh Đẻ</option>
        <option value="cong_danh">🎯 Công Danh / Sự Nghiệp / Xin Việc</option>
      </select>`;
    h += `<div id="cd-content" class="cd-content-box" style="display:none;max-height:50vh;overflow-y:auto"></div>`;
    h += `</div>`;
    
    document.getElementById('mang5-content').innerHTML = h;

    document.getElementById('sel-chu-de').addEventListener('change', function() {
        window.currentChuDe = this.value;
        updateChuDeContent(dt, dtHao, theHao, ungHao, listNT, listKT, dongArrList);
    });
}

function updateChuDeContent(dt, dtHao, theHao, ungHao, listNT, listKT, dongArrList) {
    const cd = window.currentChuDe;
    const box = document.getElementById('cd-content');
    if (!cd) { box.style.display = 'none'; return; }
    
    box.style.display = 'block';
    
    let cdHtml = "";
    
    if (cd === 'hon_nhan') {
        let genderVal = window.gioiTinhXem || 'nam';
        cdHtml += `<div style="font-weight:700;color:var(--blue);margin-bottom:6px;font-size:12px;border-bottom:1px solid #ccc;padding-bottom:4px">💍 LUẬN GIẢI HÔN NHÂN / TÌNH DUYÊN</div>`;
        cdHtml += `<div style="margin-bottom: 8px; background:#f0f6fc; padding: 6px; border-radius: 4px; border:1px solid #d4e3f3; display:flex; align-items:center; gap:10px;">
            <span style="font-weight:600; color:#1b4d82">Bạn xem cho:</span>
            <label style="cursor:pointer"><input type="radio" name="gender_opt" value="nam" ${genderVal==='nam'?'checked':''} onchange="window.gioiTinhXem=this.value; document.getElementById('sel-chu-de').dispatchEvent(new Event('change'))"> 👨 Nam</label>
            <label style="cursor:pointer"><input type="radio" name="gender_opt" value="nu" ${genderVal==='nu'?'checked':''} onchange="window.gioiTinhXem=this.value; document.getElementById('sel-chu-de').dispatchEvent(new Event('change'))"> 👩 Nữ</label>
        </div>`;
        cdHtml += phanTichHonNhan(genderVal, dt, dtHao, theHao, ungHao);
    } else {
        cdHtml += phanTichChuDeChuyenSauKhac(cd, dt, dtHao, theHao, ungHao, listNT, listKT, dongArrList);
    }
    
    cdHtml += khuyenNghiHanhDong(cd, dt, dtHao, theHao, ungHao);
    box.innerHTML = cdHtml;
}

function phanTichHonNhan(gender, dt, dtHao, theHao, ungHao) {
    let res = "";
    const isNam = gender === 'nam';
    const isNu = gender === 'nu';
    const theChi = theHao.chi, ungChi = ungHao.chi;
    const theNh = theHao.nh, ungNh = ungHao.nh;
    const chiNgay = dt.cNgay.split('-')[1];
    const chiThang = dt.cThang.split('-')[1];
    
    const theIsYang = (theHao.v === 1 || theHao.v === 3);
    const ungIsYang = (ungHao.v === 1 || ungHao.v === 3);
    
    // Tính Quái Thân
    const theCungData = dt.haoData.find(h=>h.the);
    let qsCungIdx = dt.cungTrai ? TRIGRAMS.findIndex(t=>t.ten === dt.cungTrai) : 0;
    if (qsCungIdx===-1) qsCungIdx=0;
    const quaiThanChi = getQuaiThan(qsCungIdx, theCungData.i); 
    const quaiThanNh = DC_NH[quaiThanChi];
    
    res += `<p style="font-size:10px;color:#888;margin-bottom:4px"><i>* Lưu ý: Nam chiêm nữ chọn hào Thê Tài làm Dụng thần, Nữ chiêm nam chọn hào Quan Quỷ làm Dụng thần.</i></p>`;
    
    // ==========================================
    // I. DỤNG THẦN & QUÁI THÂN
    // ==========================================
    res += `<div style="font-weight:600;font-size:11.5px;color:var(--purple);margin-top:4px">I. DỤNG THẦN & QUÁI THÂN:</div><ul style="padding-left:16px;margin-top:2px;list-style:square">`;
    
    if ((isNam && dtHao.lt !== 'Thê Tài') || (isNu && dtHao.lt !== 'Quan Quỷ')) {
        res += `<li><span class="color-warn">Cảnh báo:</span> Đang xem cho <b>${isNam?'Nam':'Nữ'}</b>, nên chọn Dụng thần là <b>${isNam?'Thê Tài':'Quan Quỷ'}</b> ở Mảng 2 để luận giải chính xác.</li>`;
    }

    if (dtHao.tk === 'K' || XUNG_MAP[dtHao.chi] === chiThang) {
        res += `<li><b>🔴 Gặp Tài Quỷ Không Vong:</b> Là tối kỵ trong hôn nhân (vạn sự khó thành). Đối phương không thực lòng.</li>`;
    } else {
        if (dtHao.isVuong) res += `<li><b>🟢 Dụng thần Vượng tướng:</b> Tốt đẹp, đối phương có năng lực. `;
        else res += `<li><b>⚠️ Dụng thần Hưu Tù:</b> Đối phương điều kiện kém, gầy yếu hoặc kém cỏi. `;
        
        if (NH_SINH[dtHao.nh] === theNh) res += `<span class="color-ok">Lại sinh Thế</span>, người ta thực bụng muốn lo lắng, chăm sóc cho bạn.</li>`;
        else if (NH_KHAC[dtHao.nh] === theNh) res += `<span class="color-bad">Lại khắc Thế</span>, bị đối phương khắc chế, gây áp lực.</li>`;
        else if (HOP_MAP[dtHao.chi] === theChi) res += `<span class="color-ok">Lại hợp Thế</span>, tình duyên tốt đẹp, hai bên tình nguyện đến với nhau.</li>`;
        else res += `</li>`;
    }

    if (dtHao.dong) {
        let bHaoChi = dt.bqData[dtHao.i].chi;
        let tienThoai = getTienThoai(dtHao.chi, bHaoChi);
        if (tienThoai === 'Tiến thần') res += `<li><b>🟢 Động hóa Tiến:</b> Dụng thần động hóa tiến, muốn tiến tới hôn nhân.</li>`;
        else if (tienThoai === 'Thoái thần') res += `<li><b>🔴 Động hóa Thoái:</b> Dụng thần động hóa thoái, có ý rút lui, rời xa.</li>`;
    }

    if (quaiThanNh) {
        let isHuongKhue = NH_KHAC[quaiThanNh] === theNh;
        let isSangTruong = NH_SINH[quaiThanNh] === theNh;
        let qsHao = dt.haoData.find(h => h.chi === quaiThanChi);
        
        if (isNu && isHuongKhue && qsHao) {
            if (qsHao.isVuong || qsHao.dong) res += `<li><b>🏠 Hương Khuê (Nữ xem):</b> Vượng tướng xuất hiện, biểu hiện đã chung sống hoặc kết hôn.</li>`;
            else res += `<li><b>🏠 Hương Khuê (Nữ xem):</b> Suy phá, cho thấy chưa kết hôn, chưa chung sống.</li>`;
            if (qsHao.lt==='Phụ Mẫu' && qsHao.tk!=='K') res += `<li style="margin-left:14px;list-style:circle">Lâm Phụ mẫu: Chủ đã kết hôn. (Nếu lâm Không Phá là ly dị).</li>`;
            if (qsHao.lt==='Tử Tôn') res += `<li style="margin-left:14px;list-style:circle">Lâm Tử tôn: Sống chung, có thai.</li>`;
            if (qsHao.i===dtHao.i) res += `<li style="margin-left:14px;list-style:circle">Lâm Dụng thần: Hôn nhân có thể thành.</li>`;
        }
        if (isNam && isSangTruong && qsHao) {
            if (qsHao.isVuong || qsHao.dong) res += `<li><b>🛏️ Sàng Trướng (Nam xem):</b> Vượng tướng xuất hiện, biểu hiện đã chung sống hoặc kết hôn.</li>`;
            else res += `<li><b>🛏️ Sàng Trướng (Nam xem):</b> Suy phá, chưa kết hôn, chưa sống chung.</li>`;
            if (qsHao.lt==='Phụ Mẫu' && qsHao.tk!=='K') res += `<li style="margin-left:14px;list-style:circle">Lâm Phụ mẫu: Chủ đã kết hôn. (Nếu lâm Không Phá là ly dị).</li>`;
            if (qsHao.lt==='Tử Tôn') res += `<li style="margin-left:14px;list-style:circle">Lâm Tử tôn: Sống chung, có thai.</li>`;
            if (qsHao.i===dtHao.i) res += `<li style="margin-left:14px;list-style:circle">Lâm Dụng thần: Hôn nhân có thể thành.</li>`;
        }
    }
    
    if (dtHao.tsNgay === 'Sinh' || dtHao.tsThang === 'Sinh' || dtHao.isVuong) {
        res += `<li><b>✨ Tướng mạo, tài năng:</b> ${isNu?'Chồng (Quan)':'Vợ (Tài)'} tới nơi Trường Sinh / Vượng: To béo, khỏe mạnh, tuấn tú/tài năng. `;
        if(dtHao.ltt === 'Thanh Long') res += `(Lâm Thanh Long: Xinh đẹp, thanh lịch).</li>`;
        else res += `(Lâm ${dtHao.ltt}: Diện mạo bình thường).</li>`;
    }
    if (dtHao.tsNgay === 'Mộ' || dtHao.tsThang === 'Mộ' || (!dtHao.isVuong && dtHao.tsNgay !== 'Sinh' && dtHao.tsThang !== 'Sinh')) {
        res += `<li><b>⚠️ Tướng mạo, vụng về:</b> ${isNu?'Chồng (Quan)':'Vợ (Tài)'} tới nơi Mộ Khố / Suy: Người vụng về, gầy gò, ốm yếu hoặc xấu xí.</li>`;
    }

    res += `</ul>`;

    // ==========================================
    // II. THẾ VÀ ỨNG (Quan hệ hai bên)
    // ==========================================
    res += `<div style="font-weight:600;font-size:11.5px;color:var(--purple);margin-top:6px">II. THẾ VÀ ỨNG (Quan hệ hai bên):</div><ul style="padding-left:16px;margin-top:2px;list-style:square">`;

    if ((isNu && theIsYang && !ungIsYang) || (isNam && !theIsYang && ungIsYang)) {
        res += `<li><b>⚠️ Âm Dương tương thác:</b> Nữ chiêm Thế dương Ứng âm, Nam chiêm Thế âm Ứng dương. Âm dương trái ngược, khó hạnh phúc cả đời, cuối cùng không được như ý.</li>`;
    } else if ((isNu && !theIsYang && ungIsYang) || (isNam && theIsYang && !ungIsYang)) {
        res += `<li><b>🟢 Âm Dương tương đắc:</b> Rất hợp đạo phu thê, vợ chồng sống trọn đời bên nhau.</li>`;
    }

    if (NH_SINH[theNh] === ungNh || (NH_SINH[theNh] === dtHao.nh)) res += `<li><b>💘 Thế sinh Ứng/Dụng thần:</b> Bạn chủ động, si tình, thích/thương đối phương hơn, phát động tán tỉnh.</li>`;
    else if (NH_SINH[ungNh] === theNh) res += `<li><b>💘 Ứng sinh Thế:</b> Đối phương chủ động, có tình cảm sâu nặng và thích bạn hơn.</li>`;
    else if (NH_KHAC[theNh] === ungNh) res += `<li><b>💔 Thế khắc Ứng:</b> Mối quan hệ không tốt, dễ chia cắt. ${theHao.isVuong ? '(Thế vượng khắc Ứng: Chê gia đình đối phương không giàu có, địa vị thấp).' : ''}</li>`;
    else if (NH_KHAC[ungNh] === theNh) res += `<li><b>💔 Ứng khắc Thế:</b> Mối quan hệ không tốt, đối phương lấn lướt, dễ dẫn đến chia cắt.</li>`;
    
    if (HOP_MAP[theChi] === ungChi) res += `<li><b>🔗 Thế hợp Ứng, Ứng hợp Thế:</b> Hai bên tình nguyện đến với nhau, hôn nhân dễ thành và may mắn.</li>`;
    if (XUNG_MAP[theChi] === ungChi) res += `<li><b>⚡ Lục Xung:</b> Tình cảm bất hòa, Lục xung thì khó và hung. (Lục hợp thì dễ và cát).</li>`;
    
    if (theNh === ungNh) res += `<li><b>⚖️ Thế Ứng tỷ hòa (cùng ngũ hành):</b> Sự việc thành công thường phải <b>qua mai mối</b> mới thành.</li>`;
    
    if (theChi === ungChi) {
        let isDongHuong = (theHao.i === 2 || theHao.i === 3) && (ungHao.i === 2 || ungHao.i === 3);
        res += `<li><b>🤝 Thế Ứng địa chi giống nhau:</b> Là bạn học, đồng nghiệp, người quen cũ. ${isDongHuong?'(Đặc biệt Thế Ứng ở hào 3, 4 là người đồng hương)':' '}</li>`;
    }

    if (theHao.tk === 'K' || ungHao.tk === 'K') {
        if (theHao.tk === 'K' && ungHao.tk === 'K') res += `<li><b>🦊 Cả hai lâm Không:</b> Đều lừa gạt lẫn nhau, có mục đích riêng.</li>`;
        else res += `<li><b>🦊 Một bên lâm Không:</b> Một bên không toàn ý, có ý trốn tránh tình cảm.</li>`;
    }
    
    if ((theHao.dong && dt.bqData[theHao.i].tk==='K') || (ungHao.dong && dt.bqData[ungHao.i].tk==='K')) {
        res += `<li><b>😭 Thế/Ứng hóa Không Vong:</b> Lúc đầu thành công, về sau hối hận.</li>`;
    }
    
    if (theHao.dong && getTienThoai(theChi, dt.bqData[theHao.i].chi) === 'Thoái thần') res += `<li><b>🚶 Thế hóa Thoái:</b> Chính bạn có ý lui bước, chủ động rút lui.</li>`;
    if (ungHao.dong && getTienThoai(ungChi, dt.bqData[ungHao.i].chi) === 'Thoái thần') res += `<li><b>🚶 Ứng hóa Thoái:</b> Đối phương có ý thoái lui, lùi bước.</li>`;

    if (isNam && theHao.lt === 'Thê Tài' && ungHao.lt === 'Quan Quỷ') res += `<li><b>👑 Ứng Quỷ Thế Tài:</b> Khó tránh chuyện vợ đoạt quyền chồng.</li>`;
    if (isNam && theHao.lt === 'Quan Quỷ' && ungHao.lt === 'Thê Tài') res += `<li><b>👑 Ứng Tài Thế Quỷ:</b> Cuối cùng nữ thuận theo chồng.</li>`;
    if (isNu && theHao.lt === 'Quan Quỷ' && ungHao.lt === 'Thê Tài') res += `<li><b>👑 Ứng Tài Thế Quỷ:</b> Khó tránh vợ đoạt quyền chồng.</li>`;
    if (isNu && theHao.lt === 'Thê Tài' && ungHao.lt === 'Quan Quỷ') res += `<li><b>👑 Ứng Quỷ Thế Tài:</b> Cuối cùng nữ thuận theo chồng.</li>`;
    
    res += `</ul>`;

    // ==========================================
    // III. NGOẠI TÌNH & NGƯỜI THỨ BA
    // ==========================================
    res += `<div style="font-weight:600;font-size:11.5px;color:var(--purple);margin-top:6px">III. NGOẠI TÌNH & NGƯỜI THỨ BA:</div><ul style="padding-left:16px;margin-top:2px;list-style:square">`;
    
    let dtBien = dtHao.dong ? dt.bqData[dtHao.i] : null;
    let coNgoaiTinh = false;
    
    if (dtHao.dong && dtBien && (dtBien.lt === dtHao.lt || dtBien.nh === dtHao.nh)) {
        res += `<li><b>💔 Động hóa cùng Ngũ Hành/Lục Thân:</b> Đã có Dụng thần, lại hóa ra hào cùng ngũ hành/lục thân → Sẽ có ngoại tình, bản thân người hỏi có.</li>`; coNgoaiTinh = true;
    }
    if (dtHao.dong && dtBien && dtBien.lt === 'Huynh Đệ' && HOP_MAP[dtHao.chi] === dtBien.chi) {
        res += `<li><b>💔 Động hợp Huynh Đệ:</b> Dụng thần động tương hợp hào Huynh đệ → Ngoại tình.</li>`; coNgoaiTinh = true;
    }
    if (NH_SINH[dtHao.nh] === ungNh && HOP_MAP[dtHao.chi] === ungChi) {
        res += `<li><b>💔 Dụng sinh hợp Ứng:</b> Dụng thần sinh hợp Ứng hào → Ngoại tình.</li>`; coNgoaiTinh = true;
    }
    let hasHopKhac = false;
    dt.haoData.forEach(h => { if(h.i !== dtHao.i && h.i !== theHao.i && HOP_MAP[dtHao.chi] === h.chi) hasHopKhac = true; });
    if (hasHopKhac) {
        res += `<li><b>💔 Dụng thần tương hợp hào khác:</b> Đa số là ngoại tình.</li>`; coNgoaiTinh = true;
    }

    let dtLieuHien = dt.haoData.filter(h => h.lt === dtHao.lt);
    if (dtLieuHien.length > 1) {
        res += `<li><b>💔 Tài/Quan xuất hiện nhiều lần:</b> Đa phần là tượng tái hôn hoặc có người mới.</li>`; coNgoaiTinh = true;
    }

    if (dtHao.isPhuc) {
        let phi = dtHao.phiHao;
        if ((isNam && phi.lt === 'Quan Quỷ') || (isNu && phi.lt === 'Thê Tài')) {
            res += `<li><b>💔 Tài Quan phục dưới lẫn nhau:</b> Phía Nam đã có thê thất (Tài phục dưới Quỷ), phía Nữ đã có phu quân (Quỷ phục dưới Tài).</li>`; coNgoaiTinh = true;
        }
        if (phi.lt === 'Huynh Đệ') {
            res += `<li><b>💔 Phục dưới Huynh Đệ:</b> (Cần xem thêm Mộc Dục) → Đối phương có người thứ 3, hoặc đã có gia đình.</li>`; coNgoaiTinh = true;
        }
    }
    
    if (!coNgoaiTinh) res += `<li><span style="color:#555">Chưa thấy dấu hiệu ngoại tình rõ ràng trên quẻ.</span></li>`;
    res += `</ul>`;

    // ==========================================
    // IV. THÔNG TIN KHÁC
    // ==========================================
    res += `<div style="font-weight:600;font-size:11.5px;color:var(--purple);margin-top:6px">IV. THÔNG TIN KHÁC:</div><ul style="padding-left:16px;margin-top:2px;list-style:square">`;
    
    let dongNoi = dt.haoData.slice(0,3).some(h=>h.dong);
    let dongNgoai = dt.haoData.slice(3,6).some(h=>h.dong);
    if (dongNoi && dongNgoai) res += `<li><b>⚠️ Nội ngoại hỗ giao:</b> Quẻ nội ngoại đều động, trong gia đình thường xuyên có tiếng cãi vã. Chiêm hôn nhân tốt nhất quẻ nên tĩnh.</li>`;

    let gianHao = dt.haoData.filter(h => h.dong && h.i > Math.min(theHao.i, ungHao.i) && h.i < Math.max(theHao.i, ungHao.i));
    let kyThanL = dt.haoData.filter(h => NH_KHAC[h.nh] === dtHao.nh && h.dong);
    if (gianHao.length > 0) {
        let gh = gianHao[0];
        if (NH_SINH[gh.nh] === dtHao.nh || kyThanL.some(k=>k.i===gh.i)) {
            res += `<li><b>🔥 Kẻ đâm chọc:</b> Gian hào động sinh Kỵ thần hoặc Kỵ thần phát động, có người châm ngòi giữa 2 người.</li>`;
        }
    }

    let isMaiMoi = false;
    let nguoiMaiMoi = "";
    if (HOP_MAP[chiNgay] === theChi || HOP_MAP[chiNgay] === ungChi) {
        isMaiMoi = true; nguoiMaiMoi = "Nhờ ngày hợp (người ngoài tác hợp)";
    }
    if (gianHao.length > 0 && (HOP_MAP[gianHao[0].chi] === theChi || HOP_MAP[gianHao[0].chi] === ungChi || NH_SINH[gianHao[0].nh] === theNh || NH_SINH[gianHao[0].nh] === ungNh)) {
        isMaiMoi = true; 
        nguoiMaiMoi = `Nhờ gian hào (${gianHao[0].lt}) giúp đỡ`;
    }
    if (isMaiMoi) res += `<li><b>🤝 Mai mối:</b> Sự việc thành công nhờ vào người khác. (${nguoiMaiMoi}). <i>(Quan sát Lục thân Gian hào để biết: Phụ mẫu = bề trên, Huynh đệ = bạn bè...)</i>.</li>`;

    let taiH = dt.haoData.find(h => h.lt === 'Thê Tài');
    let quanH = dt.haoData.find(h => h.lt === 'Quan Quỷ');
    if (taiH && quanH && taiH.dong && quanH.dong && (HOP_MAP[taiH.chi] === quanH.chi || (dt.bqData[taiH.i] && dt.bqData[taiH.i].chi === quanH.chi))) {
        res += `<li><b>🔞 Tài Quan động hợp:</b> Đá phá tư trước mà công sau (Tượng chưa kết hôn đã sống chung).</li>`;
    }

    let pm = dt.haoData.find(h => h.lt === 'Phụ Mẫu');
    if (pm) {
        if (pm.chi === chiNgay) res += `<li><b>📜 Nhật thần tới Phụ:</b> Hôn nhân ổn định, cho thấy hôn nhân đã định.</li>`;
        if (pm.ltt === 'Huyền Vũ' || pm.tk === 'K' || pm.tsNgay === 'Mộ') {
            res += `<li><b>📜 Giấy kết hôn (Phụ mẫu):</b> Lâm Huyền Vũ, Không Vong, Nhập Mộ chỉ sự mờ ám, không có giấy kết hôn, hoặc ly hôn.</li>`;
        } 
    }

    let huynhHuyenVu = dt.haoData.find(h => h.lt === 'Huynh Đệ' && h.ltt === 'Huyền Vũ' && h.dong);
    if (huynhHuyenVu) {
        res += `<li><b>🔴 Huynh động Huyền vũ:</b> Cần đề phòng bị cướp tiền, mắc mưu. (Huyền vũ chủ ám muội, lừa dối, động khắc Thế cuộc hôn nhân này tất gặp nguy hiểm).</li>`;
    }

    if (isNam) {
        if (theHao.tsNgay === 'Mộ' && (theHao.lt === 'Thê Tài' || theHao.chi === ungChi)) {
            res += `<li><b>😅 Sợ vợ (Nam xem):</b> Thế nhập mộ tại Thê Tài hoặc Thế nhập mộ tại Ứng hào là sợ vợ.</li>`;
        }
        if (theHao.dong && NH_SINH[theHao.nh] === ungNh && ungHao.lt === 'Thê Tài') {
            res += `<li><b>🏡 Ở nhà vợ (Nam xem):</b> Thế động mà sinh Thê Tài trì Ứng là đang ở nhà vợ ${ungHao.i===1?'(Thê Tài lâm hào 2 càng ứng nghiệm)':''}.</li>`;
        }
        let taiBH = dt.haoData.find(h => h.lt === 'Thê Tài' && h.ltt === 'Bạch Hổ');
        if (taiBH && NH_KHAC[taiBH.nh] === theNh) {
            res += `<li><b>🐯 Vợ lợi hại (Nam xem):</b> Thê Tài lâm Bạch Hổ khắc Thế là nữ nhân lợi hại, bị vợ ức hiếp, hoặc không hiếu kính bố mẹ chồng.</li>`;
        }
    }

    res += `</ul>`;
    return res;
}

function phanTichChuDeChuyenSauKhac(cd, dt, dtHao, theHao, ungHao, listNT, listKT, dongArrList) {
    let res = ``;
    const theChi = theHao.chi;
    const ungChi = ungHao.chi;
    const theNh = theHao.nh;
    const ungNh = ungHao.nh;
    const chiThang = dt.cThang.split('-')[1];
    const nhThang = dt.nhThang;
    const chiNgay = dt.cNgay.split('-')[1];
    
    // Tìm các hào theo Lục Thân (nếu có nhiều hào, lấy hào đầu tiên hoặc hào động)
    const timHao = (lt) => dt.haoData.find(h => h.lt === lt && h.dong) || dt.haoData.find(h => h.lt === lt);

    switch (cd) {
        case 'cau_tai': // CHỦ ĐỀ CẦU TÀI - KINH DOANH - ĐẦU TƯ
            res += `<div style="font-weight:700;color:var(--blue);margin-bottom:4px;font-size:12px">💰 LUẬN GIẢI CẦU TÀI / KINH DOANH</div>`;
            res += `<p style="font-size:10px;color:#888;margin-bottom:6px"><i>Tài = Lợi nhuận; Tử Tôn = Khách hàng; Huynh Đệ = Cạnh tranh/Hao tài; Phụ Mẫu = Mặt bằng/Hợp đồng; Quan Quỷ = Quản lý/Thị phi.</i></p>`;

            let tai = timHao('Thê Tài'), tu = timHao('Tử Tôn'), huynh = timHao('Huynh Đệ'), phu = timHao('Phụ Mẫu'), quan = timHao('Quan Quỷ');

            res += `<div style="font-weight:600;font-size:11px;color:var(--purple);margin-top:4px">I. TRẠNG THÁI CẦU TÀI CƠ BẢN:</div><ul style="padding-left:16px;margin-top:2px">`;
            
            // Đánh giá cơ bản
            if(tai && tai.i === theHao.i) res += `<li><b>🟢 Tài trì Thế:</b> Cầu tài cực kỳ dễ dàng, tiền bạc tự tìm đến.</li>`;
            else if (quan && quan.i === theHao.i && tai && tai.dong && NH_SINH[tai.nh] === theNh) res += `<li><b>🟢 Quan trì Thế, Tài động sinh Thế:</b> Cầu tài dễ dàng (có thể dựa vào chức vụ, quản lý để ra tiền).</li>`;
            else if (phu && phu.i === theHao.i && tai && tai.dong && NH_KHAC[tai.nh] === theNh) res += `<li><b>🟢 Phụ trì Thế, Tài động khắc Thế:</b> Cầu tài tuy vất vả cực nhọc nhưng vẫn đắc tài.</li>`;
            else if (theHao.lt === 'Huynh Đệ') res += `<li><b>🔴 Huynh Đệ trì Thế:</b> Tượng khắc Tài, khó khăn, phá tài, hao tổn.</li>`;
            
            if(huynh && huynh.dong) res += `<li><b>🔴 Huynh Đệ phát động:</b> Cạnh tranh khốc liệt, có kẻ cướp đoạt lợi nhuận, tốn kém chi phí.</li>`;
            if(theHao.tk === 'K' || XUNG_MAP[theHao.chi] === chiThang) res += `<li><b>🔴 Thế Tuần Không/Nguyệt Phá:</b> Bản thân gặp trắc trở, lực bất tòng tâm, cầu tài vô vọng.</li>`;

            res += `</ul><div style="font-weight:600;font-size:11px;color:var(--purple);margin-top:4px">II. HÌNH THỨC KINH DOANH:</div><ul style="padding-left:16px;margin-top:2px">`;
            
            // Hợp tác
            res += `<li><b>🤝 Hợp tác kinh doanh:</b> (Thế = Mình, Ứng = Đối tác). `;
            if(HOP_MAP[theChi] === ungChi && tai && tai.isVuong) res += `<span class="color-ok">Tốt nhất! Hai bên hợp ý, Tài vượng thì làm ăn bền vững và sinh lời lớn.</span>`;
            if(huynh && huynh.dong) res += `<span class="color-bad"> Huynh đệ động làm tổn Tài, hợp tác dễ sinh xích mích, không thể duy trì dài lâu.</span>`;
            res += `</li>`;

            // Mở cửa hàng
            res += `<li><b>🏪 Mở cửa hàng:</b> (Tài = Lợi nhuận, Tử Tôn = Khách hàng). `;
            if (huynh && huynh.dong) res += `<span class="color-bad">Huynh động thì chi phí cao, cướp tài, cạnh tranh trong cùng ngành khốc liệt.</span>`;
            else if (tu && tu.isVuong) res += `<span class="color-ok">Tử Tôn vượng là nguồn khách hàng đông đảo, rất tốt.</span>`;
            res += `</li>`;

            // Môi giới
            if (quan && quan.dong && quan.ltt === 'Huyền Vũ' && NH_KHAC[quan.nh] === theNh) {
                res += `<li><b>⚠️ Kinh doanh tạm thời/Môi giới:</b> Quan Quỷ phát động lâm Huyền Vũ khắc Thế → Cần cực kỳ đề phòng bị người môi giới lừa đảo, mất tiền oang!</li>`;
            }

            // Đòi nợ / Cờ bạc
            if (theHao.lt === 'Huynh Đệ' && ungHao.lt === 'Huynh Đệ') res += `<li><b>💸 Vay mượn/Đòi nợ:</b> Thế Ứng đều là Huynh Đệ (đồng nhân) → Khoản nợ này khó đòi lại.</li>`;
            if (ungHao.tk === 'K') res += `<li><b>💸 Đòi nợ:</b> Ứng lâm Không Vong → Đối phương lẩn tránh không chịu trả, đòi nợ thất vọng.</li>`;
            
            let theBiHinhKhac = (HINH_MAP[theChi] === chiNgay || HINH_MAP[chiNgay] === theChi || NH_KHAC[nhThang] === theNh);
            dt.haoData.filter(h=>h.dong).forEach(h=>{ if(NH_KHAC[h.nh] === theNh) theBiHinhKhac = true; });
            if (theBiHinhKhac) res += `<li><b>🎲 Cờ bạc/Đầu cơ rủi ro:</b> Thế gặp Hình hoặc Khắc từ Nhật/Nguyệt/Hào Động → Đánh bạc, đầu cơ chắc chắn sẽ thua.</li>`;

            res += `</ul><div style="font-weight:600;font-size:11px;color:var(--purple);margin-top:4px">III. 16 BÍ QUYẾT LỤC HÀO CẦU TÀI:</div><ul style="padding-left:16px;margin-top:2px;list-style:square">`;
            
            // 1. Tài vượng phúc hưng / Tài Không phúc tuyệt
            if (tai && tai.isVuong && tu && tu.isVuong) res += `<li><b>🌟 1. Tài vượng Phúc hưng:</b> Dù làm công hay tư đều như ý, tiền của cuồn cuộn.</li>`;
            if (tai && tai.tk === 'K' && tu && tu.tsNgay === 'Tuyệt') res += `<li><b>🔴 1. Tài Không Phúc Tuyệt:</b> Kinh doanh đi ngược lại mong muốn, lỗ vốn thảm hại.</li>`;
            
            // 2. Có tài không có phúc, Quan phát động
            let isTaiPhucPhuc = (!tu || dt.phucThanData[tu?.i] !== undefined);
            if (tai && isTaiPhucPhuc && quan && quan.dong) res += `<li><b>🟡 2. Có Tài không Phúc, Quan phát động:</b> Vẫn có thể cầu (vì Quan động sẽ khắc chế Kỵ thần Huynh đệ, bảo vệ được Tài).</li>`;
            
            // 3. Có phúc không tài, Huynh đệ hưng
            let isTaiPhucTai = (!tai || dt.phucThanData[tai?.i] !== undefined);
            if (tu && isTaiPhucTai && huynh && huynh.dong) res += `<li><b>🟡 3. Có Phúc không Tài, Huynh động:</b> Cầu tài có hy vọng (tuy chậm chạp) vì Huynh động sinh Tử Tôn, không khắc được Tài đang tàng phục.</li>`;
            
            // 4. Tài phúc đều không có
            if (isTaiPhucTai && isTaiPhucPhuc) res += `<li><b>🔴 4. Tài Phúc đều không xuất hiện:</b> Cầu tài vô ích, chẳng khác gì "ôm cây đợi thỏ".</li>`;
            
            // 5. Hào Phụ Huynh cùng động
            if (phu && phu.dong && huynh && huynh.dong) res += `<li><b>🔴 5. Phụ và Huynh cùng động:</b> Chẳng khác gì "leo cây tìm cá", tuyệt đối không thể cầu tài (Phụ khắc Tử, Huynh khắc Tài).</li>`;
            
            // 6. Nhật thương Thê vị
            if(tai && NH_KHAC[chiNgay] === tai.nh && tai.isVuong) {
                res += `<li><b>⏳ 6. Nhật thương Thê vị:</b> Ngày khắc hào Tài, tuy Tài vượng ở tháng nhưng không thể có ngay trong ngày, phải chờ ngày khác.</li>`;
            }

            // 7. Tài nhiều cần mộ khố
            let countTai = dt.haoData.filter(h=>h.lt==='Thê Tài').length;
            if(countTai >= 2 && tai && tai.isVuong) {
                res += `<li><b>💰 7. Tài nhiều cần Mộ:</b> Trong quẻ hào Thê Tài nhiều lại vượng, cần chờ gặp Mộ khố ở ngày/tháng mới có thể thu gom đắc tài.</li>`;
            }

            // 8. Không Quỷ tranh giành
            if(!quan) res += `<li><b>⚠️ 8. Không Quỷ tranh giành:</b> Quẻ không có Quan Quỷ, Kỵ thần (Huynh đệ) lộng hành không bị chế ngự. Kỵ gặp Huynh đệ nhiều sẽ gây trở ngại.</li>`;
            if(quan && quan.dong) res += `<li><b>⚠️ 8. Quan Quỷ phát động:</b> Gây trở ngại và tổn hao (Hợp tĩnh kỵ động).</li>`;

            // 9. Phúc biến Tài sinh
            if(tu && tu.dong && dt.bqData && dt.bqData[tu.i].lt === 'Thê Tài' && (NH_SINH[tai.nh] === theNh || HOP_MAP[tai.chi] === theChi)) {
                res += `<li><b>🌟 9. Phúc biến Tài sinh:</b> Lợi nhuận lâu dài, tiền tài liên tục đổ về không bao giờ cạn.</li>`;
            }

            // 10. Tài sinh/khắc Ta
            if(tai && (NH_SINH[tai.nh] === theNh || HOP_MAP[tai.chi] === theChi || tai.i === theHao.i)) {
                res += `<li><b>🟢 10. Tài tới với Ta:</b> Tài sinh/hợp/trì Thế → Tiền tài tự tìm đến, chuyện cầu tài dễ dàng.</li>`;
            } else if (tai && NH_KHAC[theNh] === tai.nh) {
                res += `<li><b>🟡 10. Ta đi tìm Tài:</b> Thế khắc Tài → Tất là chuyện khó, phải chủ động bôn ba vất vả mới kiếm được.</li>`;
            }

            // 11. Phụ hóa Tử Tài
            if(phu && phu.dong && dt.bqData && (dt.bqData[phu.i].lt === 'Tử Tôn' || dt.bqData[phu.i].lt === 'Thê Tài')) {
                res += `<li><b>🟡 11. Phụ hóa Tử/Tài:</b> Hào Phụ động hóa ra Tử Tôn hoặc Thê Tài → Tất phải vất vả cực nhọc mới có được tiền.</li>`;
            }

            // 12. Thế Ứng Không hợp
            if(theHao.tk === 'K' && ungHao.tk === 'K' && (HOP_MAP[theChi] === ungChi || dt.bqData?.[theHao.i]?.tk === 'K')) {
                res += `<li><b>🔴 12. Thế Ứng Không Hợp:</b> Là hoang đường, giả dối, không có căn cứ thực tế. Cẩn thận bị lừa dối.</li>`;
            }

            // 13. Nhật hợp động Tài
            if(tai && tai.dong && HOP_MAP[chiNgay] === tai.chi) {
                res += `<li><b>🔒 13. Nhật hợp động Tài:</b> Hào Tài động bị Ngày hợp → Tiền này đang bị người khác nắm giữ không buông, phải chờ đợi.</li>`;
            }

            // 14. Thế Ứng đồng nhân (Nợ khó đòi)
            if (theHao.lt === 'Huynh Đệ' && ungHao.lt === 'Huynh Đệ') {
                res += `<li><b>💸 14. Thế Ứng đồng nhân (Hỏi nợ):</b> Nếu hỏi nợ/cho vay, khoản tiền này chắc chắn khó đòi, không thể lấy lại.</li>`;
            }

            // 15. Ứng gặp Không Vong (Hỏi nợ)
            if (ungHao.tk === 'K') {
                res += `<li><b>💸 15. Ứng gặp Không Vong (Hỏi nợ):</b> Đối phương lẩn tránh, không chịu trả tiền. Đòi nợ thất vọng.</li>`;
            }

            // 16. Thế gặp hình khắc (Cờ bạc)
            if (theBiHinhKhac) {
                res += `<li><b>🎲 16. Thế gặp hình khắc (Cờ bạc):</b> Hỏi việc cờ bạc, đầu cơ rủi ro → Đánh bạc chắc chắn sẽ thua đứt!</li>`;
            }

            res += `</ul>`;
            break;

        case 'ban_hang': // CHỦ ĐỀ BÁN HÀNG / THANH LÝ
            res += `<div style="font-weight:700;color:var(--blue);margin-bottom:4px;font-size:12px">📦 LUẬN GIẢI BÁN HÀNG / THANH LÝ</div>`;
            res += `<p style="font-size:10px;color:#888;margin-bottom:4px"><i>Lưu ý: Bán hàng giải phóng tồn kho khác với Kinh doanh lâu dài. Cần Tử Tôn (Hàng hóa) Suy/Không để dễ đi. Thê Tài = Lợi nhuận/Giá cả.</i></p>`;
            let tuTonBH = timHao('Tử Tôn'), theTaiBH = timHao('Thê Tài');
            res += `<div style="font-weight:600;font-size:11px;color:var(--purple);margin-top:4px">I. HÀNG HÓA (Tử Tôn):</div><ul style="padding-left:16px;margin-top:2px">`;
            if (tuTonBH) { 
                if (tuTonBH.i === theHao.i) res += `<li>Tử Tôn tại Thế → Hàng đang nằm cứng trong tay mình. ${tuTonBH.isVuong ? '<b>Vượng = Ứ ĐỌNG KHÓ BÁN</b>' : '<b>Suy = DỄ BÁN</b>'}</li>`; 
                else if (tuTonBH.i === ungHao.i) res += `<li>Tử Tôn tại Ứng → Hàng đã tới tay đối phương.</li>`; 
                else res += `<li>Trạng thái hàng: ${tuTonBH.isVuong ? 'Vượng (Ế ẩm, khó bán ra)' : 'Suy (Hàng dễ đi, thanh lý nhanh)'}</li>`; 
            } else res += `<li>Không có Tử Tôn → Mặt hàng không rõ ràng hoặc không có hàng thật.</li>`;
            res += `</ul>`;
            res += `<div style="font-weight:600;font-size:11px;color:var(--purple);margin-top:4px">II. LỢI NHUẬN/GIÁ CẢ (Thê Tài):</div><ul style="padding-left:16px;margin-top:2px">`;
            if (theTaiBH) { 
                if (theTaiBH.isVuong && (NH_SINH[theTaiBH.nh] === theNh || theTaiBH.i === theHao.i)) res += `<li><b>🟢 Vượng sinh Thế / trì Thế:</b> <b>Cát!</b> Bán được giá cao, có lời.</li>`; 
                else if (theTaiBH.tk === 'K' && theTaiBH.i === theHao.i) res += `<li><b>🔴 Tài Không Phá tại Thế:</b> <b>NGUY HIỂM!</b> Bán hàng bị bùng tiền, tuyệt đối thu tiền mặt không cho nợ!</li>`; 
                else res += `<li>Hưu tù → Bán giá thấp, sát giá vốn, lợi nhuận mỏng.</li>`; 
            } else res += `<li>Không có Thê Tài → Bán hòa vốn hoặc chưa chốt được giá.</li>`;
            res += `</ul>`;
            let phuMauBH = timHao('Phụ Mẫu');
            if (phuMauBH) { 
                res += `<div style="font-weight:600;font-size:11px;color:var(--purple);margin-top:4px">III. BÁN NHÀ / ĐẤT ĐAI:</div><ul style="padding-left:16px;margin-top:2px">`; 
                res += `<li>Phụ Mẫu = Nhà đất. Phụ mẫu bị Không/Phá/Hưu Tù hoặc bị khắc → 🟢 <b>Dễ bán ra.</b></li>`; 
                if (theTaiBH && theTaiBH.isVuong && (theTaiBH.i === theHao.i || NH_SINH[theTaiBH.nh] === theNh)) res += `<li>Tài vượng sinh Thế → 🟢 <b>Bán được giá trị cao.</b></li>`; 
                res += `</ul>`; 
            }
            break;

        case 'tim_nguoi':
            res += `<div style="font-weight:700;color:var(--blue);margin-bottom:4px;font-size:12px">🧭 LUẬN GIẢI TÌM NGƯỜI / ĐI XA</div>`;
            res += `<p style="font-size:10px;color:#888;margin-bottom:4px"><i>Hỏi ngày về: Dụng không vượng cũng được. Hỏi cát hung: Dụng suy = không tốt.</i></p>`;
            res += `<div style="font-weight:600;font-size:11px;color:var(--purple);margin-top:4px">I. TRẠNG THÁI NGƯỜI ĐI:</div><ul style="padding-left:16px;margin-top:2px">`;
            if (!dtHao.dong) { if (dtHao.i === ungHao.i) res += `<li>Tĩnh lâm Ứng → Còn ở tha hương, <b>chưa có dự định về.</b></li>`; if (NH_SINH[dtHao.nh] === theNh) res += `<li>Sinh Thế (tĩnh) → <b>Về muộn.</b></li>`; if (NH_KHAC[dtHao.nh] === theNh) res += `<li>Khắc Thế (tĩnh) → <b>Sắp về.</b></li>`; if (XUNG_MAP[chiNgay] === dtHao.chi) res += `<li>Nhật xung Dụng tĩnh → Có người <b>thúc giục</b> quay về.</li>`; }
            else { let bHaoChi = dt.bqData[dtHao.i].chi, bHaoLt = dt.bqData[dtHao.i].lt; let tienThoai = getTienThoai(dtHao.chi, bHaoChi); if (tienThoai === 'Thoái thần') res += `<li><b>🟢 Động hóa Thoái:</b> Chắc chắn <b>sẽ về!</b></li>`; else if (tienThoai === 'Tiến thần') res += `<li><b>🟡 Động hóa Tiến:</b> Hướng đi <b>bất định.</b></li>`; if (NH_KHAC[dtHao.nh] === theNh) res += `<li><b>🟢 Động khắc Thế:</b> Về <b>rất nhanh.</b></li>`; if (HOP_MAP[dtHao.chi] === ungChi || HOP_MAP[dtHao.chi] === chiNgay || HOP_MAP[dtHao.chi] === bHaoChi) res += `<li><b>🔗 Bị Hợp giữ lại:</b> Chưa về ngay, cần xung khai.</li>`; if (dtHao.i === 2 || dtHao.i === 3) res += `<li><b>🟢 Hào môn hộ động:</b> Đã tới cửa, <b>mau về.</b></li>`; if (dtHao.i === 4 && (NH_SINH[dtHao.nh] === theNh || NH_KHAC[dtHao.nh] === theNh)) res += `<li><b>🟢 Hào 5 động sinh/khắc Thế:</b> Đã <b>trên đường về.</b></li>`; if (bHaoLt === 'Quan Quỷ' && dtHao.lt !== 'Phụ Mẫu') res += `<li><b>🔴 Động hóa Quan Quỷ:</b> Không bệnh thì <b>tai họa!</b></li>`; if (dtHao.chi === chiNgay || bHaoChi === chiNgay) res += `<li><b>🟢 Dụng/Nhật hóa nhau:</b> <b>Ngày đó về.</b></li>`; }
            if (dtHao.tk === 'K' && dtHao.ltt === 'Đằng Xà') res += `<li><b>🟡 Không + Đằng Xà:</b> Tâm trạng <b>bất an.</b></li>`;
            if (dtHao.tsNgay === 'Mộ' || HOP_MAP[dtHao.chi] === chiNgay) res += `<li><b>🟢 Nhập Mộ/Hợp Nhật:</b> Có thể ngày đó về.</li>`;
            let phuMauTN = timHao('Phụ Mẫu');
            if (phuMauTN && phuMauTN.dong) res += `<li><b>📩 Phụ Mẫu động:</b> Có <b>tin tức, thư, điện thoại.</b>${phuMauTN.ltt === 'Chu Tước' ? ' (Chu Tước: tin quan trọng).' : ''}</li>`;
            if (phuMauTN && !phuMauTN.isVuong && phuMauTN.tk === 'K') res += `<li><b>🔴 Phụ Mẫu hưu tù Không Phá:</b> <b>Không có tin tức nào.</b></li>`;
            res += `</ul>`;
            if (dtHao.isPhuc) { res += `<div style="font-weight:600;font-size:11px;color:var(--purple);margin-top:4px">II. PHỤC TÀNG:</div><ul style="padding-left:16px;margin-top:2px">`; let phi = dtHao.phiHao; if (phi.lt === 'Quan Quỷ' && phi.ltt === 'Bạch Hổ') res += `<li>🔴 Quan + Bạch Hổ: Bên ngoài <b>không thuận, bệnh, tai họa.</b></li>`; if (phi.lt === 'Huynh Đệ' && phi.ltt === 'Huyền Vũ') res += `<li>🔴 Huynh + Huyền Vũ: <b>Mất đồ, tham nữ sắc, cờ bạc.</b></li>`; if (phi.lt === 'Tử Tôn') res += `<li>🟡 Dưới Tử Tôn: <b>Vui quên trời đất</b>, bị vãn bối giữ.</li>`; if (phi.lt === 'Phụ Mẫu') res += `<li>🟡 Dưới Phụ Mẫu: Ở quán trọ, <b>vướng giấy tờ.</b></li>`; if (phi.lt === 'Thê Tài') res += `<li>🟡 Dưới Thê Tài: Vì <b>tiền hoặc phụ nữ.</b></li>`; res += `</ul>`; }
            res += `<div style="font-weight:600;font-size:11px;color:var(--purple);margin-top:4px">III. VỊ TRÍ:</div><ul style="padding-left:16px;margin-top:2px">`;
            res += `<li>${dtHao.i < 3 || dtHao.i === theHao.i ? '📍 <b>Gần</b> (quẻ Nội/Thế)' : '📍 <b>Xa</b> (quẻ Ngoại/Hào 6)'}</li>`;
            let diaChiPV = dtHao.dong ? dt.bqData[dtHao.i].chi : dtHao.chi;
            let phuongVi = { 'Tý': 'Bắc', 'Sửu': 'ĐB', 'Dần': 'ĐB', 'Mão': 'Đông', 'Thìn': 'ĐN', 'Tỵ': 'ĐN', 'Ngọ': 'Nam', 'Mùi': 'TN', 'Thân': 'TN', 'Dậu': 'Tây', 'Tuất': 'TB', 'Hợi': 'TB' };
            res += `<li>🧭 Hướng: <b>${phuongVi[diaChiPV] || 'Chưa xác định'}</b></li>`;
            res += `</ul>`;
            break;
            
        case 'tim_vat':
            res += `<div style="font-weight:700;color:var(--blue);margin-bottom:4px;font-size:12px">🔍 LUẬN GIẢI TÌM VẬT THẤT LẠC</div>`;
            let tuTonV = timHao('Tử Tôn'), quanQuyV = timHao('Quan Quỷ'), theTaiV = timHao('Thê Tài');
            res += `<div style="font-weight:600;font-size:11px;color:var(--purple);margin-top:4px">I. NGUYÊN NHÂN:</div><ul style="padding-left:16px;margin-top:2px">`;
            if (tuTonV && tuTonV.i === theHao.i) res += `<li><b>🟡 Sơ ý để quên</b> (Tử Tôn trì Thế).</li>`;
            if (theHao.ltt === 'Đằng Xà') res += `<li><b>🟡 Quên chỗ cất</b> (Thế Đằng Xà).</li>`;
            if (dtHao.isPhuc && XUNG_MAP[chiNgay] === dtHao.phiHao.chi) res += `<li><b>🟢 Không bị trộm</b>, người chuyển chỗ để.</li>`;
            if (quanQuyV && quanQuyV.tk === 'K') res += `<li><b>🟡 Đưa đồ cho người</b> hoặc quên ở nhà người khác.</li>`;
            if (theTaiV && theTaiV.dong && dt.bqData && dt.bqData[theTaiV.i]?.lt === 'Quan Quỷ') res += `<li><b>🔴 ĐÃ BỊ TRỘM!</b> (Tài động hóa Quỷ).</li>`;
            if (quanQuyV && quanQuyV.dong && dt.bqData && dt.bqData[quanQuyV.i]?.lt === 'Thê Tài') res += `<li><b>🟢 Đồ còn loanh quanh</b>, dễ tìm (Quỷ hóa Tài).</li>`;
            if (quanQuyV && (quanQuyV.i === theHao.i || quanQuyV.chi === chiThang)) res += `<li><b>🔴 Người quen, người nhà</b> lấy (Quỷ trì Thế/lâm Nguyệt).</li>`;
            if (quanQuyV && quanQuyV.i === 1 && quanQuyV.dong) res += `<li><b>🔴 Trộm vào nhà.</b>${quanQuyV.ltt === 'Huyền Vũ' ? ' (Chuyên nghiệp).' : ''}</li>`;
            let dsQQ = dt.haoData.filter(h => h.lt === 'Quan Quỷ');
            if (dsQQ.length > 1) res += `<li><b>🔴 Nhiều người</b> lấy (Quỷ lưỡng hiện).</li>`;
            res += `</ul>`;
            res += `<div style="font-weight:600;font-size:11px;color:var(--purple);margin-top:4px">II. KHẢ NĂNG TÌM THẤY:</div><ul style="padding-left:16px;margin-top:2px">`;
            if (dtHao.isVuong && (NH_SINH[dtHao.nh] === theNh || NH_KHAC[dtHao.nh] === theNh)) res += `<li><b>🟢 SẼ TÌM THẤY!</b> (Dụng Vượng sinh/khắc Thế).</li>`;
            if (NH_KHAC[theNh] === dtHao.nh) res += `<li><b>🔴 Khó tìm</b> (Thế khắc Dụng).</li>`;
            if (!dtHao.dong) res += `<li><b>🟢 Dụng tĩnh</b> → Dễ tìm hơn.</li>`;
            else res += `<li><b>🟡 Dụng động</b> → Khó tìm, đồ đã di chuyển.</li>`;
            res += `</ul>`;
            res += `<div style="font-weight:600;font-size:11px;color:var(--purple);margin-top:4px">III. VỊ TRÍ:</div><ul style="padding-left:16px;margin-top:2px">`;
            res += `<li>${dtHao.i > 2 ? 'Quẻ Ngoại → <b>Ngoài nhà/xa</b>' : 'Quẻ Nội → <b>Trong nhà/gần</b>'}</li>`;
            if (dtHao.isPhuc || dtHao.tsNgay === 'Mộ' || dtHao.tsThang === 'Mộ') res += `<li>Phục/Mộ → Nơi <b>kín đáo, tầng hầm, gầm tủ</b>.</li>`;
            let nhMapV = { 'Mộc': 'Cạnh đồ gỗ, sách vở', 'Hỏa': 'Gần bếp, thiết bị điện', 'Thổ': 'Đống đất, đồ gốm sứ', 'Kim': 'Cạnh đồ kim loại', 'Thủy': 'Mép nước, nhà tắm' };
            res += `<li>Ngũ hành <b>${dtHao.nh}</b> → ${nhMapV[dtHao.nh] || 'Tương ứng'}.</li>`;
            if (dtHao.isPhuc && dtHao.phiHao.lt === 'Phụ Mẫu') res += `<li>Dưới Phụ Mẫu → <b>Quần áo, xe, nhà.</b></li>`;
            res += `</ul>`;
            if (quanQuyV) { res += `<div style="font-weight:600;font-size:11px;color:var(--purple);margin-top:4px">IV. KẺ TRỘM:</div><ul style="padding-left:16px;margin-top:2px">`; let gt = ['Tý', 'Dần', 'Thìn', 'Ngọ', 'Thân', 'Tuất'].includes(quanQuyV.chi) ? 'Nam' : 'Nữ'; res += `<li><b>Giới tính:</b> ${gt}.</li>`; res += moTaKeTrom(quanQuyV); if (tuTonV && (tuTonV.i === theHao.i || tuTonV.dong)) res += `<li><b>🟢 Dễ bắt</b> (Tử Tôn = công an).</li>`; if (!quanQuyV.dong) res += `<li><b>🟢 Quỷ tĩnh</b> → Dễ bắt hơn.</li>`; if (quanQuyV.isVuong) res += `<li><b>🔴 Quỷ Vượng</b> → Khó bắt.</li>`; res += `</ul>`; }
            break;
            
        case 'thai_nghen':
            res += `<div style="font-weight:700;color:var(--blue);margin-bottom:4px;font-size:12px">🤰 LUẬN GIẢI THAI NGHÉN / SINH ĐẺ</div><ul style="padding-left:16px;margin-top:2px">`;
            let tuTonThai = timHao('Tử Tôn');
            if (!tuTonThai) res += `<li><b>🔴 KHÔNG CÓ THAI.</b> Quẻ không có Tử Tôn.</li>`;
            else res += `<li>Hào Thai: <b>${tuTonThai.isVuong ? '🟢 Vượng (tốt)' : '⚠️ Suy (cần chú ý)'}</b>.</li>`;
            let phuMauThai = timHao('Phụ Mẫu');
            if (phuMauThai && phuMauThai.i === theHao.i) res += `<li><b>🔴 PHỤ MẪU TRÌ THẾ:</b> Khắc con, khó có con hoặc thai kỳ vất vả!</li>`;
            if (dt.qTinhChat.includes("Lục Hợp")) res += `<li><b>🔗 Lục Hợp:</b> Hỏi sinh đẻ → <b>KHÓ SINH</b>.</li>`;
            if (dt.qTinhChat.includes("Lục Xung")) res += `<li><b>⚡ Lục Xung:</b> Hỏi sinh đẻ → <b>DỄ SINH</b>.</li>`;
            if (tuTonThai && tuTonThai.dong && dt.bqData) { let bHT = dt.bqData[tuTonThai.i]; if (bHT && getTienThoai(tuTonThai.chi, bHT.chi) === 'Thoái thần') res += `<li><b>🔴 Tử động hóa Thoái:</b> Nguy cơ sảy thai!</li>`; }
            res += `</ul>`;
            break;
            
        case 'cong_danh':
            res += `<div style="font-weight:700;color:var(--blue);margin-bottom:4px;font-size:12px">🎯 LUẬN GIẢI CÔNG DANH / SỰ NGHIỆP</div>`;
            let quanCD = timHao('Quan Quỷ'), taiCD = timHao('Thê Tài'), phuMauCD = timHao('Phụ Mẫu');
            res += `<div style="font-weight:600;font-size:11px;color:var(--purple);margin-top:4px">I. NGUYỆT LỆNH (Cấp trên - 50% thành bại):</div><ul style="padding-left:16px;margin-top:2px">`;
            if (NH_SINH[nhThang] === theNh || nhThang === theNh) res += `<li><b>🟢 ĐẠI CÁT!</b> Cấp trên <b>rất coi trọng</b>, ấn tượng tốt. Công việc gần như <b>chắc chắn thành</b>.</li>`;
            else if (NH_KHAC[nhThang] === theNh || XUNG_MAP[chiThang] === theChi) res += `<li><b>🔴 RẤT XẤU!</b> Cấp trên <b>không hài lòng</b>, ấn tượng xấu. <b>Cực kỳ khó khăn!</b></li>`;
            else res += `<li>Bình hòa → Cần xét thêm yếu tố khác.</li>`;
            res += `</ul>`;
            res += `<div style="font-weight:600;font-size:11px;color:var(--purple);margin-top:4px">II. CHỨC VỊ:</div><ul style="padding-left:16px;margin-top:2px">`;
            if (phuMauCD) res += `<li><b>📜 Phụ Mẫu:</b> ${phuMauCD.isVuong ? '🟢 Có <b>thực quyền</b>.' : '⚠️ Chỉ <b>danh nghĩa</b>.'}</li>`;
            if (quanCD) { if (quanCD.i === 4 && (NH_SINH[quanCD.nh] === theNh || HOP_MAP[quanCD.chi] === theChi)) res += `<li><b>🟢 Hào 5 sinh/hợp Thế:</b> Chức <b>quan lớn, quản một phương.</b></li>`; let tuChinh = ['Tý', 'Ngọ', 'Mão', 'Dậu'], tuSinh = ['Dần', 'Thân', 'Tỵ', 'Hợi'], tuKho = ['Thìn', 'Tuất', 'Sửu', 'Mùi']; if (tuChinh.includes(quanCD.chi)) res += `<li>🟢 Tứ Chính → <b>Đứng đầu.</b></li>`; else if (tuSinh.includes(quanCD.chi)) res += `<li>🟡 Tứ Sinh → <b>Cấp phó.</b></li>`; else if (tuKho.includes(quanCD.chi)) res += `<li>🟡 Tứ Khố → <b>Nhàn tản.</b></li>`; if (quanCD.i === theHao.i || NH_SINH[quanCD.nh] === theNh) res += `<li>🟢 Quan trì Thế/Sinh Thế → <b>Việc tới tìm mình.</b></li>`; if (quanCD.i === ungHao.i && quanCD.isVuong) res += `<li><b>🔴 Quan Vượng lâm Ứng:</b> <b>Việc bị cướp mất!</b></li>`; }
            res += `</ul>`;
            res += `<div style="font-weight:600;font-size:11px;color:var(--purple);margin-top:4px">III. TÌM VIỆC:</div><ul style="padding-left:16px;margin-top:2px">`;
            if (!quanCD || !quanCD.isVuong) { if (taiCD && taiCD.isVuong) res += `<li><b>💡 TƯ VẤN:</b> Quan suy + Tài vượng → <b>Nên tự kinh doanh!</b></li>`; }
            if (taiCD && taiCD.tk === 'K') res += `<li><b>🔴 Tài Không Phá:</b> <b>Không cầm được lương!</b></li>`;
            res += `</ul>`;
            break;
    }
    return res;
}

function khuyenNghiHanhDong(cd, dt, dtHao, theHao, ungHao) {
    let kq = '';
    const theChi = theHao.chi;
    const ungChi = ungHao.chi;
    
    switch (cd) {
        case 'hon_nhan':
            if (dtHao.isVuong && NH_SINH[dtHao.nh] === theHao.nh) { kq = '✅ <b>Tình duyên thuận lợi.</b> Nên chủ động tiến tới, mọi việc sẽ thành. Nếu đang lưỡng lự thì đây là lúc quyết định.'; }
            else if (dtHao.tk === 'K' && dtHao.isVuong) { kq = '⏳ <b>Chờ xuất Không.</b> Dụng thần vượng nhưng lâm Không, chờ qua tuần này mọi việc sẽ rõ ràng và thuận lợi hơn.'; }
            else if (dtHao.tk === 'K' && !dtHao.isVuong) { kq = '⚠️ <b>Cẩn trọng!</b> Đối phương không thực lòng. Nên tìm hiểu kỹ trước khi quyết định, tránh bị lừa dối.'; }
            else if (dt.qTinhChat.includes("Lục Xung")) { kq = '⚡ <b>Kiên nhẫn.</b> Quẻ Lục Xung báo hiệu bất hòa. Nếu mới yêu, cần thời gian thử thách. Nếu đã cưới, tránh cãi vã.'; }
            break;
            
        case 'cau_tai':
            if (dtHao.lt === 'Thê Tài' && dtHao.isVuong && (dtHao.i === theHao.i || NH_SINH[dtHao.nh] === theHao.nh || HOP_MAP[dtHao.chi] === theHao.chi)) {
                kq = '✅ <b>Đại cát để đầu tư/kinh doanh.</b> Lợi nhuận tự tìm đến bạn. Hãy chớp lấy cơ hội hợp tác hoặc xuất tiền thu lời lớn.';
            } else if (dtHao.lt === 'Thê Tài' && (dtHao.tk === 'K' || dt.cThang.split('-')[1] === XUNG_MAP[dtHao.chi])) {
                kq = '⚠️ <b>Rủi ro cao!</b> Tiền tài lâm Không Phá. Tuyệt đối không đầu tư, không cho vay mượn, bán chịu vì khoản nợ sẽ bặt vô âm tín, khó đòi.';
            } else if (dt.haoData.find(h => h.lt === 'Huynh Đệ' && h.dong)) {
                kq = '🔴 <b>Hao tài tốn của!</b> Cẩn trọng! Đối thủ đang cạnh tranh gay gắt hoặc có nguy cơ mất tiền. Hạn chế chi tiêu và đầu tư rủi ro lúc này.';
            } else {
                kq = '💡 <b>Kinh doanh ở mức trung bình.</b> Muốn tăng doanh thu, hãy tập trung vào tiếp thị và chăm sóc nguồn Khách hàng (Hào Tử Tôn).';
            }
            break;
            
        case 'ban_hang':
            if (dtHao.isVuong && dtHao.lt === 'Tử Tôn') { kq = '📦 <b>Hàng còn ứ đọng.</b> Hàng vượng thì khó bán. Cần đẩy mạnh marketing, giảm giá xả hàng, hoặc tìm kênh phân phối mới.'; }
            else if (!dtHao.isVuong || dtHao.tk === 'K') { kq = '💰 <b>Thời điểm tốt để thanh lý!</b> Hàng hóa (Tử Tôn) đang Suy/Không nên rất dễ trôi. Hãy chốt deal nhanh, tránh do dự.'; }
            break;
            
        case 'cong_danh':
            if (NH_SINH[dt.nhThang] === theHao.nh || dt.nhThang === theHao.nh) { kq = '✅ <b>Hành động ngay!</b> Nguyệt lệnh sinh Thế - cấp trên đang rất coi trọng bạn. Nộp đơn, gặp gỡ, phỏng vấn ngay trong tháng này.'; }
            else if (NH_KHAC[dt.nhThang] === theHao.nh) { kq = '⚠️ <b>Chờ thời.</b> Cấp trên chưa hài lòng. Nên cải thiện mối quan hệ hoặc chờ tháng sau. Nếu vẫn muốn thử, chuẩn bị kỹ gấp đôi.'; }
            break;
            
        case 'tim_vat':
            if (dtHao.isVuong && NH_SINH[dtHao.nh] === theHao.nh) { kq = '🔍 <b>Sẽ tìm thấy.</b> Dụng thần vượng sinh Thế - đồ vật sẽ quay về. Tìm kỹ ở những nơi quen thuộc, trong nhà hoặc gần nơi làm việc.'; }
            else if (dtHao.tsNgay === 'Mộ' || dtHao.tsThang === 'Mộ') { kq = '🔍 <b>Tìm nơi kín đáo.</b> Đồ bị che giấu, có thể trong hộp, túi, gầm tủ, hoặc nơi tối. Nếu 3 ngày chưa thấy thì khả năng mất hẳn.'; }
            break;
            
        case 'tim_nguoi':
            if (dtHao.dong && getTienThoai(dtHao.chi, dt.bqData ? dt.bqData[dtHao.i].chi : '') === 'Thoái thần') { kq = '✅ <b>Người sẽ về.</b> Động hóa Thoái - chắc chắn sẽ trở về. Hãy kiên nhẫn chờ đợi.'; }
            else if (!dtHao.dong) { kq = '⏳ <b>Chưa có dấu hiệu về.</b> Cần chủ động liên lạc hoặc nhờ người thúc giục.'; }
            break;
            
        case 'thai_nghen':
            if (dtHao && dtHao.isVuong) { kq = '✅ <b>Thai kỳ an toàn.</b> Tử Tôn vượng tướng, thai nhi khỏe mạnh. Duy trì chế độ dinh dưỡng và nghỉ ngơi tốt.'; }
            else { kq = '⚠️ <b>Cần thận trọng.</b> Nên đi khám bác sĩ để kiểm tra sức khỏe thai nhi và có biện pháp bảo vệ kịp thời.'; }
            break;
    }
    if (kq) { return `<div style="margin-top:10px;padding:8px;background:#e8f5e9;border:1px solid #c8e6c9;border-radius:4px;font-weight:600;color:#2e7d32;">💡 <b>KHUYẾN NGHỊ:</b> ${kq}</div>`; }
    return '';
}
