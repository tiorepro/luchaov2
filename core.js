"use strict";

window.gioiTinhXem = 'nam';

function updateViewportVars() {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
}
updateViewportVars();

const GAN_VN = { '甲': 'Giáp', '乙': 'Ất', '丙': 'Bính', '丁': 'Đinh', '戊': 'Mậu', '己': 'Kỷ', '庚': 'Canh', '辛': 'Tân', '壬': 'Nhâm', '癸': 'Quý' };
const ZHI_VN = { '子': 'Tý', '丑': 'Sửu', '寅': 'Dần', '卯': 'Mão', '辰': 'Thìn', '巳': 'Tỵ', '午': 'Ngọ', '未': 'Mùi', '申': 'Thân', '酉': 'Dậu', '戌': 'Tuất', '亥': 'Hợi' };
const JQ_VN = { '立春': 'Lập xuân', '雨水': 'Vũ thủy', '惊蛰': 'Kinh trập', '春分': 'Xuân phân', '清明': 'Thanh minh', '谷雨': 'Cốc vũ', '立夏': 'Lập hạ', '小满': 'Tiểu mãn', '芒种': 'Mang chủng', '夏至': 'Hạ chí', '小暑': 'Tiểu thử', '大暑': 'Đại thử', '立秋': 'Lập thu', '处暑': 'Xử thử', '白露': 'Bạch lộ', '秋分': 'Thu phân', '寒露': 'Hàn lộ', '霜降': 'Sương giáng', '立冬': 'Lập đông', '小雪': 'Tiểu tuyết', '大雪': 'Đại tuyết', '冬至': 'Đông chí', '小寒': 'Tiểu hàn', '大寒': 'Đại hàn' };

const TC = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
const DC = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
const DC_NH = { Tý: 'Thủy', Sửu: 'Thổ', Dần: 'Mộc', Mão: 'Mộc', Thìn: 'Thổ', Tỵ: 'Hỏa', Ngọ: 'Hỏa', Mùi: 'Thổ', Thân: 'Kim', Dậu: 'Kim', Tuất: 'Thổ', Hợi: 'Thủy' };
const NH_SINH = { Mộc: 'Hỏa', Hỏa: 'Thổ', Thổ: 'Kim', Kim: 'Thủy', Thủy: 'Mộc' };
const NH_KHAC = { Mộc: 'Thổ', Hỏa: 'Kim', Thổ: 'Thủy', Kim: 'Mộc', Thủy: 'Hỏa' };

const TRIGRAMS = [
    { id: 0, ten: 'Càn', nh: 'Kim' }, { id: 1, ten: 'Đoài', nh: 'Kim' }, { id: 2, ten: 'Ly', nh: 'Hỏa' },
    { id: 3, ten: 'Chấn', nh: 'Mộc' }, { id: 4, ten: 'Tốn', nh: 'Mộc' }, { id: 5, ten: 'Khảm', nh: 'Thủy' },
    { id: 6, ten: 'Cấn', nh: 'Thổ' }, { id: 7, ten: 'Khôn', nh: 'Thổ' }
];

const NAP_GIAP_DC = [
    ['Tý', 'Dần', 'Thìn', 'Ngọ', 'Thân', 'Tuất'], ['Tỵ', 'Mão', 'Sửu', 'Hợi', 'Dậu', 'Mùi'],
    ['Mão', 'Sửu', 'Hợi', 'Dậu', 'Mùi', 'Tỵ'], ['Tý', 'Dần', 'Thìn', 'Ngọ', 'Thân', 'Tuất'],
    ['Sửu', 'Hợi', 'Dậu', 'Mùi', 'Tỵ', 'Mão'], ['Dần', 'Thìn', 'Ngọ', 'Thân', 'Tuất', 'Tý'],
    ['Thìn', 'Ngọ', 'Thân', 'Tuất', 'Tý', 'Dần'], ['Mùi', 'Tỵ', 'Mão', 'Sửu', 'Hợi', 'Dậu']
];
const NAP_GIAP_TC = ['Giáp', 'Đinh', 'Kỷ', 'Canh', 'Tân', 'Mậu', 'Bính', 'Ất'];
const NAP_GIAP_TC_THUONG = ['Nhâm', 'Đinh', 'Kỷ', 'Canh', 'Tân', 'Mậu', 'Bính', 'Quý'];

const H64_DATA = {
    '00': { ten: 'Càn Vi Thiên', cung: 0, the: 5, ung: 2 }, '04': { ten: 'Thiên Phong Cấu', cung: 0, the: 0, ung: 3 }, '06': { ten: 'Thiên Sơn Độn', cung: 0, the: 1, ung: 4 }, '07': { ten: 'Thiên Địa Bĩ', cung: 0, the: 2, ung: 5 }, '47': { ten: 'Phong Địa Quan', cung: 0, the: 3, ung: 0 }, '67': { ten: 'Sơn Địa Bác', cung: 0, the: 4, ung: 1 }, '27': { ten: 'Hỏa Địa Tấn', cung: 0, the: 3, ung: 0 }, '20': { ten: 'Hỏa Thiên Đại Hữu', cung: 0, the: 2, ung: 5 },
    '11': { ten: 'Đoài Vi Trạch', cung: 1, the: 5, ung: 2 }, '15': { ten: 'Trạch Thủy Khốn', cung: 1, the: 0, ung: 3 }, '17': { ten: 'Trạch Địa Tụy', cung: 1, the: 1, ung: 4 }, '16': { ten: 'Trạch Sơn Hàm', cung: 1, the: 2, ung: 5 }, '56': { ten: 'Thủy Sơn Kiển', cung: 1, the: 3, ung: 0 }, '76': { ten: 'Địa Sơn Khiêm', cung: 1, the: 4, ung: 1 }, '36': { ten: 'Lôi Sơn Tiểu Quá', cung: 1, the: 3, ung: 0 }, '31': { ten: 'Lôi Trạch Quy Muội', cung: 1, the: 2, ung: 5 },
    '22': { ten: 'Ly Vi Hỏa', cung: 2, the: 5, ung: 2 }, '26': { ten: 'Hỏa Sơn Lữ', cung: 2, the: 0, ung: 3 }, '24': { ten: 'Hỏa Phong Đỉnh', cung: 2, the: 1, ung: 4 }, '25': { ten: 'Hỏa Thủy Vị Tế', cung: 2, the: 2, ung: 5 }, '65': { ten: 'Sơn Thủy Mông', cung: 2, the: 3, ung: 0 }, '45': { ten: 'Phong Thủy Hoán', cung: 2, the: 4, ung: 1 }, '05': { ten: 'Thiên Thủy Tụng', cung: 2, the: 3, ung: 0 }, '02': { ten: 'Thiên Hỏa Đồng Nhân', cung: 2, the: 2, ung: 5 },
    '33': { ten: 'Chấn Vi Lôi', cung: 3, the: 5, ung: 2 }, '37': { ten: 'Lôi Địa Dự', cung: 3, the: 0, ung: 3 }, '35': { ten: 'Lôi Thủy Giải', cung: 3, the: 1, ung: 4 }, '34': { ten: 'Lôi Phong Hằng', cung: 3, the: 2, ung: 5 }, '74': { ten: 'Địa Phong Thăng', cung: 3, the: 3, ung: 0 }, '54': { ten: 'Thủy Phong Tỉnh', cung: 3, the: 4, ung: 1 }, '14': { ten: 'Trạch Phong Đại Quá', cung: 3, the: 3, ung: 0 }, '13': { ten: 'Trạch Lôi Tùy', cung: 3, the: 2, ung: 5 },
    '44': { ten: 'Tốn Vi Phong', cung: 4, the: 5, ung: 2 }, '40': { ten: 'Phong Thiên Tiểu Súc', cung: 4, the: 0, ung: 3 }, '42': { ten: 'Phong Hỏa Gia Nhân', cung: 4, the: 1, ung: 4 }, '43': { ten: 'Phong Lôi Ích', cung: 4, the: 2, ung: 5 }, '03': { ten: 'Thiên Lôi Vô Vọng', cung: 4, the: 3, ung: 0 }, '23': { ten: 'Hỏa Lôi Phệ Hạp', cung: 4, the: 4, ung: 1 }, '63': { ten: 'Sơn Lôi Di', cung: 4, the: 3, ung: 0 }, '64': { ten: 'Sơn Phong Cổ', cung: 4, the: 2, ung: 5 },
    '55': { ten: 'Khảm Vi Thủy', cung: 5, the: 5, ung: 2 }, '51': { ten: 'Thủy Trạch Tiết', cung: 5, the: 0, ung: 3 }, '53': { ten: 'Thủy Lôi Truân', cung: 5, the: 1, ung: 4 }, '52': { ten: 'Thủy Hỏa Ký Tế', cung: 5, the: 2, ung: 5 }, '12': { ten: 'Trạch Hỏa Cách', cung: 5, the: 3, ung: 0 }, '32': { ten: 'Lôi Hỏa Phong', cung: 5, the: 4, ung: 1 }, '72': { ten: 'Địa Hỏa Minh Di', cung: 5, the: 3, ung: 0 }, '75': { ten: 'Địa Thủy Sư', cung: 5, the: 2, ung: 5 },
    '66': { ten: 'Cấn Vi Sơn', cung: 6, the: 5, ung: 2 }, '62': { ten: 'Sơn Hỏa Bí', cung: 6, the: 0, ung: 3 }, '60': { ten: 'Sơn Thiên Đại Súc', cung: 6, the: 1, ung: 4 }, '61': { ten: 'Sơn Trạch Tổn', cung: 6, the: 2, ung: 5 }, '21': { ten: 'Hỏa Trạch Khuê', cung: 6, the: 3, ung: 0 }, '01': { ten: 'Thiên Trạch Lý', cung: 6, the: 4, ung: 1 }, '41': { ten: 'Phong Trạch Trung Phu', cung: 6, the: 3, ung: 0 }, '46': { ten: 'Phong Sơn Tiệm', cung: 6, the: 2, ung: 5 },
    '77': { ten: 'Khôn Vi Địa', cung: 7, the: 5, ung: 2 }, '73': { ten: 'Địa Lôi Phục', cung: 7, the: 0, ung: 3 }, '71': { ten: 'Địa Trạch Lâm', cung: 7, the: 1, ung: 4 }, '70': { ten: 'Địa Thiên Thái', cung: 7, the: 2, ung: 5 }, '30': { ten: 'Lôi Thiên Đại Tráng', cung: 7, the: 3, ung: 0 }, '10': { ten: 'Trạch Thiên Quải', cung: 7, the: 4, ung: 1 }, '50': { ten: 'Thủy Thiên Nhu', cung: 7, the: 3, ung: 0 }, '57': { ten: 'Thủy Địa Tỷ', cung: 7, the: 2, ung: 5 }
};

const LOI_TRIEU = {
    '00': 'Khốn long đắc thủy', '01': 'Phượng minh kỳ sơn', '02': 'Tiên nhân chỉ lộ', '03': 'Điểu bị lung lao', '04': 'Tha hương ngộ hữu', '05': 'Nhị nhân phân kim', '06': 'Nùng vân tế nhật', '07': 'Hổ lạc hãm khanh',
    '10': 'Du phong thoát võng', '11': 'Thấn thủy biền thuyền', '12': 'Hạn miêu đắc vũ', '13': 'Nhai thụ tàng trân', '14': 'Dạ mộng kim ngân', '15': 'Toát can trừu thủy', '16': 'Nữ tử truy nam', '17': 'Lý ngư hóa long',
    '20': 'Trảm thụ mô tước', '21': 'Thái công phân trư', '22': 'Thiên quan tứ phúc', '23': 'Cắn ngọc đắc kim', '24': 'Hòa yểm liên kiều', '25': 'Thái phùng hậu tế', '26': 'Túc điểu phần lâm', '27': 'Sừ địa đắc kim',
    '30': 'Phi hùng phác trư', '31': 'Sơn trạch mộc khô', '32': 'Cổ kính trùng minh', '33': 'Kim chung dạ hoán', '34': 'Nhật nguyệt thường minh', '35': 'Ngũ quan thoát nạn', '36': 'Phi điểu di tổ', '37': 'Thanh long đắc vị',
    '40': 'Mật vân bất vũ', '41': 'Tuấn điểu xuất lung', '42': 'Quan trung ngộ hữu', '43': 'Khô mộc phùng xuân', '44': 'Cô châu đắc thủy', '45': 'Đạp ốc tiễn ba', '46': 'Tuấn điểu xuất lung', '47': 'Hạn liên phùng hà',
    '50': 'Min châu xuất thổ', '51': 'Trảm tướng phong thần', '52': 'Kim bảng đề danh', '53': 'Loạn ty vô đầu', '54': 'Khô tỉnh sinh tuyền', '55': 'Hải để lao nguyệt', '56': 'Vũ tuyết tải đồ', '57': 'Thuyền đắc thuận phong',
    '60': 'Trận thế đắc khai', '61': 'Thôi xa điệu nhĩ', '62': 'Hỉ khí doanh môn', '63': 'Vị thủy phùng Lôi', '64': 'Thôi xa điệu nhĩ', '65': 'Tiểu quỷ thâu tiền', '66': 'Ải ba xuy hoả', '67': 'Ưng tước đồng lâm',
    '70': 'Hỉ báo tam nguyên', '71': 'Thủy trung lao nguyệt', '72': 'Quá hà chiết kiều', '73': 'Phu thê phản mục', '74': 'Chỉ nhật cao thăng', '75': 'Mã đáo thành công', '76': 'Nhân tài lưỡng vượng', '77': 'Ngạ hổ đắc thực'
};

const LUC_THAN = ['Thanh Long', 'Chu Tước', 'Câu Trần', 'Đằng Xà', 'Bạch Hổ', 'Huyền Vũ'];
const LT_START = { Giáp: 0, Ất: 0, Bính: 1, Đinh: 1, Mậu: 2, Kỷ: 3, Canh: 4, Tân: 4, Nhâm: 5, Quý: 5 };
const TS_STATES = ["Sinh", "Dục", "Đới", "Quan", "Vượng", "Suy", "Bệnh", "Tử", "Mộ", "Tuyệt", "Thai", "Dưỡng"];
const TS_START = { 'Mộc': 11, 'Hỏa': 2, 'Kim': 5, 'Thủy': 8, 'Thổ': 8 };

const XUNG_MAP = { 'Tý': 'Ngọ', 'Ngọ': 'Tý', 'Sửu': 'Mùi', 'Mùi': 'Sửu', 'Dần': 'Thân', 'Thân': 'Dần', 'Mão': 'Dậu', 'Dậu': 'Mão', 'Thìn': 'Tuất', 'Tuất': 'Thìn', 'Tỵ': 'Hợi', 'Hợi': 'Tỵ' };
const HOP_MAP = { 'Tý': 'Sửu', 'Sửu': 'Tý', 'Dần': 'Hợi', 'Hợi': 'Dần', 'Mão': 'Tuất', 'Tuất': 'Mão', 'Thìn': 'Dậu', 'Dậu': 'Thìn', 'Tỵ': 'Thân', 'Thân': 'Tỵ', 'Ngọ': 'Mùi', 'Mùi': 'Ngọ' };
const HINH_MAP = { 'Dần': 'Tỵ', 'Tỵ': 'Thân', 'Thân': 'Dần', 'Sửu': 'Tuất', 'Tuất': 'Mùi', 'Mùi': 'Sửu', 'Tý': 'Mão', 'Mão': 'Tý', 'Thìn': 'Thìn', 'Ngọ': 'Ngọ', 'Dậu': 'Dậu', 'Hợi': 'Hợi' };
const HAI_MAP = { 'Tý': 'Mùi', 'Mùi': 'Tý', 'Sửu': 'Ngọ', 'Ngọ': 'Sửu', 'Dần': 'Tỵ', 'Tỵ': 'Dần', 'Mão': 'Thìn', 'Thìn': 'Mão', 'Thân': 'Hợi', 'Hợi': 'Thân', 'Dậu': 'Tuất', 'Tuất': 'Dậu' };
const TAM_HOP_CUCS = [['Thân', 'Tý', 'Thìn'], ['Hợi', 'Mão', 'Mùi'], ['Dần', 'Ngọ', 'Tuất'], ['Tỵ', 'Dậu', 'Sửu']];

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

// Utils function
function getTruongSinh(nh, chiTime) { let startIdx = TS_START[nh]; let timeIdx = DC.indexOf(chiTime); let stateIdx = (timeIdx - startIdx + 12) % 12; return TS_STATES[stateIdx] }
function getQuaiThan(cungIdx, thePos) { let isYang = [0, 5, 6, 3].includes(cungIdx); let startIdx = isYang ? 0 : 6; return DC[(startIdx + thePos) % 12] }
function getElementClass(nh) { const map = { 'Mộc': 'c-moc', 'Hỏa': 'c-hoa', 'Thổ': 'c-tho', 'Kim': 'c-kim', 'Thủy': 'c-thuy' }; return map[nh] || '' }
function tinhVuongSuyThang(nhHao, nhThang) {
    if (nhHao === nhThang) return 'Vượng';
    if (NH_SINH[nhThang] === nhHao) return 'Tướng';
    if (NH_SINH[nhHao] === nhThang) return 'Hưu';
    if (NH_KHAC[nhHao] === nhThang) return 'Tù';
    if (NH_KHAC[nhThang] === nhHao) return 'Tử';
    return '';
}
function getVSClass(vs) { return { 'Vượng': 'vs-vuong', 'Tướng': 'vs-tuong', 'Hưu': 'vs-huu', 'Tù': 'vs-tu', 'Tử': 'vs-tu2' } [vs] || '' }
function haoToTrigramIdx(l3) { const b = l3.map(v => (v === 1 || v === 3) ? 1 : 0); const bin = b[2] * 4 + b[1] * 2 + b[0]; const MAP = { 7: 0, 3: 1, 5: 2, 1: 3, 6: 4, 2: 5, 4: 6, 0: 7 }; return MAP[bin] ?? 7 }

function checkXungHop(haoData) {
    let isXung = true, isHop = true;
    const X_PAIRS = ['TýNgọ', 'NgọTý', 'SửuMùi', 'MùiSửu', 'DầnThân', 'ThânDần', 'MãoDậu', 'DậuMão', 'ThìnTuất', 'TuấtThìn', 'TỵHợi', 'HợiTỵ'];
    const H_PAIRS = ['TýSửu', 'SửuTý', 'DầnHợi', 'HợiDần', 'MãoTuất', 'TuấtMão', 'ThìnDậu', 'DậuThìn', 'TỵThân', 'ThânTỵ', 'NgọMùi', 'MùiNgọ'];
    for (let i = 0; i < 3; i++) { let p = haoData[i].chi + haoData[i + 3].chi; if (!X_PAIRS.includes(p)) isXung = false; if (!H_PAIRS.includes(p)) isHop = false }
    let res = [];
    if (isXung) res.push("Lục Xung");
    if (isHop) res.push("Lục Hợp");
    return res.join(', ')
}
function checkNgam(haoData, bqData) {
    if (!bqData) return "";
    const X_PAIRS = ['TýNgọ', 'NgọTý', 'SửuMùi', 'MùiSửu', 'DầnThân', 'ThânDần', 'MãoDậu', 'DậuMão', 'ThìnTuất', 'TuấtThìn', 'TỵHợi', 'HợiTỵ'];
    let isPhuc = true, isPhan = true;
    for (let i = 0; i < 6; i++) { if (haoData[i].chi !== bqData[i].chi) isPhuc = false; if (!X_PAIRS.includes(haoData[i].chi + bqData[i].chi)) isPhan = false }
    let res = [];
    if (isPhuc) res.push("Phục Ngâm");
    if (isPhan) res.push("Phản Ngâm");
    return res.join(', ')
}
function tinhLucThan(nhCung, nhHao) {
    if (nhHao === nhCung) return 'Huynh Đệ';
    if (NH_SINH[nhCung] === nhHao) return 'Tử Tôn';
    if (NH_KHAC[nhCung] === nhHao) return 'Thê Tài';
    if (NH_SINH[nhHao] === nhCung) return 'Phụ Mẫu';
    if (NH_KHAC[nhHao] === nhCung) return 'Quan Quỷ';
    return 'Huynh Đệ';
}
function tinhTuanKhong(canNgay, chiNgay) { const canIdx = TC.indexOf(canNgay); const chiIdx = DC.indexOf(chiNgay); let diff = chiIdx - canIdx; if (diff < 0) diff += 12; return [DC[(diff + 10) % 12], DC[(diff + 11) % 12]] }
function tinhThanSat(canNgay, chiNgay, chiHao) {
    let loc = '', ma = '', quy = '', dao = '';
    const locMap = { 'Giáp': 'Dần', 'Ất': 'Mão', 'Bính': 'Tỵ', 'Đinh': 'Ngọ', 'Mậu': 'Tỵ', 'Kỷ': 'Ngọ', 'Canh': 'Thân', 'Tân': 'Dậu', 'Nhâm': 'Hợi', 'Quý': 'Tý' };
    if (locMap[canNgay] === chiHao) loc = 'L';
    const maMap = { 'Thân': 'Dần', 'Tý': 'Dần', 'Thìn': 'Dần', 'Hợi': 'Tỵ', 'Mão': 'Tỵ', 'Mùi': 'Tỵ', 'Dần': 'Thân', 'Ngọ': 'Thân', 'Tuất': 'Thân', 'Tỵ': 'Hợi', 'Dậu': 'Hợi', 'Sửu': 'Hợi' };
    if (maMap[chiNgay] === chiHao) ma = 'M';
    const daoMap = { 'Thân': 'Dậu', 'Tý': 'Dậu', 'Thìn': 'Dậu', 'Hợi': 'Tý', 'Mão': 'Tý', 'Mùi': 'Tý', 'Dần': 'Mão', 'Ngọ': 'Mão', 'Tuất': 'Mão', 'Tỵ': 'Ngọ', 'Dậu': 'Ngọ', 'Sửu': 'Ngọ' };
    if (daoMap[chiNgay] === chiHao) dao = 'Đ';
    const quyMap = { 'Giáp': ['Sửu', 'Mùi'], 'Mậu': ['Sửu', 'Mùi'], 'Canh': ['Sửu', 'Mùi'], 'Ất': ['Tý', 'Thân'], 'Kỷ': ['Tý', 'Thân'], 'Bính': ['Hợi', 'Dậu'], 'Đinh': ['Hợi', 'Dậu'], 'Nhâm': ['Tỵ', 'Mão'], 'Quý': ['Tỵ', 'Mão'], 'Tân': ['Ngọ', 'Dần'] };
    if (quyMap[canNgay].includes(chiHao)) quy = 'Q';
    return { loc, ma, quy, dao }
}
function docHaoInput() {
    const arr = [];
    for (let i = 0; i < 6; i++) { const dd = document.getElementById('dd-' + i).value; const dong = document.getElementById('dong-' + i).checked; arr.push(dong ? parseInt(dd) + 2 : parseInt(dd)) }
    return arr;
}
function tinhData() {
    try {
        const haoArr = docHaoInput();
        const y = parseInt(document.getElementById('sel-nam').value), m = parseInt(document.getElementById('sel-thang').value), d = parseInt(document.getElementById('sel-ngay').value), hr = parseInt(document.getElementById('sel-gio').value), min = parseInt(document.getElementById('sel-phut').value);
        const solar = Solar.fromYmdHms(y, m, d, hr, min, 0);
        const lunar = solar.getLunar();
        const canNam = GAN_VN[lunar.getYearGan()] || lunar.getYearGan(), chiNam = ZHI_VN[lunar.getYearZhi()] || lunar.getYearZhi();
        const canThang = GAN_VN[lunar.getMonthGan()] || lunar.getMonthGan(), chiThang = ZHI_VN[lunar.getMonthZhi()] || lunar.getMonthZhi();
        const canNgay = GAN_VN[lunar.getDayGan()] || lunar.getDayGan(), chiNgay = ZHI_VN[lunar.getDayZhi()] || lunar.getDayZhi();
        const canGio = GAN_VN[lunar.getTimeGan()] || lunar.getTimeGan(), chiGio = ZHI_VN[lunar.getTimeZhi()] || lunar.getTimeZhi();
        const nhThang = DC_NH[chiThang];
        const tkArr = tinhTuanKhong(canNgay, chiNgay);
        let jqRaw = lunar.getJieQi();
        if (!jqRaw) { let prev = lunar.getPrevJieQi(); jqRaw = prev ? prev.getName() : "Không rõ" }
        const tietKhi = JQ_VN[jqRaw] || jqRaw;
        const amLichStr = `ngày ${Math.abs(lunar.getDay())} tháng ${Math.abs(lunar.getMonth())} ÂL`;
        const haIdx = haoToTrigramIdx(haoArr.slice(0, 3));
        const tiIdx = haoToTrigramIdx(haoArr.slice(3, 6));
        const qKey = tiIdx.toString() + haIdx.toString();
        const dataGoc = H64_DATA[qKey];
        const tenQue = dataGoc.ten;
        const loiTrieu = LOI_TRIEU[qKey];
        const cungIdx = dataGoc.cung;
        const nhCung = TRIGRAMS[cungIdx].nh;
        const qtChi = getQuaiThan(cungIdx, dataGoc.the);
        const st = LT_START[canNgay] ?? 0;
        const lt6 = Array.from({ length: 6 }, (_, i) => LUC_THAN[(st + i) % 6]);
        let hienThuyThan = new Set();
        const haoData = haoArr.map((v, i) => {
            const triIdx = i < 3 ? haIdx : tiIdx;
            const chi = NAP_GIAP_DC[triIdx][i];
            const can = i < 3 ? NAP_GIAP_TC[triIdx] : NAP_GIAP_TC_THUONG[triIdx];
            const nh = DC_NH[chi];
            const lt = tinhLucThan(nhCung, nh);
            hienThuyThan.add(lt);
            const vs = tinhVuongSuyThang(nh, nhThang);
            return { i, v, dong: v === 2 || v === 3, the: i === dataGoc.the, ung: i === dataGoc.ung, can, chi, nh, lt, ltt: lt6[i], tk: tkArr.includes(chi) ? 'K' : '', sat: tinhThanSat(canNgay, chiNgay, chi), vs, vsCls: getVSClass(vs), tsThang: getTruongSinh(nh, chiThang), tsNgay: getTruongSinh(nh, chiNgay), qt: chi === qtChi ? 'QT' : '', cls: getElementClass(nh) }
        });
        let phucThanData = {};
        ['Phụ Mẫu', 'Huynh Đệ', 'Tử Tôn', 'Thê Tài', 'Quan Quỷ'].forEach(lt => {
            if (!hienThuyThan.has(lt)) {
                for (let i = 0; i < 6; i++) {
                    const chi = NAP_GIAP_DC[cungIdx][i];
                    const can = i < 3 ? NAP_GIAP_TC[cungIdx] : NAP_GIAP_TC_THUONG[cungIdx];
                    const nh = DC_NH[chi];
                    if (tinhLucThan(nhCung, nh) === lt) { phucThanData[i] = { lt, can, chi, nh, cls: getElementClass(nh) }; break }
                }
            }
        });
        let qTinhChat = "";
        let xungHop = checkXungHop(haoData);
        if (xungHop) qTinhChat = xungHop;
        let bq = null, bqData = null;
        const coDong = haoArr.some(v => v === 2 || v === 3);
        if (coDong) {
            const sb = haoArr.map(v => v === 3 ? 0 : v === 2 ? 1 : v);
            const haB = haoToTrigramIdx(sb.slice(0, 3));
            const tiB = haoToTrigramIdx(sb.slice(3, 6));
            const bqKey = tiB.toString() + haB.toString();
            const bqGoc = H64_DATA[bqKey];
            bqData = sb.map((v, i) => {
                const triIdx = i < 3 ? haB : tiB;
                const chi = NAP_GIAP_DC[triIdx][i];
                const can = i < 3 ? NAP_GIAP_TC[triIdx] : NAP_GIAP_TC_THUONG[triIdx];
                const nh = DC_NH[chi];
                const vs = tinhVuongSuyThang(nh, nhThang);
                return { i, v, can, chi, nh, lt: tinhLucThan(nhCung, nh), tk: tkArr.includes(chi) ? 'K' : '', sat: tinhThanSat(canNgay, chiNgay, chi), vs, vsCls: getVSClass(vs), tsThang: getTruongSinh(nh, chiThang), tsNgay: getTruongSinh(nh, chiNgay), cls: getElementClass(nh) }
            });
            let bqTinhChat = "";
            let bqXungHop = checkXungHop(bqData);
            if (bqXungHop) bqTinhChat = bqXungHop;
            let ngam = checkNgam(haoData, bqData);
            if (ngam) bqTinhChat += (bqTinhChat ? ', ' : '') + ngam;
            bq = { ten: bqGoc.ten, trieu: LOI_TRIEU[bqKey], tc: bqTinhChat, cung: TRIGRAMS[bqGoc.cung].ten, arr: sb };
        }
        return { tenQue, loiTrieu, qTinhChat, cungTrai: TRIGRAMS[cungIdx].ten, haoData, bq, bqData, phucThanData, cNam: canNam + '-' + chiNam, cThang: canThang + '-' + chiThang, cNgay: canNgay + '-' + chiNgay, cGio: canGio + '-' + chiGio, nhNgay: DC_NH[chiNgay], nhThang, tkArr, tietKhi, amLichStr, coDong, viec: document.getElementById('viec-can-xem').value.trim(), tg: `${String(hr).padStart(2,'0')}:${String(min).padStart(2,'0')} - ${d}/${m}/${y}` }
    } catch (e) { alert("Lỗi tính toán."); console.error(e); return null }
}
function isBanHop(chi1, chi2) { for (let cuc of TAM_HOP_CUCS) { if (cuc.includes(chi1) && cuc.includes(chi2) && chi1 !== chi2) return true } return false; }
function phanTich1YeuTo(hao, chiTime, isThang) {
    let timeLabel = isThang ? `Tháng (${chiTime})` : `Ngày (${chiTime})`;
    let ts = getTruongSinh(hao.nh, chiTime);
    if (ts === "Mộ") return { score: -1, reason: `Nhập Mộ tại ${timeLabel}` };
    if (ts === "Tuyệt") return { score: -1, reason: `Lâm Tuyệt tại ${timeLabel}` };
    if (isBanHop(hao.chi, chiTime)) return { score: 1, reason: `Tam Hợp (Bán hợp) với ${timeLabel}` };
    if (HOP_MAP[hao.chi] === chiTime) return { score: 1, reason: `Nhị Hợp với ${timeLabel}` };
    if (XUNG_MAP[hao.chi] === chiTime) return { score: -1, reason: `Bị Xung bởi ${timeLabel}` };
    let nhTime = DC_NH[chiTime];
    if (NH_SINH[nhTime] === hao.nh) return { score: 1, reason: `Được Ngũ Hành ${timeLabel} Sinh Trợ` };
    if (nhTime === hao.nh) return { score: 1, reason: `Tỉ hòa Ngũ Hành với ${timeLabel}` };
    if (NH_KHAC[nhTime] === hao.nh) return { score: -1, reason: `Bị Ngũ Hành ${timeLabel} Khắc` };
    if (NH_SINH[hao.nh] === nhTime) return { score: -1, reason: `Sinh xuất cho Ngũ Hành ${timeLabel}` };
    if (NH_KHAC[hao.nh] === nhTime) return { score: -1, reason: `Khắc xuất Ngũ Hành ${timeLabel}` };
    return { score: 0, reason: `Bình hòa` };
}
function calcTotalScore(hao, chiThang, chiNgay) { return phanTich1YeuTo(hao, chiThang, true).score + phanTich1YeuTo(hao, chiNgay, false).score }
function getTienThoai(chi1, chi2) {
    const tien = { 'Hợi': 'Tý', 'Dần': 'Mão', 'Tỵ': 'Ngọ', 'Thân': 'Dậu', 'Sửu': 'Thìn', 'Thìn': 'Mùi', 'Mùi': 'Tuất', 'Tuất': 'Sửu' };
    const thoai = { 'Tý': 'Hợi', 'Mão': 'Dần', 'Ngọ': 'Tỵ', 'Dậu': 'Thân', 'Thìn': 'Sửu', 'Mùi': 'Thìn', 'Tuất': 'Mùi', 'Sửu': 'Tuất' };
    if (tien[chi1] === chi2) return 'Tiến thần';
    if (thoai[chi1] === chi2) return 'Thoái thần';
    return null;
}
function danhGiaLucDong(hao, haoBien) {
    let tienThoai = getTienThoai(hao.chi, haoBien.chi);
    let tsBien = getTruongSinh(hao.nh, haoBien.chi);
    if (NH_SINH[haoBien.nh] === hao.nh) return { hasPower: true, reason: "Hóa Hồi Đầu Sinh" };
    if (tienThoai === 'Tiến thần') return { hasPower: true, reason: "Hóa Tiến Thần" };
    if (HOP_MAP[hao.chi] === haoBien.chi) return { hasPower: true, reason: "Hóa Hợp" };
    if (NH_KHAC[haoBien.nh] === hao.nh) return { hasPower: false, reason: "Hóa Hồi Đầu Khắc" };
    if (tienThoai === 'Thoái thần') return { hasPower: false, reason: "Hóa Thoái Thần" };
    if (tsBien === "Mộ") return { hasPower: false, reason: "Hóa Mộ" };
    if (tsBien === "Tuyệt") return { hasPower: false, reason: "Hóa Tuyệt" };
    if (XUNG_MAP[hao.chi] === haoBien.chi) return { hasPower: false, reason: "Hóa Xung" };
    if (NH_KHAC[hao.nh] === haoBien.nh) return { hasPower: false, reason: "Khắc Xuất (Hao tổn)" };
    if (NH_SINH[hao.nh] === haoBien.nh) return { hasPower: false, reason: "Sinh Xuất (Hao tổn)" };
    if (hao.nh === haoBien.nh) return { hasPower: true, reason: "Hóa Trợ (Cùng hành)" };
    return { hasPower: true, reason: "Động bình thường" };
}
function quanHeNganGon(nh1, nh2) {
    if (nh1 === nh2) return "Bình hòa";
    if (NH_SINH[nh1] === nh2) return "Thế sinh Ứng";
    if (NH_SINH[nh2] === nh1) return "Ứng sinh Thế";
    if (NH_KHAC[nh1] === nh2) return "Thế khắc Ứng";
    if (NH_KHAC[nh2] === nh1) return "Ứng khắc Thế";
    return "Bình hòa";
}
function quanHeTheUngGiaTang(theChi, ungChi, theNh, ungNh) {
    let res = quanHeNganGon(theNh, ungNh);
    let them = [];
    if (XUNG_MAP[theChi] === ungChi) them.push(`Lục Xung (${theChi}-${ungChi})`);
    if (HOP_MAP[theChi] === ungChi) them.push(`Lục Hợp (${theChi}-${ungChi})`);
    if (isBanHop(theChi, ungChi)) them.push(`Bán Hợp/Tam Hợp (${theChi}-${ungChi})`);
    if (HINH_MAP[theChi] === ungChi || HINH_MAP[ungChi] === theChi || (theChi === ungChi && ['Thìn', 'Ngọ', 'Dậu', 'Hợi'].includes(theChi))) them.push(`Tương Hình (${theChi}-${ungChi})`);
    if (HAI_MAP[theChi] === ungChi) them.push(`Tương Hại (${theChi}-${ungChi})`);
    if (them.length > 0) return `${res} <br/><span style="color:#e65100;font-size:11.5px">[Kèm theo: ${them.join(', ')}]</span>`;
    return res;
}
function tuongTotXau(dtNh, theNh, isTriThe) {
    if (isTriThe) return "Tượng tốt đẹp (Dụng thần trì Thế)";
    if (NH_SINH[theNh] === dtNh || NH_SINH[dtNh] === theNh || dtNh === theNh) return "Tượng tốt đẹp";
    if (NH_KHAC[theNh] === dtNh || NH_KHAC[dtNh] === theNh) return "Tượng xấu";
    return "Tượng bình thường";
}
